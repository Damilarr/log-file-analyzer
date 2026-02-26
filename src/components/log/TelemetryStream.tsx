import { useRef } from "react";
import { Cpu, Terminal as TerminalIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Virtuoso } from "react-virtuoso";
import type { LogEntry } from "../../workers/log-worker";
import { RetroPanel } from "../ui/RetroPanel";
import { LogRowItem } from "./LogRowItem";

interface TelemetryStreamProps {
  logs: LogEntry[];
  processing: boolean;
  isFiltering: boolean;
  levelStyles: Record<string, string>;
  levelIcons: Record<string, LucideIcon>;
}

export const TelemetryStream = ({ 
  logs, 
  processing, 
  isFiltering, 
  levelStyles, 
  levelIcons 
}: TelemetryStreamProps) => {
  const virtuosoRef = useRef<any>(null);

  return (
    <RetroPanel title="LOG_STREAM" icon={Cpu} className="flex-1 min-h-[500px] relative">
       {(processing || isFiltering) && (
         <div className="absolute inset-0 z-50 bg-[#060606]/80 backdrop-blur-sm flex flex-col items-center justify-center font-mono gap-4 text-brand-cyan">
           <div className="w-16 h-16 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin glow-text"></div>
           <div className="text-xl tracking-widest glow-text">
             {processing ? "LOADING_DATA. . ." : "SEARCHING. . ."}
           </div>
           <div className="text-sm text-[#888] animate-pulse">
             {processing ? "Processing logs... please wait" : "Searching logs... please wait"}
           </div>
         </div>
       )}
       {logs.length > 0 ? (
          <Virtuoso
            ref={virtuosoRef}
            style={{ height: "100%", fontFamily: "JetBrains Mono" }}
            data={logs}
            computeItemKey={(index, log) => log.id || index}
            totalCount={logs.length}
            itemContent={(index, log) => (
              <LogRowItem 
                index={index} 
                log={log} 
                levelStyles={levelStyles} 
                levelIcons={levelIcons} 
              />
            )}
          />
       ) : (
          <div className="flex flex-col items-center justify-center h-full text-[#444] font-mono gap-4">
            <TerminalIcon className="w-12 h-12 opacity-50" />
            <div>SYSTEM_IDLE // NO_DATA_TO_DISPLAY</div>
          </div>
       )}
    </RetroPanel>
  );
};
