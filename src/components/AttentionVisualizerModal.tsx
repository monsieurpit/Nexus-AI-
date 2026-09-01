import React, { useState, useEffect } from 'react';
import {
  X,
  BrainCircuit,
  Zap,
  Activity,
  Layers,
  Sparkles,
  BarChart3,
} from 'lucide-react';
import { AttentionScore } from '../types';
import { tokenize, estimateEntropy } from '../ai-engine/tokenizer';
import { computeEmbedding, SEMANTIC_DIMENSIONS, SEMANTIC_DIMENSION_LABELS } from '../ai-engine/semanticEngine';

interface AttentionVisualizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lastAttentionMatrix?: AttentionScore[];
  lastPrompt?: string;
  attentionHeads: number;
}

export const AttentionVisualizerModal: React.FC<AttentionVisualizerModalProps> = ({
  isOpen,
  onClose,
  lastAttentionMatrix,
  lastPrompt,
  attentionHeads,
}) => {
  const [inputText, setInputText] = useState(
    lastPrompt || 'How does self-attention compute query, key, and value vectors in transformers?'
  );
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  // This modal is always mounted by App.tsx (isOpen only gates an early return below, it never
  // unmounts the component), so the useState initializer above only ever runs once, on the very
  // first mount — before the user has sent any message, when lastPrompt is still undefined. Every
  // later "inspect attention" click on a real message updates lastPrompt in the parent, but
  // without this effect nothing here ever re-syncs inputText to it, so the visualizer keeps
  // showing whatever was there at mount (the hardcoded placeholder, or whatever the user last
  // typed manually) instead of the specific message the user clicked to inspect — silently
  // analyzing the wrong text. Matches the same open-sync pattern ModelCustomizerModal and
  // KnowledgeTrainerModal already use for their own local-state-from-props initialization.
  useEffect(() => {
    if (isOpen && lastPrompt) {
      setInputText(lastPrompt);
    }
  }, [isOpen, lastPrompt]);

  if (!isOpen) return null;

  const tokens = tokenize(inputText);
  const entropy = estimateEntropy(tokens);
  const semanticVec = computeEmbedding(inputText);

  const getHeatmapColor = (score: number) => {
    if (score > 0.8) return 'bg-[var(--nx-accent)] text-white font-bold';
    if (score > 0.6) return 'bg-indigo-400 text-white font-medium';
    if (score > 0.4) return 'bg-indigo-400/30 text-indigo-200';
    if (score > 0.2) return 'bg-[var(--nx-accent)]/20 text-[var(--nx-text)]';
    return 'bg-[var(--nx-elevated)] text-[var(--nx-text-muted)]';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        id="attention-visualizer-modal"
        className="bg-[var(--nx-elevated)] rounded-2xl shadow-2xl border border-[var(--nx-border)] w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--nx-border)] bg-[var(--nx-surface)]/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--nx-accent)] text-white flex items-center justify-center">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--nx-text)]">Neural Attention & Semantic Latent Map</h2>
              <p className="text-xs text-[var(--nx-text-faint)]">
                Visualize multi-head self-attention weights ($Q \cdot K^T$), token entropy, and vector projection
              </p>
            </div>
          </div>
          <button
            id="close-attention-modal-btn"
            onClick={onClose}
            className="p-1.5 text-[var(--nx-text-faint)] hover:text-[var(--nx-text-muted)] hover:bg-[var(--nx-elevated)] rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Prompt Inspector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[var(--nx-text)] flex items-center justify-between">
              <span>Input Sequence for Attention Analysis</span>
              <span className="font-normal text-[var(--nx-text-faint)] text-[11px]">
                {tokens.length} Tokens • Entropy: {entropy} bits • {attentionHeads} Active Heads
              </span>
            </label>
            <textarea
              rows={2}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-[var(--nx-border)] bg-[var(--nx-surface)]/50 focus:bg-[var(--nx-elevated)] transition"
              placeholder="Type any prompt to test attention and token activation..."
            />
          </div>

          {/* Interactive Token Attention Heatmap */}
          <div className="p-4 rounded-xl bg-[var(--nx-surface)] border border-[var(--nx-border)] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--nx-text)]">
                <Layers className="w-4 h-4 text-[var(--nx-accent-hover)]" />
                <span>Self-Attention Token Heatmap</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-[var(--nx-text-faint)] font-medium">
                <span>Low</span>
                <span className="w-3 h-3 rounded bg-[var(--nx-elevated-hover)] inline-block" />
                <span className="w-3 h-3 rounded bg-indigo-400/30 inline-block" />
                <span className="w-3 h-3 rounded bg-indigo-400 inline-block" />
                <span className="w-3 h-3 rounded bg-[var(--nx-accent)] inline-block" />
                <span>High Attention</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 p-3 bg-[var(--nx-elevated)] rounded-lg border border-[var(--nx-border)] min-h-[60px]">
              {tokens
                .filter((token) => token.type !== 'whitespace' && token.text.trim().length > 0)
                .map((token, idx) => {
                  const isSelected = selectedToken === token.text;
                  return (
                    <button
                      key={`${token.id}-${idx}`}
                      onClick={() => setSelectedToken(token.text)}
                      className={`px-2 py-1 rounded text-xs transition cursor-pointer ${getHeatmapColor(
                        token.weight
                      )} ${isSelected ? 'ring-2 ring-[var(--nx-accent)] scale-105' : 'hover:opacity-90'}`}
                      title={`Token ID: ${token.id} | Weight: ${(token.weight * 100).toFixed(0)}%`}
                    >
                      {token.text}
                    </button>
                  );
                })}
            </div>

            {selectedToken && (
              <div className="p-2.5 rounded-lg bg-[var(--nx-accent-soft)] border border-[var(--nx-accent)]/30 text-xs text-indigo-300 flex items-center justify-between">
                <span>
                  Inspected Token: <strong className="font-mono">{selectedToken}</strong>
                </span>
                <span className="text-[11px] text-[var(--nx-accent-hover)]">Click any token to inspect</span>
              </div>
            )}
          </div>

          {/* Semantic Vector Dimensions */}
          <div className="p-4 rounded-xl bg-[var(--nx-surface)] border border-[var(--nx-border)] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--nx-text)]">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                <span>{SEMANTIC_DIMENSIONS.length}-Dimensional Latent Semantic Projection</span>
              </div>
              <span className="text-[11px] text-[var(--nx-text-faint)] font-mono">Normalized Vector Space</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
              {SEMANTIC_DIMENSIONS.map((dim, i) => {
                const val = semanticVec[i] || 0;
                return (
                  <div key={dim} className="bg-[var(--nx-elevated)] p-2.5 rounded-lg border border-[var(--nx-border)] space-y-1">
                    <div className="flex justify-between text-[11px] text-[var(--nx-text-muted)] font-medium">
                      <span>{SEMANTIC_DIMENSION_LABELS[dim] || dim}</span>
                      <span className="font-mono text-[var(--nx-text)] font-bold">{(val * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-[var(--nx-elevated)] rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-[var(--nx-accent)] h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, val * 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Theoretical Foundations Note */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed text-[11px]">
              This visualizer showcases the mathematical token projections and attention routing mechanics that allow the
              AI to prioritize key terms, maintain context cohesion, and compute multi-perspective synthesis.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[var(--nx-border)] bg-[var(--nx-surface)] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold bg-[var(--nx-elevated-hover)] text-white rounded-xl hover:bg-[var(--nx-elevated)] transition"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
