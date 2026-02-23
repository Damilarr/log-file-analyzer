import { memo } from "react";
import type { LucideIcon } from "lucide-react";
import type { LogEntry } from "../../workers/log-worker";
import { cn } from "../../lib/utils";

interface LogRowItemProps {
  index: number;
  log: LogEntry;
  levelStyles: Record<string, string>;
  levelIcons: Record<string, LucideIcon>;
}

export const LogRowItem = memo(({ index, log, levelStyles, levelIcons }: LogRowItemProps) => {
  const Icon = levelIcons[log.level] || levelIcons.INFO;
  return (
    <div 
      className={cn(
        "flex items-start text-[13px] leading-relaxed py-1.5 px-4 border-b border-[#222] hover:bg-[#222]/50 transition-colors w-full font-mono group",
        levelStyles[log.level] || "text-[#aaa]"
      )}
    >
      <div className="w-40 shrink-0 opacity-60 flex items-center gap-2 pt-[2px]">
        <span className="text-[10px] text-[#555]">{index.toString().padStart(6, '0')}</span>
        {log.timestamp}
      </div>
      <div className={cn(
        "w-[85px] shrink-0 font-bold flex items-center gap-1.5 pt-[2px]", 
        log.level === 'ERROR' && "text-brand-red glow-text",
        log.level === 'WARN' && "text-brand-yellow",
        log.level === 'INFO' && "text-brand-cyan"
      )}>
        <Icon className="w-3.5 h-3.5" />
        {log.level}
      </div>
      <div className="flex-1 break-all pr-4 pl-2 opacity-90 group-hover:opacity-100 selection:bg-brand-cyan selection:text-base">
        {log.message}
      </div>
    </div>
  );
});
