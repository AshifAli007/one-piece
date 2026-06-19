"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Scroll-scrubbed cinematic. The pre-rendered "Gears" sequence is pinned and its
 * `currentTime` is driven by scroll progress. Each gear NAME pops up in the
 * center and fades away over the scroll window that lines up with its clip.
 * Minimal: no progress bar, no descriptions, no hero, no footer.
 */

const START = 0;
const FALLBACK_DURATION = 40;

type Gear = {
  title: string;
  /** progress window [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd] */
  win: [number, number, number, number];
};

const GEARS: Gear[] = [
  { title: "Base", win: [0.0, 0.02, 0.1, 0.12] },
  { title: "Gear Second", win: [0.13, 0.16, 0.225, 0.245] },
  { title: "Gear Third", win: [0.255, 0.285, 0.35, 0.37] },
  { title: "Armament Haki", win: [0.4, 0.43, 0.59, 0.61] },
  { title: "Boundman", win: [0.66, 0.7, 1.2, 1.4] },
];

/** trapezoid alpha for a gear window at progress p */
function alphaFor(p: number, [a, b, c, d]: Gear["win"]) {
  if (p < a || p > d) return 0;
  if (p < b) return (p - a) / (b - a);
  if (p > c) return 1 - (p - c) / (d - c);
  return 1;
}

export function Cinematic() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const caps = useRef<(HTMLHeadingElement | null)[]>([]);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const v = video.current;
      if (!v) return;

      let end = FALLBACK_DURATION;
      const onMeta = () => {
        end = v.duration || FALLBACK_DURATION;
      };
      v.addEventListener("loadedmetadata", onMeta);
      if (v.readyState >= 1) onMeta();

      v.play().then(() => v.pause()).catch(() => {});

      const apply = (p: number) => {
        const t = START + p * (end - START);
        if (Number.isFinite(t) && !v.seeking) v.currentTime = t;

        GEARS.forEach((g, i) => {
          const el = caps.current[i];
          if (!el) return;
          const alpha = alphaFor(p, g.win);
          el.style.opacity = String(alpha);
          // pop: scale up slightly and drift as it appears
          const scale = 0.86 + 0.14 * alpha;
          const y = (1 - alpha) * 12;
          el.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
        });
      };

      apply(0);

      gsap.to(
        {},
        {
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=620%",
            scrub: 1,
            pin: ".cine-stage",
            onUpdate: (self) => apply(self.progress),
          },
        }
      );

      return () => v.removeEventListener("loadedmetadata", onMeta);
    },
    { scope: root }
  );

  return (
    <section
      id="gears"
      ref={root}
      className="cine-root relative"
      style={{ minHeight: "720vh" }}
    >
      <div className="cine-stage relative flex h-screen items-center justify-center overflow-hidden bg-black">
        <video
          ref={video}
          className="cine-video absolute inset-0 h-full w-full object-contain"
          src="/video/cinematic-scrub.mp4"
          poster="/video/cine-poster.jpg"
          muted
          playsInline
          preload="auto"
          disableRemotePlayback
        />

        {/* reduced-motion / no-JS fallback */}
        <div className="cine-fallback absolute inset-0 hidden items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/video/cine-poster.jpg"
            alt="Monkey D. Luffy"
            className="h-full w-full object-contain"
          />
        </div>

        {/* edge vignette for legibility */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_60%,rgba(0,0,0,0.55)_100%)]" />

        {/* bottom-left gear title that pops + fades */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-start p-8 md:p-14">
          {GEARS.map((g, i) => (
            <h2
              key={i}
              ref={(el) => {
                caps.current[i] = el;
              }}
              className="font-comic stroke-ink text-glow absolute bottom-8 left-8 origin-bottom-left text-left text-fg will-change-transform text-[clamp(2.5rem,9vw,7rem)] leading-[0.85] tracking-wide md:bottom-14 md:left-14"
              style={{ opacity: 0 }}
            >
              {g.title}
            </h2>
          ))}
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .cine-root { min-height: auto !important; }
          .cine-stage { position: static; height: 100vh; }
          .cine-video { display: none; }
          .cine-fallback { display: flex !important; }
        }
      `}</style>
    </section>
  );
}
