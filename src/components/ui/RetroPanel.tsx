import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

interface RetroPanelProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: LucideIcon;
}

export const RetroPanel = ({ children, className, title, icon: Icon }: RetroPanelProps) => (
  <div className={cn("bg-[#111111]/80 backdrop-blur-md border border-[#333333] rounded-lg overflow-hidden flex flex-col relative", className)}>
    {title && (
      <div className="bg-[#1a1a1a] border-b border-[#333333] px-4 py-2 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#aaaaaa]">
        {Icon && <Icon className="w-4 h-4 text-brand-cyan" />}
        {title}
      </div>
    )}
    <div className="flex-1 overflow-hidden relative">
      {children}
    </div>
  </div>
);
