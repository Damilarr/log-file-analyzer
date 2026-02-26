import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { cn } from "../../lib/utils";

interface HeaderProps {
  status: string;
  processing: boolean;
  recordCount: number;
}

export const Header = ({ status, processing, recordCount }: HeaderProps) => (
  <header className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-[#333] pb-4 gap-4 z-50">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 border-2 border-brand-cyan bg-brand-cyan/10 flex items-center justify-center relative">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 border border-brand-cyan/50 rounded-full border-t-transparent"
        />
        <Terminal className="text-brand-cyan w-6 h-6 z-10" />
      </div>
      <div>
        <h1 className="text-2xl font-mono text-brand-cyan font-bold tracking-[0.2em] glow-text glitch" data-text="LOG_ANALYZER">LOG_ANALYZER</h1>
        <p className="font-mono text-xs text-[#888] tracking-widest mt-1">v.1.0 // LOG_VIEWER</p>
      </div>
    </div>

    <div className="flex items-center gap-6 text-xs font-mono">
       <div className="flex flex-col items-end">
         <span className="text-[#666]">STATUS</span>
         <span className={cn(
           "font-bold",
           processing ? "text-brand-yellow animate-pulse" : "text-brand-cyan"
         )}>
           {status}
         </span>
       </div>
       
       <div className="flex flex-col items-end">
         <span className="text-[#666]">RECORDS</span>
         <span className="font-bold text-brand-purple">{recordCount.toLocaleString()}</span>
       </div>
    </div>
  </header>
);
