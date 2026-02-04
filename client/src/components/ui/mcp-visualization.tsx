import { motion, AnimatePresence } from "framer-motion";
import { Database, Mail, FileSpreadsheet, MessageSquare, CreditCard, Github, Globe, Server, Bot, Zap, Activity, Cpu, Terminal as TerminalIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function McpVisualization() {
  const [activePath, setActivePath] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Apps connected to MCP
  const apps = [
    { id: 1, name: "Xero", icon: CreditCard, color: "#00B7E0", angle: 0 },
    { id: 2, name: "Gmail", icon: Mail, color: "#EA4335", angle: 60 },
    { id: 3, name: "Airtable", icon: Database, color: "#FCB400", angle: 120 },
    { id: 4, name: "Slack", icon: MessageSquare, color: "#4A154B", angle: 180 },
    { id: 5, name: "GitHub", icon: Github, color: "#ffffff", angle: 240 },
    { id: 6, name: "Web", icon: Globe, color: "#34A853", angle: 300 },
  ];

  // Auto-cycle active data paths to simulate activity
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePath((prev) => (prev + 1) % apps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [apps.length]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full h-full min-h-[600px] bg-aubergine-900/50 rounded-3xl border border-white/10 overflow-hidden p-6 relative">
       {/* Background Gradient - clean premium look */}
      <div className="absolute inset-0 bg-gradient-to-br from-aubergine-800/30 via-transparent to-salmon-500/5 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-aubergine-900/80 pointer-events-none"></div>

      {/* Main Visualization Area */}
      <div className="relative flex-grow flex items-center justify-center min-h-[400px]">
        
        {/* Shared SVG Layer for Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible" viewBox="-300 -300 600 600">
          {apps.map((app, index) => {
            const radius = 160; // Slightly smaller to fit better
            const radian = (app.angle * Math.PI) / 180;
            const x = radius * Math.cos(radian);
            const y = radius * Math.sin(radian);
            const isActive = index === activePath;

            return (
              <g key={`connection-${app.id}`}>
                 <line 
                  x1="0" 
                  y1="0" 
                  x2={x} 
                  y2={y} 
                  stroke={isActive ? app.color : "rgba(255,255,255,0.1)"} 
                  strokeWidth={isActive ? 2 : 1}
                  strokeDasharray="4 4"
                  className="transition-all duration-300"
                />
                
                {isActive && (
                  <motion.circle
                    r="4"
                    fill={app.color}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      cx: [0, x],
                      cy: [0, y],
                      opacity: [0, 1, 1, 0]
                    }}
                    transition={{ duration: 1.0, ease: "linear", times: [0, 0.1, 0.9, 1] }}
                  />
                )}
                 {isActive && (
                  <motion.circle
                    r="4"
                    fill="#ffffff"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      cx: [x, 0],
                      cy: [y, 0],
                      opacity: [0, 1, 1, 0]
                    }}
                    transition={{ duration: 1.0, ease: "linear", delay: 0.8, times: [0, 0.1, 0.9, 1] }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Central Core */}
        <div className="relative z-20 flex flex-col items-center justify-center">
          <motion.div 
            animate={{ boxShadow: ["0 0 20px rgba(243, 155, 109, 0.2)", "0 0 60px rgba(243, 155, 109, 0.6)", "0 0 20px rgba(243, 155, 109, 0.2)"] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-salmon-500 to-orange-600 flex items-center justify-center shadow-2xl z-30 relative"
          >
            <Bot className="w-10 h-10 text-white" />
            
            <div className="absolute -bottom-8 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 text-[10px] font-mono text-salmon-200 whitespace-nowrap">
              MCP Core
            </div>
          </motion.div>

          <div className="absolute w-[320px] h-[320px] border border-white/5 rounded-full animate-spin-slow pointer-events-none"></div>
          <div className="absolute w-[450px] h-[450px] border border-white/5 rounded-full animate-spin-reverse-slow pointer-events-none"></div>
        </div>

        {/* Nodes */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          {apps.map((app, index) => {
            const radius = 160;
            const radian = (app.angle * Math.PI) / 180;
            const x = radius * Math.cos(radian);
            const y = radius * Math.sin(radian);
            const isActive = index === activePath;

            return (
              <motion.div
                key={app.id}
                className="absolute flex flex-col items-center justify-center"
                style={{ x, y }}
              >
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 relative
                  ${isActive ? 'bg-white/10 border-white/40 scale-110 shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'bg-aubergine-800/80 border-white/10 grayscale'}
                `}>
                  <app.icon className="w-6 h-6" style={{ color: isActive ? app.color : '#666' }} />
                </div>
                <div className={`absolute top-14 whitespace-nowrap text-[9px] font-medium tracking-wider uppercase transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-600'}`}>
                  {app.name}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Live Activity Feed - Moved to Right Column */}
      <div className="w-full lg:w-80 flex flex-col gap-4 relative z-30">
        <LiveActivityFeed />
      </div>
    </div>
  );
}

function LiveActivityFeed() {
  const [logs, setLogs] = useState<{id: number, type: string, text: string, time: string}[]>([]);
  const [stats, setStats] = useState({ tokens: 14205, latency: 45, requests: 892 });
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simulate live stats
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        tokens: prev.tokens + Math.floor(Math.random() * 50),
        latency: 40 + Math.floor(Math.random() * 20),
        requests: prev.requests + 1
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate incoming logs
  useEffect(() => {
    const possibleLogs = [
      { type: "info", text: "Xero: Invoice #2024-001 synced" },
      { type: "success", text: "Gmail: Found matching thread" },
      { type: "process", text: "DeepSeek: Analyzing sentiment..." },
      { type: "info", text: "Airtable: Record updated" },
      { type: "warn", text: "Rate limit approach: 80%" },
      { type: "success", text: "MCP: Handshake established" },
      { type: "process", text: "Slack: Notifying #finance" },
    ];

    const addLog = () => {
      const newLog = possibleLogs[Math.floor(Math.random() * possibleLogs.length)];
      setLogs(prev => [...prev.slice(-6), { ...newLog, id: Date.now(), time: new Date().toLocaleTimeString().split(' ')[0] }]);
    };

    const interval = setInterval(addLog, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full gap-4">
      {/* HUD Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-3 h-3 text-salmon-500" />
            <span className="text-[10px] text-gray-400 uppercase">Tokens/s</span>
          </div>
          <div className="text-xl font-mono font-bold text-white tabular-nums">
            {stats.tokens.toLocaleString()}
          </div>
        </div>
        <div className="bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-3 h-3 text-green-500" />
            <span className="text-[10px] text-gray-400 uppercase">Latency</span>
          </div>
          <div className="text-xl font-mono font-bold text-white tabular-nums">
            {stats.latency}ms
          </div>
        </div>
      </div>

      {/* Terminal Feed */}
      <div className="flex-grow bg-black/60 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-3 h-3 text-gray-400" />
            <span className="text-xs font-bold text-gray-300">Live Agent Stream</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
          </div>
        </div>
        
        <div className="p-4 flex flex-col gap-2 overflow-hidden relative h-full min-h-[200px]">
          <AnimatePresence mode='popLayout'>
            {logs.map((log) => (
              <motion.div
                key={log.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-start gap-3 text-xs font-mono"
              >
                <span className="text-gray-600 shrink-0 select-none">[{log.time}]</span>
                <span className={`
                  ${log.type === 'success' ? 'text-green-400' : 
                    log.type === 'warn' ? 'text-yellow-400' : 
                    log.type === 'process' ? 'text-blue-400' : 'text-gray-300'}
                `}>
                  {log.type === 'process' && <span className="animate-pulse">► </span>}
                  {log.text}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Scanline effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent pointer-events-none animate-scan"></div>
        </div>
      </div>
      
      {/* Active Agents */}
      <div className="bg-aubergine-800/50 rounded-xl p-3 border border-white/10 flex items-center justify-between">
         <div className="flex items-center gap-2">
           <Cpu className="w-4 h-4 text-salmon-400" />
           <span className="text-xs font-medium text-gray-300">Active Agents</span>
         </div>
         <div className="flex -space-x-2">
           {[1,2,3].map(i => (
             <div key={i} className="w-6 h-6 rounded-full bg-aubergine-700 border border-aubergine-900 flex items-center justify-center text-[8px] text-white font-bold">
               A{i}
             </div>
           ))}
           <div className="w-6 h-6 rounded-full bg-salmon-500 border border-aubergine-900 flex items-center justify-center text-[8px] text-black font-bold">
             +2
           </div>
         </div>
      </div>
    </div>
  );
}
