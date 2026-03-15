import { motion, useReducedMotion } from 'framer-motion';
import { Database, Layers, Workflow, ArrowRight, Brain, MessageSquare, Bot } from 'lucide-react';

const stages = [
  {
    icon: Database,
    title: "Your Data Today",
    description: "Emails, docs, spreadsheets — scattered across tools",
    color: "text-gray-400",
    bgColor: "bg-gray-500/20",
    borderColor: "border-gray-500/30"
  },
  {
    icon: Layers,
    title: "AI-Ready Knowledge Base",
    description: "Organised, indexed, and connected to Claude & ChatGPT",
    color: "text-salmon-500",
    bgColor: "bg-salmon-500/20",
    borderColor: "border-salmon-500/30"
  },
  {
    icon: Workflow,
    title: "Automated Workflows",
    description: "AI handles the repetitive work — your team focuses on growth",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
    borderColor: "border-blue-500/30"
  }
];

// Tool logos that flow through the pipeline
const toolLogos = [
  { name: "Claude", icon: Brain, color: "text-orange-400", bg: "bg-orange-500/20" },
  { name: "ChatGPT", icon: MessageSquare, color: "text-green-400", bg: "bg-green-500/20" },
  { name: "AI Agents", icon: Bot, color: "text-blue-400", bg: "bg-blue-500/20" },
];

export function JourneyVisualization() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
      className="w-full max-w-xl mx-auto"
      role="img"
      aria-label="AI Readiness Journey: Three stages showing transformation from scattered data through AI-ready knowledge base to automated workflows"
    >
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8">
        {/* Tools Strip */}
        <div className="flex items-center justify-center gap-3 mb-6 pb-6 border-b border-white/10">
          <span className="text-xs text-gray-500 uppercase tracking-wider mr-2">Powered by</span>
          {toolLogos.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.4 + i * 0.15 }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${tool.bg} border border-white/10`}
            >
              <tool.icon className={`w-4 h-4 ${tool.color}`} />
              <span className={`text-xs font-medium ${tool.color}`}>{tool.name}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col gap-3" role="list" aria-label="Journey stages">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.title}
              initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : 0.6 + index * 0.2 }}
              role="listitem"
            >
              <div className="flex items-center gap-4">
                <div className={`flex-1 flex items-center gap-4 p-4 rounded-xl ${stage.bgColor} border ${stage.borderColor} transition-all hover:scale-[1.02]`}>
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${stage.bgColor} flex-shrink-0`} aria-hidden="true">
                    <stage.icon className={`w-5 h-5 ${stage.color}`} />
                  </div>
                  <div className="min-w-0">
                    <h4 className={`font-semibold text-sm ${stage.color === 'text-gray-400' ? 'text-gray-300' : stage.color}`}>
                      {stage.title}
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </div>

              {index < stages.length - 1 && (
                <motion.div
                  className="flex justify-center py-1.5"
                  initial={prefersReducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: prefersReducedMotion ? 0 : 0.8 + index * 0.2 }}
                  aria-hidden="true"
                >
                  <ArrowRight className="w-4 h-4 text-gray-600 rotate-90" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom result */}
        <motion.div
          className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: prefersReducedMotion ? 0 : 1.4 }}
        >
          <span className="text-xs text-gray-500">Result</span>
          <span className="text-sm font-bold text-salmon-500">20+ hours saved per week</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
