import React from 'react';

export interface LongPressHandlers {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  onTouchCancel: () => void;
  onClickCapture: (e: React.MouseEvent) => void;
  style: React.CSSProperties;
}

/**
 * Plain closure factory, deliberately NOT a React hook — it's called once per row inside a
 * .map(), which a real hook can't be (hook call counts must stay stable across renders, and a
 * list's length doesn't). Touch-only (mouse "long press" isn't standard UX and every desktop
 * action this backs already has its own always-visible/hover affordance), so it never conflicts
 * with existing click handlers on non-touch devices.
 *
 * onClickCapture cancels the click iOS/Android synthesize right after touchend whenever the
 * long-press actually fired, so triggering the action sheet never ALSO runs the element's normal
 * tap behavior (selecting a conversation, zooming an image). style disables iOS Safari's native
 * text-selection highlight AND its callout menu — WebkitTouchCallout alone (the original version
 * of this file) only suppressed the popup menu, not the blue text-selection highlight itself,
 * which is the actual visible bug a long press triggers by default; userSelect: 'none' is the one
 * that stops the highlight.
 */
export function makeLongPressHandlers(onLongPress: () => void, thresholdMs = 480): LongPressHandlers {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let start: { x: number; y: number } | null = null;
  let fired = false;

  const clear = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    start = null;
  };

  return {
    onTouchStart: (e) => {
      fired = false;
      const t = e.touches[0];
      start = { x: t.clientX, y: t.clientY };
      timer = setTimeout(() => {
        fired = true;
        if (navigator.vibrate) navigator.vibrate(10);
        onLongPress();
      }, thresholdMs);
    },
    onTouchMove: (e) => {
      if (!start) return;
      const t = e.touches[0];
      if (Math.abs(t.clientX - start.x) > 10 || Math.abs(t.clientY - start.y) > 10) clear();
    },
    onTouchEnd: clear,
    onTouchCancel: clear,
    onClickCapture: (e) => {
      if (fired) {
        e.preventDefault();
        e.stopPropagation();
        fired = false;
      }
    },
    style: {
      WebkitTouchCallout: 'none',
      WebkitUserSelect: 'none',
      userSelect: 'none',
    },
  };
}
