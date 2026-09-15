import React, { useState, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar, AppView } from './components/Sidebar';
import { ConversationSidebar } from './components/ConversationSidebar';
import { ChatView } from './components/ChatView';
import { NexusCodeView } from './components/NexusCodeView';
import { ModelCustomizerModal } from './components/ModelCustomizerModal';
import { KnowledgeTrainerModal } from './components/KnowledgeTrainerModal';
import { AttentionVisualizerModal } from './components/AttentionVisualizerModal';
import { ApiIntegrationModal } from './components/ApiIntegrationModal';
import { EntryAnimation } from './components/EntryAnimation';
import {
  AISettings,
  ChatMessage,
  Conversation,
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
  loadMemories,
  loadSettings,
  saveActiveConversationId,
  saveConversations,
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
  const [view, setView] = useState<AppView>('chat');
  const [settings, setSettings] = useState<AISettings>(loadSettings);
  const [memories, setMemories] = useState<UserMemory[]>(loadMemories);

  // Plays once per page load, before anything else is interactable — reads the setting directly
  // from the very same loadSettings() call above (via a lazy initializer, so it's decided
  // synchronously on first render, not after an effect) rather than from `settings` state, and
  // also backs off for prefers-reduced-motion regardless of the setting.
  const [showEntryAnimation, setShowEntryAnimation] = useState(() => {
    const reducedMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return settings.entryAnimationEnabled !== false && !reducedMotion;
  });

  // initConversations() must run exactly ONCE — it calls createConversation() when storage is
  // empty, and a second call produces a DIFFERENT fresh conversation with a different id. When
  // that happened, activeConversationId pointed at a conversation that wasn't in the list, so
  // every send went to commitConversation() with an id that matched nothing and the message was
  // silently dropped ("I wrote hello, it replied, then the conversation disappeared").
  const initialConversationsRef = useRef<Conversation[] | null>(null);
  if (initialConversationsRef.current === null) initialConversationsRef.current = initConversations();
  const [conversations, setConversations] = useState<Conversation[]>(initialConversationsRef.current);
  const [activeConversationId, setActiveConversationId] = useState<string>(() => {
    const saved = loadActiveConversationId();
    const initial = initialConversationsRef.current!;
    return saved && initial.some((c) => c.id === saved) ? saved : initial[0].id;
  });

  const activeConversation =
    conversations.find((c) => c.id === activeConversationId) || conversations[0];
  const messages = activeConversation?.messages || [];

  // Self-heal: if activeConversationId ever points at a conversation that isn't in the list
  // (a stale id from storage, a race), snap it back to whatever's actually on screen so sends
  // don't get committed to a non-existent id and vanish.
  useEffect(() => {
    if (activeConversation && activeConversation.id !== activeConversationId) {
      setActiveConversationId(activeConversation.id);
    }
  }, [activeConversation, activeConversationId]);

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

  // Modal visibility — a single piece of state rather than 4 independent booleans. Each modal
  // (Modal.tsx) mounts its own Escape-key listener and body-scroll-lock effect; with 4
  // independent booleans nothing prevented 2+ being open at once, which meant Escape closed BOTH
  // at once (each had its own global listener) and closing the first-opened one wrongly restored
  // background scroll while the second was still open. One `openModal` value structurally
  // prevents that: opening any modal is exclusive by construction.
  type ModalId = 'customizer' | 'knowledge' | 'attention' | 'api';
  const [openModal, setOpenModal] = useState<ModalId | null>(null);
  const isCustomizerOpen = openModal === 'customizer';
  const isKnowledgeOpen = openModal === 'knowledge';
  const isAttentionOpen = openModal === 'attention';
  const isApiModalOpen = openModal === 'api';
  const closeModal = () => setOpenModal(null);

  // On narrow screens (phones — this drives Safari/iOS behavior specifically since that's
  // Patrick's actual daily driver) BOTH the icon rail and the conversation list collapse into one
  // overlay drawer, toggled from a menu button, instead of permanently eating ~90px of a ~375px
  // screen; on md+ they're always static columns. Same single boolean drives both panels so one
  // tap reveals the whole nav rather than needing two separate toggles.
  const [isConvoDrawerOpen, setIsConvoDrawerOpen] = useState(false);
  useEffect(() => {
    if (!isConvoDrawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsConvoDrawerOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isConvoDrawerOpen]);

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
            // A deliberate Stop click also throws (AbortError) through this same path — that's
            // not a failure, so it gets no error bubble, just a normal silent stop.
            if (err.name !== 'AbortError') {
              const errorMsg: ChatMessage = {
                id: `msg-${Date.now()}-error`,
                role: 'assistant',
                content: "Something went wrong generating a response — the request failed or the server didn't respond. Try sending your message again.",
                timestamp: Date.now(),
                isError: true,
              };
              commitConversation(targetConversationId, { messages: [...updatedMessages, errorMsg] });
            }
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
    setOpenModal('attention');
  };

  const handleNewChatMobile = () => {
    setIsConvoDrawerOpen(false);
    handleNewChat();
  };
  const handleSelectConversationMobile = (id: string) => {
    setIsConvoDrawerOpen(false);
    handleSelectConversation(id);
  };

  return (
    <div
      className="relative flex h-dvh gap-3 overflow-hidden bg-[var(--glass-base)] p-3 text-[var(--glass-text)]"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      {/* Icon rail — a floating glass panel, not an edge-to-edge column. On phones it's hidden
          off-screen by default (same drawer toggle as the conversation list below) rather than
          permanently reserving ~90px of a screen that might only be 375px wide; md+ keeps it as a
          static column exactly as before. */}
      <div
        className={`fixed inset-y-0 left-0 z-40 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] pl-[max(0.75rem,env(safe-area-inset-left))] transition-transform duration-[var(--glass-dur-slow)] md:static md:z-10 md:translate-x-0 md:p-0 ${
          isConvoDrawerOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <Sidebar
          settings={settings}
          activePersona={activePersona}
          view={view}
          onSelectView={setView}
          onSelectPersona={handleSelectPersona}
          onOpenCustomizer={() => setOpenModal('customizer')}
          onOpenKnowledge={() => setOpenModal('knowledge')}
          onOpenAttention={() => {
            setActiveAttentionMsg(null);
            setOpenModal('attention');
          }}
          onOpenApiIntegration={() => setOpenModal('api')}
        />
      </div>

      {view === 'chat' && (
        <>
          {/* Conversation list — floating glass panel, static on md+, slide-in drawer below.
              Offset by the rail's own width + gap so the two mobile drawers sit side by side
              instead of stacking on top of each other. */}
          <div
            className={`fixed inset-y-0 left-0 z-40 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] pl-[max(0.75rem,env(safe-area-inset-left))] transition-transform duration-[var(--glass-dur-slow)] md:static md:z-10 md:translate-x-0 md:p-0 ${
              isConvoDrawerOpen ? 'translate-x-[calc(var(--glass-rail-w)_+_1.5rem)] md:translate-x-0' : '-translate-x-full md:translate-x-0'
            }`}
          >
            <ConversationSidebar
              conversations={conversations}
              activeConversationId={activeConversationId}
              onNewChat={handleNewChatMobile}
              onSelectConversation={handleSelectConversationMobile}
              onRenameConversation={handleRenameConversation}
              onDeleteConversation={handleDeleteConversation}
              onExportConversation={handleExportConversation}
              onShareConversation={handleShareConversation}
            />
          </div>
          {isConvoDrawerOpen && (
            <div
              className="fixed inset-0 z-30 bg-black/50 md:hidden"
              onClick={() => setIsConvoDrawerOpen(false)}
              aria-hidden="true"
            />
          )}

          {/* Main chat — its own floating glass panel */}
          <main className="glass-panel flex min-w-0 flex-1 flex-col overflow-hidden">
            <ChatView
              onToggleConversations={() => setIsConvoDrawerOpen((v) => !v)}
              // Forces a full remount whenever the active conversation changes, resetting every piece
              // of ChatView's own local state (attachedImage, inputText, expandedThoughts, etc.) —
              // found by a dedicated review: without this, ChatView is a single persistent component
              // instance reused across every conversation, so none of its local state was scoped per
              // conversation at all. Concretely: drag an image into the input box in Conversation A,
              // switch to Conversation B before sending, type a message and hit Enter — A's stale
              // attachedImage was still there and got silently sent into B's history. Same problem for
              // an unsent draft in the input box bleeding into whichever conversation you switch to.
              // This is the identical class of bug this session already fixed in App.tsx itself
              // (generation state not scoped per conversation) — same root cause, different component.
              key={activeConversationId}
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
              onOpenCustomizer={() => setOpenModal('customizer')}
              onOpenKnowledge={() => setOpenModal('knowledge')}
              onOpenApiIntegration={() => setOpenModal('api')}
            />
          </main>
        </>
      )}

      {view === 'code' && (
        <>
          {/* NexusCodeView has no header of its own to host a menu button, unlike ChatView — a
              small floating one here is the mobile entry point back to the rail in this view. */}
          <button
            type="button"
            onClick={() => setIsConvoDrawerOpen((v) => !v)}
            aria-label="Open menu"
            className="glass-panel fixed left-3 top-3 z-40 flex h-10 w-10 items-center justify-center text-[var(--glass-text-muted)] transition hover:text-[var(--glass-text)] md:hidden"
            style={{ top: 'max(0.75rem, env(safe-area-inset-top))' }}
          >
            <Menu className="h-5 w-5" />
          </button>
          {isConvoDrawerOpen && (
            <div
              className="fixed inset-0 z-30 bg-black/50 md:hidden"
              onClick={() => setIsConvoDrawerOpen(false)}
              aria-hidden="true"
            />
          )}
          <main className="glass-panel flex min-w-0 flex-1 flex-col overflow-hidden">
            <NexusCodeView />
          </main>
        </>
      )}

      {/* Customizer Modal */}
      <ModelCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={closeModal}
        settings={settings}
        onSaveSettings={handleSaveSettings}
      />

      {/* Knowledge Trainer Modal */}
      <KnowledgeTrainerModal
        isOpen={isKnowledgeOpen}
        onClose={closeModal}
      />

      {/* Attention & Latent Space Visualizer Modal */}
      <AttentionVisualizerModal
        isOpen={isAttentionOpen}
        onClose={closeModal}
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
        onClose={closeModal}
      />

      {showEntryAnimation && <EntryAnimation onDone={() => setShowEntryAnimation(false)} />}
    </div>
  );
}
