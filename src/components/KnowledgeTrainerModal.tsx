import React, { useState, useEffect, useCallback } from 'react';
import { Database, Plus, Trash2, Search, BookOpen, Sparkles, Zap, Tag } from 'lucide-react';
import { KnowledgeItem } from '../types';
import { Modal } from './Modal';

// Lighter shape returned by GET /api/v1/documents — a 200-char contentSnippet, not the full
// content. Full content is only ever fetched on demand via the search endpoint below (which the
// server already computes fully for its top-K hits) — this modal never holds the entire corpus
// client-side anymore (that used to bundle the whole 500+ file corpus into the browser JS; see
// memoryStore.ts's own comment on why loadKnowledge()/BUILTIN_KNOWLEDGE were removed).
interface DocumentSummary {
  id: string;
  title: string;
  category: string;
  keywords: string[];
  contentSnippet: string;
  contentLength: number;
  createdAt: number;
}

interface TestResult {
  id: string;
  title: string;
  score: number;
}

const API_KEY_HEADER = { Authorization: 'Bearer nexus_live_key_default' };
const PAGE_SIZE = 50;

interface KnowledgeTrainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KnowledgeTrainerModal: React.FC<KnowledgeTrainerModalProps> = ({ isOpen, onClose }) => {
  const [items, setItems] = useState<DocumentSummary[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [userTaughtCount, setUserTaughtCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [nextOffset, setNextOffset] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<KnowledgeItem['category']>('custom-user');
  const [keywords, setKeywords] = useState('');
  const [content, setContent] = useState('');
  const [testQuery, setTestQuery] = useState('');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchPage = useCallback(async (offset: number, append: boolean) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: String(PAGE_SIZE), offset: String(offset) });
      if (filterCategory !== 'all') params.set('category', filterCategory);
      const res = await fetch(`/api/v1/documents?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setItems((prev) => (append ? [...prev, ...data.documents] : data.documents));
      setCategories(data.categories || []);
      setTotalDocuments(data.totalDocuments || 0);
      setHasMore(Boolean(data.hasMore));
      setNextOffset(data.nextOffset ?? null);
      setSyncError(null);
    } catch (err: any) {
      setSyncError(`Couldn't load the knowledge list: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [filterCategory]);

  // Re-fetch page 1 whenever the modal opens or the category filter changes — never holds more
  // than the current page(s) the user has explicitly paged through.
  useEffect(() => {
    if (isOpen) fetchPage(0, false);
  }, [isOpen, fetchPage]);

  useEffect(() => {
    if (!isOpen) return;
    fetch('/api/v1/documents?category=custom-user&limit=1')
      .then((r) => r.json())
      .then((d) => setUserTaughtCount(d.totalDocuments || 0))
      .catch(() => {});
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddKnowledge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const kwArray = keywords
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);

    try {
      const res = await fetch('/api/v1/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...API_KEY_HEADER },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          category,
          keywords: kwArray.length > 0 ? kwArray : [title.toLowerCase().split(' ')[0]],
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `HTTP ${res.status}`);
      }
      setSyncError(null);
      setTitle('');
      setKeywords('');
      setContent('');
      setShowAddForm(false);
      await fetchPage(0, false);
    } catch (err: any) {
      setSyncError(`Couldn't add that knowledge item: ${err.message}`);
    }
  };

  const handleDeleteItem = async (id: string) => {
    // Optimistic — removed from view immediately, restored (with an error banner) if the backend
    // delete actually fails, instead of silently leaving the UI out of sync with the real server
    // state (the old version's delete request errors were fully swallowed).
    const prevItems = items;
    setItems((cur) => cur.filter((item) => item.id !== id));
    try {
      const res = await fetch(`/api/v1/documents/${id}`, {
        method: 'DELETE',
        headers: API_KEY_HEADER,
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `HTTP ${res.status}`);
      }
      setSyncError(null);
      setTotalDocuments((n) => Math.max(0, n - 1));
    } catch (err: any) {
      setItems(prevItems);
      setSyncError(`Couldn't delete that item: ${err.message}`);
    }
  };

  const handleRunTestQuery = async (query: string) => {
    setTestQuery(query);
    if (!query.trim()) {
      setTestResults([]);
      return;
    }
    try {
      // Runs against the server's real search endpoint (the same path live chat generation
      // actually uses, potentially hybrid BM25+embedding search) instead of a client-side
      // re-search over whatever page happens to be loaded — searching only the loaded page would
      // silently miss any unpaginated result.
      const res = await fetch('/api/v1/documents/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, limit: 3 }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setTestResults(
        (data.hits || []).map((h: any) => ({ id: h.id, title: h.title, score: h.score }))
      );
    } catch {
      setTestResults([]);
    }
  };

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
          {syncError && (
            <div className="flex items-center justify-between gap-3 p-3 rounded-lg border border-rose-500/30 bg-rose-500/10 text-xs text-rose-300">
              <span>{syncError}</span>
              <button type="button" onClick={() => setSyncError(null)} className="shrink-0 hover:text-rose-100">
                Dismiss
              </button>
            </div>
          )}

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
                  {testResults.map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center justify-between text-xs bg-[var(--nx-elevated)]/80 px-2.5 py-1.5 rounded border border-[var(--nx-accent)]/20"
                    >
                      <span className="font-medium text-[var(--nx-text)] truncate max-w-[200px]">{r.title}</span>
                      <span
                        className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          r.score > 0.6 ? 'bg-emerald-500/15 text-[var(--nx-success)]' : 'bg-[var(--nx-warn)]/15 text-[var(--nx-warn)]'
                        }`}
                      >
                        {(r.score * 100).toFixed(0)}% Match
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
                    <span className="font-bold text-[var(--nx-text)] text-base">{totalDocuments}</span> Total Documents
                  </div>
                  <div>
                    <span className="font-bold text-[var(--nx-success)] text-base">{userTaughtCount}</span> User-Taught
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
                Document Corpus ({items.length} of {totalDocuments} loaded)
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
                  All
                </button>
                {categories.sort().map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-2 py-0.5 rounded-lg text-[11px] whitespace-nowrap transition ${
                      filterCategory === cat
                        ? 'bg-[var(--nx-elevated-hover)] text-white font-medium'
                        : 'bg-[var(--nx-elevated)] text-[var(--nx-text-muted)] hover:bg-[var(--nx-elevated-hover)]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {items.map((item) => (
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
                          aria-label="Delete knowledge item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-[var(--nx-text-muted)] line-clamp-3 leading-relaxed">{item.contentSnippet}</p>
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

            {hasMore && nextOffset !== null && (
              <button
                type="button"
                onClick={() => fetchPage(nextOffset, true)}
                disabled={loading}
                className="w-full py-2 text-xs font-medium text-[var(--nx-text-muted)] hover:text-[var(--nx-text)] border border-[var(--nx-border)] rounded-lg hover:bg-[var(--nx-elevated-hover)] transition disabled:opacity-50"
              >
                {loading ? 'Loading…' : 'Load more'}
              </button>
            )}
          </div>
        </div>

    </Modal>
  );
};
