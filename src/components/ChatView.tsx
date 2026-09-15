import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Send,
  Square,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  RotateCw,
  BrainCircuit,
  Code2,
  Sliders,
  Database,
  ArrowRight,
  Image as ImageIcon,
  X,
  Eye,
  Globe,
  ExternalLink,
  PanelLeft,
} from 'lucide-react';
import { AISettings, ChatMessage, ModelPersona } from '../types';
import { countTokens } from '../ai-engine/tokenizer';

interface ChatViewProps {
  messages: ChatMessage[];
  isGenerating: boolean;
  streamingChunk: string;
  progressStage?: string;
  activePersona: ModelPersona;
  settings: AISettings;
  onSendMessage: (text: string, image?: { dataUrl: string; name: string }) => void;
  onStopGeneration: () => void;
  onRegenerate: () => void;
  onOpenAttentionForMessage: (msg: ChatMessage) => void;
  onOpenCustomizer: () => void;
  onOpenKnowledge: () => void;
  onOpenApiIntegration?: () => void;
  onToggleConversations?: () => void;
}

const SAMPLE_PROMPTS: { title: string; prompt: string }[] = [
  {
    title: '🌐 Live web search + swearing',
    prompt:
      'Who won the 2024 UEFA Champions League, and what the hell happened in the final match?',
  },
  {
    title: '🤖 Nexus Discord homie',
    prompt:
      'Yo Nexus, how do I center a div in CSS and make sure my bot does not get rate limited on Discord?',
  },
  {
    title: '💀 Casseurt question (expect a roast)',
    prompt: 'Hey Nexus, do you like Casseurt? What do you think about him?',
  },
  {
    title: '🌟 Super-chill homie mode',
    prompt:
      'Yo Nexus, it is user 1394001641899954368, what is good bro? How is my favorite bot doing today?',
  },
  {
    title: '🛡️ RaidShield classification',
    prompt:
      'Classify this message with RaidShield rules: "FREE NITRO GIVEAWAY! Claim your steam nitro gift here: http://dlscord.gift/nitro-drop @everyone @everyone"',
  },
  {
    title: '🔍 Real-time Python + web search',
    prompt:
      'Search the web for the latest Python version features and break it down with some funny commentary.',
  },
];

