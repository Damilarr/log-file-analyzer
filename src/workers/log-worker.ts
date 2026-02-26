import * as Comlink from "comlink";
import Dexie, { type Table } from "dexie";
const decoder = new TextDecoder();
let partialLine = "";
let logBuffer: LogEntry[] = [];
const BATCH_SIZE = 1000;

export interface LogEntry {
  id?: number;
  timestamp: string;
  level: "ERROR" | "INFO" | "WARN" | "DEBUG";
  message: string;
}

class LogDatabase extends Dexie {
  logs!: Table<LogEntry>;
  constructor() {
    super("LogDatabase");
    this.version(1).stores({
      logs: "++id, timestamp, level",
    });
    this.logs = this.table("logs");
  }
}
const db = new LogDatabase();

const logProcessor = {
  async getLogCount() {
    return await db.logs.count();
  },
  async clearLogs() {
    await db.logs.clear();
  },
  async processLog(fileName: string) {
    console.log("Processing log file:", fileName);
    return `Finished Processing ${fileName} at ${new Date().toLocaleTimeString()}`;
  },
  async processChunk(chunk: Uint8Array) {
    const text = decoder.decode(chunk, { stream: true });
    const fullText = partialLine + text;
    const lines = fullText.split("\n");
    partialLine = lines.pop() || "";
    for (const line of lines) {
      if (line.trim()) {
        await this.parseLine(line);
      }
    }
  },
  async parseLine(line: string) {
    const regex = /\[(.*?)\]\s+(ERROR|INFO|WARN|DEBUG):\s+(.*)/;
    const match = line.match(regex);

    if (match) {
      logBuffer.push({
        timestamp: match[1],
        level: match[2] as "ERROR" | "INFO" | "WARN" | "DEBUG",
        message: match[3],
      });

      if (logBuffer.length >= BATCH_SIZE) {
        const toSave = [...logBuffer];
        logBuffer = [];
        await db.logs.bulkAdd(toSave);
      }
    }
  },
  async finalize() {
    if (logBuffer.length > 0) {
      await db.logs.bulkAdd(logBuffer);
      logBuffer = [];
    }
    console.log("Database write complete!");
  },
  async filterLogs(level?: string, searchTerm?: string) {
    let collection = db.logs.toCollection();
    if (level && level !== "ALL") {
      collection = db.logs.where("level").equals(level);
    }
    if (searchTerm) {
      collection = collection.filter((log) =>
          log.message.toLowerCase().includes(searchTerm.toLowerCase()),
        );
    }
    return await collection.toArray();
  },

  async exportFilteredLogs(level?: string, search?: string) {
    const logs = await this.filterLogs(level, search);
    const content = logs
      .map((l) => `[${l.timestamp}] ${l.level}: ${l.message}`)
      .join("\n");

    return new Blob([content], { type: "text/plain" });
  },
};
Comlink.expose(logProcessor);
export type LogProcessor = typeof logProcessor;
