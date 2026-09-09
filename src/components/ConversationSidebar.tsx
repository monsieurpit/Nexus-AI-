import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  Download,
  Share2,
  Check,
  X,
  MessageSquare,
  Search,
} from 'lucide-react';
import { Conversation } from '../types';

interface ConversationSidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onNewChat: () => void;
  onSelectConversation: (id: string) => void;
  onRenameConversation: (id: string, title: string) => void;
  onDeleteConversation: (id: string) => void;
  onExportConversation: (id: string) => void;
  onShareConversation: (id: string) => void;
}

function formatWhen(ts: number): string {
  const diffMs = Date.now() - ts;
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  return new Date(ts).toLocaleDateString();
}

/** Buckets a conversation by how recently it was touched, for section headers. */
function bucketFor(ts: number): string {
  const now = new Date();
  const then = new Date(ts);
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const dayMs = 86_400_000;
  if (ts >= startOfToday) return 'Today';
  if (ts >= startOfToday - dayMs) return 'Yesterday';
  if (ts >= startOfToday - 7 * dayMs) return 'Previous 7 days';
  if (ts >= startOfToday - 30 * dayMs) return 'Previous 30 days';
  return then.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
}

const BUCKET_ORDER = ['Today', 'Yesterday', 'Previous 7 days', 'Previous 30 days'];

export const ConversationSidebar: React.FC<ConversationSidebarProps> = ({
  conversations,
  activeConversationId,
  onNewChat,
  onSelectConversation,
  onRenameConversation,
  onDeleteConversation,
  onExportConversation,
  onShareConversation,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState('');
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingId) inputRef.current?.focus();
  }, [editingId]);

  const startEdit = (c: Conversation) => {
    setEditingId(c.id);
    setDraftTitle(c.title);
  };

  const commitEdit = () => {
    if (editingId) {
      const trimmed = draftTitle.trim();
      if (trimmed) onRenameConversation(editingId, trimmed);
    }
    setEditingId(null);
  };

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = conversations
      .filter((c) => {
        if (!q) return true;
        if (c.title.toLowerCase().includes(q)) return true;
        return c.messages.some((m) => m.content.toLowerCase().includes(q));
      })
      .sort((a, b) => b.updatedAt - a.updatedAt);

    const map = new Map<string, Conversation[]>();
    for (const c of filtered) {
      const b = bucketFor(c.updatedAt);
      (map.get(b) ?? map.set(b, []).get(b)!).push(c);
    }
    // Keep the fixed buckets in order, then any month buckets by recency.
    const ordered: [string, Conversation[]][] = [];
    for (const key of BUCKET_ORDER) if (map.has(key)) ordered.push([key, map.get(key)!]);
    for (const [key, list] of map) if (!BUCKET_ORDER.includes(key)) ordered.push([key, list]);
    return { ordered, total: filtered.length };
  }, [conversations, query]);

  return (
    <aside
      className="relative z-10 flex h-screen w-[var(--nx-convo-w)] shrink-0 flex-col border-r border-[var(--nx-border-subtle)] bg-[var(--nx-sidebar)]"
      aria-label="Conversations"
    >
      {/* Header */}
      <div className="shrink-0 space-y-2.5 p-3">
        <div className="flex items-center justify-between px-1">
          <span className="nx-eyebrow">Conversations</span>
          <span className="text-[11px] font-medium text-[var(--nx-text-faint)]">
            {conversations.length}
          </span>
        </div>

        <button type="button" onClick={onNewChat} className="nx-btn nx-btn-primary w-full">
          <Plus className="h-4 w-4" />
          New chat
        </button>

        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--nx-text-faint)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search conversations"
            className="nx-input py-1.5 pl-8 pr-7 text-xs"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--nx-text-faint)] hover:text-[var(--nx-text)]"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="nx-divider mx-3 shrink-0" />

      {/* List */}
      <div className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
        {groups.total === 0 && (
          <div className="px-3 py-10 text-center">
            <MessageSquare className="mx-auto mb-2 h-6 w-6 text-[var(--nx-text-faint)]" />
            <p className="text-xs text-[var(--nx-text-muted)]">
              {query ? 'No conversations match your search.' : 'No conversations yet.'}
            </p>
          </div>
        )}

        {groups.ordered.map(([bucket, list]) => (
          <div key={bucket} className="mb-3">
            <div className="px-2.5 pb-1 pt-1">
              <span className="nx-eyebrow">{bucket}</span>
            </div>

            {list.map((c) => {
              const isActive = c.id === activeConversationId;
              const isEditing = editingId === c.id;
              return (
                <div
                  key={c.id}
                  className={`group relative mb-0.5 flex items-center gap-2 rounded-[var(--nx-r-sm)] px-2.5 py-2 transition-colors duration-100 ${
                    isEditing ? '' : 'cursor-pointer'
                  } ${
                    isActive
                      ? 'bg-[var(--nx-accent-soft)] text-[var(--nx-text)]'
                      : 'text-[var(--nx-text-muted)] hover:bg-[var(--nx-elevated)]'
                  }`}
                  onClick={() => !isEditing && onSelectConversation(c.id)}
                >
                  <span
                    className={`absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[var(--nx-accent)] transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  <MessageSquare
                    className={`h-4 w-4 shrink-0 ${
                      isActive ? 'text-[var(--nx-accent-hover)]' : 'opacity-60'
                    }`}
                  />

                  {isEditing ? (
                    <div
                      className="flex flex-1 items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        ref={inputRef}
                        value={draftTitle}
                        onChange={(e) => setDraftTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') commitEdit();
                          if (e.key === 'Escape') setEditingId(null);
                        }}
                        className="nx-input min-w-0 flex-1 px-1.5 py-0.5 text-xs"
                      />
                      <button
                        type="button"
                        onClick={commitEdit}
                        title="Save"
                        className="p-1 text-[var(--nx-text-faint)] hover:text-[var(--nx-success)]"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        title="Cancel"
                        className="p-1 text-[var(--nx-text-faint)] hover:text-[var(--nx-danger)]"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[13px] leading-tight">{c.title}</div>
                        <div className="mt-0.5 text-[10px] text-[var(--nx-text-faint)]">
                          {formatWhen(c.updatedAt)} · {c.messages.length} msg
                        </div>
                      </div>

                      <div className="hidden shrink-0 items-center gap-0.5 group-hover:flex">
                        {[
                          { title: 'Rename', icon: Pencil, run: () => startEdit(c) },
                          { title: 'Export', icon: Download, run: () => onExportConversation(c.id) },
                          {
                            title: 'Share (copy to clipboard)',
                            icon: Share2,
                            run: () => onShareConversation(c.id),
                          },
                        ].map(({ title, icon: Icon, run }) => (
                          <button
                            key={title}
                            type="button"
                            title={title}
                            onClick={(e) => {
                              e.stopPropagation();
                              run();
                            }}
                            className="rounded p-1 text-[var(--nx-text-faint)] hover:bg-[var(--nx-bg)] hover:text-[var(--nx-text)]"
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </button>
                        ))}
                        <button
                          type="button"
                          title="Delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteConversation(c.id);
                          }}
                          className="rounded p-1 text-[var(--nx-text-faint)] hover:bg-[var(--nx-danger)] hover:text-white"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  );
};
