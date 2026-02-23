import { useState } from "react";
import { AlertTriangle, Info, XCircle } from "lucide-react";

// Hooks
import { useLogProcessor } from "./hooks/useLogProcessor";

// Components
import { Header } from "./components/layout/Header";
import { DataIngest } from "./components/log/DataIngest";
import { FilterTools } from "./components/log/FilterTools";
import { TelemetryStream } from "./components/log/TelemetryStream";

// Shared Config
const LEVEL_STYLES: Record<string, string> = {
  ERROR: "text-brand-red border-brand-red bg-brand-red/10",
  WARN: "text-brand-yellow border-brand-yellow bg-brand-yellow/10",
  INFO: "text-brand-cyan border-brand-cyan bg-brand-cyan/10",
  DEBUG: "text-[#aaaaaa] border-[#444] bg-[#222]/50"
};

const LEVEL_ICONS: Record<string, any> = {
  ERROR: XCircle,
  WARN: AlertTriangle,
  INFO: Info
};

function App() {
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  
  const {
    status,
    processing,
    isFiltering,
    logFile,
    setLogFile,
    filteredLogs,
    startProcessing,
    applyFilters,
    exportLogs
  } = useLogProcessor();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogFile(file);
    } else {
      setLogFile(null);
    }
  };

  return (
    <div className="min-h-screen bg-base text-gray-200 font-sans noise-bg flex flex-col p-4 md:p-6 lg:p-8 gap-6">
      {/* Decorative Scanline */}
      <div className="scanline" />

      {/* Header Matrix */}
      <Header 
        status={status} 
        processing={processing} 
        recordCount={filteredLogs.length} 
      />

      {/* Control Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 z-50">
        
        {/* Left Sidebar Menu */}
        <div className="flex flex-col gap-6">
          <DataIngest 
            logFile={logFile}
            processing={processing}
            onFileChange={handleFileChange}
            onStartProcessing={startProcessing}
          />
          
          <FilterTools 
            filter={filter}
            setFilter={setFilter}
            setSearch={setSearch}
            onApplyFilters={() => applyFilters(filter, search)}
            onExport={() => exportLogs(filter, search)}
            processing={processing}
          />
        </div>

        {/* Right Main Area */}
        <div className="flex flex-col gap-6 overflow-hidden">
          <TelemetryStream 
            logs={filteredLogs}
            processing={processing}
            isFiltering={isFiltering}
            levelStyles={LEVEL_STYLES}
            levelIcons={LEVEL_ICONS}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
