import { Search, Download, Crosshair } from "lucide-react";
import { RetroPanel } from "../ui/RetroPanel";
import { NeonButton } from "../ui/NeonButton";
import { cn } from "../../lib/utils";

interface FilterToolsProps {
  filter: string;
  setFilter: (filter: string) => void;
  setSearch: (search: string) => void;
  onApplyFilters: () => void;
  onExport: () => void;
  processing: boolean;
}

export const FilterTools = ({ 
  filter, 
  setFilter, 
  setSearch, 
  onApplyFilters, 
  onExport, 
  processing 
}: FilterToolsProps) => (
  <RetroPanel title="FILTERS_&_TOOLS" icon={Crosshair} className="p-4 gap-4">
    <div className="flex flex-col gap-3 font-mono">
      <div className="text-xs text-[#666]">TARGET_LEVEL</div>
      <div className="grid grid-cols-2 gap-2">
        {['ALL', 'ERROR', 'WARN', 'INFO', 'DEBUG'].map(lvl => (
          <button
            key={lvl}
            onClick={() => setFilter(lvl)}
            className={cn(
              "px-2 py-1 border border-[#333] text-xs transition-all cursor-pointer",
              filter === lvl 
                ? `border-${lvl === 'ERROR' ? 'brand-red' : lvl === 'WARN' ? 'brand-yellow' : lvl === 'INFO' ? 'brand-cyan' : lvl === 'DEBUG' ? '[#aaaaaa]' : 'gray-400'} text-white bg-white/10` 
                : "text-[#888] hover:border-[#666]"
            )}
          >
            {lvl}
          </button>
        ))}
      </div>
    </div>
    
    <div className="flex flex-col gap-3 font-mono mt-2">
      <div className="text-xs text-[#666]">QUERY_STRING</div>
      <div className="relative">
        <Search className="absolute left-2 top-2 w-4 h-4 text-[#666]" />
        <input
          type="text"
          placeholder="REGEX_OR_TEXT..."
          className="w-full bg-[#111] border border-[#333] pl-8 pr-3 py-1.5 text-sm text-brand-cyan font-mono focus:outline-none focus:border-brand-cyan transition-colors"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onApplyFilters()}
        />
      </div>
    </div>

    <NeonButton 
      variant="primary" 
      className="w-full justify-center mt-2"
      icon={Crosshair}
      onClick={onApplyFilters}
      disabled={processing}
    >
      APPLY_FILTERS
    </NeonButton>

    <NeonButton 
      variant="secondary" 
      className="w-full justify-center mt-2"
      icon={Download}
      onClick={onExport}
    >
      EXTRACT_DATA
    </NeonButton>
  </RetroPanel>
);
