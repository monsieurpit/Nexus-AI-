import React, { useEffect, useRef, useState } from 'react';
import { Plus, Pencil, Trash2, Download, Share2, Check, X, MessageSquare } from 'lucide-react';
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

  const sorted = [...conversations].sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <aside
      className="w-[260px] shrink-0 h-screen flex flex-col bg-[var(--nx-sidebar)] border-r border-[var(--nx-border-subtle)]"
      aria-label="Conversations"
    >
      <div className="p-3 shrink-0">
        <button
          type="button"
          onClick={onNewChat}
          className="w-full flex items-center gap-2 rounded-xl border border-[var(--nx-border)] bg-[var(--nx-elevated)] hover:bg-[var(--nx-accent)] hover:text-white hover:border-transparent transition-colors duration-150 px-3 py-2.5 text-sm font-semibold text-[var(--nx-text)]"
        >
          <Plus className="w-4 h-4" />
          New chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-3 min-h-0">
        {sorted.length === 0 && (
          <div className="px-3 py-6 text-center text-xs text-[var(--nx-text-muted)]">
            No conversations yet — start one above.
          </div>
        )}

        {sorted.map((c) => {
          const isActive = c.id === activeConversationId;
          const isEditing = editingId === c.id;
          return (
            <div
              key={c.id}
              className={`group relative flex items-center gap-2 rounded-lg px-2.5 py-2 mb-1 cursor-pointer transition-colors duration-100 ${
                isActive
                  ? 'bg-[var(--nx-accent)]/15 text-[var(--nx-text)]'
                  : 'hover:bg-[var(--nx-elevated)] text-[var(--nx-text-muted)]'
              }`}
              onClick={() => !isEditing && onSelectConversation(c.id)}
            >
              <MessageSquare className="w-4 h-4 shrink-0 opacity-70" />

              {isEditing ? (
                <div className="flex-1 flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <input
                    ref={inputRef}
                    value={draftTitle}
                    onChange={(e) => setDraftTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') commitEdit();
                      if (e.key === 'Escape') setEditingId(null);
                    }}
                    className="flex-1 min-w-0 bg-[var(--nx-bg)] border border-[var(--nx-accent)] rounded px-1.5 py-0.5 text-xs text-[var(--nx-text)] outline-none"
                  />
                  <button type="button" onClick={commitEdit} title="Save" className="p-1 hover:text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" onClick={() => setEditingId(null)} title="Cancel" className="p-1 hover:text-rose-400">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate">{c.title}</div>
                    <div className="text-[10px] opacity-60">{formatWhen(c.updatedAt)}</div>
                  </div>

                  <div className="hidden group-hover:flex items-center gap-0.5 shrink-0">
                    <button
                      type="button"
                      title="Rename"
                      onClick={(e) => {
                        e.stopPropagation();
                        startEdit(c);
                      }}
                      className="p-1 rounded hover:bg-[var(--nx-bg)] hover:text-[var(--nx-text)]"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      title="Export"
                      onClick={(e) => {
                        e.stopPropagation();
                        onExportConversation(c.id);
                      }}
                      className="p-1 rounded hover:bg-[var(--nx-bg)] hover:text-[var(--nx-text)]"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      title="Share (copy to clipboard)"
                      onClick={(e) => {
                        e.stopPropagation();
                        onShareConversation(c.id);
                      }}
                      className="p-1 rounded hover:bg-[var(--nx-bg)] hover:text-[var(--nx-text)]"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      title="Delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteConversation(c.id);
                      }}
                      className="p-1 rounded hover:bg-rose-600 hover:text-white"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
