import React, { useState, useEffect } from 'react';
import { BrainCircuit, Layers, Sparkles, BarChart3 } from 'lucide-react';
import { AttentionScore } from '../types';
import { tokenize, estimateEntropy } from '../ai-engine/tokenizer';
import {
  computeEmbedding,
  SEMANTIC_DIMENSIONS,
  SEMANTIC_DIMENSION_LABELS,
} from '../ai-engine/semanticEngine';
import { Modal } from './Modal';

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
  lastPrompt,
  attentionHeads,
}) => {
  const [inputText, setInputText] = useState(
    lastPrompt || 'How does self-attention compute query, key, and value vectors in transformers?'
  );
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  // The modal is always mounted (isOpen only gates the render), so re-sync the
  // editable text to whichever message the user clicked to inspect.
  useEffect(() => {
    if (isOpen && lastPrompt) setInputText(lastPrompt);
  }, [isOpen, lastPrompt]);

  if (!isOpen) return null;

  const tokens = tokenize(inputText);
  const entropy = estimateEntropy(tokens);
  const semanticVec = computeEmbedding(inputText);

  const getHeatmapColor = (score: number) => {
    if (score > 0.8) return 'bg-[var(--nx-accent)] text-white font-bold';
    if (score > 0.6) return 'bg-[var(--nx-accent)]/70 text-white font-medium';
    if (score > 0.4) return 'bg-[var(--nx-accent)]/35 text-[var(--nx-text)]';
    if (score > 0.2) return 'bg-[var(--nx-accent-soft)] text-[var(--nx-text)]';
    return 'bg-[var(--nx-elevated)] text-[var(--nx-text-muted)]';
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={<BrainCircuit className="h-4 w-4" />}
      title="Neural Attention & Semantic Latent Map"
      subtitle="Multi-head self-attention weights (Q·Kᵀ), token entropy, and vector projection"
      maxWidth="max-w-4xl"
      footer={
        <button type="button" onClick={onClose} className="nx-btn nx-btn-secondary">
          Close inspector
        </button>
      }
    >
      <div className="space-y-6">
        {/* Prompt inspector */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="nx-eyebrow">Input sequence for attention analysis</span>
            <span className="font-mono text-[11px] text-[var(--nx-text-faint)]">
              {tokens.length} tok · {entropy} bits · {attentionHeads} heads
            </span>
          </div>
          <textarea
            rows={2}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="nx-input resize-y text-xs"
            placeholder="Type any prompt to test attention and token activation…"
          />
        </div>

        {/* Token heatmap */}
        <div className="nx-card space-y-3 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--nx-text)]">
              <Layers className="h-4 w-4 text-[var(--nx-accent-hover)]" />
              <span>Self-attention token heatmap</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-[var(--nx-text-faint)]">
              <span>low</span>
              <span className="inline-block h-3 w-3 rounded bg-[var(--nx-elevated-hover)]" />
              <span className="inline-block h-3 w-3 rounded bg-[var(--nx-accent)]/35" />
              <span className="inline-block h-3 w-3 rounded bg-[var(--nx-accent)]/70" />
              <span className="inline-block h-3 w-3 rounded bg-[var(--nx-accent)]" />
              <span>high</span>
            </div>
          </div>

          <div className="flex min-h-[60px] flex-wrap gap-1.5 rounded-[var(--nx-r-sm)] border border-[var(--nx-border)] bg-[var(--nx-bg)]/50 p-3">
            {tokens
              .filter((token) => token.type !== 'whitespace' && token.text.trim().length > 0)
              .map((token, idx) => {
                const isSelected = selectedToken === token.text;
                return (
                  <button
                    key={`${token.id}-${idx}`}
                    onClick={() => setSelectedToken(token.text)}
                    className={`rounded px-2 py-1 text-xs transition ${getHeatmapColor(token.weight)} ${
                      isSelected ? 'ring-2 ring-[var(--nx-accent)]' : 'hover:opacity-90'
                    }`}
                    title={`Token ID: ${token.id} · weight ${(token.weight * 100).toFixed(0)}%`}
                  >
                    {token.text}
                  </button>
                );
              })}
          </div>

          {selectedToken && (
            <div className="flex items-center justify-between rounded-[var(--nx-r-sm)] border border-[var(--nx-accent)]/30 bg-[var(--nx-accent-soft)] p-2.5 text-xs text-[var(--nx-accent-hover)]">
              <span>
                Inspected token: <strong className="font-mono">{selectedToken}</strong>
              </span>
              <span className="text-[11px] text-[var(--nx-text-faint)]">
                Click any token to inspect
              </span>
            </div>
          )}
        </div>

        {/* Semantic vector */}
        <div className="nx-card space-y-3 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--nx-text)]">
              <BarChart3 className="h-4 w-4 text-[var(--nx-success)]" />
              <span>{SEMANTIC_DIMENSIONS.length}-dimensional latent semantic projection</span>
            </div>
            <span className="font-mono text-[11px] text-[var(--nx-text-faint)]">
              normalized vector space
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1 sm:grid-cols-5">
            {SEMANTIC_DIMENSIONS.map((dim, i) => {
              const val = semanticVec[i] || 0;
              return (
                <div
                  key={dim}
                  className="space-y-1 rounded-[var(--nx-r-sm)] border border-[var(--nx-border)] bg-[var(--nx-elevated)] p-2.5"
                >
                  <div className="flex justify-between text-[11px] font-medium text-[var(--nx-text-muted)]">
                    <span className="truncate">{SEMANTIC_DIMENSION_LABELS[dim] || dim}</span>
                    <span className="font-mono font-bold text-[var(--nx-text)]">
                      {(val * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--nx-bg)]">
                    <div
                      className="h-full rounded-full bg-[var(--nx-accent)] transition-all duration-300"
                      style={{ width: `${Math.min(100, val * 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-[var(--nx-r-md)] border border-[var(--nx-warn)]/30 bg-[var(--nx-warn)]/10 p-3.5 text-[11px] leading-relaxed text-[var(--nx-warn)]">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            This visualizer showcases the token projections and attention routing mechanics that let
            the engine prioritize key terms, maintain context cohesion, and compute multi-perspective
            synthesis.
          </p>
        </div>
      </div>
    </Modal>
  );
};
