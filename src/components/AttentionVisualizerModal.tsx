import React, { useState } from 'react';
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
import { computeEmbedding, SEMANTIC_DIMENSIONS } from '../ai-engine/semanticEngine';

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

  if (!isOpen) return null;

  const tokens = tokenize(inputText);
  const entropy = estimateEntropy(tokens);
  const semanticVec = computeEmbedding(inputText);

  const getHeatmapColor = (score: number) => {
    if (score > 0.8) return 'bg-indigo-600 text-white font-bold';
    if (score > 0.6) return 'bg-indigo-400 text-white font-medium';
    if (score > 0.4) return 'bg-indigo-200 text-indigo-950';
    if (score > 0.2) return 'bg-indigo-100 text-indigo-900';
    return 'bg-stone-100 text-stone-700';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        id="attention-visualizer-modal"
        className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900">Neural Attention & Semantic Latent Map</h2>
              <p className="text-xs text-stone-500">
                Visualize multi-head self-attention weights ($Q \cdot K^T$), token entropy, and vector projection
              </p>
            </div>
          </div>
          <button
            id="close-attention-modal-btn"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Prompt Inspector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-800 flex items-center justify-between">
              <span>Input Sequence for Attention Analysis</span>
              <span className="font-normal text-stone-500 text-[11px]">
                {tokens.length} Tokens • Entropy: {entropy} bits • {attentionHeads} Active Heads
              </span>
            </label>
            <textarea
              rows={2}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-stone-300 bg-stone-50/50 focus:bg-white transition"
              placeholder="Type any prompt to test attention and token activation..."
            />
          </div>

          {/* Interactive Token Attention Heatmap */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>Self-Attention Token Heatmap</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-stone-500 font-medium">
                <span>Low</span>
                <span className="w-3 h-3 rounded bg-stone-200 inline-block" />
                <span className="w-3 h-3 rounded bg-indigo-200 inline-block" />
                <span className="w-3 h-3 rounded bg-indigo-400 inline-block" />
                <span className="w-3 h-3 rounded bg-indigo-600 inline-block" />
                <span>High Attention</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 p-3 bg-white rounded-lg border border-stone-200 min-h-[60px]">
              {tokens.map((token, idx) => {
                const isSelected = selectedToken === token.text;
                return (
                  <button
                    key={`${token.id}-${idx}`}
                    onClick={() => setSelectedToken(token.text)}
                    className={`px-2 py-1 rounded text-xs transition cursor-pointer ${getHeatmapColor(
                      token.weight
                    )} ${isSelected ? 'ring-2 ring-stone-900 scale-105' : 'hover:opacity-90'}`}
                    title={`Token ID: ${token.id} | Weight: ${(token.weight * 100).toFixed(0)}%`}
                  >
                    {token.text}
                  </button>
                );
              })}
            </div>

            {selectedToken && (
              <div className="p-2.5 rounded-lg bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 flex items-center justify-between">
                <span>
                  Inspected Token: <strong className="font-mono">{selectedToken}</strong>
                </span>
                <span className="text-[11px] text-indigo-700">Click any token to inspect</span>
              </div>
            )}
          </div>

          {/* Semantic Vector Dimensions */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <span>{SEMANTIC_DIMENSIONS.length}-Dimensional Latent Semantic Projection</span>
              </div>
              <span className="text-[11px] text-stone-500 font-mono">Normalized Vector Space</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
              {SEMANTIC_DIMENSIONS.map((dim, i) => {
                const val = semanticVec[i] || 0;
                return (
                  <div key={dim} className="bg-white p-2.5 rounded-lg border border-stone-200 space-y-1">
                    <div className="flex justify-between text-[11px] text-stone-600 capitalize font-medium">
                      <span>{dim}</span>
                      <span className="font-mono text-stone-900 font-bold">{(val * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, val * 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Theoretical Foundations Note */}
          <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed text-[11px]">
              This visualizer showcases the mathematical token projections and attention routing mechanics that allow the
              AI to prioritize key terms, maintain context cohesion, and compute multi-perspective synthesis.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
