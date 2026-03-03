import type { AuditQuestion } from "./audit-questions-data";
import { DIMENSIONS } from "./audit-questions-data";

interface AuditQuestionProps {
  question: AuditQuestion;
  selectedValue: number | null;
  onSelect: (questionId: string, value: number) => void;
}

export function AuditQuestionDisplay({
  question,
  selectedValue,
  onSelect,
}: AuditQuestionProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-2">
        <span className="text-xs font-medium text-salmon-600 uppercase tracking-wider">
          {DIMENSIONS[question.dimension]}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-aubergine-900 mb-8">
        {question.question}
      </h3>

      <div className="space-y-3">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => onSelect(question.id, option.value)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
              selectedValue === option.value
                ? "border-salmon-500 bg-salmon-50 shadow-sm"
                : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <span
              className={`text-base ${
                selectedValue === option.value
                  ? "text-aubergine-900 font-medium"
                  : "text-gray-700"
              }`}
            >
              {option.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
