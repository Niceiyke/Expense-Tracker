import { cn } from "./utils";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-100", className)}>
      {children}
    </span>
  );
}
