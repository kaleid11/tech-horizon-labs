import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

interface AuditLeadFormProps {
  onSubmit: (data: { name: string; email: string; business: string }) => void;
  isSubmitting: boolean;
}

export function AuditLeadForm({ onSubmit, isSubmitting }: AuditLeadFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      onSubmit({ name, email, business });
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-aubergine-900 mb-3">
          Almost There — Get Your Results
        </h3>
        <p className="text-gray-600">
          Enter your details to see your personalised AI readiness score, radar
          chart, and recommendations.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="audit-name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your Name *
          </label>
          <Input
            id="audit-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Sarah Jenkins"
            required
            className="rounded-xl"
          />
        </div>

        <div>
          <label
            htmlFor="audit-email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address *
          </label>
          <Input
            id="audit-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. sarah@company.com.au"
            required
            className="rounded-xl"
          />
        </div>

        <div>
          <label
            htmlFor="audit-business"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Business Name
          </label>
          <Input
            id="audit-business"
            type="text"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            placeholder="e.g. BuildRight Construction"
            className="rounded-xl"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || !name || !email}
          className="w-full bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full h-12 text-lg group"
        >
          {isSubmitting ? "Calculating..." : "See My Results"}
          {!isSubmitting && (
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          )}
        </Button>

        <p className="text-xs text-center text-gray-500">
          We'll email you a copy of your results. No spam, no sales sequences —
          just your assessment.
        </p>
      </form>
    </div>
  );
}
