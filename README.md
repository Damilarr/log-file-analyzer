# Log File Analyzer

A fast, browser-based log file analyzer that is built to handle massive datasets. It is designed to quickly process gigabytes of log lines without freezing your browser, and it keeps all of your data 100% local and private.

## ✨ Features

- **Fast Background Processing:** Uses Web Workers to process large log files in the background, keeping the user interface completely responsive.
- **Handles Huge Files:** Uses IndexedDB (Dexie) to store and query log data on your hard drive. This prevents your browser from crashing when loading very large files (like 1GB+ logs).
- **Smooth Scrolling:** Uses virtualized lists to only render the rows visible on your screen. Whether you have 100 or 1,000,000 logs, scrolling remains perfectly smooth.
- **Advanced Search & Filtering:** Filter logs by severity level (ERROR, WARN, INFO, DEBUG) or search using specific text and regular expressions.
- **100% Local Privacy:** Everything runs directly in your browser. There is no server, no API keys, and your log files are never uploaded anywhere.

## 🛠️ Tech Stack

- **Framework:** React + Vite
- **Styling:** Tailwind CSS
- **Background Processing:** Web Workers + Comlink
- **Storage:** Dexie (IndexedDB)
- **Rendering:** React Virtuoso
- **Icons:** Lucide-React

## 📦 Getting Started

### 1. Requirements
Ensure you have Node.js installed (v18 or higher is recommended).

### 2. Setup
Clone the repository and install the dependencies:
```bash
npm install
```

### 3. Run Locally
Start the development server:
```bash
npm run dev
```

### 4. Build for Production
Create an optimized production build:
```bash
npm run build
```

## 💻 How to Use
1. Open the application in your browser.
2. Under **DATA INGEST**, upload a server log file. The analyzer expects standard log formats like `[TIMESTAMP] LEVEL: Message`.
3. Click **INIT ANALYSIS** to start processing the file.
4. Once completed, use the **FILTERS & TOOLS** section to find what you need:
   - Click the severity tags (ERROR, WARN, INFO, DEBUG) to show only those logs.
   - Use the **QUERY STRING** input to search for text or use a Regular Expression. Click **APPLY FILTERS** or press Enter.
   - Click **EXTRACT DATA** to download a text file of your filtered logs.

## 📝 Log Format Example
The application works best with structured logs that look like this:
```text
[2026-02-18 10:30:39] ERROR: Unhandled exception occurred | user_id=8921 | ip=11.35.150.152
[2026-02-18 13:32:56] DEBUG: Rendering component tree | user_id=8988 | ip=223.192.123.176
[2026-02-18 14:43:47] INFO: Service started successfully | user_id=7655 | ip=246.25.114.145
```
