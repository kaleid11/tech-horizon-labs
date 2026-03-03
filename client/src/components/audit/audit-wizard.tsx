import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, ClipboardCheck } from "lucide-react";
import { auditQuestions } from "./audit-questions-data";
import { calculateResults, type AuditResults } from "./audit-scoring";
import { AuditProgress } from "./audit-progress";
import { AuditQuestionDisplay } from "./audit-question";
import { AuditLeadForm } from "./audit-lead-form";
import { AuditResultsDisplay } from "./audit-results";
import { useToast } from "@/hooks/use-toast";

type WizardState = "intro" | "questions" | "lead-capture" | "results";

export function AuditWizard() {
  const [state, setState] = useState<WizardState>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [results, setResults] = useState<AuditResults | null>(null);
  const [leadName, setLeadName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < auditQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setState("lead-capture");
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleLeadSubmit = async (data: {
    name: string;
    email: string;
    business: string;
  }) => {
    setIsSubmitting(true);
    setLeadName(data.name.split(" ")[0]);

    const auditResults = calculateResults(answers);
    setResults(auditResults);

    try {
      await fetch("/api/audit-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          business: data.business,
          score: auditResults.percentage,
          answers: JSON.stringify(answers),
          results: JSON.stringify({
            dimensions: auditResults.dimensions,
            recommendations: auditResults.recommendations,
          }),
          suggestedTier: auditResults.tier,
        }),
      });
    } catch {
      // Submission failed silently — still show results
      console.error("Failed to submit audit data");
    }

    setIsSubmitting(false);
    setState("results");
  };

  const currentQ = auditQuestions[currentQuestion];
  const currentAnswer = currentQ ? answers[currentQ.id] ?? null : null;

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-12">
      {state === "intro" && (
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-salmon-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ClipboardCheck className="h-10 w-10 text-salmon-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-aubergine-900 mb-4">
            AI Readiness Self-Assessment
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            10 questions. 2 minutes. Instant results.
          </p>
          <p className="text-gray-500 mb-8">
            Find out where your business stands on AI readiness across 5 key
            dimensions — and get personalised recommendations for your next step.
          </p>

          <Button
            onClick={() => setState("questions")}
            className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8 h-14 text-lg group"
          >
            Start Assessment
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span>Free</span>
            <span>•</span>
            <span>No account required</span>
            <span>•</span>
            <span>Instant results</span>
          </div>
        </div>
      )}

      {state === "questions" && currentQ && (
        <div className="w-full max-w-2xl mx-auto">
          <AuditProgress
            current={currentQuestion + 1}
            total={auditQuestions.length}
          />

          <AuditQuestionDisplay
            question={currentQ}
            selectedValue={currentAnswer}
            onSelect={handleAnswer}
          />

          <div className="flex justify-between mt-8 max-w-2xl mx-auto">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentQuestion === 0}
              className="rounded-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={currentAnswer === null}
              className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8 group"
            >
              {currentQuestion === auditQuestions.length - 1
                ? "See Results"
                : "Next"}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      )}

      {state === "lead-capture" && (
        <AuditLeadForm onSubmit={handleLeadSubmit} isSubmitting={isSubmitting} />
      )}

      {state === "results" && results && (
        <AuditResultsDisplay results={results} name={leadName} />
      )}
    </div>
  );
}
