import { useEffect, useRef } from "react";

export default function MorphingCursor() {
  const cursor = useRef(null);
  useEffect(() => {
    const media = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) and (forced-colors: none)');
    const root = document.documentElement;
    const hide = () => {
      root.classList.remove('morphing-cursor-on');
      cursor.current?.classList.remove('is-visible', 'is-pressed');
    };
    const move = event => {
      const node = cursor.current;
      const target = event.target;
      if (!node || !media.matches || event.pointerType !== 'mouse' || !(target instanceof Element)) return hide();
      // Native cursors remain available for editing, disabled controls and top-layer dialogs.
      if (target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"]), [disabled], [aria-disabled="true"], dialog, iframe')) return hide();
      const text = target.closest('a, button, summary, h1, h2, h3, h4, h5, h6, p, span, li, label, strong, em, small, blockquote, figcaption, [role="button"], [role="tab"]');
      node.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      node.classList.toggle('is-text', Boolean(text?.textContent.trim()));
      node.classList.add('is-visible');
      root.classList.add('morphing-cursor-on');
    };
    const down = () => cursor.current?.classList.add('is-pressed');
    const up = () => cursor.current?.classList.remove('is-pressed');
    const key = event => { if (event.key === 'Tab') hide(); };
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerdown', down);
    document.addEventListener('pointerup', up);
    document.addEventListener('pointercancel', hide);
    document.documentElement.addEventListener('pointerleave', hide);
    document.addEventListener('keydown', key);
    window.addEventListener('blur', hide);
    window.addEventListener('scroll', hide, true);
    media.addEventListener('change', hide);
    return () => {
      hide();
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerdown', down);
      document.removeEventListener('pointerup', up);
      document.removeEventListener('pointercancel', hide);
      document.documentElement.removeEventListener('pointerleave', hide);
      document.removeEventListener('keydown', key);
      window.removeEventListener('blur', hide);
      window.removeEventListener('scroll', hide, true);
      media.removeEventListener('change', hide);
    };
  }, []);
  return (
    <div ref={cursor} className="morphing-cursor" aria-hidden="true"><span /></div>
  );
}
