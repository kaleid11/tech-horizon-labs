import { motion } from "framer-motion";
import { Database, Mail, FileSpreadsheet, MessageSquare, CreditCard, Github, Globe, Server, Bot, Zap } from "lucide-react";
import { useState, useEffect } from "react";

export function McpVisualization() {
  const [activePath, setActivePath] = useState(0);

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
    <div className="relative w-full h-[600px] bg-aubergine-900/50 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center">
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-aubergine-900/80"></div>
      
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
          <div className="absolute -bottom-10 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs font-mono text-salmon-200">
            Model Context Protocol
          </div>
        </motion.div>

        {/* Orbiting Rings */}
        <div className="absolute w-[400px] h-[400px] border border-white/5 rounded-full animate-spin-slow pointer-events-none"></div>
        <div className="absolute w-[550px] h-[550px] border border-white/5 rounded-full animate-spin-reverse-slow pointer-events-none"></div>
      </div>

      {/* Connected Apps (Satellites) */}
      {apps.map((app, index) => {
        // Calculate position on the circle (radius 220px)
        const radius = 220;
        const radian = (app.angle * Math.PI) / 180;
        const x = radius * Math.cos(radian);
        const y = radius * Math.sin(radian);
        
        const isActive = index === activePath;

        return (
          <motion.div
            key={app.id}
            className="absolute z-10"
            style={{ x, y }}
          >
            {/* Connection Line */}
            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] pointer-events-none overflow-visible" style={{ left: -x, top: -y }}>
              <line 
                x1="220" 
                y1="220" 
                x2={220 + x} 
                y2={220 + y} 
                stroke={isActive ? app.color : "rgba(255,255,255,0.05)"} 
                strokeWidth={isActive ? 2 : 1}
                strokeDasharray="4 4"
              />
              
              {/* Data Packet Animation */}
              {isActive && (
                <motion.circle
                  r="4"
                  fill={app.color}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    cx: [220 + x, 220],
                    cy: [220 + y, 220],
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{ duration: 1.5, ease: "easeInOut", times: [0, 0.1, 0.9, 1] }}
                />
              )}
               {/* Response Packet Animation */}
               {isActive && (
                <motion.circle
                  r="4"
                  fill="#ffffff"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    cx: [220, 220 + x],
                    cy: [220, 220 + y],
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8, times: [0, 0.1, 0.9, 1] }}
                />
              )}
            </svg>

            {/* App Icon Node */}
            <div className={`
              w-16 h-16 rounded-xl flex items-center justify-center border transition-all duration-500
              ${isActive ? 'bg-white/10 border-white/40 scale-110 shadow-[0_0_30px_rgba(255,255,255,0.1)]' : 'bg-aubergine-800/50 border-white/5 grayscale'}
            `}>
              <app.icon className="w-8 h-8" style={{ color: isActive ? app.color : '#666' }} />
            </div>
            
            {/* App Name Label */}
            <div className={`absolute top-20 left-1/2 -translate-x-1/2 text-xs font-medium tracking-wider transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-600'}`}>
              {app.name}
            </div>
          </motion.div>
        );
      })}

      {/* Agent-to-Agent Overlay (Top Right) */}
      <div className="absolute top-8 right-8 bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10 max-w-xs">
        <div className="flex items-center gap-3 mb-3">
          <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Live Agent Hand-off</span>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3 text-xs text-gray-300">
             <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30">
               <Bot className="w-3 h-3 text-blue-400" />
             </div>
             <div>
               <span className="text-blue-400 font-bold">Research Agent:</span> Found 14 new invoices in Gmail matching "Q4 Project".
             </div>
          </div>
          <div className="w-px h-4 bg-gray-700 ml-3"></div>
          <div className="flex items-start gap-3 text-xs text-gray-300">
             <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center shrink-0 border border-green-500/30">
               <FileSpreadsheet className="w-3 h-3 text-green-400" />
             </div>
             <div>
               <span className="text-green-400 font-bold">Finance Agent:</span> Extracted data via MCP. Reconciling in Xero now...
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
