import { MagneticButton } from "./MagneticButton";

export const HERO_VIDEO_SRC = "/hero/dc_hero.mp4";

export function HeroVideo() {
  return (
    <section id="top" className="relative h-[100svh] w-full overflow-hidden bg-navy">
      <video
        className="absolute inset-0 h-full w-full origin-center scale-105 animate-[dc-zoom_24s_ease-in-out_infinite_alternate] object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-linear-to-b from-navy/80 via-navy/35 to-navy/85" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,transparent_10%,oklch(0.22_0.075_260/0.55)_100%)]" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="mb-6 text-[0.6rem] uppercase tracking-[0.55em] text-champagne">
          DC Shopping Mall &amp; Jewellery
        </p>
        <h1
          data-reveal-words
          className="max-w-4xl font-display text-[13vw] leading-[0.95] text-white sm:text-[9vw] lg:text-[6.5rem]"
        >
          Timeless Elegance
        </h1>
        <div className="mt-7 h-px w-40 bg-linear-to-r from-transparent via-gold to-transparent" />
        <p className="mt-7 max-w-xl text-sm font-light leading-relaxed tracking-wide text-white/80">
          Jewellery crafted for every precious moment — and a shopping world built around them.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton variant="glass" onClick={() => document.querySelector("#collections")?.scrollIntoView({ behavior: "smooth" })}>
            Explore Collection
          </MagneticButton>
          <MagneticButton variant="glass" className="border-gold/70 text-champagne" onClick={() => document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" })}>
            Discover DC
          </MagneticButton>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center">
        <p className="text-[0.55rem] uppercase tracking-[0.4em] text-white/70">Scroll to discover</p>
        <div className="mx-auto mt-3 h-10 w-px overflow-hidden bg-white/25">
          <div className="h-4 w-px animate-[dc-scroll_2s_ease-in-out_infinite] bg-gold" />
        </div>
      </div>

      <style>{`
        @keyframes dc-zoom { from { transform: scale(1.03); } to { transform: scale(1.14); } }
        @keyframes dc-scroll { 0% { transform: translateY(-100%); } 100% { transform: translateY(300%); } }
      `}</style>
    </section>
  );
}
