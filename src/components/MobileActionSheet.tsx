import React, { useEffect } from 'react';

export interface MobileActionSheetAction {
  key: string;
  label: string;
  icon: React.ReactNode;
  onSelect: () => void;
  destructive?: boolean;
}

interface MobileActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  actions: MobileActionSheetAction[];
}

/**
 * The bottom sheet opened by a long-press on a conversation row or a chat message — mobile-only
 * (md:hidden, since desktop already has hover-revealed icon buttons for all of this). Reuses the
 * same overlay/dismiss conventions as Modal.tsx (Escape, backdrop click, scroll lock) but as a
 * sheet pinned to the bottom rather than a centered dialog, which is the native mobile pattern
 * for a per-item context menu.
 */
export const MobileActionSheet: React.FC<MobileActionSheetProps> = ({ isOpen, onClose, title, actions }) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center md:hidden"
      onClick={onClose}
      role="presentation"
    >
      <div className="glass-fade-in fixed inset-0 bg-black/55" aria-hidden="true" />
      <div
        className="glass-animate-in glass-panel-elevated relative w-full max-w-md rounded-b-none p-2"
        style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
        onClick={(e) => e.stopPropagation()}
        role="menu"
        aria-label={title || 'Actions'}
      >
        <div className="mx-auto mb-1 mt-1 h-1 w-9 rounded-full bg-[var(--glass-border-strong)]" aria-hidden="true" />
        {title && (
          <div className="truncate px-3 py-2 text-xs font-semibold text-[var(--glass-text-faint)]">{title}</div>
        )}
        {actions.map((a) => (
          <button
            key={a.key}
            type="button"
            role="menuitem"
            onClick={() => {
              a.onSelect();
              onClose();
            }}
            className={`flex w-full items-center gap-3 rounded-[var(--glass-r-md)] px-3 py-3 text-left text-sm font-medium transition active:bg-[var(--glass-panel-elevated-hover)] ${
              a.destructive ? 'text-[var(--glass-danger)]' : 'text-[var(--glass-text)]'
            }`}
          >
            {a.icon}
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
};
