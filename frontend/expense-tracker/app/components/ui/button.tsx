import { cn } from "./utils";

type Variant = "primary" | "ghost";
type Size = "sm" | "md";

export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
}

export function Button({ children, className, variant = "primary", size = "md", ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400";
  const variantClass =
    variant === "ghost"
      ? "bg-white/5 text-slate-100 border border-white/10 hover:bg-white/10"
      : "bg-gradient-to-r from-purple-500 via-indigo-500 to-sky-400 text-white shadow-glow hover:opacity-95";
  const sizeClass = size === "sm" ? "h-9 px-4" : "h-11 px-5";

  return (
    <button className={cn(base, variantClass, sizeClass, className)} {...props}>
      {children}
    </button>
  );
}
