import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "chrome" | "ghost";
  strength?: number;
}

export function MagneticButton({ children, variant = "chrome", strength = 0.35, className = "", ...rest }: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0,0)";
  };

  const base =
    "relative inline-flex items-center justify-center px-7 py-3.5 text-sm font-medium tracking-wide rounded-full transition-[transform,box-shadow,background] duration-500 will-change-transform";
  const styles =
    variant === "chrome"
      ? "bg-chrome text-[#050505] hover:shadow-[0_20px_60px_-15px_rgba(232,237,242,0.45)]"
      : "border-chrome text-white/90 hover:text-white hover:bg-white/5 backdrop-blur";

  return (
    <span onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
      <button ref={ref} className={`${base} ${styles} ${className}`} {...rest}>
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    </span>
  );
}
