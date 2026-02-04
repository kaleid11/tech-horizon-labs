import { motion, useReducedMotion } from 'framer-motion';
import { Database, Layers, Workflow, ArrowRight } from 'lucide-react';

const stages = [
  {
    icon: Database,
    title: "Scattered Data",
    description: "Unstructured documents, siloed systems",
    color: "text-gray-400",
    bgColor: "bg-gray-500/20",
    borderColor: "border-gray-500/30"
  },
  {
    icon: Layers,
    title: "AI-Ready Knowledge Base",
    description: "Organised, indexed, context-rich",
    color: "text-salmon-500",
    bgColor: "bg-salmon-500/20",
    borderColor: "border-salmon-500/30"
  },
  {
    icon: Workflow,
    title: "Agentic Workflows",
    description: "Intelligent automation at scale",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
    borderColor: "border-blue-500/30"
  }
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
      aria-label="AI Readiness Journey: Three stages showing transformation from Scattered Data through AI-Ready Knowledge Base to Agentic Workflows"
    >
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8">
        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
            The Readiness Journey
          </span>
        </div>

        <div className="flex flex-col gap-4" role="list" aria-label="Journey stages">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.title}
              initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : 0.3 + index * 0.2 }}
              role="listitem"
            >
              <div className="flex items-center gap-4">
                {/* Stage card */}
                <div className={`flex-1 flex items-center gap-4 p-4 rounded-xl ${stage.bgColor} border ${stage.borderColor} transition-all hover:scale-[1.02]`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stage.bgColor}`} aria-hidden="true">
                    <stage.icon className={`w-6 h-6 ${stage.color}`} />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${stage.color === 'text-gray-400' ? 'text-gray-300' : stage.color}`}>
                      {stage.title}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Arrow between stages */}
              {index < stages.length - 1 && (
                <motion.div
                  className="flex justify-center py-2"
                  initial={prefersReducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: prefersReducedMotion ? 0 : 0.5 + index * 0.2 }}
                  aria-hidden="true"
                >
                  <ArrowRight className="w-5 h-5 text-gray-600 rotate-90" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.div
          className="mt-6 pt-6 border-t border-white/10 text-center"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: prefersReducedMotion ? 0 : 1.2 }}
        >
          <p className="text-sm text-gray-400">
            We guide you through every stage—building foundations that last.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
