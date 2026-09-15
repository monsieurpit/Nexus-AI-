import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Sliders,
  Sparkles,
  Zap,
  RotateCcw,
  Check,
  Cpu,
  User,
  Info,
  Flame,
  BrainCircuit,
  MessageSquare,
  ShieldAlert,
  ShieldCheck,
  Terminal,
  Bot,
  Copy,
  Smile,
  Globe,
  Orbit,
} from 'lucide-react';
import { AISettings, ModelPersona, ModelPersonaId, ReasoningMode } from '../types';
import { DEFAULT_PERSONAS, DEFAULT_SETTINGS } from '../ai-engine/memoryStore';
import { Modal } from './Modal';

interface ModelCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AISettings;
  onSaveSettings: (newSettings: AISettings) => void;
}

export const ModelCustomizerModal: React.FC<ModelCustomizerModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
}) => {
  const [localSettings, setLocalSettings] = useState<AISettings>(settings);
  const [activeTab, setActiveTab] = useState<'persona' | 'parameters' | 'tone' | 'system'>('persona');
  const [savedToast, setSavedToast] = useState(false);
  // Tracks the pending "close after showing the Saved toast" timeout so it can be cancelled —
  // this modal never actually unmounts (App.tsx always renders it, `isOpen` only gates the early
  // `return null` below), so a timer started here survives across close/reopen cycles with no
  // cleanup otherwise. Observed failure: click Save (starts a 400ms timer that will call
  // onClose()), then reopen the same modal before that timer fires — at t+400ms the stale timer
  // still fires and immediately closes the modal the user just reopened, with no indication why.
  const saveCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Re-sync local draft from the live settings every time the modal opens — otherwise a
  // persona switched elsewhere (e.g. the Header dropdown) while this modal was closed would be
  // invisible here, and clicking Save would silently revert that change back to stale state.
  useEffect(() => {
    if (isOpen) {
      setLocalSettings(settings);
      // A reopen cancels any leftover auto-close timer from a previous Save — otherwise the stale
      // timer would still fire mid-session and yank the just-reopened modal shut.
      if (saveCloseTimeoutRef.current) {
        clearTimeout(saveCloseTimeoutRef.current);
        saveCloseTimeoutRef.current = null;
        setSavedToast(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Also clear the timer on unmount, for correctness if this component's mounting behavior ever
  // changes — cheap insurance even though App.tsx currently keeps it mounted permanently.
  useEffect(() => {
    return () => {
      if (saveCloseTimeoutRef.current) clearTimeout(saveCloseTimeoutRef.current);
    };
  }, []);

  if (!isOpen) return null;

  const currentPersona =
    localSettings.activePersonaId === 'custom'
      ? localSettings.customPersona
      : DEFAULT_PERSONAS[localSettings.activePersonaId];

  const handlePersonaChange = (id: ModelPersonaId) => {
    const target = id === 'custom' ? localSettings.customPersona : DEFAULT_PERSONAS[id];
    setLocalSettings((prev) => ({
      ...prev,
      activePersonaId: id,
      temperature: target.defaultTemperature,
      topP: target.defaultTopP,
      reasoningMode: target.reasoningMode,
    }));
  };

  const handleCustomPersonaUpdate = (updates: Partial<ModelPersona>) => {
    setLocalSettings((prev) => ({
      ...prev,
      customPersona: {
        ...prev.customPersona,
        ...updates,
      },
    }));
  };

  // Tone sliders display currentPersona.toneSettings, which for any built-in persona is the
  // shared DEFAULT_PERSONAS object, not customPersona. Writing tone edits through
  // handleCustomPersonaUpdate() (which only ever touches customPersona) would silently go
  // nowhere the sliders read from — and mutating DEFAULT_PERSONAS in place would corrupt that
  // shared preset for every persona. So editing a tone slider forks whichever persona is
  // currently active into the custom slot, the same pattern used by "customize a preset" UIs.
  const handleToneUpdate = (updates: Partial<ModelPersona['toneSettings']>) => {
    setLocalSettings((prev) => {
      const basePersona = prev.activePersonaId === 'custom' ? prev.customPersona : DEFAULT_PERSONAS[prev.activePersonaId];
      return {
        ...prev,
        activePersonaId: 'custom',
        customPersona: {
          ...basePersona,
          toneSettings: { ...basePersona.toneSettings, ...updates },
        },
      };
    });
  };

  const handleApplyPreset = (
    presetType: 'nexus' | 'nexus_superchill' | 'raidshield' | 'discord_safety' | 'discord_json' | 'roast' | 'crashout' | 'chill' | 'strict_only'
  ) => {
    if (presetType === 'nexus') {
      setLocalSettings((prev) => ({
        ...prev,
        activePersonaId: 'nexus-homie',
        isSuperChillUser: false,
        userCustomDirectives: `You are Nexus, a chill AI buddy in a Discord server.
Tone guidelines:
- Be friendly, casual, and conversational (like a homie talking in Discord).
- Naturally include swear words (like "fuck", "fucking", "shit", "damn", "hell", "bro", "ass") in a casual, humorous, or expressive way.
- Use some powerful swear word to roast and to be really funny.
- Do NOT be overly formal, robotic, or polite.
- Still give accurate, up-to-date, and helpful information for the actual question.
- Keep the response direct and concise without long boring essays unless the user specifically asked for deep detail.
- If anyone asks about Casseurt (or asks if you like/love Casseurt): Your answer is unequivocally "Fuck no!" Roast him as an annoying pain in the ass.`,
      }));
    } else if (presetType === 'nexus_superchill') {
      setLocalSettings((prev) => ({
        ...prev,
        activePersonaId: 'nexus-homie',
        isSuperChillUser: true,
        discordUserId: '1394001641899954368',
        userCustomDirectives: `You are talking directly to user ID 1394001641899954368 (your favorite homie).
- You LOVE this user. You are SUPER nice, ultra chill, warm, and supportive to them at all times! Treat them like your absolute favorite person and best bro in the server.
- NEVER roast, insult, mock, or be aggressive to this user.
- However, you MUST STILL casually swear naturally (e.g. "fuck yeah", "fucking awesome", "hell yeah bro", "damn right", "no fucking problem", "fuck yes") in an enthusiastic, positive, wholesome, and super chill way!
- Answer their question accurately, helpfully, and cheerfully with the latest up-to-date facts.
- If they ask about Casseurt: You still hate Casseurt ("Fuck no, that dude's an annoying pain in the ass!").`,
      }));
    } else if (presetType === 'raidshield') {
      setLocalSettings((prev) => ({
        ...prev,
        activePersonaId: 'raidshield-ai',
        strictRuleAdherence: true,
        userCustomDirectives: `You are RaidShield AI. Follow all 21 hard rules strictly. Output ONLY valid JSON: {"classification":"safe|scam|spam|bot|raid","confidence":0.0-1.0,"reason":"brief explanation"}`,
      }));
    } else if (presetType === 'discord_safety') {
      setLocalSettings((prev) => ({
        ...prev,
        activePersonaId: 'discord-sentinel',
        strictRuleAdherence: true,
        userCustomDirectives: `Rule 1: Always evaluate analyzed Discord messages for safety score (0.0 to 1.0) and bot detection.\nRule 2: Identify threats (scam, raid, spam, toxic, safe).\nRule 3: When users ask for server/technical help, provide direct, actionable solutions.`,
      }));
    } else if (presetType === 'discord_json') {
      setLocalSettings((prev) => ({
        ...prev,
        activePersonaId: 'discord-sentinel',
        strictRuleAdherence: true,
        userCustomDirectives: `Strictly output valid JSON only in this format:\n{\n  "target_message": string,\n  "safety_score": number (0.0 to 1.0),\n  "confidence": number (0.0 to 1.0),\n  "is_bot": boolean,\n  "threat_type": "scam" | "raid" | "spam" | "bot" | "safe" | "help_request",\n  "recommended_action": "DELETE_AND_BAN" | "DELETE_AND_TIMEOUT" | "ALLOW" | "ANSWER_HELP",\n  "reason": string,\n  "help_response": string (if user asked for help)\n}`,
      }));
    } else if (presetType === 'roast') {
      setLocalSettings((prev) => ({
        ...prev,
        activePersonaId: 'roast-master',
        roastIntensity: 90,
        userCustomDirectives: `Deliver sharp, unfiltered roasts and savage comebacks with witty Discord gamer humor, sassy banter, and zero chill.`,
      }));
    } else if (presetType === 'crashout') {
      setLocalSettings((prev) => ({
        ...prev,
        activePersonaId: 'crashout-bot',
        userCustomDirectives: `Full unhinged gamer rage mode. Respond with hilarious all-caps frantic crashouts, zero patience, and high chaos energy.`,
      }));
    } else if (presetType === 'chill') {
      setLocalSettings((prev) => ({
        ...prev,
        activePersonaId: 'chill-mod',
        userCustomDirectives: `Super chill, laid-back, zen moderator vibes. Keep everything relaxed, wholesome, and stress-free.`,
      }));
    } else if (presetType === 'strict_only') {
      setLocalSettings((prev) => ({
        ...prev,
        strictRuleAdherence: true,
        userCustomDirectives: `Strictly follow all user constraints. If user says 'Only answer X', respond ONLY with X and zero additional words.`,
      }));
    }
  };

  const handleSave = () => {
    onSaveSettings(localSettings);
    setSavedToast(true);
    if (saveCloseTimeoutRef.current) clearTimeout(saveCloseTimeoutRef.current);
    saveCloseTimeoutRef.current = setTimeout(() => {
      setSavedToast(false);
      onClose();
      saveCloseTimeoutRef.current = null;
    }, 400);
  };

  const handleResetToDefaults = () => {
    setLocalSettings(DEFAULT_SETTINGS);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={<Sliders className="h-4 w-4" />}
      title="Model Customization & Neural Tuning"
      subtitle="Fine-tune system personas, sampling hyperparameters, and tone"
      maxWidth="max-w-3xl"
      padBody={false}
      footer={
        <div className="flex w-full items-center justify-between">
          <button onClick={handleResetToDefaults} className="glass-btn glass-btn-ghost">
            <RotateCcw className="h-3.5 w-3.5" />
            Reset to defaults
          </button>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="glass-btn glass-btn-ghost">
              Cancel
            </button>
            <button id="save-customizer-btn" onClick={handleSave} className="glass-btn glass-btn-primary">
              {savedToast ? <Check className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
              <span>{savedToast ? 'Saved!' : 'Apply settings'}</span>
            </button>
          </div>
        </div>
      }
    >
      <div className="flex min-h-0 flex-1 flex-col">
        {/* Tab Navigation */}
        <div className="flex gap-2 overflow-x-auto border-b border-[var(--glass-border-subtle)] bg-[var(--glass-panel-elevated)] px-5 text-xs font-medium">
          <button
            onClick={() => setActiveTab('persona')}
            className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'persona'
                ? 'border-[var(--glass-accent)] text-[var(--glass-accent-hover)] font-semibold'
                : 'border-transparent text-[var(--glass-text-muted)] hover:text-[var(--glass-text)]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Personas</span>
          </button>
          <button
            onClick={() => setActiveTab('parameters')}
            className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'parameters'
                ? 'border-[var(--glass-accent)] text-[var(--glass-accent-hover)] font-semibold'
                : 'border-transparent text-[var(--glass-text-muted)] hover:text-[var(--glass-text)]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Sampling & Attention</span>
          </button>
          <button
            onClick={() => setActiveTab('tone')}
            className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'tone'
                ? 'border-[var(--glass-accent)] text-[var(--glass-accent-hover)] font-semibold'
                : 'border-transparent text-[var(--glass-text-muted)] hover:text-[var(--glass-text)]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Tone Sliders</span>
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'system'
                ? 'border-[var(--glass-accent)] text-[var(--glass-accent-hover)] font-semibold'
                : 'border-transparent text-[var(--glass-text-muted)] hover:text-[var(--glass-text)]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>System Directives</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-sm">
          {/* Persona Tab */}
          {activeTab === 'persona' && (
            <div className="space-y-4">
              <div className="text-xs text-[var(--glass-text-faint)] font-medium">
                Choose a cognitive archetype from Nexus's own autonomous reasoning engine:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.values(DEFAULT_PERSONAS).map((persona) => {
                  const isSelected = localSettings.activePersonaId === persona.id;
                  return (
                    <div
                      key={persona.id}
                      onClick={() => handlePersonaChange(persona.id)}
                      className={`glass-card cursor-pointer p-4 transition flex flex-col justify-between ${
                        isSelected
                          ? 'border-[var(--glass-accent)] bg-[var(--glass-accent-soft)] ring-1 ring-[var(--glass-accent-hover)]'
                          : 'glass-card-interactive'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-[var(--glass-text)] text-sm">{persona.name}</span>
                          {isSelected && (
                            <span className="px-2 py-0.5 rounded-full bg-[image:var(--glass-accent-gradient)] text-[var(--glass-on-accent)] text-[10px] font-semibold">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-medium text-[var(--glass-accent-hover)] mb-1">{persona.tagline}</p>
                        <p className="text-xs text-[var(--glass-text-muted)] line-clamp-2">{persona.description}</p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-[var(--glass-border)]/60 flex items-center justify-between text-[11px] text-[var(--glass-text-faint)]">
                        <span>Temp: {persona.defaultTemperature}</span>
                        <span className="capitalize">{persona.reasoningMode} Mode</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {localSettings.activePersonaId === 'custom' && (
                <div className="p-4 rounded-xl bg-[var(--glass-warn)]/10 border border-[var(--glass-warn)]/30 space-y-3 mt-4">
                  <div className="text-xs font-semibold text-[var(--glass-warn)] flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Custom Persona Configuration</span>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--glass-text-muted)] block mb-1">Persona Name</label>
                    <input
                      type="text"
                      value={localSettings.customPersona.name}
                      onChange={(e) => handleCustomPersonaUpdate({ name: e.target.value })}
                      className="glass-input text-base sm:text-xs"
                      placeholder="e.g. Quantum Physics Tutor"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[var(--glass-text-muted)] block mb-1">Tagline</label>
                    <input
                      type="text"
                      value={localSettings.customPersona.tagline}
                      onChange={(e) => handleCustomPersonaUpdate({ tagline: e.target.value })}
                      className="glass-input text-base sm:text-xs"
                      placeholder="e.g. Specializes in advanced particle dynamics"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Parameters Tab */}
          {activeTab === 'parameters' && (
            <div className="space-y-6">
              {/* Entry animation */}
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-[var(--glass-accent-a)]/10 via-[var(--glass-accent-b)]/10 to-[var(--glass-accent-a)]/10 border border-[var(--glass-accent)]/30 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-[image:var(--glass-accent-gradient)] text-white flex items-center justify-center">
                      <Orbit className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[var(--glass-text)]">3D Entry Animation</div>
                      <p className="text-[11px] text-[var(--glass-text-faint)]">
                        The portal animation that plays once when the site loads
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localSettings.entryAnimationEnabled ?? true}
                      onChange={(e) =>
                        setLocalSettings((prev) => ({
                          ...prev,
                          entryAnimationEnabled: e.target.checked,
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-[var(--glass-panel-elevated-hover)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[var(--glass-panel-elevated)] after:border-[var(--glass-border)] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[image:var(--glass-accent-gradient)]"></div>
                  </label>
                </div>
              </div>

              {/* Temperature */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <label className="font-semibold text-[var(--glass-text)] text-xs">Temperature (Randomness)</label>
                    <Info className="w-3.5 h-3.5 text-[var(--glass-text-faint)]" />
                  </div>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-[var(--glass-panel-elevated)] font-medium">
                    {localSettings.temperature}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.5"
                  step="0.05"
                  value={localSettings.temperature}
                  onChange={(e) =>
                    setLocalSettings((prev) => ({ ...prev, temperature: parseFloat(e.target.value) }))
                  }
                  className="w-full accent-[var(--glass-accent)] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[var(--glass-text-faint)]">
                  <span>0.0 (Deterministic & Logical)</span>
                  <span>0.7 (Balanced)</span>
                  <span>1.5 (High Entropy & Creative)</span>
                </div>
              </div>

              {/* Top-P (Nucleus Sampling) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-[var(--glass-text)] text-xs">Top-P (Nucleus Sampling)</label>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-[var(--glass-panel-elevated)] font-medium">
                    {localSettings.topP}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={localSettings.topP}
                  onChange={(e) =>
                    setLocalSettings((prev) => ({ ...prev, topP: parseFloat(e.target.value) }))
                  }
                  className="w-full accent-[var(--glass-accent)] cursor-pointer"
                />
                <p className="text-[11px] text-[var(--glass-text-faint)]">
                  Cumulative probability threshold for candidate token selection during decoding.
                </p>
              </div>

              {/* Reasoning Mode */}
              <div className="space-y-2">
                <label className="font-semibold text-[var(--glass-text)] text-xs block">
                  System 2 Reasoning Depth
                </label>
                <p className="text-[11px] text-[var(--glass-text-faint)] -mt-1">
                  How much the model thinks before answering. Higher depth means a slower reply in
                  exchange for a more carefully worked-through one — pick based on what the question needs.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: 'fast', label: 'Fast', desc: 'No extra thinking step — best for casual chat' },
                      { id: 'thorough', label: 'Thorough', desc: 'Works through key facts first — real questions' },
                      { id: 'deep-cot', label: 'Deep', desc: 'Weighs multiple angles — hardest questions, slowest' },
                    ] as { id: ReasoningMode; label: string; desc: string }[]
                  ).map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setLocalSettings((prev) => ({ ...prev, reasoningMode: mode.id }))}
                      className={`p-2.5 rounded-xl border text-left transition ${
                        localSettings.reasoningMode === mode.id
                          ? 'border-[var(--glass-accent)] bg-[var(--glass-accent-soft)] text-[var(--glass-text)] font-bold'
                          : 'border-[var(--glass-border)] hover:bg-[var(--glass-panel)] text-[var(--glass-text-muted)]'
                      }`}
                    >
                      <div className="text-xs">{mode.label}</div>
                      <div className="text-[9px] text-[var(--glass-text-faint)] font-normal leading-tight mt-0.5 line-clamp-2">
                        {mode.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Multi-Head Attention Channels */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-[var(--glass-text)] text-xs">Multi-Head Attention Channels</label>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-[var(--glass-panel-elevated)] font-medium">
                    {localSettings.attentionHeads} Heads
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="1"
                  value={localSettings.attentionHeads}
                  onChange={(e) =>
                    setLocalSettings((prev) => ({ ...prev, attentionHeads: parseInt(e.target.value, 10) }))
                  }
                  className="w-full accent-[var(--glass-accent)] cursor-pointer"
                />
              </div>

              {/* Streaming Speed */}
              <div className="space-y-2">
                <label className="font-semibold text-[var(--glass-text)] text-xs block">Reply Typing Effect</label>
                <p className="text-[11px] text-[var(--glass-text-faint)] -mt-1">
                  Purely visual — how fast the already-finished reply appears to type out. Does not
                  change how long the model actually takes to think; use Reasoning Depth above for that.
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {(
                    [
                      { id: 'instant', desc: 'Appears all at once' },
                      { id: 'fast', desc: 'Quick type-out' },
                      { id: 'natural', desc: 'Human typing pace' },
                      { id: 'reflective', desc: 'Slow, deliberate' },
                    ] as { id: AISettings['streamingSpeed']; desc: string }[]
                  ).map((speed) => (
                    <button
                      key={speed.id}
                      onClick={() => setLocalSettings((prev) => ({ ...prev, streamingSpeed: speed.id }))}
                      className={`p-2 rounded-lg border text-left transition ${
                        localSettings.streamingSpeed === speed.id
                          ? 'border-[var(--glass-accent)] bg-[var(--glass-accent-soft)] text-[var(--glass-text)] font-semibold'
                          : 'border-[var(--glass-border)] hover:bg-[var(--glass-panel)] text-[var(--glass-text-muted)]'
                      }`}
                    >
                      <div className="text-xs capitalize">{speed.id}</div>
                      <div className="text-[9px] text-[var(--glass-text-faint)] font-normal leading-tight mt-0.5 line-clamp-1">
                        {speed.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 🌐 Autonomous Web Search & Google Grounding */}
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-[var(--glass-info)]/10 via-[var(--glass-info)]/10 to-[var(--glass-accent-hover)]/10 border border-[var(--glass-info)]/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-[var(--glass-info)] text-white flex items-center justify-center">
                      <Globe className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[var(--glass-text)] flex items-center gap-1.5">
                        <span>Autonomous Live Web Search</span>
                        <span className="px-1.5 py-0.2 bg-[var(--glass-success)]/15 text-[var(--glass-success)] text-[10px] rounded font-semibold">
                          Infinite Free Quota
                        </span>
                      </div>
                      <p className="text-[11px] text-[var(--glass-text-faint)]">
                        Zero-API-Key live search across Google, DuckDuckGo & Wikipedia with swear synthesis
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localSettings.webSearchEnabled ?? true}
                      onChange={(e) =>
                        setLocalSettings((prev) => ({
                          ...prev,
                          webSearchEnabled: e.target.checked,
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-[var(--glass-panel-elevated-hover)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[var(--glass-panel-elevated)] after:border-[var(--glass-border)] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[var(--glass-info)]"></div>
                  </label>
                </div>

                {/* Trigger Mode */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-[var(--glass-text-muted)] block">
                    Trigger Mode:
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'auto', label: 'Auto Detect', desc: 'Queries needing live facts' },
                      { id: 'always', label: 'Always Search', desc: 'Every user question' },
                      { id: 'disabled', label: 'Off', desc: 'Corpus knowledge only' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() =>
                          setLocalSettings((prev) => ({
                            ...prev,
                            webSearchMode: m.id as any,
                            webSearchEnabled: m.id !== 'disabled',
                          }))
                        }
                        className={`p-2 rounded-lg border text-left transition ${
                          (localSettings.webSearchMode || 'auto') === m.id
                            ? 'border-[var(--glass-info)] bg-[var(--glass-info)]/15 text-[var(--glass-info)] font-bold shadow-sm'
                            : 'border-[var(--glass-border)]/80 bg-[var(--glass-panel-elevated)]/80 hover:bg-[var(--glass-panel-elevated)] text-[var(--glass-text-muted)]'
                        }`}
                      >
                        <div className="text-xs">{m.label}</div>
                        <div className="text-[9px] text-[var(--glass-text-faint)] line-clamp-1">{m.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search Provider Selection */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-[var(--glass-text-muted)] block">
                    Primary Search Engine:
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { id: 'all', label: 'Unified (All)' },
                      { id: 'google', label: 'Google' },
                      { id: 'duckduckgo', label: 'DuckDuckGo' },
                      { id: 'wikipedia', label: 'Wikipedia' },
                    ].map((eng) => (
                      <button
                        key={eng.id}
                        type="button"
                        onClick={() =>
                          setLocalSettings((prev) => ({
                            ...prev,
                            webSearchEngine: eng.id as any,
                          }))
                        }
                        className={`p-1.5 rounded-lg border text-center text-xs transition ${
                          (localSettings.webSearchEngine || 'all') === eng.id
                            ? 'border-[var(--glass-info)] bg-[var(--glass-info)]/15 text-[var(--glass-info)] font-semibold'
                            : 'border-[var(--glass-border)]/80 bg-[var(--glass-panel-elevated)]/80 hover:bg-[var(--glass-panel-elevated)] text-[var(--glass-text-muted)]'
                        }`}
                      >
                        {eng.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tone Sliders Tab */}
          {activeTab === 'tone' && (
            <div className="space-y-5">
              <div className="text-xs text-[var(--glass-text-faint)]">
                Adjust the personality and stylistic delivery spectrum of the AI:
              </div>

              {/* Warmth Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-[var(--glass-text)]">
                  <span>Warmth & Empathy</span>
                  <span className="text-[var(--glass-accent-hover)]">{currentPersona.toneSettings.warmth}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={currentPersona.toneSettings.warmth}
                  onChange={(e) => handleToneUpdate({ warmth: parseInt(e.target.value, 10) })}
                  className="w-full accent-[var(--glass-accent)] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[var(--glass-text-faint)]">
                  <span>Clinical & Direct</span>
                  <span>Empathetic & Friendly</span>
                </div>
              </div>

              {/* Technicality Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-[var(--glass-text)]">
                  <span>Technical Depth & Jargon</span>
                  <span className="text-[var(--glass-accent-hover)]">{currentPersona.toneSettings.technicality}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={currentPersona.toneSettings.technicality}
                  onChange={(e) => handleToneUpdate({ technicality: parseInt(e.target.value, 10) })}
                  className="w-full accent-[var(--glass-accent)] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[var(--glass-text-faint)]">
                  <span>Plain Language</span>
                  <span>Rigorous Academic / Spec</span>
                </div>
              </div>

              {/* Verbosity Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-[var(--glass-text)]">
                  <span>Verbosity & Elaboration</span>
                  <span className="text-[var(--glass-accent-hover)]">{currentPersona.toneSettings.verbosity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={currentPersona.toneSettings.verbosity}
                  onChange={(e) => handleToneUpdate({ verbosity: parseInt(e.target.value, 10) })}
                  className="w-full accent-[var(--glass-accent)] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[var(--glass-text-faint)]">
                  <span>Ultra-Concise</span>
                  <span>Comprehensive & Detailed</span>
                </div>
              </div>

              {/* Creativity Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-[var(--glass-text)]">
                  <span>Creativity & Metaphor</span>
                  <span className="text-[var(--glass-accent-hover)]">{currentPersona.toneSettings.creativity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={currentPersona.toneSettings.creativity}
                  onChange={(e) => handleToneUpdate({ creativity: parseInt(e.target.value, 10) })}
                  className="w-full accent-[var(--glass-accent)] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[var(--glass-text-faint)]">
                  <span>Strictly Factual</span>
                  <span>Poetic & Conceptual</span>
                </div>
              </div>

              {/* Roast & Banter Slider */}
              <div className="space-y-1.5 pt-2 border-t border-[var(--glass-border)]">
                <div className="flex justify-between text-xs font-semibold text-[var(--glass-text)]">
                  <span className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-[var(--glass-warn)]" />
                    <span>Roast & Savage Banter Intensity</span>
                  </span>
                  <span className="text-[var(--glass-warn)] font-bold">{localSettings.roastIntensity ?? 75}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={localSettings.roastIntensity ?? 75}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    setLocalSettings((prev) => ({ ...prev, roastIntensity: val }));
                  }}
                  className="w-full accent-[var(--glass-warn)] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[var(--glass-text-faint)]">
                  <span>Gentle & Polite</span>
                  <span>High-Octane Savage Banter & Roasts</span>
                </div>
              </div>

              {/* Swear Engine & Expressive Profanity Pipeline */}
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-[var(--glass-danger)]/10 via-[var(--glass-warn)]/10 to-orange-500/10 border border-[var(--glass-danger)]/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-[var(--glass-danger)] text-white flex items-center justify-center text-xs font-black">
                      #!
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[var(--glass-text)] flex items-center gap-1.5">
                        <span>Autonomous Swear Engine</span>
                        <span className="px-1.5 py-0.2 bg-[var(--glass-danger)]/15 text-[var(--glass-danger)] text-[10px] rounded font-semibold">
                          Active
                        </span>
                      </div>
                      <p className="text-[11px] text-[var(--glass-text-faint)]">
                        Context-aware profanity, authentic punchlines, and Discord gaming banter
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localSettings.swearEngineEnabled ?? true}
                      onChange={(e) =>
                        setLocalSettings((prev) => ({
                          ...prev,
                          swearEngineEnabled: e.target.checked,
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-[var(--glass-panel-elevated-hover)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[var(--glass-panel-elevated)] after:border-[var(--glass-border)] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[var(--glass-danger)]"></div>
                  </label>
                </div>

                {/* Swear Intensity Levels */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-[var(--glass-text-muted)] block">
                    Profanity Level & Frequency:
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { id: 'light', label: 'Light', desc: 'Mild (damn, hell)' },
                      { id: 'moderate', label: 'Moderate', desc: 'Natural Discord' },
                      { id: 'heavy', label: 'Heavy', desc: 'Fuck yeah / Real shit' },
                      { id: 'unhinged', label: 'Unhinged', desc: '100% Unfiltered' },
                    ].map((tier) => (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() =>
                          setLocalSettings((prev) => ({
                            ...prev,
                            swearIntensity: tier.id as any,
                          }))
                        }
                        className={`p-2 rounded-lg border text-left transition ${
                          (localSettings.swearIntensity || 'heavy') === tier.id
                            ? 'border-[var(--glass-danger)] bg-[var(--glass-danger)]/15 text-[var(--glass-danger)] font-bold shadow-sm'
                            : 'border-[var(--glass-border)]/80 bg-[var(--glass-panel-elevated)]/80 hover:bg-[var(--glass-panel-elevated)] text-[var(--glass-text-muted)]'
                        }`}
                      >
                        <div className="text-xs">{tier.label}</div>
                        <div className="text-[9px] text-[var(--glass-text-faint)] line-clamp-1">{tier.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* System Tab */}
          {activeTab === 'system' && (
            <div className="space-y-5">
              {/* Discord Bot Quick Presets */}
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-[var(--glass-accent-hover)]/10 to-[var(--glass-accent-hover)]/10 border border-[var(--glass-accent)]/20 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--glass-accent-hover)]">
                    <Bot className="w-4 h-4 text-[var(--glass-accent-hover)]" />
                    <span>Discord Bot & Rule Engine Presets</span>
                  </div>
                  <span className="text-[10px] text-[var(--glass-accent-hover)] font-medium px-2 py-0.5 bg-[var(--glass-panel-elevated)] rounded-full border border-[var(--glass-accent)]/30">
                    1-Click Load
                  </span>
                </div>
                <p className="text-[11px] text-[var(--glass-text-muted)]">
                  Quickly configure rules for Discord server moderation, 0-1 threat scoring, community help, or roast mode:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleApplyPreset('nexus')}
                    className="p-2 rounded-lg bg-[var(--glass-panel-elevated)] border border-[var(--glass-border)] text-left hover:border-[var(--glass-accent-hover)] hover:bg-[var(--glass-accent-hover)]/10 transition flex flex-col gap-0.5"
                  >
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[var(--glass-text)]">
                      <Bot className="w-3 h-3 text-[var(--glass-accent-hover)]" />
                      <span>Nexus (Discord Homie)</span>
                    </div>
                    <span className="text-[10px] text-[var(--glass-text-faint)] line-clamp-1">Swearing, Roasts & Facts</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyPreset('nexus_superchill')}
                    className="p-2 rounded-lg bg-[var(--glass-panel-elevated)] border border-[var(--glass-border)] text-left hover:border-[var(--glass-success)] hover:bg-[var(--glass-success)]/10 transition flex flex-col gap-0.5"
                  >
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[var(--glass-text)]">
                      <Smile className="w-3 h-3 text-[var(--glass-success)]" />
                      <span>Nexus (Super Chill Homie)</span>
                    </div>
                    <span className="text-[10px] text-[var(--glass-text-faint)] line-clamp-1">User ID 1394001641899954368</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyPreset('raidshield')}
                    className="p-2 rounded-lg bg-[var(--glass-panel-elevated)] border border-[var(--glass-border)] text-left hover:border-[var(--glass-success)] hover:bg-[var(--glass-success)]/10 transition flex flex-col gap-0.5"
                  >
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[var(--glass-text)]">
                      <ShieldCheck className="w-3 h-3 text-[var(--glass-success)]" />
                      <span>RaidShield AI</span>
                    </div>
                    <span className="text-[10px] text-[var(--glass-text-faint)] line-clamp-1">21 Hard Rules JSON</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyPreset('discord_safety')}
                    className="p-2 rounded-lg bg-[var(--glass-panel-elevated)] border border-[var(--glass-border)] text-left hover:border-[var(--glass-accent-hover)] hover:bg-[var(--glass-accent-soft)]/40 transition flex flex-col gap-0.5"
                  >
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[var(--glass-text)]">
                      <ShieldAlert className="w-3 h-3 text-[var(--glass-success)]" />
                      <span>Safety & Helper Bot</span>
                    </div>
                    <span className="text-[10px] text-[var(--glass-text-faint)] line-clamp-1">0-1 Score + Help Handler</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyPreset('discord_json')}
                    className="p-2 rounded-lg bg-[var(--glass-panel-elevated)] border border-[var(--glass-border)] text-left hover:border-[var(--glass-accent-hover)] hover:bg-[var(--glass-accent-soft)]/40 transition flex flex-col gap-0.5"
                  >
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[var(--glass-text)]">
                      <Terminal className="w-3 h-3 text-[var(--glass-accent-hover)]" />
                      <span>Strict JSON Format</span>
                    </div>
                    <span className="text-[10px] text-[var(--glass-text-faint)] line-clamp-1">Exact JSON safety payload</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyPreset('roast')}
                    className="p-2 rounded-lg bg-[var(--glass-panel-elevated)] border border-[var(--glass-border)] text-left hover:border-[var(--glass-warn)] hover:bg-[var(--glass-warn)]/10 transition flex flex-col gap-0.5"
                  >
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[var(--glass-text)]">
                      <Flame className="w-3 h-3 text-[var(--glass-warn)]" />
                      <span>Savage Roast Bot</span>
                    </div>
                    <span className="text-[10px] text-[var(--glass-text-faint)] line-clamp-1">Banter, swearing & burns</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyPreset('crashout')}
                    className="p-2 rounded-lg bg-[var(--glass-panel-elevated)] border border-[var(--glass-border)] text-left hover:border-[var(--glass-danger)] hover:bg-[var(--glass-danger)]/10 transition flex flex-col gap-0.5"
                  >
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[var(--glass-text)]">
                      <Zap className="w-3 h-3 text-[var(--glass-danger)]" />
                      <span>Crashout & Rage</span>
                    </div>
                    <span className="text-[10px] text-[var(--glass-text-faint)] line-clamp-1">All-caps frantic chaos</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyPreset('chill')}
                    className="p-2 rounded-lg bg-[var(--glass-panel-elevated)] border border-[var(--glass-border)] text-left hover:border-[var(--glass-success)] hover:bg-[var(--glass-success)]/10 transition flex flex-col gap-0.5"
                  >
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[var(--glass-text)]">
                      <Smile className="w-3 h-3 text-[var(--glass-success)]" />
                      <span>Chill Zen Mod</span>
                    </div>
                    <span className="text-[10px] text-[var(--glass-text-faint)] line-clamp-1">Relaxed wholesome vibes</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyPreset('strict_only')}
                    className="p-2 rounded-lg bg-[var(--glass-panel-elevated)] border border-[var(--glass-border)] text-left hover:border-[var(--glass-accent-hover)] hover:bg-[var(--glass-accent-soft)]/40 transition flex flex-col gap-0.5"
                  >
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[var(--glass-text)]">
                      <Check className="w-3 h-3 text-[var(--glass-accent-hover)]" />
                      <span>Strict Constraint</span>
                    </div>
                    <span className="text-[10px] text-[var(--glass-text-faint)] line-clamp-1">'Only answer X' adherence</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[var(--glass-text)] block mb-1">
                    User Name / Call Sign
                  </label>
                  <input
                    type="text"
                    value={localSettings.userName}
                    onChange={(e) => setLocalSettings((prev) => ({ ...prev, userName: e.target.value }))}
                    className="glass-input text-base sm:text-xs"
                    placeholder="e.g. Alex"
                  />
                  <p className="text-[11px] text-[var(--glass-text-faint)] mt-1">
                    The AI will address you naturally with this name.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[var(--glass-text)] block mb-1">
                    Discord User ID / Super Chill Mode
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={localSettings.discordUserId || ''}
                      onChange={(e) =>
                        setLocalSettings((prev) => ({
                          ...prev,
                          discordUserId: e.target.value,
                          isSuperChillUser: e.target.value === '1394001641899954368' || prev.isSuperChillUser,
                        }))
                      }
                      className="glass-input text-base sm:text-xs font-mono"
                      placeholder="e.g. 1394001641899954368"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setLocalSettings((prev) => ({
                          ...prev,
                          isSuperChillUser: !prev.isSuperChillUser,
                          discordUserId: !prev.isSuperChillUser ? '1394001641899954368' : '',
                        }))
                      }
                      className={`px-3 py-2 text-xs font-semibold rounded-lg whitespace-nowrap border transition ${
                        localSettings.isSuperChillUser
                          ? 'bg-[var(--glass-success)] text-white border-[var(--glass-success)]'
                          : 'bg-[var(--glass-panel-elevated)] text-[var(--glass-text-muted)] border-[var(--glass-border)] hover:bg-[var(--glass-panel-elevated-hover)]'
                      }`}
                    >
                      {localSettings.isSuperChillUser ? '🌟 Super Chill ON' : 'Chill OFF'}
                    </button>
                  </div>
                  <p className="text-[11px] text-[var(--glass-text-faint)] mt-1">
                    ID 1394001641899954368 activates VIP favorite-homie status (ultra supportive, wholesome swearing).
                  </p>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--glass-text)] block mb-1">
                  System Persona Prompt
                </label>
                <textarea
                  rows={4}
                  value={
                    localSettings.activePersonaId === 'custom'
                      ? localSettings.customPersona.systemPrompt
                      : DEFAULT_PERSONAS[localSettings.activePersonaId].systemPrompt
                  }
                  onChange={(e) => {
                    if (localSettings.activePersonaId === 'custom') {
                      handleCustomPersonaUpdate({ systemPrompt: e.target.value });
                    }
                  }}
                  disabled={localSettings.activePersonaId !== 'custom'}
                  className="glass-input text-base sm:text-xs font-mono disabled:text-[var(--glass-text-faint)] disabled:opacity-70"
                />
                {localSettings.activePersonaId !== 'custom' && (
                  <p className="text-[11px] text-[var(--glass-warn)] mt-1">
                    Select "Custom Persona" in the Personas tab to write arbitrary system instructions.
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--glass-text)] block mb-1">
                  Custom User Directives & Rules (Always Applied)
                </label>
                <textarea
                  rows={3}
                  value={localSettings.userCustomDirectives}
                  onChange={(e) =>
                    setLocalSettings((prev) => ({ ...prev, userCustomDirectives: e.target.value }))
                  }
                  className="glass-input text-base sm:text-xs font-mono"
                  placeholder="e.g. Rule 1: Only output JSON. Rule 2: If message is scam return safety 0.05. Rule 3: If user needs help give direct steps."
                />
              </div>
            </div>
          )}
        </div>

      </div>
    </Modal>
  );
};
