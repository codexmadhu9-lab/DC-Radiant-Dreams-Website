import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    let positioned = false;

    const onLeave = () => {
      setVisible(false);
      positioned = false;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") {
        onLeave();
        return;
      }
      x = e.clientX;
      y = e.clientY;
      if (!positioned) {
        cx = x;
        cy = y;
        positioned = true;
        if (dot.current) dot.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      }
      setVisible(true);
      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      setLabel(target ? target.dataset['cursor'] || null : null);
    };

    const tick = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] block"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 150ms ease-out" }}
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold bg-white/25 shadow-[0_0_18px_oklch(0.74_0.078_82/0.8)] backdrop-blur-[2px] transition-all duration-300 ${
          label ? "h-20 w-20 bg-navy/85" : "h-4 w-4"
        } flex items-center justify-center`}
      >
        {label ? (
          <span className="text-[0.55rem] uppercase tracking-[0.24em] text-white">{label}</span>
        ) : null}
      </div>
    </div>
  );
}
