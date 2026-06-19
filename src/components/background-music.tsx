"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Ambient background track. Tries to autoplay on load; browsers block audible
 * autoplay until a gesture, so we also start it on the first interaction and
 * expose a manual play/pause toggle in the bottom-right corner.
 */
export function BackgroundMusic({
  src = "/assets/overtaken.mp3",
  volume = 0.55,
}: {
  src?: string;
  volume?: number;
}) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    a.volume = volume;
    a.loop = true;
    // start fetching immediately so playback isn't gated on a slow first load
    a.load();

    let done = false;
    const start = () => {
      if (done) return;
      a.play()
        .then(() => {
          done = true;
          cleanupGestures();
        })
        .catch(() => {});
    };

    const cleanupGestures = () => {
      a.removeEventListener("canplay", start);
      a.removeEventListener("loadeddata", start);
      window.removeEventListener("pointerdown", start, true);
      window.removeEventListener("keydown", start, true);
      window.removeEventListener("touchstart", start, true);
      window.removeEventListener("wheel", start, true);
    };

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);

    // try the instant it has any audio buffered, plus right now
    a.addEventListener("canplay", start);
    a.addEventListener("loadeddata", start);
    start();

    // fallback: the very first user gesture (capture phase = earliest possible)
    window.addEventListener("pointerdown", start, true);
    window.addEventListener("keydown", start, true);
    window.addEventListener("touchstart", start, { capture: true, passive: true });
    window.addEventListener("wheel", start, { capture: true, passive: true });

    return () => {
      cleanupGestures();
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
    };
  }, [volume]);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (a.paused) a.play().catch(() => {});
    else a.pause();
  };

  return (
    <>
      <audio ref={ref} src={src} preload="auto" autoPlay loop />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        aria-pressed={playing}
        title={playing ? "Pause" : "Play"}
        className="group fixed bottom-6 right-6 z-50 flex cursor-pointer items-center gap-2 rounded-full border-2 border-[var(--accent)] bg-[linear-gradient(145deg,#f6cf73,#e8a93a)] px-2 py-2 pr-3 text-[#3a1106] shadow-[0_4px_0_0_var(--accent-dim),0_6px_18px_rgba(228,34,45,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_var(--accent-dim),0_10px_24px_rgba(228,34,45,0.6)] active:translate-y-0.5 active:shadow-[0_2px_0_0_var(--accent-dim)]"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--gold)] shadow-inner ring-2 ring-[#3a1106]/30">
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1.2" />
              <rect x="14" y="5" width="4" height="14" rx="1.2" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13a1 1 0 0 0 1.54.84l10-6.5a1 1 0 0 0 0-1.68l-10-6.5A1 1 0 0 0 8 5.5z" />
            </svg>
          )}
        </span>
        <span className="font-comic pr-0.5 text-base leading-none tracking-wide text-[#3a1106]">
          {playing ? "Sailing" : "Set Sail"}
        </span>
      </button>
    </>
  );
}
