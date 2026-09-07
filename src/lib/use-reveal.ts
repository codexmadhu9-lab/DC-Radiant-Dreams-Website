import { useEffect } from "react";

/**
 * Scroll reveal + parallax + horizontal scroll driven by GSAP ScrollTrigger.
 * Loaded lazily on the client so SSR stays untouched.
 */
export function useDcScrollAnimations() {
  useEffect(() => {
    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      if (cancelled) return;

      const gsap = gsapMod.gsap;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              delay: Number(el.dataset['revealDelay'] ?? 0),
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal-words]").forEach((el) => {
          const words = el.textContent?.split(" ") ?? [];
          el.innerHTML = words
            .map((w) => `<span class="inline-block overflow-hidden"><span class="inline-block">${w}</span></span>`)
            .join(" ");
          gsap.fromTo(
            el.querySelectorAll("span > span"),
            { yPercent: 110, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power4.out",
              stagger: 0.055,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });

        const track = document.querySelector<HTMLElement>("[data-horizontal-track]");
        const wrap = document.querySelector<HTMLElement>("[data-horizontal-wrap]");
        if (track && wrap && window.innerWidth >= 768) {
          gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth + 64),
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top top",
              end: () => `+=${track.scrollWidth - window.innerWidth + 64}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      });

      cleanup = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);
}
