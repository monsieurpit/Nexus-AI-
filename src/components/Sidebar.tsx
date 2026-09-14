import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Sparkles,
  Sliders,
  BrainCircuit,
  Database,
  Flame,
  Search,
  Code2,
  Palette,
  GraduationCap,
  ShieldAlert,
  ShieldCheck,
  Bot,
  Zap,
  Smile,
  MessageSquare,
  GitBranch,
} from 'lucide-react';
import { AISettings, ModelPersona, ModelPersonaId } from '../types';
import { DEFAULT_PERSONAS } from '../ai-engine/memoryStore';

export type AppView = 'chat' | 'code';

interface SidebarProps {
  settings: AISettings;
  activePersona: ModelPersona;
  view: AppView;
  onSelectView: (view: AppView) => void;
  onSelectPersona: (id: ModelPersonaId) => void;
  onOpenCustomizer: () => void;
  onOpenKnowledge: () => void;
  onOpenAttention: () => void;
  onOpenApiIntegration: () => void;
}

function getPersonaIcon(id: ModelPersonaId): React.ReactNode {
  switch (id) {
    case 'nexus-homie':
      return <Bot className="w-5 h-5" />;
    case 'deep-researcher':
      return <Search className="w-5 h-5" />;
    case 'creative-synthesizer':
      return <Palette className="w-5 h-5" />;
    case 'code-architect':
      return <Code2 className="w-5 h-5" />;
    case 'socratic-mentor':
      return <GraduationCap className="w-5 h-5" />;
    case 'raidshield-ai':
      return <ShieldCheck className="w-5 h-5" />;
    case 'discord-sentinel':
      return <ShieldAlert className="w-5 h-5" />;
    case 'roast-master':
      return <Flame className="w-5 h-5" />;
    case 'crashout-bot':
      return <Zap className="w-5 h-5" />;
    case 'chill-mod':
      return <Smile className="w-5 h-5" />;
    case 'custom':
      return <Sliders className="w-5 h-5" />;
    default:
      return <Sparkles className="w-5 h-5" />;
  }
}

interface RailButtonProps {
  active?: boolean;
  onClick: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: 'persona' | 'tool';
}

const RailButton: React.FC<RailButtonProps> = ({
  active,
  onClick,
  title,
  subtitle,
  children,
  variant = 'persona',
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  // Was a CSS-only `absolute` tooltip living inside the persona rail's `overflow-y-auto` scroll
  // container. An element with overflow-y set clips overflow-x too (browsers compute the other
  // axis as `auto` the moment one axis isn't `visible`), so the tooltip — positioned to the RIGHT
  // of the button, past the rail's own width — got clipped by that container, and its layout box
  // silently grew the container's scrollable area, which is exactly the stray horizontal
  // scrollbar Patrick kept seeing. Rendering it through a portal straight into <body>, positioned
  // from the button's actual screen coordinates, escapes that scroll container entirely.
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number } | null>(null);

  const showTooltip = () => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (rect) setTooltipPos({ top: rect.top + rect.height / 2, left: rect.right + 12 });
  };
  const hideTooltip = () => setTooltipPos(null);

  return (
    <div className="relative flex items-center justify-center group w-full">
      {/* Active / hover indicator pill, Discord-server-list style */}
      <span
        className={`absolute left-0 rounded-r-full bg-[var(--glass-text)] transition-all duration-150 ${
          active ? 'h-7 w-[3px]' : 'h-2 w-[3px] opacity-0 group-hover:opacity-100 group-hover:h-4'
        }`}
      />
      <button
        ref={btnRef}
        type="button"
        onClick={onClick}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        aria-label={title}
        aria-pressed={active}
        className={`w-11 h-11 flex items-center justify-center cursor-pointer transition-all duration-150 ${
          active
            ? 'rounded-[14px] bg-[image:var(--glass-accent-gradient)] text-[var(--glass-on-accent)] shadow-[var(--glass-shadow-glow)]'
            : variant === 'tool'
            ? 'rounded-[18px] hover:rounded-[14px] bg-transparent text-[var(--glass-text-faint)] hover:bg-[var(--glass-panel-elevated)] hover:text-[var(--glass-text)]'
            : 'rounded-[18px] hover:rounded-[14px] bg-[var(--glass-panel-elevated)] text-[var(--glass-text-muted)] hover:bg-[image:var(--glass-accent-gradient)] hover:text-[var(--glass-on-accent)]'
        }`}
      >
        {children}
      </button>

      {tooltipPos &&
        createPortal(
          <div
            className="glass-panel-elevated pointer-events-none fixed z-[100] -translate-y-1/2 px-3 py-2"
            style={{ top: tooltipPos.top, left: tooltipPos.left }}
          >
            <div className="whitespace-nowrap text-xs font-semibold text-[var(--glass-text)]">{title}</div>
            {subtitle && (
              <div className="mt-0.5 max-w-[200px] whitespace-normal text-[11px] leading-snug text-[var(--glass-text-muted)]">
                {subtitle}
              </div>
            )}
          </div>,
          document.body
        )}
    </div>
  );
};

