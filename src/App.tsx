import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { ConversationSidebar } from './components/ConversationSidebar';
import { ChatView } from './components/ChatView';
import { ModelCustomizerModal } from './components/ModelCustomizerModal';
import { KnowledgeTrainerModal } from './components/KnowledgeTrainerModal';
import { AttentionVisualizerModal } from './components/AttentionVisualizerModal';
import { ApiIntegrationModal } from './components/ApiIntegrationModal';
import {
  AISettings,
  ChatMessage,
  Conversation,
  KnowledgeItem,
  ModelPersona,
  ModelPersonaId,
  UserMemory,
} from './types';
import {
  DEFAULT_PERSONAS,
  createConversation,
  deriveConversationTitle,
  loadActiveConversationId,
  loadConversations,
  loadKnowledge,
  loadMemories,
  loadSettings,
  saveActiveConversationId,
  saveConversations,
  saveKnowledge,
  saveMemories,
  saveSettings,
} from './ai-engine/memoryStore';
import { generateAIResponse, generateConversationTitle } from './ai-engine/generator';
import { analyzePromptIntent } from './ai-engine/semanticEngine';

function initConversations(): Conversation[] {
  const loaded = loadConversations();
  return loaded.length > 0 ? loaded : [createConversation()];
}

export default function App() {
  const [settings, setSettings] = useState<AISettings>(loadSettings);
  const [knowledgeList, setKnowledgeList] = useState<KnowledgeItem[]>(loadKnowledge);
  const [memories, setMemories] = useState<UserMemory[]>(loadMemories);

  const [conversations, setConversations] = useState<Conversation[]>(initConversations);
  const [activeConversationId, setActiveConversationId] = useState<string>(() => {
    const saved = loadActiveConversationId();
    const initial = initConversations();
    return saved && initial.some((c) => c.id === saved) ? saved : initial[0].id;
  });

  const activeConversation =
    conversations.find((c) => c.id === activeConversationId) || conversations[0];
  const messages = activeConversation?.messages || [];

  // Persists a full replacement of the conversation list plus whichever fields changed on the
  // active one (messages/title/updatedAt) — every mutation in this file goes through this so
  // conversations.length never drifts from what's in storage.
  const commitConversation = (id: string, patch: Partial<Conversation>) => {
    setConversations((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, ...patch, updatedAt: Date.now() } : c));
      saveConversations(next);
      return next;
    });
  };

  // Generation state is keyed by conversation id, not a single global flag — otherwise switching
  // conversations mid-generation shows the WRONG conversation's streaming bubble/progress stage,
  // and the Stop button silently aborts whichever conversation was generating when the user
  // navigated away instead of the one currently on screen.
  const [generatingIds, setGeneratingIds] = useState<Record<string, boolean>>({});
  const [streamingChunks, setStreamingChunks] = useState<Record<string, string>>({});
  const [progressStages, setProgressStages] = useState<Record<string, string>>({});
  const abortControllersRef = useRef<Map<string, AbortController>>(new Map());

  const isGenerating = !!generatingIds[activeConversationId];
  const streamingChunk = streamingChunks[activeConversationId] || '';
  const progressStage = progressStages[activeConversationId] || '';

  const setGeneratingFor = (id: string, value: boolean) =>
    setGeneratingIds((prev) => ({ ...prev, [id]: value }));
  const setStreamingChunkFor = (id: string, value: string) =>
    setStreamingChunks((prev) => ({ ...prev, [id]: value }));
  const setProgressStageFor = (id: string, value: string) =>
    setProgressStages((prev) => ({ ...prev, [id]: value }));

  // Modal visibility states
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isKnowledgeOpen, setIsKnowledgeOpen] = useState(false);
  const [isAttentionOpen, setIsAttentionOpen] = useState(false);
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);

  // Inspection states for attention modal
  const [activeAttentionMsg, setActiveAttentionMsg] = useState<ChatMessage | null>(null);

  // Active persona object
  const activePersona: ModelPersona =
    settings.activePersonaId === 'custom'
      ? settings.customPersona
      : DEFAULT_PERSONAS[settings.activePersonaId] || DEFAULT_PERSONAS['crashout-bot'];

  // Save settings when changed
  const handleSaveSettings = (newSettings: AISettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  // Save knowledge list when changed
  const handleSaveKnowledge = (newList: KnowledgeItem[]) => {
    setKnowledgeList(newList);
    saveKnowledge(newList);
  };

  // Handle persona quick selection
  const handleSelectPersona = (id: ModelPersonaId) => {
    const targetPersona = id === 'custom' ? settings.customPersona : DEFAULT_PERSONAS[id];
    const newSettings: AISettings = {
      ...settings,
      activePersonaId: id,
      temperature: targetPersona.defaultTemperature,
      topP: targetPersona.defaultTopP,
      reasoningMode: targetPersona.reasoningMode,
    };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const conversationToMarkdown = (conv: Conversation): string =>
    conv.messages
      .map(
        (m) =>
          `### ${m.role === 'user' ? 'User' : activePersona.name} (${new Date(
            m.timestamp
          ).toLocaleString()})\n\n${m.content}\n`
      )
      .join('\n---\n\n');

  const downloadMarkdown = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Start a brand-new, empty conversation and switch to it
  const handleNewChat = () => {
    const fresh = createConversation();
    setConversations((prev) => {
      const next = [...prev, fresh];
      saveConversations(next);
      return next;
    });
    setActiveConversationId(fresh.id);
    saveActiveConversationId(fresh.id);
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
    saveActiveConversationId(id);
  };

  const handleRenameConversation = (id: string, title: string) => {
    commitConversation(id, { title, titleIsCustom: true });
  };

  const handleDeleteConversation = (id: string) => {
    if (!window.confirm('Delete this conversation? This cannot be undone.')) return;
    // Abort and drop any in-flight generation for the conversation being deleted, so its
    // abort controller and per-id state entries don't leak forever.
    const controller = abortControllersRef.current.get(id);
    if (controller) {
      controller.abort();
      abortControllersRef.current.delete(id);
    }
    setGeneratingIds((prev) => {
      const { [id]: _drop, ...rest } = prev;
      return rest;
    });
    setStreamingChunks((prev) => {
      const { [id]: _drop, ...rest } = prev;
      return rest;
    });
    setProgressStages((prev) => {
      const { [id]: _drop, ...rest } = prev;
      return rest;
    });
    setConversations((prev) => {
      const next = prev.filter((c) => c.id !== id);
      const finalList = next.length > 0 ? next : [createConversation()];
      saveConversations(finalList);
      if (id === activeConversationId) {
        setActiveConversationId(finalList[0].id);
        saveActiveConversationId(finalList[0].id);
      }
      return finalList;
    });
  };

  const handleExportConversation = (id: string) => {
    const conv = conversations.find((c) => c.id === id);
    if (!conv) return;
    downloadMarkdown(`chat-export-${Date.now()}.md`, conversationToMarkdown(conv));
  };

  // No hosted backend to mint a real shareable link, so "share" copies a Markdown transcript to
  // the clipboard — the user can paste it wherever they'd share a link (Discord, email, etc).
  const handleShareConversation = async (id: string) => {
    const conv = conversations.find((c) => c.id === id);
    if (!conv) return;
    const content = conversationToMarkdown(conv);
    try {
      await navigator.clipboard.writeText(content);
      window.alert('Conversation copied to clipboard as Markdown — paste it anywhere to share.');
    } catch (e) {
      console.error('Clipboard write failed', e);
      downloadMarkdown(`chat-share-${Date.now()}.md`, content);
    }
  };

  // Stop generation — aborts whichever conversation is currently on screen, not just whatever
  // last started generating.
  const handleStopGeneration = () => {
    const controller = abortControllersRef.current.get(activeConversationId);
    if (controller) {
      controller.abort();
      abortControllersRef.current.delete(activeConversationId);
    }
    setGeneratingFor(activeConversationId, false);
    setStreamingChunkFor(activeConversationId, '');
  };

  // Send message with optional image attachment. `baseMessagesOverride`, when given, is used
  // instead of the live `messages` closure as the history to append to — needed by
  // handleRegenerate, which commits a trimmed message list and then calls this function in the
  // same tick; React state updates are async, so without the override this would still see the
  // pre-trim `messages` value and duplicate the last exchange instead of replacing it.
  const handleSendMessage = async (
    text: string,
    image?: { dataUrl: string; name: string },
    baseMessagesOverride?: ChatMessage[]
  ) => {
    const trimmedText = text.trim();
    const targetConversationId = activeConversationId;
    if ((!trimmedText && !image) || generatingIds[targetConversationId]) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: trimmedText || (image ? 'Analyze this uploaded image' : ''),
      timestamp: Date.now(),
      imageUrl: image?.dataUrl,
      imageName: image?.name,
    };

    const baseMessages = baseMessagesOverride ?? messages;
    const updatedMessages = [...baseMessages, userMessage];
    commitConversation(targetConversationId, { messages: updatedMessages });

    // Auto-extract user memory and personal facts
    const intent = analyzePromptIntent(trimmedText);
    let currentMemories = memories;
    if (intent.extractedMemories && intent.extractedMemories.length > 0) {
      const updatedMemories = [...memories];
      intent.extractedMemories.forEach((em) => {
        const existingIdx = updatedMemories.findIndex((m) => m.key === em.key);
        const newMem: UserMemory = {
          id: `mem-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          key: em.key,
          fact: em.fact,
          confidence: 0.95,
          timestamp: Date.now(),
        };
        if (existingIdx >= 0) {
          updatedMemories[existingIdx] = newMem;
        } else {
          updatedMemories.push(newMem);
        }
      });
      currentMemories = updatedMemories;
      setMemories(updatedMemories);
      saveMemories(updatedMemories);
    }

    setGeneratingFor(targetConversationId, true);
    setStreamingChunkFor(targetConversationId, '');
    setProgressStageFor(targetConversationId, '');

    const controller = new AbortController();
    abortControllersRef.current.set(targetConversationId, controller);

    try {
      await generateAIResponse(
        userMessage.content,
        updatedMessages,
        activePersona,
        settings,
        knowledgeList,
        currentMemories,
        {
          onReasoningStart: () => {
            setStreamingChunkFor(targetConversationId, '');
            setProgressStageFor(targetConversationId, '');
          },
          onProgress: (stage) => {
            setProgressStageFor(targetConversationId, stage);
          },
          onTokenChunk: (chunk) => {
            setProgressStageFor(targetConversationId, '');
            setStreamingChunkFor(targetConversationId, chunk);
          },
          onComplete: (assistantMsg) => {
            const finalMessages = [...updatedMessages, assistantMsg];
            // Read titleIsCustom/message-count from the LIVE state inside the updater (not the
            // outer `conversations` closure, which is stale by the time this fires seconds after
            // the request started) — otherwise a rename made while the reply was generating gets
            // silently clobbered by the auto-title heuristic below.
            let shouldAutoTitle = false;
            let isFirstExchange = false;
            setConversations((prev) => {
              const conv = prev.find((c) => c.id === targetConversationId);
              shouldAutoTitle = !!conv && !conv.titleIsCustom;
              isFirstExchange = conv ? conv.messages.length === 0 : false;
              const next = prev.map((c) =>
                c.id === targetConversationId
                  ? {
                      ...c,
                      messages: finalMessages,
                      updatedAt: Date.now(),
                      // Instant heuristic title as a placeholder so the sidebar never sits blank —
                      // swapped for the real AI-generated one below as soon as that call resolves.
                      ...(shouldAutoTitle
                        ? { title: deriveConversationTitle(finalMessages) || c.title }
                        : {}),
                    }
                  : c
              );
              saveConversations(next);
              return next;
            });
            setGeneratingFor(targetConversationId, false);
            setStreamingChunkFor(targetConversationId, '');
            setProgressStageFor(targetConversationId, '');
            abortControllersRef.current.delete(targetConversationId);

            if (shouldAutoTitle && isFirstExchange) {
              generateConversationTitle(userMessage.content, assistantMsg.content).then((aiTitle) => {
                if (!aiTitle) return;
                setConversations((prev) => {
                  const latest = prev.find((c) => c.id === targetConversationId);
                  // Don't clobber a title the user manually set while this call was in flight.
                  if (!latest || latest.titleIsCustom) return prev;
                  const next = prev.map((c) =>
                    c.id === targetConversationId ? { ...c, title: aiTitle } : c
                  );
                  saveConversations(next);
                  return next;
                });
              });
            }
          },
          onError: (err) => {
            console.error('Generation failed', err);
            setGeneratingFor(targetConversationId, false);
            setStreamingChunkFor(targetConversationId, '');
            setProgressStageFor(targetConversationId, '');
            abortControllersRef.current.delete(targetConversationId);
          },
        },
        controller.signal,
        image?.dataUrl
      );
    } catch (e) {
      console.error(e);
      setGeneratingFor(targetConversationId, false);
      setStreamingChunkFor(targetConversationId, '');
    }
  };

  // Regenerate last assistant response
  const handleRegenerate = () => {
    if (messages.length === 0 || isGenerating) return;
    const lastUserMsgIndex = [...messages].reverse().findIndex((m) => m.role === 'user');
    if (lastUserMsgIndex === -1) return;

    const actualIndex = messages.length - 1 - lastUserMsgIndex;
    const lastUserMsg = messages[actualIndex];
    const sliced = messages.slice(0, actualIndex);
    commitConversation(activeConversationId, { messages: sliced });

    // Pass `sliced` explicitly as the base history — handleSendMessage's own `messages` closure
    // still reflects the pre-slice conversation at this point (the commit above hasn't flushed
    // through a re-render yet), so without this override the old exchange would be duplicated
    // instead of replaced.
    handleSendMessage(
      lastUserMsg.content,
      lastUserMsg.imageUrl ? { dataUrl: lastUserMsg.imageUrl, name: lastUserMsg.imageName || 'image.png' } : undefined,
      sliced
    );
  };

  const handleOpenAttentionForMessage = (msg: ChatMessage) => {
    setActiveAttentionMsg(msg);
    setIsAttentionOpen(true);
  };

  return (
    <div className="h-screen bg-[var(--nx-bg)] text-[var(--nx-text)] flex font-sans antialiased selection:bg-[var(--nx-accent)] selection:text-white">
      {/* Sidebar navigation */}
      <Sidebar
        settings={settings}
        activePersona={activePersona}
        onSelectPersona={handleSelectPersona}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenKnowledge={() => setIsKnowledgeOpen(true)}
        onOpenAttention={() => {
          setActiveAttentionMsg(null);
          setIsAttentionOpen(true);
        }}
        onOpenApiIntegration={() => setIsApiModalOpen(true)}
      />

      {/* Conversation list panel */}
      <ConversationSidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onNewChat={handleNewChat}
        onSelectConversation={handleSelectConversation}
        onRenameConversation={handleRenameConversation}
        onDeleteConversation={handleDeleteConversation}
        onExportConversation={handleExportConversation}
        onShareConversation={handleShareConversation}
      />

      {/* Main Chat Interface */}
      <main className="flex-1 flex flex-col min-w-0">
        <ChatView
          messages={messages}
          isGenerating={isGenerating}
          streamingChunk={streamingChunk}
          progressStage={progressStage}
          activePersona={activePersona}
          settings={settings}
          onSendMessage={handleSendMessage}
          onStopGeneration={handleStopGeneration}
          onRegenerate={handleRegenerate}
          onOpenAttentionForMessage={handleOpenAttentionForMessage}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
          onOpenKnowledge={() => setIsKnowledgeOpen(true)}
          onOpenApiIntegration={() => setIsApiModalOpen(true)}
        />
      </main>

      {/* Customizer Modal */}
      <ModelCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        settings={settings}
        onSaveSettings={handleSaveSettings}
      />

      {/* Knowledge Trainer Modal */}
      <KnowledgeTrainerModal
        isOpen={isKnowledgeOpen}
        onClose={() => setIsKnowledgeOpen(false)}
        knowledgeList={knowledgeList}
        onSaveKnowledge={handleSaveKnowledge}
      />

      {/* Attention & Latent Space Visualizer Modal */}
      <AttentionVisualizerModal
        isOpen={isAttentionOpen}
        onClose={() => setIsAttentionOpen(false)}
        lastAttentionMatrix={activeAttentionMsg?.attentionMatrix}
        lastPrompt={
          activeAttentionMsg
            ? activeAttentionMsg.content.slice(0, 120)
            : messages.length > 0
            ? messages[messages.length - 1].content.slice(0, 120)
            : undefined
        }
        attentionHeads={settings.attentionHeads}
      />

      {/* Bot API & SDK Integration Modal */}
      <ApiIntegrationModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
      />
    </div>
  );
}
