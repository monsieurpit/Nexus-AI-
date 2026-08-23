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
  Zap,
  Activity,
  Code2,
  Sliders,
  Database,
  ArrowRight,
  Image as ImageIcon,
  X,
  Paperclip,
  Eye,
  Globe,
  ExternalLink,
  Search,
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

  return (
    <div
      className={`flex-1 flex flex-col h-[calc(100vh-61px)] bg-stone-50 overflow-hidden relative ${
        isDraggingOver ? 'ring-4 ring-indigo-500/50 bg-indigo-50/20' : ''
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

      {/* Drag Overlay Banner */}
      {isDraggingOver && (
        <div className="absolute inset-0 z-50 bg-indigo-900/20 backdrop-blur-xs flex items-center justify-center pointer-events-none">
          <div className="bg-white px-6 py-4 rounded-2xl shadow-xl border border-indigo-200 text-indigo-900 font-semibold flex items-center gap-3 animate-bounce">
            <ImageIcon className="w-6 h-6 text-indigo-600" />
            <span>Drop image here for Nexus AI Vision & RaidShield Scan</span>
          </div>
        </div>
      )}

      {/* Image Zoom Modal */}
      {previewModalImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setPreviewModalImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-stone-900 rounded-2xl overflow-hidden shadow-2xl p-2">
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
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Empty State / Welcome Screen */}
          {messages.length === 0 && (
            <div className="py-8 sm:py-12 space-y-8 animate-in fade-in duration-300">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-stone-900 text-white shadow-md mb-2">
                  <Sparkles className="w-7 h-7 text-indigo-400" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  Welcome to {activePersona.name}
                </h1>
                <p className="text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
                  A standalone, custom-built AI engine running completely client-side with <strong>zero quota limits</strong>. Equipped with dedicated math, algorithmic code, formal logic solvers, multi-head self-attention, and real-time model customization.
                </p>
                <div className="flex items-center justify-center gap-2 pt-1 text-xs font-medium text-stone-500">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
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
                    className="p-4 rounded-xl border border-stone-200 bg-white hover:border-indigo-400 hover:shadow-md transition text-left flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-stone-900 text-xs flex items-center justify-between mb-1 group-hover:text-indigo-600 transition">
                        <span>{sample.title}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition" />
                      </div>
                      <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
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
                    className="px-3 py-1.5 rounded-lg bg-violet-50 hover:bg-violet-100 text-violet-800 border border-violet-200 text-xs font-semibold flex items-center gap-1.5 transition shadow-2xs"
                  >
                    <Code2 className="w-3.5 h-3.5 text-violet-600" />
                    <span>Bot API & JavaScript SDK</span>
                  </button>
                )}
                <button
                  onClick={onOpenCustomizer}
                  className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium flex items-center gap-1.5 transition"
                >
                  <Sliders className="w-3.5 h-3.5 text-stone-600" />
                  <span>Customize Persona & Sliders</span>
                </button>
                <button
                  onClick={onOpenKnowledge}
                  className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium flex items-center gap-1.5 transition"
                >
                  <Database className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Teach AI Custom Knowledge</span>
                </button>
              </div>
            </div>
          )}

          {/* Message List */}
          {messages.map((message) => {
            const isUser = message.role === 'user';
            const isExpanded = expandedThoughts[message.id];

            return (
              <div
                key={message.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}
              >
                {/* Role Header */}
                <div className="flex items-center gap-2 px-1 text-xs text-stone-400 font-medium">
                  {isUser ? (
                    <span>You</span>
                  ) : (
                    <div className="flex items-center gap-1.5 text-stone-700 font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{activePersona.name}</span>
                    </div>
                  )}
                  <span>•</span>
                  <span>
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                {/* Message Bubble */}
                <div
                  className={`w-full rounded-2xl p-5 text-sm transition ${
                    isUser
                      ? 'bg-stone-900 text-white max-w-2xl shadow-sm'
                      : 'bg-white border border-stone-200/90 text-stone-800 shadow-sm'
                  }`}
                >
                  {/* User Uploaded Image Preview */}
                  {message.imageUrl && (
                    <div className="mb-3.5">
                      <div className="relative group max-w-sm rounded-xl overflow-hidden border border-stone-700/50 bg-black/40">
                        <img
                          src={message.imageUrl}
                          alt={message.imageName || 'Attached preview'}
                          className="w-full max-h-64 object-cover cursor-pointer hover:opacity-95 transition"
                          onClick={() => setPreviewModalImage(message.imageUrl!)}
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition bg-black/60 backdrop-blur-xs px-2 py-1 rounded-md text-[10px] text-white font-mono pointer-events-none">
                          <Eye className="w-3 h-3" />
                          <span>Click to Zoom</span>
                        </div>
                        {message.imageName && (
                          <div className="px-3 py-1.5 bg-stone-950/80 text-[11px] font-mono text-stone-300 truncate">
                            🖼️ {message.imageName}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {/* Chain of Thought Collapsible for Assistant (Collapsed by default, expands on click) */}
                  {!isUser && message.thoughtProcess && message.thoughtProcess.length > 0 && (
                    <div className="mb-3.5 pb-2.5 border-b border-stone-100">
                      <button
                        onClick={() => toggleThought(message.id)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-100/90 hover:bg-stone-200/80 text-stone-700 text-xs font-medium transition cursor-pointer"
                        title="Click to toggle reasoning thoughts"
                      >
                        <BrainCircuit className="w-3.5 h-3.5 text-indigo-600" />
                        <span>
                          {isExpanded ? 'Hide thinking process' : `View thinking process (${message.thoughtProcess.length} steps)`}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-3 h-3 text-stone-500 ml-0.5" />
                        ) : (
                          <ChevronDown className="w-3 h-3 text-stone-500 ml-0.5" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="mt-3 space-y-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200/70 text-xs text-stone-600 animate-in fade-in duration-150">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 inline-block" />
                            Internal Neural Thought Stream
                          </div>
                          {message.thoughtProcess.map((step) => (
                            <div key={step.id} className="space-y-0.5 border-l-2 border-indigo-300 pl-2.5">
                              <div className="font-semibold text-stone-800 text-[12px] flex items-center gap-1.5">
                                <span>{step.title}</span>
                              </div>
                              <p className="text-[11.5px] text-stone-600 leading-relaxed">
                                {step.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Message Content Rendered */}
                  <div className="markdown-content text-sm text-stone-800">
                    <ReactMarkdown
                      components={{
                        code({ className, children, ...props }) {
                          const isInline = !className && typeof children === 'string' && !children.includes('\n');
                          if (isInline) {
                            return (
                              <code
                                className="px-1.5 py-0.5 rounded bg-stone-100 text-indigo-700 font-mono text-xs font-medium"
                                {...props}
                              >
                                {children}
                              </code>
                            );
                          }
                          const codeString = String(children).replace(/\n$/, '');
                          return (
                            <div className="relative group my-3 rounded-xl overflow-hidden border border-stone-800">
                              <div className="bg-stone-950 px-3.5 py-1.5 flex items-center justify-between text-[11px] font-mono text-stone-400 border-b border-stone-800">
                                <span>Code Block</span>
                                <button
                                  onClick={() => copyToClipboard(codeString, `${message.id}-code`)}
                                  className="flex items-center gap-1 text-stone-400 hover:text-white transition"
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
                              <pre className="p-4 bg-stone-900 text-stone-100 font-mono text-xs overflow-x-auto">
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
                    <div className="mt-3.5 pt-3 border-t border-stone-100/90">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">
                        <Globe className="w-3.5 h-3.5 text-blue-600" />
                        <span>Live Web Grounding Sources ({message.webSources.length})</span>
                        <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-mono lowercase">infinite quota</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {message.webSources.map((source, sIdx) => (
                          <a
                            key={sIdx}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-xl border border-stone-200/80 bg-stone-50/80 hover:bg-blue-50/50 hover:border-blue-300 transition text-left group flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-start justify-between gap-1 mb-1">
                                <span className="font-semibold text-stone-800 text-xs line-clamp-1 group-hover:text-blue-600 transition">
                                  {source.title}
                                </span>
                                <ExternalLink className="w-3 h-3 text-stone-400 group-hover:text-blue-600 shrink-0 mt-0.5" />
                              </div>
                              <p className="text-[11px] text-stone-500 line-clamp-2 leading-tight">
                                {source.snippet}
                              </p>
                            </div>
                            <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono text-stone-400">
                              <span className="truncate max-w-[150px]">{source.domain}</span>
                              <span className="capitalize px-1 rounded bg-stone-200/60 text-stone-600 text-[9px]">
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
                    <div className="mt-3 pt-2 flex flex-wrap gap-1.5 items-center">
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
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50/80 hover:bg-indigo-100/90 text-indigo-900 border border-indigo-200/70 text-xs font-medium transition cursor-pointer disabled:opacity-50"
                          >
                            <Sparkles className="w-3 h-3 text-indigo-600" />
                            <span className="truncate max-w-xs">{q}</span>
                            <ArrowRight className="w-3 h-3 text-indigo-500" />
                          </button>
                        ))}
                    </div>
                  )}

                  {/* Telemetry & Action Footer for Assistant */}
                  {!isUser && (
                    <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-400">
                      {message.telemetry && (
                        <div className="flex items-center gap-3 font-mono text-[11px]">
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
                          className="p-1 text-stone-400 hover:text-indigo-600 hover:bg-stone-50 rounded transition"
                          title="Inspect Attention Matrix for this response"
                        >
                          <BrainCircuit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => copyToClipboard(message.content, message.id)}
                          className="p-1 text-stone-400 hover:text-stone-800 hover:bg-stone-50 rounded transition"
                          title="Copy message"
                        >
                          {copiedMsgId === message.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
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
            <div className="flex flex-col items-start space-y-1.5 animate-in fade-in duration-100">
              <div className="flex items-center gap-2 px-1 text-xs text-stone-400 font-medium">
                <div className="flex items-center gap-1.5 text-indigo-700 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>{activePersona.name}</span>
                </div>
                <span>•</span>
                <span className="text-emerald-600 font-medium">Reasoning & Streaming...</span>
              </div>

              <div className="w-full rounded-2xl p-5 bg-white border border-stone-200 text-stone-800 shadow-sm">
                <div className="markdown-content text-sm text-stone-800">
                  <ReactMarkdown>{streamingChunk || 'Synthesizing neural reasoning paths...'}</ReactMarkdown>
                </div>
                <span className="inline-block w-2 h-4 bg-indigo-600 ml-1 animate-pulse" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Bar */}
      <div className="bg-white border-t border-stone-200 px-4 py-3 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-2">
          {/* Controls Bar Above Input */}
          <div className="flex items-center justify-between text-xs text-stone-500 px-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-stone-800">{activePersona.name}</span>
              <span className="px-2 py-0.5 rounded-full bg-stone-100 text-[10px] font-mono font-medium">
                Temp: {settings.temperature}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-stone-100 text-[10px] font-mono font-medium capitalize">
                {settings.reasoningMode}
              </span>
              {settings.webSearchEnabled && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-medium border border-blue-200">
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
                  className="flex items-center gap-1 text-stone-500 hover:text-stone-900 transition"
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
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 animate-in fade-in slide-in-from-bottom-2">
              <img
                src={attachedImage.dataUrl}
                alt="Upload preview"
                className="w-12 h-12 object-cover rounded-lg border border-indigo-300"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{attachedImage.name}</p>
                <p className="text-[11px] text-indigo-600 font-mono">
                  {attachedImage.size} • Vision Scanner Ready
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAttachedImage(null)}
                className="p-1 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-indigo-100 transition cursor-pointer"
                title="Remove attached image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Form & Textarea */}
          <form onSubmit={handleSubmit} className="relative flex items-end gap-2">
            <div className="relative flex-1 bg-stone-50 border border-stone-300 rounded-2xl focus-within:border-indigo-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100 transition overflow-hidden">
              <textarea
                ref={textareaRef}
                rows={1}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                placeholder={`Ask ${activePersona.name} or drop an image/screenshot (Enter to send, Shift+Enter for newline)...`}
                className="w-full resize-none bg-transparent px-4 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none max-h-40"
              />
            </div>

            {/* Attach Image Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="h-12 w-12 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-indigo-600 flex items-center justify-center shrink-0 transition border border-stone-200 cursor-pointer"
              title="Upload image or screenshot for vision scanning"
            >
              <ImageIcon className="w-4 h-4" />
            </button>

            {isGenerating ? (
              <button
                type="button"
                onClick={onStopGeneration}
                className="h-12 w-12 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-sm shrink-0 transition cursor-pointer"
                title="Stop generation"
              >
                <Square className="w-4 h-4 fill-current" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!inputText.trim() && !attachedImage}
                className="h-12 w-12 rounded-2xl bg-stone-900 hover:bg-stone-800 disabled:opacity-40 disabled:hover:bg-stone-900 text-white flex items-center justify-center shadow-sm shrink-0 transition cursor-pointer"
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
