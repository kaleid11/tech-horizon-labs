import { motion } from "framer-motion";
import { Database, Mail, FileSpreadsheet, MessageSquare, CreditCard, Github, Globe, Server, Bot, Zap } from "lucide-react";
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
    <div ref={containerRef} className="relative w-full h-[600px] bg-aubergine-900/50 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center">
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-aubergine-900/80"></div>
      
      {/* Shared SVG Layer for Connections - Centered */}
      {/* We use a viewBox that places (0,0) at the center to simplify polar math */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible" viewBox="-300 -300 600 600">
        {apps.map((app, index) => {
          const radius = 180;
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
              
              {/* Data Packet Animation (Outbound) */}
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
               {/* Response Packet Animation (Inbound) */}
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

      {/* Central Core: The LLM / MCP Hub */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        {/* The Brain (LLM) */}
        <motion.div 
          animate={{ boxShadow: ["0 0 20px rgba(243, 155, 109, 0.2)", "0 0 60px rgba(243, 155, 109, 0.6)", "0 0 20px rgba(243, 155, 109, 0.2)"] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-24 h-24 rounded-2xl bg-gradient-to-br from-salmon-500 to-orange-600 flex items-center justify-center shadow-2xl z-30 relative"
        >
          <Bot className="w-12 h-12 text-white" />
          
          {/* MCP Label Badge */}
          <div className="absolute -bottom-10 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs font-mono text-salmon-200 whitespace-nowrap">
            Model Context Protocol
          </div>
        </motion.div>

        {/* Orbiting Rings */}
        <div className="absolute w-[400px] h-[400px] border border-white/5 rounded-full animate-spin-slow pointer-events-none"></div>
        <div className="absolute w-[550px] h-[550px] border border-white/5 rounded-full animate-spin-reverse-slow pointer-events-none"></div>
      </div>

      {/* Connected Apps (Satellites) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        {apps.map((app, index) => {
          const radius = 180;
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
              {/* App Icon Node */}
              <div className={`
                w-14 h-14 rounded-xl flex items-center justify-center border transition-all duration-500 relative
                ${isActive ? 'bg-white/10 border-white/40 scale-110 shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'bg-aubergine-800/80 border-white/10 grayscale'}
              `}>
                <app.icon className="w-6 h-6" style={{ color: isActive ? app.color : '#666' }} />
              </div>
              
              {/* App Name Label */}
              <div className={`absolute top-16 whitespace-nowrap text-[10px] font-medium tracking-wider uppercase transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-600'}`}>
                {app.name}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Agent-to-Agent Overlay (Bottom Left) */}
      <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-80 bg-black/60 backdrop-blur-xl p-4 rounded-xl border border-white/10 shadow-2xl z-30">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live Agent Activity</span>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
             <div className="mt-0.5 w-5 h-5 rounded bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30">
               <Bot className="w-3 h-3 text-blue-400" />
             </div>
             <div>
               <div className="text-[11px] font-bold text-blue-300">Research Agent</div>
               <div className="text-[10px] text-gray-400 leading-tight">Found 14 new invoices in Gmail matching "Q4 Project".</div>
             </div>
          </div>
          <div className="w-px h-3 bg-white/10 ml-2.5"></div>
          <div className="flex items-start gap-3">
             <div className="mt-0.5 w-5 h-5 rounded bg-salmon-500/20 flex items-center justify-center shrink-0 border border-salmon-500/30">
               <FileSpreadsheet className="w-3 h-3 text-salmon-400" />
             </div>
             <div>
               <div className="text-[11px] font-bold text-salmon-300">Finance Agent</div>
               <div className="text-[10px] text-gray-400 leading-tight">Extracted data via MCP. Reconciling in Xero now...</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