const RailDivider: React.FC = () => (
  <div className="my-1 h-px w-7 shrink-0 rounded-full bg-[var(--glass-border)]" />
);

export const Sidebar: React.FC<SidebarProps> = ({
  settings,
  activePersona,
  view,
  onSelectView,
  onSelectPersona,
  onOpenCustomizer,
  onOpenKnowledge,
  onOpenAttention,
  onOpenApiIntegration,
}) => {
  return (
    <nav
      className="glass-panel relative z-10 flex h-full w-[var(--glass-rail-w)] shrink-0 flex-col items-center gap-1.5 overflow-hidden py-3"
      aria-label="Nexus navigation"
    >
      {/* Brand mark */}
      <div
        className="mb-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[image:var(--glass-accent-gradient)] text-white shadow-[var(--glass-shadow-glow)]"
        title="Nexus AI"
      >
        <Sparkles className="h-5 w-5" />
      </div>

      <RailDivider />

      {/* Chat / Code — top-level view switch, same idea as claude.ai's Chats/Code split */}
      <RailButton variant="tool" active={view === 'chat'} onClick={() => onSelectView('chat')} title="Chat">
        <MessageSquare className="h-5 w-5" />
      </RailButton>
      <RailButton variant="tool" active={view === 'code'} onClick={() => onSelectView('code')} title="Nexus Code" subtitle="Edit your own GitHub repo">
        <GitBranch className="h-5 w-5" />
      </RailButton>

      <RailDivider />

      {/* Persona rail — scrollable so a long list never pushes the tools off screen */}
      <div className="flex min-h-0 flex-1 flex-col items-center gap-1.5 overflow-y-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {Object.values(DEFAULT_PERSONAS).map((p) => (
          <RailButton
            key={p.id}
            active={settings.activePersonaId === p.id}
            onClick={() => onSelectPersona(p.id)}
            title={p.name}
            subtitle={p.tagline}
          >
            {getPersonaIcon(p.id)}
          </RailButton>
        ))}
      </div>

      <RailDivider />

      {/* Tools — pinned to the bottom */}
      <div className="flex shrink-0 flex-col items-center gap-1.5 py-1">
        <RailButton
          variant="tool"
          onClick={onOpenCustomizer}
          title="Customize"
          subtitle={`Persona & generation sliders · ${activePersona.name}`}
        >
          <Sliders className="h-5 w-5" />
        </RailButton>
        <RailButton
          variant="tool"
          onClick={onOpenKnowledge}
          title="Knowledge base"
          subtitle="Teach Nexus custom facts"
        >
          <Database className="h-5 w-5" />
        </RailButton>
        <RailButton
          variant="tool"
          onClick={onOpenApiIntegration}
          title="Bot API & SDK"
          subtitle="Integrate Nexus into a Discord bot"
        >
          <Code2 className="h-5 w-5" />
        </RailButton>
        <RailButton
          variant="tool"
          onClick={onOpenAttention}
          title="Attention visualizer"
          subtitle="Inspect the latent semantic map"
        >
          <BrainCircuit className="h-5 w-5" />
        </RailButton>
      </div>
    </nav>
  );
};
