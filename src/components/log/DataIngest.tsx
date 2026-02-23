import { Upload, Play, Database } from "lucide-react";
import { RetroPanel } from "../ui/RetroPanel";
import { NeonButton } from "../ui/NeonButton";

interface DataIngestProps {
  logFile: File | null;
  processing: boolean;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStartProcessing: () => void;
}

export const DataIngest = ({ logFile, processing, onFileChange, onStartProcessing }: DataIngestProps) => (
  <RetroPanel title="DATA_INGEST" icon={Database} className="p-4 gap-4">
    <div className="border border-dashed border-[#444] rounded bg-[#111] hover:border-brand-cyan transition-colors relative h-24 flex items-center justify-center cursor-pointer group">
       <input 
         type="file" 
         onChange={onFileChange} 
         className="absolute inset-0 opacity-0 cursor-pointer z-10"
       />
       <div className="flex flex-col items-center justify-center text-[#666] group-hover:text-brand-cyan transition-colors">
          <Upload className="w-6 h-6 mb-2" />
          <span className="font-mono text-xs uppercase text-center px-4">
            {logFile ? logFile.name : "DROP_FILE // CLICK_UPLOAD"}
          </span>
       </div>
    </div>

    <NeonButton 
      variant="primary" 
      className="w-full justify-center mt-2"
      icon={Play}
      onClick={onStartProcessing}
      disabled={!logFile || processing}
    >
      INIT_ANALYSIS
    </NeonButton>
  </RetroPanel>
);
