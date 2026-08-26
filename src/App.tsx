import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { ChatView } from './components/ChatView';
import { ModelCustomizerModal } from './components/ModelCustomizerModal';
import { KnowledgeTrainerModal } from './components/KnowledgeTrainerModal';
import { AttentionVisualizerModal } from './components/AttentionVisualizerModal';
import { ApiIntegrationModal } from './components/ApiIntegrationModal';
import {
  AISettings,
  ChatMessage,
  KnowledgeItem,
  ModelPersona,
  ModelPersonaId,
  UserMemory,
} from './types';
import {
  DEFAULT_PERSONAS,
  loadKnowledge,
  loadMemories,
  loadMessages,
  loadSettings,
  saveKnowledge,
  saveMemories,
  saveMessages,
  saveSettings,
} from './ai-engine/memoryStore';
import { generateAIResponse } from './ai-engine/generator';
import { analyzePromptIntent } from './ai-engine/semanticEngine';

export default function App() {
  const [settings, setSettings] = useState<AISettings>(loadSettings);
  const [knowledgeList, setKnowledgeList] = useState<KnowledgeItem[]>(loadKnowledge);
  const [memories, setMemories] = useState<UserMemory[]>(loadMemories);
  const [messages, setMessages] = useState<ChatMessage[]>(loadMessages);

  const [isGenerating, setIsGenerating] = useState(false);
  const [streamingChunk, setStreamingChunk] = useState('');
  const abortControllerRef = useRef<AbortController | null>(null);

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

  // Clear chat
  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear the conversation history?')) {
      setMessages([]);
      saveMessages([]);
    }
  };

  // Export conversation as JSON and Markdown
  const handleExportChat = () => {
    const markdownContent = messages
      .map(
        (m) =>
          `### ${m.role === 'user' ? 'User' : activePersona.name} (${new Date(
            m.timestamp
          ).toLocaleString()})\n\n${m.content}\n`
      )
      .join('\n---\n\n');

    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Stop generation
  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsGenerating(false);
    setStreamingChunk('');
  };

  // Send message with optional image attachment
  const handleSendMessage = async (text: string, image?: { dataUrl: string; name: string }) => {
    const trimmedText = text.trim();
    if ((!trimmedText && !image) || isGenerating) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: trimmedText || (image ? 'Analyze this uploaded image' : ''),
      timestamp: Date.now(),
      imageUrl: image?.dataUrl,
      imageName: image?.name,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    saveMessages(updatedMessages);

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

    setIsGenerating(true);
    setStreamingChunk('');

    const controller = new AbortController();
    abortControllerRef.current = controller;

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
            setStreamingChunk('');
          },
          onTokenChunk: (chunk) => {
            setStreamingChunk(chunk);
          },
          onComplete: (assistantMsg) => {
            const finalMessages = [...updatedMessages, assistantMsg];
            setMessages(finalMessages);
            saveMessages(finalMessages);
            setIsGenerating(false);
            setStreamingChunk('');
            abortControllerRef.current = null;
          },
          onError: (err) => {
            console.error('Generation failed', err);
            setIsGenerating(false);
            setStreamingChunk('');
            abortControllerRef.current = null;
          },
        },
        controller.signal,
        image?.dataUrl
      );
    } catch (e) {
      console.error(e);
      setIsGenerating(false);
      setStreamingChunk('');
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
    setMessages(sliced);
    saveMessages(sliced);

    handleSendMessage(
      lastUserMsg.content,
      lastUserMsg.imageUrl ? { dataUrl: lastUserMsg.imageUrl, name: lastUserMsg.imageName || 'image.png' } : undefined
    );
  };

  const handleOpenAttentionForMessage = (msg: ChatMessage) => {
    setActiveAttentionMsg(msg);
    setIsAttentionOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <Header
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
        onClearChat={handleClearChat}
        onExportChat={handleExportChat}
        messageCount={messages.length}
      />

      {/* Main Chat Interface */}
      <main className="flex-1 flex flex-col">
        <ChatView
          messages={messages}
          isGenerating={isGenerating}
          streamingChunk={streamingChunk}
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
