import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "glass" | "solid" | "outline";
  className?: string;
  onClick?: () => void;
};

const variants = {
  glass:
    "border border-white/60 bg-white/10 text-white backdrop-blur-md hover:border-gold hover:text-champagne",
  solid: "bg-navy text-white hover:bg-royal",
  outline: "border border-navy/25 text-navy hover:border-gold hover:text-royal",
};

export function MagneticButton({ children, variant = "glass", className = "", onClick }: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.28;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.34;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.04)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate3d(0,0,0) scale(1)";
  };

  return (
    <button
      ref={ref}
      data-cursor="explore"
      onClick={onClick}
      onMouseMove={move}
      onMouseLeave={reset}
      className={`shine-sweep inline-flex items-center justify-center px-8 py-4 text-[0.68rem] font-medium uppercase tracking-[0.28em] transition-[transform,color,border-color,background-color] duration-300 ease-out ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
