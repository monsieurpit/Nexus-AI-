import React, { useState } from 'react';
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
} from 'lucide-react';
import { AISettings, ModelPersona, ModelPersonaId, ReasoningMode } from '../types';
import { DEFAULT_PERSONAS, DEFAULT_SETTINGS } from '../ai-engine/memoryStore';

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
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 400);
  };

  const handleResetToDefaults = () => {
    setLocalSettings(DEFAULT_SETTINGS);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        id="model-customizer-modal"
        className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center">
              <Sliders className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900">Model Customization & Neural Tuning</h2>
              <p className="text-xs text-stone-500">Fine-tune system personas, sampling hyperparameters, and tone</p>
            </div>
          </div>
          <button
            id="close-customizer-modal-btn"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 px-6 bg-white gap-2 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('persona')}
            className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'persona'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Personas</span>
          </button>
          <button
            onClick={() => setActiveTab('parameters')}
            className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'parameters'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Sampling & Attention</span>
          </button>
          <button
            onClick={() => setActiveTab('tone')}
            className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'tone'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Tone Sliders</span>
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`py-3 px-3 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'system'
                ? 'border-indigo-600 text-indigo-600 font-semibold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>System Directives</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          {/* Persona Tab */}
          {activeTab === 'persona' && (
            <div className="space-y-4">
              <div className="text-xs text-stone-500 font-medium">
                Choose a cognitive archetype designed with DeepMind Gemini behavioral patterns:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.values(DEFAULT_PERSONAS).map((persona) => {
                  const isSelected = localSettings.activePersonaId === persona.id;
                  return (
                    <div
                      key={persona.id}
                      onClick={() => handlePersonaChange(persona.id)}
                      className={`cursor-pointer p-4 rounded-xl border transition flex flex-col justify-between ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600'
                          : 'border-stone-200 bg-stone-50/40 hover:bg-stone-100/60'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-stone-900 text-sm">{persona.name}</span>
                          {isSelected && (
                            <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-semibold">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-medium text-indigo-700 mb-1">{persona.tagline}</p>
                        <p className="text-xs text-stone-600 line-clamp-2">{persona.description}</p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-500">
                        <span>Temp: {persona.defaultTemperature}</span>
                        <span className="capitalize">{persona.reasoningMode} Mode</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {localSettings.activePersonaId === 'custom' && (
                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-3 mt-4">
                  <div className="text-xs font-semibold text-amber-900 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Custom Persona Configuration</span>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1">Persona Name</label>
                    <input
                      type="text"
                      value={localSettings.customPersona.name}
                      onChange={(e) => handleCustomPersonaUpdate({ name: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 bg-white"
                      placeholder="e.g. Quantum Physics Tutor"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-stone-700 block mb-1">Tagline</label>
                    <input
                      type="text"
                      value={localSettings.customPersona.tagline}
                      onChange={(e) => handleCustomPersonaUpdate({ tagline: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 bg-white"
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
              {/* Temperature */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <label className="font-semibold text-stone-900 text-xs">Temperature (Randomness)</label>
                    <Info className="w-3.5 h-3.5 text-stone-400" />
                  </div>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-stone-100 font-medium">
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
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-stone-500">
                  <span>0.0 (Deterministic & Logical)</span>
                  <span>0.7 (Balanced)</span>
                  <span>1.5 (High Entropy & Creative)</span>
                </div>
              </div>

              {/* Top-P (Nucleus Sampling) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-stone-900 text-xs">Top-P (Nucleus Sampling)</label>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-stone-100 font-medium">
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
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <p className="text-[11px] text-stone-500">
                  Cumulative probability threshold for candidate token selection during decoding.
                </p>
              </div>

              {/* Reasoning Mode */}
              <div className="space-y-2">
                <label className="font-semibold text-stone-900 text-xs block">
                  System 2 Reasoning Depth
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['fast', 'thorough', 'deep-cot'] as ReasoningMode[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setLocalSettings((prev) => ({ ...prev, reasoningMode: mode }))}
                      className={`px-3 py-2.5 rounded-xl border text-xs font-medium text-center capitalize transition ${
                        localSettings.reasoningMode === mode
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold'
                          : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      {mode === 'deep-cot' ? 'Deep Chain-of-Thought' : mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Multi-Head Attention Channels */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-stone-900 text-xs">Multi-Head Attention Channels</label>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-stone-100 font-medium">
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
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              {/* Streaming Speed */}
              <div className="space-y-2">
                <label className="font-semibold text-stone-900 text-xs block">Generation Cadence</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['instant', 'fast', 'natural', 'reflective'] as AISettings['streamingSpeed'][]).map(
                    (speed) => (
                      <button
                        key={speed}
                        onClick={() => setLocalSettings((prev) => ({ ...prev, streamingSpeed: speed }))}
                        className={`px-2.5 py-2 rounded-lg border text-xs capitalize transition ${
                          localSettings.streamingSpeed === speed
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold'
                            : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                        }`}
                      >
                        {speed}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* 🌐 Autonomous Web Search & Google Grounding */}
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-blue-50/80 via-sky-50/60 to-indigo-50/70 border border-blue-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center">
                      <Globe className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                        <span>Autonomous Live Web Search</span>
                        <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[10px] rounded font-semibold">
                          Infinite Free Quota
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500">
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
                    <div className="w-9 h-5 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Trigger Mode */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-700 block">
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
                            ? 'border-blue-600 bg-blue-100/70 text-blue-950 font-bold shadow-sm'
                            : 'border-stone-200/80 bg-white/80 hover:bg-white text-stone-700'
                        }`}
                      >
                        <div className="text-xs">{m.label}</div>
                        <div className="text-[9px] text-stone-500 line-clamp-1">{m.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search Provider Selection */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-700 block">
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
                            ? 'border-blue-600 bg-blue-100/80 text-blue-950 font-semibold'
                            : 'border-stone-200/80 bg-white/80 hover:bg-white text-stone-600'
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
              <div className="text-xs text-stone-500">
                Adjust the personality and stylistic delivery spectrum of the AI:
              </div>

              {/* Warmth Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-stone-800">
                  <span>Warmth & Empathy</span>
                  <span className="text-indigo-600">{currentPersona.toneSettings.warmth}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={currentPersona.toneSettings.warmth}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    handleCustomPersonaUpdate({
                      toneSettings: { ...currentPersona.toneSettings, warmth: val },
                    });
                  }}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-stone-400">
                  <span>Clinical & Direct</span>
                  <span>Empathetic & Friendly</span>
                </div>
              </div>

              {/* Technicality Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-stone-800">
                  <span>Technical Depth & Jargon</span>
                  <span className="text-indigo-600">{currentPersona.toneSettings.technicality}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={currentPersona.toneSettings.technicality}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    handleCustomPersonaUpdate({
                      toneSettings: { ...currentPersona.toneSettings, technicality: val },
                    });
                  }}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-stone-400">
                  <span>Plain Language</span>
                  <span>Rigorous Academic / Spec</span>
                </div>
              </div>

              {/* Verbosity Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-stone-800">
                  <span>Verbosity & Elaboration</span>
                  <span className="text-indigo-600">{currentPersona.toneSettings.verbosity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={currentPersona.toneSettings.verbosity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    handleCustomPersonaUpdate({
                      toneSettings: { ...currentPersona.toneSettings, verbosity: val },
                    });
                  }}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-stone-400">
                  <span>Ultra-Concise</span>
                  <span>Comprehensive & Detailed</span>
                </div>
              </div>

              {/* Creativity Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-stone-800">
                  <span>Creativity & Metaphor</span>
                  <span className="text-indigo-600">{currentPersona.toneSettings.creativity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={currentPersona.toneSettings.creativity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    handleCustomPersonaUpdate({
                      toneSettings: { ...currentPersona.toneSettings, creativity: val },
                    });
                  }}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-stone-400">
                  <span>Strictly Factual</span>
                  <span>Poetic & Conceptual</span>
                </div>
              </div>

              {/* Roast & Banter Slider */}
              <div className="space-y-1.5 pt-2 border-t border-stone-200">
                <div className="flex justify-between text-xs font-semibold text-stone-800">
                  <span className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    <span>Roast & Savage Banter Intensity</span>
                  </span>
                  <span className="text-amber-600 font-bold">{localSettings.roastIntensity ?? 75}%</span>
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
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-stone-400">
                  <span>Gentle & Polite</span>
                  <span>High-Octane Savage Banter & Roasts</span>
                </div>
              </div>

              {/* Swear Engine & Expressive Profanity Pipeline */}
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-rose-50/70 via-amber-50/50 to-orange-50/70 border border-rose-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-rose-600 text-white flex items-center justify-center text-xs font-black">
                      #!
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                        <span>Autonomous Swear Engine</span>
                        <span className="px-1.5 py-0.2 bg-rose-100 text-rose-700 text-[10px] rounded font-semibold">
                          Active
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500">
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
                    <div className="w-9 h-5 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-600"></div>
                  </label>
                </div>

                {/* Swear Intensity Levels */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-stone-700 block">
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
                            ? 'border-rose-600 bg-rose-100/70 text-rose-950 font-bold shadow-sm'
                            : 'border-stone-200/80 bg-white/80 hover:bg-white text-stone-700'
                        }`}
                      >
                        <div className="text-xs">{tier.label}</div>
                        <div className="text-[9px] text-stone-500 line-clamp-1">{tier.desc}</div>
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
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-indigo-50/80 to-purple-50/80 border border-indigo-100 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-950">
                    <Bot className="w-4 h-4 text-indigo-600" />
                    <span>Discord Bot & Rule Engine Presets</span>
                  </div>
                  <span className="text-[10px] text-indigo-600 font-medium px-2 py-0.5 bg-white rounded-full border border-indigo-200">
                    1-Click Load
                  </span>
                </div>
                <p className="text-[11px] text-stone-600">
                  Quickly configure rules for Discord server moderation, 0-1 threat scoring, community help, or roast mode:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleApplyPreset('nexus')}
                    className="p-2 rounded-lg bg-white border border-stone-200 text-left hover:border-violet-500 hover:bg-violet-50/40 transition flex flex-col gap-0.5"
                  >
                    <div className="flex items-center gap-1 text-[11px] font-bold text-stone-900">
                      <Bot className="w-3 h-3 text-violet-600" />
                      <span>Nexus (Discord Homie)</span>
                    </div>
                    <span className="text-[10px] text-stone-500 line-clamp-1">Swearing, Roasts & Facts</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyPreset('nexus_superchill')}
                    className="p-2 rounded-lg bg-white border border-stone-200 text-left hover:border-emerald-500 hover:bg-emerald-50/40 transition flex flex-col gap-0.5"
                  >
                    <div className="flex items-center gap-1 text-[11px] font-bold text-stone-900">
                      <Smile className="w-3 h-3 text-emerald-600" />
                      <span>Nexus (Super Chill Homie)</span>
                    </div>
                    <span className="text-[10px] text-stone-500 line-clamp-1">User ID 1394001641899954368</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyPreset('raidshield')}
                    className="p-2 rounded-lg bg-white border border-stone-200 text-left hover:border-emerald-500 hover:bg-emerald-50/40 transition flex flex-col gap-0.5"
                  >
                    <div className="flex items-center gap-1 text-[11px] font-bold text-stone-900">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>RaidShield AI</span>
                    </div>
                    <span className="text-[10px] text-stone-500 line-clamp-1">21 Hard Rules JSON</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyPreset('discord_safety')}
                    className="p-2 rounded-lg bg-white border border-stone-200 text-left hover:border-indigo-400 hover:bg-indigo-50/40 transition flex flex-col gap-0.5"
                  >
                    <div className="flex items-center gap-1 text-[11px] font-bold text-stone-900">
                      <ShieldAlert className="w-3 h-3 text-emerald-600" />
                      <span>Safety & Helper Bot</span>
                    </div>
                    <span className="text-[10px] text-stone-500 line-clamp-1">0-1 Score + Help Handler</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyPreset('discord_json')}
                    className="p-2 rounded-lg bg-white border border-stone-200 text-left hover:border-indigo-400 hover:bg-indigo-50/40 transition flex flex-col gap-0.5"
                  >
                    <div className="flex items-center gap-1 text-[11px] font-bold text-stone-900">
                      <Terminal className="w-3 h-3 text-indigo-600" />
                      <span>Strict JSON Format</span>
                    </div>
                    <span className="text-[10px] text-stone-500 line-clamp-1">Exact JSON safety payload</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyPreset('roast')}
                    className="p-2 rounded-lg bg-white border border-stone-200 text-left hover:border-amber-400 hover:bg-amber-50/40 transition flex flex-col gap-0.5"
                  >
                    <div className="flex items-center gap-1 text-[11px] font-bold text-stone-900">
                      <Flame className="w-3 h-3 text-amber-500" />
                      <span>Savage Roast Bot</span>
                    </div>
                    <span className="text-[10px] text-stone-500 line-clamp-1">Banter, swearing & burns</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyPreset('crashout')}
                    className="p-2 rounded-lg bg-white border border-stone-200 text-left hover:border-rose-400 hover:bg-rose-50/40 transition flex flex-col gap-0.5"
                  >
                    <div className="flex items-center gap-1 text-[11px] font-bold text-stone-900">
                      <Zap className="w-3 h-3 text-rose-500" />
                      <span>Crashout & Rage</span>
                    </div>
                    <span className="text-[10px] text-stone-500 line-clamp-1">All-caps frantic chaos</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyPreset('chill')}
                    className="p-2 rounded-lg bg-white border border-stone-200 text-left hover:border-emerald-400 hover:bg-emerald-50/40 transition flex flex-col gap-0.5"
                  >
                    <div className="flex items-center gap-1 text-[11px] font-bold text-stone-900">
                      <Smile className="w-3 h-3 text-emerald-500" />
                      <span>Chill Zen Mod</span>
                    </div>
                    <span className="text-[10px] text-stone-500 line-clamp-1">Relaxed wholesome vibes</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyPreset('strict_only')}
                    className="p-2 rounded-lg bg-white border border-stone-200 text-left hover:border-indigo-400 hover:bg-indigo-50/40 transition flex flex-col gap-0.5"
                  >
                    <div className="flex items-center gap-1 text-[11px] font-bold text-stone-900">
                      <Check className="w-3 h-3 text-indigo-600" />
                      <span>Strict Constraint</span>
                    </div>
                    <span className="text-[10px] text-stone-500 line-clamp-1">'Only answer X' adherence</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-900 block mb-1">
                    User Name / Call Sign
                  </label>
                  <input
                    type="text"
                    value={localSettings.userName}
                    onChange={(e) => setLocalSettings((prev) => ({ ...prev, userName: e.target.value }))}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 bg-white"
                    placeholder="e.g. Alex"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">
                    The AI will address you naturally with this name.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-900 block mb-1">
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
                      className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 bg-white font-mono"
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
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-stone-100 text-stone-700 border-stone-300 hover:bg-stone-200'
                      }`}
                    >
                      {localSettings.isSuperChillUser ? '🌟 Super Chill ON' : 'Chill OFF'}
                    </button>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    ID 1394001641899954368 activates VIP favorite-homie status (ultra supportive, wholesome swearing).
                  </p>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-900 block mb-1">
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
                  className="w-full text-xs font-mono p-3 rounded-lg border border-stone-300 bg-stone-50 disabled:text-stone-500"
                />
                {localSettings.activePersonaId !== 'custom' && (
                  <p className="text-[11px] text-amber-700 mt-1">
                    Select "Custom Persona" in the Personas tab to write arbitrary system instructions.
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-900 block mb-1">
                  Custom User Directives & Rules (Always Applied)
                </label>
                <textarea
                  rows={3}
                  value={localSettings.userCustomDirectives}
                  onChange={(e) =>
                    setLocalSettings((prev) => ({ ...prev, userCustomDirectives: e.target.value }))
                  }
                  className="w-full text-xs p-3 rounded-lg border border-stone-300 bg-white font-mono"
                  placeholder="e.g. Rule 1: Only output JSON. Rule 2: If message is scam return safety 0.05. Rule 3: If user needs help give direct steps."
                />
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-stone-200 bg-stone-50">
          <button
            onClick={handleResetToDefaults}
            className="flex items-center gap-1 text-xs text-stone-600 hover:text-stone-900 font-medium transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-stone-700 hover:bg-stone-200 transition"
            >
              Cancel
            </button>
            <button
              id="save-customizer-btn"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center gap-1.5 transition"
            >
              {savedToast ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              <span>{savedToast ? 'Saved!' : 'Apply Settings'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
