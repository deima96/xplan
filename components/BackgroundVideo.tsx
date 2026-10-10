"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  /** Extra class for the pause/play button (controls its position). */
  controlClassName?: string;
  className?: string;
};

/**
 * Muted, looping, inline background video with an accessible pause/play
 * button. Respects prefers-reduced-motion (shows the poster, no autoplay).
 */
export default function BackgroundVideo({
  src,
  poster,
  controlClassName = "",
  className,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true; // set as a property: React doesn't reliably apply the attribute, and autoplay needs it
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!reduce) v.play().catch(() => setPlaying(false));

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onVisible = () => {
      if (!document.hidden && !userPaused.current && !reduce)
        v.play().catch(() => {});
    };
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  function toggle() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  }

  return (
    <>
      <video
        ref={ref}
        className={className}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        suppressHydrationWarning
      />
      <button
        type="button"
        className={`motion ${controlClassName}`}
        onClick={toggle}
        aria-label={
          playing ? "Pause background video" : "Play background video"
        }
      >
        <svg viewBox="0 0 10 10" aria-hidden="true">
          {playing ? (
            <path d="M1 0h3v10H1zM6 0h3v10H6z" />
          ) : (
            <path d="M1 0l8 5-8 5z" />
          )}
        </svg>
        <span>{playing ? "Pause" : "Play"}</span>
      </button>
    </>
  );
}
