import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Check, Circle, X } from 'lucide-react';

export function Terminal() {
  const [lines, setLines] = useState<string[]>([]);
  const fullCommand = [
    "> init ai-server --name 'claude-finance-bot'",
    "> connecting to banking_api...",
    "> [SUCCESS] secure connection established",
    "> indexing 14,000 invoices...",
    "> [READY] Infrastructure active. Waiting for automation logic."
  ];

  useEffect(() => {
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeWriter = () => {
      if (currentLineIndex >= fullCommand.length) return;

      const currentLineText = fullCommand[currentLineIndex];
      
      // If it's a command (starts with >), type it out
      if (currentLineText.startsWith("> ")) {
        if (currentCharIndex < currentLineText.length) {
          setLines(prev => {
            const newLines = [...prev];
            if (newLines[currentLineIndex] === undefined) newLines[currentLineIndex] = "";
            newLines[currentLineIndex] = currentLineText.substring(0, currentCharIndex + 1);
            return newLines;
          });
          currentCharIndex++;
          timeoutId = setTimeout(typeWriter, 50 + Math.random() * 30);
        } else {
          // Line finished
          currentLineIndex++;
          currentCharIndex = 0;
          timeoutId = setTimeout(typeWriter, 500);
        }
      } else {
        // It's a status message, show it all at once with a delay
        setLines(prev => [...prev, currentLineText]);
        currentLineIndex++;
        currentCharIndex = 0;
        timeoutId = setTimeout(typeWriter, 800);
      }
    };

    timeoutId = setTimeout(typeWriter, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-lg mx-auto overflow-hidden rounded-lg shadow-2xl bg-[#1e1e1e] border border-gray-800 font-mono text-sm leading-relaxed"
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
        </div>
        <div className="text-gray-400 text-xs flex items-center gap-1">
          <TerminalIcon className="w-3 h-3" />
          bash — 80x24
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 h-[300px] text-gray-300 font-mono text-sm overflow-y-auto dark-scroll flex flex-col gap-1">
        {lines.map((line, i) => (
          <div key={i} className={`${line.includes("[SUCCESS]") ? "text-green-400" : line.includes("[READY]") ? "text-blue-400 font-bold" : "text-gray-300"}`}>
            {line}
          </div>
        ))}
        <motion.div 
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-2 h-4 bg-gray-500 inline-block ml-1 align-middle"
        />
      </div>
    </motion.div>
  );
}
