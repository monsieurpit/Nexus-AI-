import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Header icon (a lucide icon element, typically 16px). */
  icon?: React.ReactNode;
  title: string;
  subtitle?: React.ReactNode;
  /** Extra content rendered on the right side of the header, before the close button. */
  headerAside?: React.ReactNode;
  /** Sticky footer content (usually action buttons). */
  footer?: React.ReactNode;
  /** Tailwind max-width class for the panel. Defaults to a comfortable dialog width. */
  maxWidth?: string;
  /** When false, the body is not padded (the caller controls its own layout). */
  padBody?: boolean;
  children: React.ReactNode;
}

/**
 * The one shared modal shell for the whole app. Owns the overlay, the panel
 * chrome, the header (icon + title + subtitle + close), an optional sticky
 * footer, scroll locking, Escape-to-close, and backdrop-click-to-close.
 * Individual modals only supply their body content and (optionally) footer
 * buttons, so every dialog looks and behaves identically.
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  icon,
  title,
  subtitle,
  headerAside,
  footer,
  maxWidth = 'max-w-2xl',
  padBody = true,
  children,
}) => {
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
      className="nx-modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className={`nx-modal-panel ${maxWidth}`} onMouseDown={(e) => e.stopPropagation()}>
        <div className="nx-modal-header">
          {icon && (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--nx-r-sm)] bg-[var(--nx-accent)] text-white">
              {icon}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-[15px] font-bold text-[var(--nx-text)]">{title}</h2>
            {subtitle && (
              <p className="truncate text-xs text-[var(--nx-text-faint)]">{subtitle}</p>
            )}
          </div>
          {headerAside}
          <button
            type="button"
            onClick={onClose}
            className="rounded-[var(--nx-r-sm)] p-1.5 text-[var(--nx-text-faint)] transition hover:bg-[var(--nx-elevated)] hover:text-[var(--nx-text)]"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className={`min-h-0 flex-1 overflow-y-auto ${padBody ? 'p-5' : ''}`}>{children}</div>

        {footer && <div className="nx-modal-footer">{footer}</div>}
      </div>
    </div>
  );
};
