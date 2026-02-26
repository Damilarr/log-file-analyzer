import { useState, useRef, useEffect } from "react";
import * as Comlink from "comlink";
import type { LogEntry } from "../workers/log-worker";

export function useLogProcessor() {
  const [status, setStatus] = useState("Ready");
  const [processing, setProcessing] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [logFile, setLogFile] = useState<File | null>(null);
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([]);
  
  const workerRef = useRef<Worker | null>(null);
  const apiRef = useRef<any>(null);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../workers/log-worker.ts", import.meta.url),
      { type: "module" }
    );
    apiRef.current = Comlink.wrap<import("../workers/log-worker").LogProcessor>(workerRef.current);
    
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const startProcessing = async () => {
    if (!logFile || !apiRef.current) return;
    setProcessing(true);
    setStatus("Loading file...");
    
    await apiRef.current.clearLogs();
    
    const stream = logFile.stream();
    const reader = stream.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      await apiRef.current.processChunk(Comlink.transfer(value, [value.buffer]));
    }
    await apiRef.current.finalize();
    setProcessing(false);
    setStatus("Analysis Complete");
  };

  const applyFilters = async (filter: string, search: string) => {
    if (!processing && apiRef.current) {
      setIsFiltering(true);
      // Small timeout to allow UI to show loading state
      setTimeout(async () => {
        try {
          const results = await apiRef.current.filterLogs(filter, search);
          setFilteredLogs(results);
        } finally {
          setIsFiltering(false);
        }
      }, 50);
    }
  };

  const exportLogs = async (filter: string, search: string) => {
    if (!apiRef.current) return;
    const blob = await apiRef.current.exportFilteredLogs(filter, search);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `logs_export_${new Date().getTime()}.log`;
    a.click();
    URL.revokeObjectURL(url);
    setStatus("Data Exported");
  };

  return {
    status,
    setStatus,
    processing,
    isFiltering,
    logFile,
    setLogFile,
    filteredLogs,
    startProcessing,
    applyFilters,
    exportLogs,
    api: apiRef.current
  };
}
