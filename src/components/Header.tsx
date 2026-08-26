import React from 'react';
import {
  Sparkles,
  Sliders,
  BrainCircuit,
  Database,
  Trash2,
  Download,
  Flame,
  Search,
  Code2,
  Palette,
  GraduationCap,
  ChevronDown,
  ShieldAlert,
  ShieldCheck,
  Bot,
  Zap,
  Smile,
} from 'lucide-react';
import { AISettings, ModelPersona, ModelPersonaId } from '../types';
import { DEFAULT_PERSONAS } from '../ai-engine/memoryStore';

interface HeaderProps {
  settings: AISettings;
  activePersona: ModelPersona;
  onSelectPersona: (id: ModelPersonaId) => void;
  onOpenCustomizer: () => void;
  onOpenKnowledge: () => void;
  onOpenAttention: () => void;
  onOpenApiIntegration: () => void;
  onClearChat: () => void;
  onExportChat: () => void;
  messageCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  activePersona,
  onSelectPersona,
  onOpenCustomizer,
  onOpenKnowledge,
  onOpenAttention,
  onOpenApiIntegration,
  onClearChat,
  onExportChat,
  messageCount,
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const personaMenuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!dropdownOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && !personaMenuRef.current?.contains(target)) {
        setDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
        document.getElementById('persona-dropdown-trigger')?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dropdownOpen]);

  const getPersonaIcon = (id: ModelPersonaId) => {
    switch (id) {
      case 'nexus-homie':
        return <Bot className="w-4 h-4 text-violet-600" />;
      case 'deep-researcher':
        return <Search className="w-4 h-4 text-emerald-600" />;
      case 'creative-synthesizer':
        return <Palette className="w-4 h-4 text-purple-600" />;
      case 'code-architect':
        return <Code2 className="w-4 h-4 text-blue-600" />;
      case 'socratic-mentor':
        return <GraduationCap className="w-4 h-4 text-amber-600" />;
      case 'raidshield-ai':
        return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
      case 'discord-sentinel':
        return <ShieldAlert className="w-4 h-4 text-indigo-600" />;
      case 'roast-master':
        return <Flame className="w-4 h-4 text-amber-600" />;
      case 'crashout-bot':
        return <Zap className="w-4 h-4 text-rose-600" />;
      case 'chill-mod':
        return <Smile className="w-4 h-4 text-emerald-600" />;
      case 'custom':
        return <Sliders className="w-4 h-4 text-rose-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-indigo-600" />;
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-stone-200 px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand & Active Persona Selector */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-stone-900 text-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-900 text-base tracking-tight">
                  Nexus AI
                </span>
                <span className="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Zero Quota Limits
                </span>
              </div>
              <p className="text-xs text-stone-500 hidden sm:block">
                100% Client-Side Intelligence • DeepMind-inspired architecture
              </p>
            </div>
          </div>

          {/* Quick Persona Dropdown */}
          <div ref={personaMenuRef} className="relative">
            <button
              id="persona-dropdown-trigger"
              type="button"
              aria-haspopup="menu"
              aria-expanded={dropdownOpen}
              aria-controls="persona-menu"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800 text-xs font-medium transition"
            >
              {getPersonaIcon(activePersona.id)}
              <span className="max-w-[120px] truncate">{activePersona.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
            </button>

            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setDropdownOpen(false)}
                />
                <div
                  id="persona-menu"
                  role="menu"
                  aria-label="AI personas"
                  className="absolute right-0 sm:left-0 sm:right-auto mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
                >
                  <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                    Select AI Persona
                  </div>
                  {Object.values(DEFAULT_PERSONAS).map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        onSelectPersona(p.id);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2.5 transition ${
                        settings.activePersonaId === p.id
                          ? 'bg-indigo-50 text-indigo-900 font-medium'
                          : 'hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      {getPersonaIcon(p.id)}
                      <div className="truncate">
                        <div className="font-semibold text-stone-900">{p.name}</div>
                        <div className="text-[11px] text-stone-500 truncate">{p.tagline}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Studio Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto justify-end overflow-x-auto pb-1 sm:pb-0">
          <button
            id="open-api-btn"
            onClick={onOpenApiIntegration}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg text-violet-700 bg-violet-50 hover:bg-violet-100 border border-violet-200 transition shadow-2xs"
            title="Generate API Keys, Copy JavaScript Discord Bot & SDK Code"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Bot API & SDK</span>
          </button>

          <button
            id="open-customizer-btn"
            onClick={onOpenCustomizer}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200/80 transition"
            title="Configure Neural Parameters, Temperature & Persona Sliders"
          >
            <Sliders className="w-3.5 h-3.5 text-stone-600" />
            <span>Customize AI</span>
          </button>

          <button
            id="open-knowledge-btn"
            onClick={onOpenKnowledge}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200/80 transition"
            title="Teach the AI facts, custom rules, and documents"
          >
            <Database className="w-3.5 h-3.5 text-emerald-600" />
            <span>Knowledge Graph</span>
          </button>

          <button
            id="open-attention-btn"
            onClick={onOpenAttention}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200/80 transition"
            title="Inspect Attention Matrix, Latent Embeddings & Token Diagnostics"
          >
            <BrainCircuit className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden md:inline">Neural Map</span>
          </button>

          {messageCount > 0 && (
            <>
              <div className="h-4 w-px bg-stone-200 mx-1 hidden sm:block" />
              <button
                id="export-chat-btn"
                onClick={onExportChat}
                className="p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition"
                title="Export Conversation (JSON/Markdown)"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                id="clear-chat-btn"
                onClick={onClearChat}
                className="p-2 text-stone-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                title="Clear conversation"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
