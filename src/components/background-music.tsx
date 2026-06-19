"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient background track. Tries to autoplay on load; browsers block audible
 * autoplay until a gesture, so we also start it on the first interaction.
 */
export function BackgroundMusic({
  src = "/assets/overtaken.mp3",
  volume = 0.55,
}: {
  src?: string;
  volume?: number;
}) {
  const ref = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    a.volume = volume;
    a.loop = true;

    const start = () => {
      a.play()
        .then(cleanup)
        .catch(() => {});
    };

    const cleanup = () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
      window.removeEventListener("touchstart", start);
      window.removeEventListener("wheel", start);
    };

    // attempt immediate autoplay
    start();
    // fallback: first user gesture
    window.addEventListener("pointerdown", start);
    window.addEventListener("keydown", start);
    window.addEventListener("touchstart", start, { passive: true });
    window.addEventListener("wheel", start, { passive: true });

    return cleanup;
  }, [volume]);

  return <audio ref={ref} src={src} preload="auto" />;
}
