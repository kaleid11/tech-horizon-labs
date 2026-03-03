import { Progress } from "@/components/ui/progress";

interface AuditProgressProps {
  current: number;
  total: number;
}

export function AuditProgress({ current, total }: AuditProgressProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between items-center mb-2 text-sm">
        <span className="text-gray-600">
          Question {current} of {total}
        </span>
        <span className="text-salmon-600 font-medium">{percentage}%</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}
