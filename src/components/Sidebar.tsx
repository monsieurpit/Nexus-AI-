import React from 'react';
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
} from 'lucide-react';
import { AISettings, ModelPersona, ModelPersonaId } from '../types';
import { DEFAULT_PERSONAS } from '../ai-engine/memoryStore';

interface SidebarProps {
  settings: AISettings;
  activePersona: ModelPersona;
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
}) => (
  <div className="relative flex items-center justify-center group w-full">
    {/* Active / hover indicator pill, Discord-server-list style */}
    <span
      className={`absolute left-0 rounded-r-full bg-[var(--nx-text)] transition-all duration-150 ${
        active ? 'h-7 w-[3px]' : 'h-2 w-[3px] opacity-0 group-hover:opacity-100 group-hover:h-4'
      }`}
    />
    <button
      type="button"
      onClick={onClick}
      title={`${title}${subtitle ? ` — ${subtitle}` : ''}`}
      aria-label={title}
      aria-pressed={active}
      className={`w-11 h-11 flex items-center justify-center cursor-pointer transition-all duration-150 ${
        active
          ? 'rounded-[14px] bg-[var(--nx-accent)] text-[var(--nx-on-accent)] shadow-[var(--nx-shadow-glow)]'
          : variant === 'tool'
          ? 'rounded-[18px] hover:rounded-[14px] bg-transparent text-[var(--nx-text-faint)] hover:bg-[var(--nx-elevated)] hover:text-[var(--nx-text)]'
          : 'rounded-[18px] hover:rounded-[14px] bg-[var(--nx-elevated)] text-[var(--nx-text-muted)] hover:bg-[var(--nx-accent)] hover:text-[var(--nx-on-accent)]'
      }`}
    >
      {children}
    </button>

    {/* Tooltip */}
    <div className="pointer-events-none absolute left-[52px] z-50 origin-left scale-95 rounded-lg bg-[var(--nx-elevated-2)] border border-[var(--nx-border)] px-3 py-2 opacity-0 shadow-[var(--nx-shadow-md)] transition-all duration-100 group-hover:scale-100 group-hover:opacity-100">
      <div className="whitespace-nowrap text-xs font-semibold text-[var(--nx-text)]">{title}</div>
      {subtitle && (
        <div className="mt-0.5 max-w-[200px] whitespace-normal text-[11px] leading-snug text-[var(--nx-text-muted)]">
          {subtitle}
        </div>
      )}
    </div>
  </div>
);

const RailDivider: React.FC = () => (
  <div className="my-1 h-px w-7 shrink-0 rounded-full bg-[var(--nx-border)]" />
);

export const Sidebar: React.FC<SidebarProps> = ({
  settings,
  activePersona,
  onSelectPersona,
  onOpenCustomizer,
  onOpenKnowledge,
  onOpenAttention,
  onOpenApiIntegration,
}) => {
  return (
    <nav
      className="relative z-10 flex h-screen w-[var(--nx-rail-w)] shrink-0 flex-col items-center gap-1.5 border-r border-[var(--nx-border-subtle)] bg-[var(--nx-sidebar)] py-3"
      aria-label="Nexus navigation"
    >
      {/* Brand mark */}
      <div
        className="mb-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-[var(--nx-accent)] to-[#4f46b5] text-white shadow-[var(--nx-shadow-glow)]"
        title="Nexus AI"
      >
        <Sparkles className="h-5 w-5" />
      </div>

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
