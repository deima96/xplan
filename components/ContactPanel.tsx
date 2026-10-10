"use client";

import { useEffect, useRef } from "react";
import ContactForm from "./ContactForm";
import { useContact } from "./ContactProvider";

/**
 * White, staircase-shaped contact panel that unfolds over the landing page.
 * Esc / the × button / clicking the video closes it. Focus is trapped while open
 * and returned to the "Contact Us" button on close.
 */
export default function ContactPanel() {
  const { open, closePanel } = useContact();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const returnTo = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(
      () => panel.current?.querySelector<HTMLElement>("input")?.focus(),
      400,
    );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return closePanel();
      if (e.key !== "Tab" || !panel.current) return;
      const f = panel.current.querySelectorAll<HTMLElement>(
        "button:not([disabled]), input, textarea, a[href]",
      );
      if (!f.length) return;
      const first = f[0],
        last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      returnTo?.focus();
    };
  }, [open, closePanel]);

  return (
    <div className="cp-layer" data-open={open}>
      {/* transparent: clicking the visible video closes the panel */}
      <div className="cp-scrim" onClick={closePanel} aria-hidden="true" />
      <div
        ref={panel}
        className="cp"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cp-title"
        inert={!open}
      >
        <button
          type="button"
          className="cp-close"
          onClick={closePanel}
          aria-label="Close contact form"
        >
          <svg viewBox="0 0 14 14" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>
        <div className="cp-body">
          <h2 id="cp-title" className="cp-title">
            Contact Us
          </h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
