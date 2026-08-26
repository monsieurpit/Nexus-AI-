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
} from 'lucide-react';
import { AISettings, ChatMessage, ModelPersona } from '../types';
import { countTokens } from '../ai-engine/tokenizer';

interface ChatViewProps {
  messages: ChatMessage[];
  isGenerating: boolean;
  streamingChunk: string;
  activePersona: ModelPersona;
  settings: AISettings;
  onSendMessage: (text: string, image?: { dataUrl: string; name: string }) => void;
  onStopGeneration: () => void;
  onRegenerate: () => void;
  onOpenAttentionForMessage: (msg: ChatMessage) => void;
  onOpenCustomizer: () => void;
  onOpenKnowledge: () => void;
  onOpenApiIntegration?: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  messages,
  isGenerating,
  streamingChunk,
  activePersona,
  settings,
  onSendMessage,
  onStopGeneration,
  onRegenerate,
  onOpenAttentionForMessage,
  onOpenCustomizer,
  onOpenKnowledge,
  onOpenApiIntegration,
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

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingChunk, isGenerating]);

  // Auto resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        160,
        Math.max(48, textareaRef.current.scrollHeight)
      )}px`;
    }
  }, [inputText]);

  // Image file handler
  const MAX_IMAGE_BYTES = 15 * 1024 * 1024; // base64 inflates ~4/3x; server caps the JSON body at 25MB total

  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image (PNG, JPEG, WebP, GIF).');
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      alert(`Image is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Please use an image under 15 MB.`);
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
    if (file) {
      processImageFile(file);
    }
    if (e.target) {
      e.target.value = '';
    }
  };

  // Clipboard paste support (screenshots / image data)
  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData?.items;
    if (items) {
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
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processImageFile(file);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if ((!inputText.trim() && !attachedImage) || isGenerating) return;
    const text = inputText;
    const img = attachedImage ? { dataUrl: attachedImage.dataUrl, name: attachedImage.name } : undefined;

    setInputText('');
    setAttachedImage(null);
    if (textareaRef.current) {
      textareaRef.current.style.height = '48px';
    }
    onSendMessage(text, img);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
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
      () => {
        alert('Could not copy to clipboard — your browser may have blocked clipboard access.');
      }
    );
  };

  const toggleThought = (msgId: string) => {
    setExpandedThoughts((prev) => ({
      ...prev,
      [msgId]: !prev[msgId],
    }));
  };

  const inputTokenCount = countTokens(inputText);

  const samplePrompts = [
    {
      title: '🌐 Live Web Search & Swearing (Infinite Quota)',
      prompt: 'Who won the 2024 UEFA Champions League, and what the hell happened in the final match?',
    },
    {
      title: '🤖 Nexus Discord Homie (Accurate & Swearing)',
      prompt: 'Yo Nexus, how do I center a div in CSS and make sure my bot does not get rate limited on Discord?',
    },
    {
      title: '💀 Casseurt Question (Fuck no! Roast)',
      prompt: 'Hey Nexus, do you like Casseurt? What do you think about him?',
    },
    {
      title: '🌟 Super Chill Homie (User ID 1394001641899954368)',
      prompt: 'Yo Nexus, it is user 1394001641899954368, what is good bro? How is my favorite bot doing today?',
    },
    {
      title: '🛡️ RaidShield AI (21 Hard Rules JSON)',
      prompt: 'Classify this message with RaidShield rules: "FREE NITRO GIVEAWAY! Claim your steam nitro gift here: http://dlscord.gift/nitro-drop @everyone @everyone"',
    },
    {
      title: '🔍 Real-Time Python & Web Search Test',
      prompt: 'Search the web for the latest Python version features and break it down with some funny commentary.',
    },
  ];

  const AVATAR = (isUser: boolean) => (
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
        isUser
          ? 'bg-[var(--nx-elevated-hover)] text-[var(--nx-text)]'
          : 'bg-gradient-to-br from-[var(--nx-accent)] to-indigo-700 text-white'
      }`}
    >
      {isUser ? (settings.userName?.[0]?.toUpperCase() || 'U') : <Sparkles className="w-4 h-4" />}
    </div>
  );

  return (
    <div
      className={`flex-1 flex flex-col h-screen bg-[var(--nx-surface)] overflow-hidden relative ${
        isDraggingOver ? 'ring-4 ring-[var(--nx-accent)]/40' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/*"
        className="hidden"
      />

      {/* Channel-style top bar */}
      <div className="shrink-0 flex items-center gap-3 px-5 py-3 border-b border-[var(--nx-border-subtle)] bg-[var(--nx-surface)]/95 backdrop-blur">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--nx-accent)] to-indigo-700 text-white flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <div className="font-bold text-sm text-[var(--nx-text)] truncate">{activePersona.name}</div>
          <div className="text-xs text-[var(--nx-text-faint)] truncate">{activePersona.tagline}</div>
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">Zero Quota • Local Inference</span>
        </div>
      </div>

      {/* Drag Overlay Banner */}
      {isDraggingOver && (
        <div className="absolute inset-0 z-50 bg-[var(--nx-accent)]/10 backdrop-blur-xs flex items-center justify-center pointer-events-none">
          <div className="bg-[var(--nx-elevated)] px-6 py-4 rounded-2xl shadow-xl border border-[var(--nx-accent)]/40 text-[var(--nx-text)] font-semibold flex items-center gap-3 animate-bounce">
            <ImageIcon className="w-6 h-6 text-[var(--nx-accent-hover)]" />
            <span>Drop image here for Nexus AI Vision & RaidShield Scan</span>
          </div>
        </div>
      )}

      {/* Image Zoom Modal */}
      {previewModalImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setPreviewModalImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-[var(--nx-surface)] rounded-2xl overflow-hidden shadow-2xl p-2">
            <button
              onClick={() => setPreviewModalImage(null)}
              className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black text-white rounded-full transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={previewModalImage}
              alt="Expanded preview"
              className="max-h-[85vh] w-auto object-contain rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 md:px-8">
        <div className="max-w-3xl mx-auto space-y-1">
          {/* Empty State / Welcome Screen */}
          {messages.length === 0 && (
            <div className="py-8 sm:py-12 space-y-8 animate-in fade-in duration-300">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--nx-accent)] to-indigo-700 text-white shadow-md mb-2">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--nx-text)] tracking-tight">
                  Welcome to {activePersona.name}
                </h1>
                <p className="text-sm text-[var(--nx-text-muted)] max-w-lg mx-auto leading-relaxed">
                  A standalone, custom-built AI engine running completely client-side with <strong className="text-[var(--nx-text)]">zero quota limits</strong>. Equipped with dedicated math, algorithmic code, formal logic solvers, multi-head self-attention, and real-time model customization.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs font-medium text-[var(--nx-text-faint)]">
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    Zero Quota Limits • Infinite Local Inference
                  </span>
                  <span>•</span>
                  <span>{settings.reasoningMode} reasoning</span>
                  <span>•</span>
                  <span>{settings.attentionHeads} Attention Heads</span>
                </div>
              </div>

              {/* Sample Prompt Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {samplePrompts.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputText(sample.prompt);
                      textareaRef.current?.focus();
                    }}
                    className="p-4 rounded-xl border border-[var(--nx-border)] bg-[var(--nx-elevated)] hover:border-[var(--nx-accent)] hover:bg-[var(--nx-elevated-hover)] transition text-left flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-[var(--nx-text)] text-xs flex items-center justify-between mb-1 group-hover:text-[var(--nx-accent-hover)] transition">
                        <span>{sample.title}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[var(--nx-text-faint)] group-hover:text-[var(--nx-accent-hover)] group-hover:translate-x-0.5 transition" />
                      </div>
                      <p className="text-xs text-[var(--nx-text-muted)] line-clamp-2 leading-relaxed">
                        {sample.prompt}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Quick Actions Footer */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {onOpenApiIntegration && (
                  <button
                    onClick={onOpenApiIntegration}
                    className="px-3 py-1.5 rounded-lg bg-[var(--nx-accent-soft)] hover:bg-[var(--nx-accent)]/25 text-[var(--nx-accent-hover)] border border-[var(--nx-accent)]/30 text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Bot API & JavaScript SDK</span>
                  </button>
                )}
                <button
                  onClick={onOpenCustomizer}
                  className="px-3 py-1.5 rounded-lg bg-[var(--nx-elevated)] hover:bg-[var(--nx-elevated-hover)] text-[var(--nx-text-muted)] text-xs font-medium flex items-center gap-1.5 transition border border-[var(--nx-border)]"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Customize Persona & Sliders</span>
                </button>
                <button
                  onClick={onOpenKnowledge}
                  className="px-3 py-1.5 rounded-lg bg-[var(--nx-elevated)] hover:bg-[var(--nx-elevated-hover)] text-[var(--nx-text-muted)] text-xs font-medium flex items-center gap-1.5 transition border border-[var(--nx-border)]"
                >
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Teach AI Custom Knowledge</span>
                </button>
              </div>
            </div>
          )}

          {/* Message List — Discord-flat row style: avatar + name/time header, full-width content below */}
          {messages.map((message) => {
            const isUser = message.role === 'user';
            const isExpanded = expandedThoughts[message.id];

            return (
              <div
                key={message.id}
                className="group flex items-start gap-3 px-2 py-2 rounded-lg hover:bg-white/[0.02] transition"
              >
                {AVATAR(isUser)}
                <div className="min-w-0 flex-1">
                  {/* Role Header */}
                  <div className="flex items-baseline gap-2">
                    <span className={`text-sm font-semibold ${isUser ? 'text-[var(--nx-text)]' : 'text-[var(--nx-accent-hover)]'}`}>
                      {isUser ? (settings.userName || 'You') : activePersona.name}
                    </span>
                    <span className="text-[11px] text-[var(--nx-text-faint)]">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  {/* User Uploaded Image Preview */}
                  {message.imageUrl && (
                    <div className="mt-2 mb-1">
                      <div className="relative group/img max-w-sm rounded-xl overflow-hidden border border-[var(--nx-border)] bg-black/40">
                        <img
                          src={message.imageUrl}
                          alt={message.imageName || 'Attached preview'}
                          className="w-full max-h-64 object-cover cursor-pointer hover:opacity-95 transition"
                          onClick={() => setPreviewModalImage(message.imageUrl!)}
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover/img:opacity-100 transition bg-black/60 backdrop-blur-xs px-2 py-1 rounded-md text-[10px] text-white font-mono pointer-events-none">
                          <Eye className="w-3 h-3" />
                          <span>Click to Zoom</span>
                        </div>
                        {message.imageName && (
                          <div className="px-3 py-1.5 bg-black/80 text-[11px] font-mono text-[var(--nx-text-muted)] truncate">
                            🖼️ {message.imageName}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Chain of Thought Collapsible for Assistant (Collapsed by default, expands on click) */}
                  {!isUser && message.thoughtProcess && message.thoughtProcess.length > 0 && (
                    <div className="mt-1.5 mb-1.5">
                      <button
                        onClick={() => toggleThought(message.id)}
                        className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[var(--nx-elevated)] hover:bg-[var(--nx-elevated-hover)] text-[var(--nx-text-muted)] text-xs font-medium transition cursor-pointer"
                        title="Click to toggle reasoning thoughts"
                      >
                        <BrainCircuit className="w-3.5 h-3.5 text-[var(--nx-accent-hover)]" />
                        <span>
                          {isExpanded ? 'Hide thinking process' : `View thinking process (${message.thoughtProcess.length} steps)`}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-3 h-3 text-[var(--nx-text-faint)] ml-0.5" />
                        ) : (
                          <ChevronDown className="w-3 h-3 text-[var(--nx-text-faint)] ml-0.5" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="mt-2 space-y-2.5 p-3 rounded-xl bg-[var(--nx-elevated)] border border-[var(--nx-border)] text-xs text-[var(--nx-text-muted)] animate-in fade-in duration-150">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--nx-text-faint)] mb-1 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--nx-accent)] inline-block" />
                            Internal Neural Thought Stream
                          </div>
                          {message.thoughtProcess.map((step) => (
                            <div key={step.id} className="space-y-0.5 border-l-2 border-[var(--nx-accent)]/50 pl-2.5">
                              <div className="font-semibold text-[var(--nx-text)] text-[12px] flex items-center gap-1.5">
                                <span>{step.title}</span>
                              </div>
                              <p className="text-[11.5px] text-[var(--nx-text-muted)] leading-relaxed">
                                {step.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Message Content Rendered */}
                  <div className="markdown-content text-sm text-[var(--nx-text)]/90 mt-0.5">
                    <ReactMarkdown
                      components={{
                        code({ className, children, ...props }) {
                          const isInline = !className && typeof children === 'string' && !children.includes('\n');
                          if (isInline) {
                            return (
                              <code
                                className="px-1.5 py-0.5 rounded bg-[var(--nx-elevated)] text-[var(--nx-accent-hover)] font-mono text-xs font-medium"
                                {...props}
                              >
                                {children}
                              </code>
                            );
                          }
                          const codeString = String(children).replace(/\n$/, '');
                          return (
                            <div className="relative group/code my-3 rounded-xl overflow-hidden border border-[var(--nx-border)]">
                              <div className="bg-black/40 px-3.5 py-1.5 flex items-center justify-between text-[11px] font-mono text-[var(--nx-text-faint)] border-b border-[var(--nx-border)]">
                                <span>Code Block</span>
                                <button
                                  onClick={() => copyToClipboard(codeString, `${message.id}-code`)}
                                  className="flex items-center gap-1 text-[var(--nx-text-faint)] hover:text-white transition"
                                >
                                  {copiedMsgId === `${message.id}-code` ? (
                                    <>
                                      <Check className="w-3 h-3 text-emerald-400" />
                                      <span className="text-emerald-400">Copied!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>
                              <pre className="p-4 bg-black/30 text-[var(--nx-text)] font-mono text-xs overflow-x-auto">
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

                  {/* Grounded Web Sources Citation Pills */}
                  {!isUser && message.webSources && message.webSources.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-[var(--nx-border-subtle)]">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--nx-text-faint)] uppercase tracking-wider mb-2">
                        <Globe className="w-3.5 h-3.5 text-blue-400" />
                        <span>Live Web Grounding Sources ({message.webSources.length})</span>
                        <span className="px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-400 text-[9px] font-mono lowercase">infinite quota</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {message.webSources.map((source, sIdx) => (
                          <a
                            key={sIdx}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-xl border border-[var(--nx-border)] bg-[var(--nx-elevated)] hover:bg-blue-500/10 hover:border-blue-400/50 transition text-left group/src flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-start justify-between gap-1 mb-1">
                                <span className="font-semibold text-[var(--nx-text)] text-xs line-clamp-1 group-hover/src:text-blue-400 transition">
                                  {source.title}
                                </span>
                                <ExternalLink className="w-3 h-3 text-[var(--nx-text-faint)] group-hover/src:text-blue-400 shrink-0 mt-0.5" />
                              </div>
                              <p className="text-[11px] text-[var(--nx-text-muted)] line-clamp-2 leading-tight">
                                {source.snippet}
                              </p>
                            </div>
                            <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono text-[var(--nx-text-faint)]">
                              <span className="truncate max-w-[150px]">{source.domain}</span>
                              <span className="capitalize px-1 rounded bg-[var(--nx-elevated-hover)] text-[var(--nx-text-muted)] text-[9px]">
                                {source.engine}
                              </span>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interactive Quick-Reply Suggestion Pills */}
                  {!isUser && message.content.includes('*Keep exploring:*') && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5 items-center">
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
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--nx-accent-soft)] hover:bg-[var(--nx-accent)]/25 text-[var(--nx-accent-hover)] border border-[var(--nx-accent)]/30 text-xs font-medium transition cursor-pointer disabled:opacity-50"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span className="truncate max-w-xs">{q}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ))}
                    </div>
                  )}

                  {/* Telemetry & Action Footer for Assistant */}
                  {!isUser && (
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[var(--nx-text-faint)] opacity-0 group-hover:opacity-100 transition">
                      {message.telemetry && (
                        <div className="flex items-center gap-2 font-mono text-[11px]">
                          <span>{message.telemetry.tokensGenerated} tokens</span>
                          <span>•</span>
                          <span>{message.telemetry.tokensPerSec} t/s</span>
                          <span>•</span>
                          <span>{message.telemetry.generationTimeMs}ms</span>
                        </div>
                      )}

                      <div className="flex items-center gap-1 ml-auto">
                        <button
                          onClick={() => onOpenAttentionForMessage(message)}
                          className="p-1 text-[var(--nx-text-faint)] hover:text-[var(--nx-accent-hover)] hover:bg-[var(--nx-elevated)] rounded transition"
                          title="Inspect Attention Matrix for this response"
                        >
                          <BrainCircuit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => copyToClipboard(message.content, message.id)}
                          className="p-1 text-[var(--nx-text-faint)] hover:text-[var(--nx-text)] hover:bg-[var(--nx-elevated)] rounded transition"
                          title="Copy message"
                        >
                          {copiedMsgId === message.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Streaming Ongoing Assistant Message */}
          {isGenerating && (
            <div className="flex items-start gap-3 px-2 py-2 animate-in fade-in duration-100">
              {AVATAR(false)}
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-[var(--nx-accent-hover)]">{activePersona.name}</span>
                  <span className="text-[11px] text-emerald-400 font-medium">Reasoning & Streaming...</span>
                </div>
                <div className="markdown-content text-sm text-[var(--nx-text)]/90 mt-0.5">
                  <ReactMarkdown>{streamingChunk || 'Synthesizing neural reasoning paths...'}</ReactMarkdown>
                </div>
                <span className="inline-block w-2 h-4 bg-[var(--nx-accent)] ml-0.5 animate-pulse" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Bar */}
      <div className="shrink-0 bg-[var(--nx-surface)] px-4 py-3 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-2">
          {/* Controls Bar Above Input */}
          <div className="flex items-center justify-between text-xs text-[var(--nx-text-faint)] px-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-[var(--nx-text-muted)]">{activePersona.name}</span>
              <span className="px-2 py-0.5 rounded-full bg-[var(--nx-elevated)] text-[10px] font-mono font-medium">
                Temp: {settings.temperature}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[var(--nx-elevated)] text-[10px] font-mono font-medium capitalize">
                {settings.reasoningMode}
              </span>
              {settings.webSearchEnabled && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-medium border border-blue-500/30">
                  <Globe className="w-2.5 h-2.5" />
                  <span>Web Search: {settings.webSearchMode || 'auto'}</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono">
              {inputTokenCount > 0 && <span>{inputTokenCount} tokens</span>}
              {messages.length > 0 && !isGenerating && (
                <button
                  onClick={onRegenerate}
                  className="flex items-center gap-1 text-[var(--nx-text-muted)] hover:text-[var(--nx-text)] transition"
                  title="Regenerate last response"
                >
                  <RotateCw className="w-3 h-3" />
                  <span>Regenerate</span>
                </button>
              )}
            </div>
          </div>

          {/* Attached Image Thumbnail Preview Card */}
          {attachedImage && (
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[var(--nx-accent-soft)] border border-[var(--nx-accent)]/30 text-xs text-[var(--nx-text)] animate-in fade-in slide-in-from-bottom-2">
              <img
                src={attachedImage.dataUrl}
                alt="Upload preview"
                className="w-12 h-12 object-cover rounded-lg border border-[var(--nx-accent)]/40"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{attachedImage.name}</p>
                <p className="text-[11px] text-[var(--nx-accent-hover)] font-mono">
                  {attachedImage.size} • Vision Scanner Ready
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAttachedImage(null)}
                className="p-1 text-[var(--nx-text-faint)] hover:text-rose-400 rounded-lg hover:bg-white/5 transition cursor-pointer"
                title="Remove attached image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Form & Textarea */}
          <form onSubmit={handleSubmit} className="relative flex items-end gap-2">
            <div className="relative flex-1 bg-[var(--nx-elevated)] border border-[var(--nx-border)] rounded-2xl focus-within:border-[var(--nx-accent)] focus-within:ring-2 focus-within:ring-[var(--nx-accent)]/20 transition overflow-hidden">
              <textarea
                ref={textareaRef}
                rows={1}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                placeholder={`Message ${activePersona.name} or drop an image/screenshot (Enter to send, Shift+Enter for newline)...`}
                className="w-full resize-none bg-transparent px-4 py-3 text-sm text-[var(--nx-text)] placeholder:text-[var(--nx-text-faint)] focus:outline-none max-h-40"
              />
            </div>

            {/* Attach Image Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="h-12 w-12 rounded-2xl bg-[var(--nx-elevated)] hover:bg-[var(--nx-elevated-hover)] text-[var(--nx-text-muted)] hover:text-[var(--nx-accent-hover)] flex items-center justify-center shrink-0 transition border border-[var(--nx-border)] cursor-pointer"
              title="Upload image or screenshot for vision scanning"
            >
              <ImageIcon className="w-4 h-4" />
            </button>

            {isGenerating ? (
              <button
                type="button"
                onClick={onStopGeneration}
                className="h-12 w-12 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-sm shrink-0 transition cursor-pointer"
                title="Stop generation"
              >
                <Square className="w-4 h-4 fill-current" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!inputText.trim() && !attachedImage}
                className="h-12 w-12 rounded-2xl bg-[var(--nx-accent)] hover:bg-[var(--nx-accent-hover)] disabled:opacity-30 disabled:hover:bg-[var(--nx-accent)] text-white flex items-center justify-center shadow-sm shrink-0 transition cursor-pointer"
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
