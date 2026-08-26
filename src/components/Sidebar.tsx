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
  onClearChat: () => void;
  onExportChat: () => void;
  messageCount: number;
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
  children: React.ReactNode;
  accentClassName?: string;
}

const RailButton: React.FC<RailButtonProps> = ({ active, onClick, title, children, accentClassName }) => (
  <div className="relative flex items-center justify-center group">
    {/* Active/hover indicator pill, Discord-server-list style */}
    <span
      className={`absolute -left-3 rounded-r-full bg-white transition-all duration-150 ${
        active ? 'h-8 w-1' : 'h-2 w-1 opacity-0 group-hover:opacity-100 group-hover:h-4'
      }`}
    />
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      className={`w-11 h-11 flex items-center justify-center transition-all duration-150 cursor-pointer text-[var(--nx-text-muted)] ${
        active
          ? `rounded-2xl ${accentClassName || 'bg-[var(--nx-accent)] text-white'}`
          : 'rounded-3xl hover:rounded-2xl bg-[var(--nx-elevated)] hover:bg-[var(--nx-accent)] hover:text-white'
      }`}
    >
      {children}
    </button>
    {/* Tooltip */}
    <div className="pointer-events-none absolute left-14 z-50 whitespace-nowrap rounded-md bg-black px-2.5 py-1.5 text-xs font-semibold text-white opacity-0 scale-95 origin-left group-hover:opacity-100 group-hover:scale-100 transition-all duration-100 shadow-lg">
      {title}
    </div>
  </div>
);

export const Sidebar: React.FC<SidebarProps> = ({
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
  return (
    <nav
      className="w-[72px] shrink-0 h-screen flex flex-col items-center py-3 gap-2 bg-[var(--nx-sidebar)] border-r border-[var(--nx-border-subtle)] overflow-y-auto"
      aria-label="Nexus navigation"
    >
      {/* Brand mark */}
      <div
        className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[var(--nx-accent)] to-indigo-700 text-white flex items-center justify-center shadow-md mb-1 shrink-0"
        title="Nexus AI"
      >
        <Sparkles className="w-5 h-5" />
      </div>

      <div className="w-8 h-px bg-[var(--nx-border)] shrink-0" />

      {/* Persona rail */}
      <div className="flex flex-col items-center gap-2 py-1">
        {Object.values(DEFAULT_PERSONAS).map((p) => (
          <RailButton
            key={p.id}
            active={settings.activePersonaId === p.id}
            onClick={() => onSelectPersona(p.id)}
            title={`${p.name} — ${p.tagline}`}
          >
            {getPersonaIcon(p.id)}
          </RailButton>
        ))}
      </div>

      <div className="w-8 h-px bg-[var(--nx-border)] shrink-0" />

      {/* Tool actions */}
      <div className="flex flex-col items-center gap-2 py-1">
        <RailButton onClick={onOpenCustomizer} title="Customize Persona & Sliders">
          <Sliders className="w-5 h-5" />
        </RailButton>
        <RailButton onClick={onOpenKnowledge} title="Knowledge Base">
          <Database className="w-5 h-5" />
        </RailButton>
        <RailButton onClick={onOpenApiIntegration} title="Bot API & JavaScript SDK">
          <Code2 className="w-5 h-5" />
        </RailButton>
        <RailButton onClick={onOpenAttention} title="Attention & Latent Space Visualizer">
          <BrainCircuit className="w-5 h-5" />
        </RailButton>
      </div>

      <div className="flex-1" />

      {/* Chat management */}
      {messageCount > 0 && (
        <div className="flex flex-col items-center gap-2 pb-1 shrink-0">
          <RailButton onClick={onExportChat} title="Export Conversation">
            <Download className="w-5 h-5" />
          </RailButton>
          <RailButton
            onClick={onClearChat}
            title="Clear Conversation"
            accentClassName="bg-rose-600 text-white"
          >
            <Trash2 className="w-5 h-5" />
          </RailButton>
        </div>
      )}
    </nav>
  );
};