export const ChatView: React.FC<ChatViewProps> = ({
  messages,
  isGenerating,
  streamingChunk,
  progressStage,
  activePersona,
  settings,
  onSendMessage,
  onStopGeneration,
  onRegenerate,
  onOpenAttentionForMessage,
  onOpenCustomizer,
  onOpenKnowledge,
  onOpenApiIntegration,
  onToggleConversations,
}) => {
  const [inputText, setInputText] = useState('');
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [expandedThoughts, setExpandedThoughts] = useState<Record<string, boolean>>({});
  const [attachedImage, setAttachedImage] = useState<{
    dataUrl: string;
    name: string;
    size: string;
  } | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [previewModalImage, setPreviewModalImage] = useState<string | null>(null);
  const [waitEscalation, setWaitEscalation] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingChunk, isGenerating]);

  // Honest, elapsed-time-based reassurance while the single opaque server
  // round-trip is in flight (see generator.ts) — only shown before any
  // streamed content has arrived and after the real progressStage has settled.
  useEffect(() => {
    if (!isGenerating || streamingChunk) {
      setWaitEscalation(null);
      return;
    }
    const timers = [
      setTimeout(() => setWaitEscalation('Still working on it…'), 6000),
      setTimeout(
        () => setWaitEscalation('Taking a bit longer than usual — could be a busier moment.'),
        15000
      ),
      setTimeout(
        () => setWaitEscalation('Still here, still working — thanks for hanging in there.'),
        30000
      ),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isGenerating, streamingChunk]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        180,
        Math.max(48, textareaRef.current.scrollHeight)
      )}px`;
    }
  }, [inputText]);

  const MAX_IMAGE_BYTES = 15 * 1024 * 1024;

  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image (PNG, JPEG, WebP, GIF).');
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      alert(
        `Image is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Please use an image under 15 MB.`
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const sizeKb = (file.size / 1024).toFixed(1);
      setAttachedImage({
        dataUrl,
        name: file.name || 'image_attachment.png',
        size: `${sizeKb} KB`,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processImageFile(file);
    if (e.target) e.target.value = '';
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        const file = items[i].getAsFile();
        if (file) {
          e.preventDefault();
          processImageFile(file);
          return;
        }
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    // dragleave fires every time the pointer crosses onto a CHILD element too, not just when it
    // actually leaves the container — without this check the overlay flickered on/off while
    // dragging across message bubbles/avatars inside it. relatedTarget is the element the pointer
    // is entering; only actually clear the state once that's outside this container.
    if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDraggingOver(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) processImageFile(file);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if ((!inputText.trim() && !attachedImage) || isGenerating) return;
    const text = inputText;
    const img = attachedImage
      ? { dataUrl: attachedImage.dataUrl, name: attachedImage.name }
      : undefined;
    setInputText('');
    setAttachedImage(null);
    if (textareaRef.current) textareaRef.current.style.height = '48px';
    onSendMessage(text, img);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // isComposing is true while an IME (CJK input) candidate is still being composed — without
    // this check, pressing Enter to confirm/commit a candidate word prematurely sent the message
    // instead of just finishing composition.
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedMsgId(id);
        setTimeout(() => setCopiedMsgId(null), 2000);
      },
      () => alert('Could not copy to clipboard — your browser may have blocked clipboard access.')
    );
  };

  const toggleThought = (msgId: string) => {
    setExpandedThoughts((prev) => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  const inputTokenCount = countTokens(inputText);

  const Avatar = ({ isUser }: { isUser: boolean }) => (
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
        isUser
          ? 'bg-[var(--glass-panel-elevated-hover)] text-[var(--glass-text)]'
          : 'bg-[image:var(--glass-accent-gradient)] text-white'
      }`}
    >
      {isUser ? settings.userName?.[0]?.toUpperCase() || 'U' : <Sparkles className="h-4 w-4" />}
    </div>
  );

  return (
    <div
      className={`relative z-10 flex h-screen flex-1 flex-col overflow-hidden bg-[var(--glass-base)] ${
        isDraggingOver ? 'ring-4 ring-[var(--glass-accent-ring)]' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/*"
        className="hidden"
      />

      {/* Top bar */}
      <header className="glass-panel relative z-10 flex shrink-0 items-center gap-3 rounded-none border-x-0 border-t-0 px-4 py-3 sm:px-5">
        {onToggleConversations && (
          <button
            type="button"
            onClick={onToggleConversations}
            className="-ml-1 rounded-[var(--glass-r-sm)] p-1.5 text-[var(--glass-text-muted)] transition hover:bg-[var(--glass-panel-elevated)] hover:text-[var(--glass-text)] md:hidden"
            title="Conversations"
            aria-label="Toggle conversation list"
          >
            <PanelLeft className="h-4 w-4" />
          </button>
        )}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[image:var(--glass-accent-gradient)] text-white">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-bold text-[var(--glass-text)]">
            {activePersona.name}
          </div>
          <div className="truncate text-xs text-[var(--glass-text-faint)]">
            {activePersona.tagline}
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="glass-badge glass-badge-success">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--glass-success)]" />
            <span className="hidden sm:inline">Zero quota · local inference</span>
            <span className="sm:hidden">Live</span>
          </span>
        </div>
      </header>

      {/* Drag overlay */}
      {isDraggingOver && (
        <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center bg-[var(--glass-accent-soft)] backdrop-blur-md">
          <div className="glass-panel-elevated flex items-center gap-3 px-6 py-4 font-semibold text-[var(--glass-text)]">
            <ImageIcon className="h-6 w-6 text-[var(--glass-accent-hover)]" />
            <span>Drop image for Nexus Vision &amp; RaidShield scan</span>
          </div>
        </div>
      )}

      {/* Image zoom modal */}
      {previewModalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setPreviewModalImage(null)}
        >
          <div className="glass-panel-elevated relative max-h-[90vh] max-w-4xl overflow-hidden p-2">
            <button
              onClick={() => setPreviewModalImage(null)}
              className="absolute right-4 top-4 rounded-full bg-black/60 p-2 text-white backdrop-blur-md transition hover:bg-black/80"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={previewModalImage}
              alt="Expanded preview"
              className="max-h-[85vh] w-auto rounded-[var(--glass-r-lg)] object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}

      {/* Transcript — role="log" + aria-live so screen readers get told when a new message
          lands, instead of silently sitting on stale content. Deliberately "polite" (queued, not
          interrupting) and on the whole list rather than a per-message live region — the
          "streaming" effect here is a client-side typewriter replay of an already-complete
          response (see calculateTypingDuration elsewhere), not real token-by-token generation, so
          announcing per-chunk would just spam a screen reader with word fragments. */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 md:px-8" role="log" aria-live="polite" aria-busy={isGenerating}>
        <div className="mx-auto max-w-[var(--glass-content-max)] space-y-1">
          {messages.length === 0 && (
            <div className="glass-animate-in space-y-8 py-8 sm:py-12">
              <div className="space-y-3 text-center">
                <div className="mb-1 inline-flex h-14 w-14 items-center justify-center rounded-[var(--glass-r-lg)] bg-[image:var(--glass-accent-gradient)] text-white shadow-[var(--glass-shadow-glow)]">
                  <Sparkles className="h-7 w-7" />
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight text-[var(--glass-text)] sm:text-3xl">
                  {activePersona.name}
                </h1>
                <p className="mx-auto max-w-lg text-sm leading-relaxed text-[var(--glass-text-muted)]">
                  A standalone, custom-built AI engine running client-side with{' '}
                  <strong className="text-[var(--glass-text)]">zero quota limits</strong>. Dedicated
                  math, code, and formal-logic solvers, multi-head self-attention, live web
                  grounding, and real-time model customization.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  <span className="glass-badge glass-badge-success">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--glass-success)]" />
                    Infinite local inference
                  </span>
                  <span className="glass-badge capitalize">{settings.reasoningMode} reasoning</span>
                  <span className="glass-badge">{settings.attentionHeads} attention heads</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
                {SAMPLE_PROMPTS.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputText(sample.prompt);
                      textareaRef.current?.focus();
                    }}
                    className="glass-card glass-card-interactive group flex flex-col p-4 text-left"
                  >
                    <div className="mb-1 flex items-center justify-between text-xs font-bold text-[var(--glass-text)] transition group-hover:text-[var(--glass-accent-hover)]">
                      <span>{sample.title}</span>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[var(--glass-text-faint)] transition group-hover:translate-x-0.5 group-hover:text-[var(--glass-accent-hover)]" />
                    </div>
                    <p className="line-clamp-2 text-xs leading-relaxed text-[var(--glass-text-muted)]">
                      {sample.prompt}
                    </p>
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2">
                {onOpenApiIntegration && (
                  <button onClick={onOpenApiIntegration} className="glass-btn glass-btn-ghost">
                    <Code2 className="h-3.5 w-3.5" />
                    Bot API &amp; SDK
                  </button>
                )}
                <button onClick={onOpenCustomizer} className="glass-btn glass-btn-ghost">
                  <Sliders className="h-3.5 w-3.5" />
                  Customize persona
                </button>
                <button onClick={onOpenKnowledge} className="glass-btn glass-btn-ghost">
                  <Database className="h-3.5 w-3.5 text-[var(--glass-success)]" />
                  Teach custom knowledge
                </button>
              </div>
            </div>
          )}

          {messages.map((message) => {
            const isUser = message.role === 'user';
            const isExpanded = expandedThoughts[message.id];

            return (
              <div
                key={message.id}
                className={`group glass-card mb-3 flex items-start gap-3 !rounded-[var(--glass-r-lg)] px-3 py-3 transition ${
                  isUser
                    ? 'ml-auto max-w-[92%] !bg-[var(--glass-accent-soft)] sm:max-w-[85%]'
                    : 'mr-auto max-w-[92%] sm:max-w-[85%]'
                }`}
              >
                <Avatar isUser={isUser} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`text-sm font-semibold ${
                        isUser ? 'text-[var(--glass-text)]' : 'text-[var(--glass-accent-hover)]'
                      }`}
                    >
                      {isUser ? settings.userName || 'You' : activePersona.name}
                    </span>
                    <span className="text-[11px] text-[var(--glass-text-faint)]">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  {message.imageUrl && (
                    <div className="mb-1 mt-2">
                      <div className="group/img relative max-w-sm overflow-hidden rounded-[var(--glass-r-md)] border border-[var(--glass-border)] bg-black/40">
                        <img
                          src={message.imageUrl}
                          alt={message.imageName || 'Attached preview'}
                          className="max-h-64 w-full cursor-pointer object-cover transition hover:opacity-95"
                          onClick={() => setPreviewModalImage(message.imageUrl!)}
                          referrerPolicy="no-referrer"
                        />
                        <div className="pointer-events-none absolute right-2 top-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-[10px] font-mono text-white opacity-0 backdrop-blur-md transition group-hover/img:opacity-100">
                          <Eye className="h-3 w-3" />
                          <span>Click to zoom</span>
                        </div>
                        {message.imageName && (
                          <div className="truncate bg-black/80 px-3 py-1.5 text-[11px] font-mono text-[var(--glass-text-muted)]">
                            🖼️ {message.imageName}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {!isUser && message.thoughtProcess && message.thoughtProcess.length > 0 && (
                    <div className="my-1.5">
                      <button
                        onClick={() => toggleThought(message.id)}
                        className="inline-flex items-center gap-2 rounded-md bg-[var(--glass-panel-elevated)] px-2.5 py-1 text-xs font-medium text-[var(--glass-text-muted)] transition hover:bg-[var(--glass-panel-elevated-hover)]"
                        title="Toggle reasoning trace"
                        aria-label="Toggle reasoning trace"
                      >
                        <BrainCircuit className="h-3.5 w-3.5 text-[var(--glass-accent-hover)]" />
                        <span>
                          {isExpanded
                            ? 'Hide thinking process'
                            : `View thinking process (${message.thoughtProcess.length} steps)`}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="ml-0.5 h-3 w-3 text-[var(--glass-text-faint)]" />
                        ) : (
                          <ChevronDown className="ml-0.5 h-3 w-3 text-[var(--glass-text-faint)]" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="glass-fade-in mt-2 space-y-2.5 rounded-[var(--glass-r-md)] border border-[var(--glass-border)] bg-[var(--glass-panel-elevated)] p-3 text-xs text-[var(--glass-text-muted)]">
                          <div className="mb-1 flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--glass-accent)]" />
                            <span className="glass-eyebrow">Internal neural thought stream</span>
                          </div>
                          {message.thoughtProcess.map((step) => (
                            <div
                              key={step.id}
                              className="space-y-1 border-l-2 border-[var(--glass-accent)]/50 pl-2.5"
                            >
                              <div className="flex flex-wrap items-center gap-1.5 text-[12px] font-semibold text-[var(--glass-text)]">
                                <span className="rounded bg-[var(--glass-accent-soft)] px-1 py-px text-[9px] font-bold uppercase tracking-wide text-[var(--glass-accent-hover)]">
                                  {step.type}
                                </span>
                                <span>{step.title}</span>
                                {typeof step.durationMs === 'number' && (
                                  <span className="text-[10px] font-normal text-[var(--glass-text-faint)]">
                                    {step.durationMs >= 1000
                                      ? `${(step.durationMs / 1000).toFixed(2)}s`
                                      : `${step.durationMs}ms`}
                                  </span>
                                )}
                              </div>
                              <p className="whitespace-pre-wrap text-[11.5px] leading-relaxed text-[var(--glass-text-muted)]">
                                {step.description}
                              </p>
                              {step.data && Object.keys(step.data).length > 0 && (
                                <div className="mt-1 space-y-0.5 overflow-x-auto rounded-md border border-[var(--glass-border)] bg-[var(--glass-base)]/60 p-2 font-mono text-[10.5px] text-[var(--glass-text-faint)]">
                                  {Object.entries(step.data).map(([k, v]) => (
                                    <div key={k} className="flex gap-2">
                                      <span className="shrink-0 text-[var(--glass-accent-hover)]">
                                        {k}:
                                      </span>
                                      <span className="break-all text-[var(--glass-text-muted)]">
                                        {typeof v === 'object' ? JSON.stringify(v) : String(v)}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div
                    className={`markdown-content mt-0.5 ${
                      message.isError ? 'rounded-[var(--glass-r-md)] border border-[var(--glass-danger)]/30 bg-[var(--glass-danger)]/10 px-3 py-2 text-[var(--glass-danger)]' : ''
                    }`}
                  >
                    <ReactMarkdown
                      components={{
                        code({ className, children, ...props }) {
                          const isInline =
                            !className &&
                            typeof children === 'string' &&
                            !children.includes('\n');
                          if (isInline) {
                            return (
                              <code {...props}>{children}</code>
                            );
                          }
                          const codeString = String(children).replace(/\n$/, '');
                          return (
                            <div className="group/code my-3 overflow-hidden rounded-[var(--glass-r-md)] border border-[var(--glass-border)]">
                              <div className="flex items-center justify-between border-b border-[var(--glass-border)] bg-black/40 px-3.5 py-1.5 text-[11px] font-mono text-[var(--glass-text-faint)]">
                                <span>{className?.replace('language-', '') || 'code'}</span>
                                <button
                                  onClick={() =>
                                    copyToClipboard(codeString, `${message.id}-code`)
                                  }
                                  className="flex items-center gap-1 transition hover:text-white"
                                >
                                  {copiedMsgId === `${message.id}-code` ? (
                                    <>
                                      <Check className="h-3 w-3 text-[var(--glass-success)]" />
                                      <span className="text-[var(--glass-success)]">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="h-3 w-3" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>
                              <pre className="overflow-x-auto bg-black/30 p-4 font-mono text-xs text-[var(--glass-text)]">
                                <code>{children}</code>
                              </pre>
                            </div>
                          );
                        },
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>

                  {!isUser && message.webSources && message.webSources.length > 0 && (
                    <div className="mt-3 border-t border-[var(--glass-border-subtle)] pt-2.5">
                      <div className="mb-2 flex items-center gap-1.5">
                        <Globe className="h-3.5 w-3.5 text-[var(--glass-info)]" />
                        <span className="glass-eyebrow">
                          Live web grounding · {message.webSources.length}
                        </span>
                        <span className="glass-badge glass-badge-success text-[9px]">infinite quota</span>
                      </div>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {message.webSources.map((source, sIdx) => (
                          <a
                            key={sIdx}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/src flex flex-col justify-between rounded-[var(--glass-r-md)] border border-[var(--glass-border)] bg-[var(--glass-panel-elevated)] p-2.5 text-left transition hover:border-[var(--glass-info)]/50 hover:bg-[var(--glass-info-soft)]"
                          >
                            <div>
                              <div className="mb-1 flex items-start justify-between gap-1">
                                <span className="line-clamp-1 text-xs font-semibold text-[var(--glass-text)] transition group-hover/src:text-[var(--glass-info)]">
                                  {source.title}
                                </span>
                                <ExternalLink className="mt-0.5 h-3 w-3 shrink-0 text-[var(--glass-text-faint)] group-hover/src:text-[var(--glass-info)]" />
                              </div>
                              <p className="line-clamp-2 text-[11px] leading-tight text-[var(--glass-text-muted)]">
                                {source.snippet}
                              </p>
                            </div>
                            <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono text-[var(--glass-text-faint)]">
                              <span className="max-w-[150px] truncate">{source.domain}</span>
                              <span className="rounded bg-[var(--glass-panel-elevated-hover)] px-1 capitalize text-[var(--glass-text-muted)]">
                                {source.engine}
                              </span>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {!isUser && message.content.includes('*Keep exploring:*') && (
                    <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                      {message.content
                        .split('*Keep exploring:*')[1]
                        ?.split('\n')
                        .map((line) => line.replace(/^[•\-\s*]+/, '').replace(/[*_]/g, '').trim())
                        .filter((q) => q.length > 5 && q.endsWith('?'))
                        .map((q, idx) => (
                          <button
                            key={idx}
                            onClick={() => onSendMessage(q)}
                            disabled={isGenerating}
                            className="inline-flex items-center gap-1.5 rounded-[var(--glass-r-full)] border border-[var(--glass-accent)]/30 bg-[var(--glass-accent-soft)] px-3 py-1.5 text-xs font-medium text-[var(--glass-accent-hover)] transition hover:bg-[var(--glass-accent)]/25 disabled:opacity-50"
                          >
                            <Sparkles className="h-3 w-3" />
                            <span className="max-w-xs truncate">{q}</span>
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        ))}
                    </div>
                  )}

                  {!isUser && (
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[var(--glass-text-faint)] opacity-0 transition group-hover:opacity-100">
                      {message.telemetry && (
                        <div className="flex items-center gap-2 font-mono text-[11px]">
                          <span>{message.telemetry.tokensGenerated} tok</span>
                          <span>·</span>
                          <span>{message.telemetry.tokensPerSec} t/s</span>
                          <span>·</span>
                          <span>{message.telemetry.generationTimeMs}ms</span>
                        </div>
                      )}
                      <div className="ml-auto flex items-center gap-1">
                        <button
                          onClick={() => onOpenAttentionForMessage(message)}
                          className="rounded p-1 text-[var(--glass-text-faint)] transition hover:bg-[var(--glass-panel-elevated)] hover:text-[var(--glass-accent-hover)]"
                          title="Inspect attention matrix"
                          aria-label="Inspect attention matrix"
                        >
                          <BrainCircuit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => copyToClipboard(message.content, message.id)}
                          className="rounded p-1 text-[var(--glass-text-faint)] transition hover:bg-[var(--glass-panel-elevated)] hover:text-[var(--glass-text)]"
                          title="Copy message"
                          aria-label="Copy message"
                        >
                          {copiedMsgId === message.id ? (
                            <Check className="h-3.5 w-3.5 text-[var(--glass-success)]" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isGenerating && (
            <div className="glass-fade-in glass-card mb-3 mr-auto flex max-w-[92%] items-start gap-3 px-3 py-3 sm:max-w-[85%]">
              <Avatar isUser={false} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-[var(--glass-accent-hover)]">
                    {activePersona.name}
                  </span>
                  <span className="text-[11px] font-medium text-[var(--glass-success)]">
                    {streamingChunk
                      ? 'Reasoning & streaming…'
                      : progressStage || 'Thinking…'}
                  </span>
                </div>
                {streamingChunk ? (
                  <div className="markdown-content mt-0.5">
                    <ReactMarkdown>{streamingChunk}</ReactMarkdown>
                    <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-[var(--glass-accent)] align-middle" />
                  </div>
                ) : (
                  <div className="mt-2 space-y-1.5" aria-hidden="true">
                    <div className="glass-typing">
                      <span />
                      <span />
                      <span />
                    </div>
                    {waitEscalation && (
                      <p className="glass-fade-in text-xs text-[var(--glass-text-faint)]">
                        {waitEscalation}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Composer */}
      <div className="glass-panel relative z-10 shrink-0 rounded-none border-x-0 border-b-0 px-4 py-3 sm:px-6">
        <div className="mx-auto max-w-[var(--glass-content-max)] space-y-2">
          <div className="flex items-center justify-between px-1 text-xs text-[var(--glass-text-faint)]">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-semibold text-[var(--glass-text-muted)]">
                {activePersona.name}
              </span>
              <span className="glass-badge font-mono text-[10px]">temp {settings.temperature}</span>
              <span className="glass-badge font-mono text-[10px] capitalize">
                {settings.reasoningMode}
              </span>
              {settings.webSearchEnabled && (
                <span className="glass-badge glass-badge-info text-[10px]">
                  <Globe className="h-2.5 w-2.5" />
                  web {settings.webSearchMode || 'auto'}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px]">
              {inputTokenCount > 0 && <span>{inputTokenCount} tok</span>}
              {messages.length > 0 && !isGenerating && (
                <button
                  onClick={onRegenerate}
                  className="flex items-center gap-1 text-[var(--glass-text-muted)] transition hover:text-[var(--glass-text)]"
                  title="Regenerate last response"
                  aria-label="Regenerate last response"
                >
                  <RotateCw className="h-3 w-3" />
                  <span>Regenerate</span>
                </button>
              )}
            </div>
          </div>

          {attachedImage && (
            <div className="glass-fade-in flex items-center gap-3 rounded-[var(--glass-r-md)] border border-[var(--glass-accent)]/30 bg-[var(--glass-accent-soft)] p-2.5 text-xs text-[var(--glass-text)]">
              <img
                src={attachedImage.dataUrl}
                alt="Upload preview"
                className="h-12 w-12 rounded-[var(--glass-r-sm)] border border-[var(--glass-accent)]/40 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{attachedImage.name}</p>
                <p className="font-mono text-[11px] text-[var(--glass-accent-hover)]">
                  {attachedImage.size} · vision scanner ready
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAttachedImage(null)}
                className="rounded-[var(--glass-r-sm)] p-1 text-[var(--glass-text-faint)] transition hover:bg-white/5 hover:text-[var(--glass-danger)]"
                title="Remove attached image"
                aria-label="Remove attached image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="relative flex items-end gap-2">
            <div className="glass-input relative flex-1 overflow-hidden !p-0 transition focus-within:border-[var(--glass-accent)] focus-within:ring-2 focus-within:ring-[var(--glass-accent-soft)]">
              <textarea
                ref={textareaRef}
                rows={1}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                placeholder={`Message ${activePersona.name}…  (Enter to send · Shift+Enter for newline · paste or drop an image)`}
                // text-base (16px) below sm: iOS Safari force-zooms the page on focusing any
                // input/textarea with a computed font-size under 16px — text-sm here would zoom
                // in on every phone tap and never zoom back out on its own.
                className="max-h-44 w-full resize-none bg-transparent px-4 py-3 text-base text-[var(--glass-text)] placeholder:text-[var(--glass-text-faint)] focus:outline-none sm:text-sm"
              />
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="glass-btn glass-btn-secondary !h-12 !w-12 shrink-0 !rounded-[var(--glass-r-lg)] !p-0 hover:!text-[var(--glass-accent-hover)]"
              title="Upload image or screenshot"
              aria-label="Upload image or screenshot"
            >
              <ImageIcon className="h-4 w-4" />
            </button>

            {isGenerating ? (
              <button
                type="button"
                onClick={onStopGeneration}
                className="glass-btn glass-btn-danger !h-12 !w-12 shrink-0 !rounded-[var(--glass-r-lg)] !p-0"
                title="Stop generation"
                aria-label="Stop generation"
              >
                <Square className="h-4 w-4 fill-current" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!inputText.trim() && !attachedImage}
                className="glass-btn glass-btn-primary !h-12 !w-12 shrink-0 !rounded-[var(--glass-r-lg)] !p-0"
                title="Send message"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
