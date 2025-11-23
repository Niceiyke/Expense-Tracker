import { cn } from "./utils";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded-2xl gradient-card card-outline shadow-glow", className)}>{children}</div>;
}

export function CardHeader({ title, badge }: { title: string; badge?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between pb-3">
      <div>
        <p className="text-sm uppercase tracking-[0.1em] text-slate-400">{title}</p>
      </div>
      {badge}
    </div>
  );
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="space-y-3">{children}</div>;
}
