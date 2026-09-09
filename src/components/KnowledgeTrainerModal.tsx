import React, { useState, useEffect } from 'react';
import { Database, Plus, Trash2, Search, BookOpen, Sparkles, Zap, Tag } from 'lucide-react';
import { KnowledgeItem } from '../types';
import { computeEmbedding, searchKnowledgeGraph } from '../ai-engine/semanticEngine';
import { Modal } from './Modal';

interface KnowledgeTrainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  knowledgeList: KnowledgeItem[];
  onSaveKnowledge: (newList: KnowledgeItem[]) => void;
}

export const KnowledgeTrainerModal: React.FC<KnowledgeTrainerModalProps> = ({
  isOpen,
  onClose,
  knowledgeList,
  onSaveKnowledge,
}) => {
  const [items, setItems] = useState<KnowledgeItem[]>(knowledgeList);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<KnowledgeItem['category']>('custom-user');
  const [keywords, setKeywords] = useState('');
  const [content, setContent] = useState('');
  const [testQuery, setTestQuery] = useState('');
  const [testResults, setTestResults] = useState<{ item: KnowledgeItem; score: number }[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  // Re-sync the local draft from the live knowledge list every time the modal opens, so it
  // can't silently diverge from (and later overwrite) knowledge changed elsewhere while closed.
  useEffect(() => {
    if (isOpen) {
      setItems(knowledgeList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddKnowledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const kwArray = keywords
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);

    const fullText = `${title} ${kwArray.join(' ')} ${content}`;
    const embedding = computeEmbedding(fullText);

    const newItem: KnowledgeItem = {
      id: `kb-user-${Date.now()}`,
      title: title.trim(),
      category,
      keywords: kwArray.length > 0 ? kwArray : [title.toLowerCase().split(' ')[0]],
      content: content.trim(),
      embeddingVector: embedding,
      createdAt: Date.now(),
    };

    const updated = [newItem, ...items];
    setItems(updated);
    onSaveKnowledge(updated);

    // Sync directly with backend API runtime documents store
    fetch('/api/v1/documents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer nexus_live_key_default',
      },
      body: JSON.stringify({
        id: newItem.id,
        title: newItem.title,
        content: newItem.content,
        category: newItem.category,
        keywords: newItem.keywords,
      }),
    }).catch((err) => console.warn('[Knowledge Sync] Backend sync notice:', err));

    // Reset form
    setTitle('');
    setKeywords('');
    setContent('');
    setShowAddForm(false);
  };

  const handleDeleteItem = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    onSaveKnowledge(updated);

    // Delete from backend API runtime store if custom
    fetch(`/api/v1/documents/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer nexus_live_key_default',
      },
    }).catch(() => {});
  };

  const handleRunTestQuery = (query: string) => {
    setTestQuery(query);
    if (!query.trim()) {
      setTestResults([]);
      return;
    }
    const res = searchKnowledgeGraph(query, items, 3);
    setTestResults(res);
  };

  const filteredItems = items.filter((item) => {
    if (filterCategory === 'all') return true;
    return item.category === filterCategory;
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={<Database className="h-4 w-4" />}
      title="Knowledge Graph & Real-Time Trainer"
      subtitle="Teach Nexus new facts, private memories, and verified reference documents"
      maxWidth="max-w-4xl"
      footer={
        <button type="button" onClick={onClose} className="nx-btn nx-btn-secondary">
          Done
        </button>
      }
    >
        <div className="space-y-6">
          {/* Top Bar: Add Button & Test Query */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Live Retrieval Test */}
            <div className="p-4 rounded-xl bg-[var(--nx-accent-soft)]/60 border border-[var(--nx-accent)]/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--nx-text)] mb-1.5">
                  <Zap className="w-3.5 h-3.5 text-[var(--nx-accent-hover)]" />
                  <span>Test Neural Knowledge Retrieval</span>
                </div>
                <p className="text-xs text-[var(--nx-accent-hover)] mb-2.5">
                  Enter a phrase to test vector similarity and keyword triggering.
                </p>
                <div className="relative">
                  <input
                    type="text"
                    value={testQuery}
                    onChange={(e) => handleRunTestQuery(e.target.value)}
                    placeholder="e.g. self-attention, my custom project, quantum mechanics..."
                    className="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-[var(--nx-accent)]/30 bg-[var(--nx-elevated)] text-[var(--nx-text)]"
                  />
                  <Search className="w-3.5 h-3.5 text-[var(--nx-accent-hover)] absolute left-2.5 top-2.5" />
                </div>
              </div>

              {testResults.length > 0 && (
                <div className="mt-3 space-y-1.5 pt-2 border-t border-[var(--nx-accent)]/30">
                  <div className="text-[11px] font-semibold text-[var(--nx-text)]">Retrieved Vectors:</div>
                  {testResults.map(({ item, score }) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-xs bg-[var(--nx-elevated)]/80 px-2.5 py-1.5 rounded border border-[var(--nx-accent)]/20"
                    >
                      <span className="font-medium text-[var(--nx-text)] truncate max-w-[200px]">{item.title}</span>
                      <span
                        className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          score > 0.6 ? 'bg-emerald-500/15 text-[var(--nx-success)]' : 'bg-[var(--nx-warn)]/15 text-[var(--nx-warn)]'
                        }`}
                      >
                        {(score * 100).toFixed(0)}% Match
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Stats & Teach Trigger */}
            <div className="p-4 rounded-xl bg-[var(--nx-surface)] border border-[var(--nx-border)] flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-[var(--nx-text)] mb-1">Knowledge Index Overview</div>
                <div className="flex items-center gap-4 my-2 text-xs text-[var(--nx-text-muted)]">
                  <div>
                    <span className="font-bold text-[var(--nx-text)] text-base">{items.length}</span> Total Documents
                  </div>
                  <div>
                    <span className="font-bold text-[var(--nx-success)] text-base">
                      {items.filter((i) => i.category === 'custom-user').length}
                    </span>{' '}
                    User-Taught
                  </div>
                </div>
                <p className="text-xs text-[var(--nx-text-faint)]">
                  All vector embeddings are synthesized locally with zero external API calls.
                </p>
              </div>

              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="mt-3 w-full py-2 px-3 rounded-lg text-xs font-semibold bg-[var(--nx-success)] hover:brightness-110 text-black flex items-center justify-center gap-1.5 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showAddForm ? 'Close Add Form' : 'Teach AI New Knowledge'}</span>
              </button>
            </div>
          </div>

          {/* Add Knowledge Form */}
          {showAddForm && (
            <form
              onSubmit={handleAddKnowledge}
              className="p-5 rounded-xl border border-[var(--nx-success)]/30 bg-[var(--nx-success-soft)] space-y-3 animate-in fade-in duration-150"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--nx-success)] flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[var(--nx-success)]" />
                  <span>Teach AI Knowledge Unit</span>
                </span>
                <span className="text-[11px] text-[var(--nx-success)]">Auto-Embedded on Submit</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-[var(--nx-text-muted)] block mb-1">Document Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. My Company Architecture or Project Rules"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-[var(--nx-border)] bg-[var(--nx-elevated)]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[var(--nx-text-muted)] block mb-1">
                    Trigger Keywords (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="e.g. project x, auth flow, guidelines"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-[var(--nx-border)] bg-[var(--nx-elevated)]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[var(--nx-text-muted)] block mb-1">Content / Knowledge Body</label>
                <textarea
                  rows={4}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Provide facts, rules, background information, or structured instructions..."
                  className="w-full text-xs p-3 rounded-lg border border-[var(--nx-border)] bg-[var(--nx-elevated)]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1.5 text-xs text-[var(--nx-text-muted)] hover:bg-[var(--nx-elevated-hover)] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold bg-[var(--nx-success)] hover:brightness-110 text-black rounded-lg flex items-center gap-1.5 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Index into Neural Graph</span>
                </button>
              </div>
            </form>
          )}

            {/* Knowledge List */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-bold text-[var(--nx-text)]">
                Document Corpus ({filteredItems.length} items)
              </span>
              <div className="flex flex-wrap gap-1 text-xs max-h-24 overflow-y-auto pr-1">
                <button
                  onClick={() => setFilterCategory('all')}
                  className={`px-2 py-0.5 rounded-lg text-[11px] whitespace-nowrap transition ${
                    filterCategory === 'all'
                      ? 'bg-[var(--nx-elevated-hover)] text-white font-medium'
                      : 'bg-[var(--nx-elevated)] text-[var(--nx-text-muted)] hover:bg-[var(--nx-elevated-hover)]'
                  }`}
                >
                  All ({items.length})
                </button>
                {Array.from(new Set(items.map((i) => i.category))).sort().map((cat) => {
                  const count = items.filter((i) => i.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setFilterCategory(cat)}
                      className={`px-2 py-0.5 rounded-lg text-[11px] whitespace-nowrap transition ${
                        filterCategory === cat
                          ? 'bg-[var(--nx-elevated-hover)] text-white font-medium'
                          : 'bg-[var(--nx-elevated)] text-[var(--nx-text-muted)] hover:bg-[var(--nx-elevated-hover)]'
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-[var(--nx-r-md)] border border-[var(--nx-border)] bg-[var(--nx-elevated)] hover:border-[var(--nx-border-strong)] transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[var(--nx-text)] text-xs">{item.title}</span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                            item.category === 'custom-user'
                              ? 'bg-emerald-500/15 text-[var(--nx-success)]'
                              : 'bg-[var(--nx-elevated)] text-[var(--nx-text-muted)]'
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                      {item.category === 'custom-user' && (
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1 text-[var(--nx-text-faint)] hover:text-rose-400 rounded transition"
                          title="Delete knowledge item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-[var(--nx-text-muted)] line-clamp-3 leading-relaxed">{item.content}</p>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-[var(--nx-border-subtle)] flex items-center justify-between text-[11px] text-[var(--nx-text-faint)]">
                    <div className="flex items-center gap-1.5 truncate max-w-[400px]">
                      <Tag className="w-3 h-3 text-[var(--nx-text-faint)]" />
                      <span className="truncate">{item.keywords.join(', ')}</span>
                    </div>
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

    </Modal>
  );
};
