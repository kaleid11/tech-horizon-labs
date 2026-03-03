import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2 } from "lucide-react";

export function NewsletterDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const submitMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to subscribe");
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Welcome to Tech Horizon Academy!",
        description: "Check your email for a welcome message and next steps.",
      });
      setEmail("");
      setOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Subscription Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(email);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-aubergine-900">Join Tech Horizon Academy</DialogTitle>
          <DialogDescription className="text-gray-600">
            Get free access to 1,300+ tested AI workflows, weekly tool updates, and practical automation templates.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="bg-cream-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-bold text-aubergine-900 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-salmon-500" />
              What You'll Get:
            </h4>
            <ul className="text-sm text-gray-700 space-y-1 ml-7">
              <li>• 1,300+ tested AI workflow templates</li>
              <li>• Weekly tool tracking & updates</li>
              <li>• Australian compliance mappings</li>
              <li>• AI integration guides</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="newsletter-email" className="text-aubergine-900 font-medium">Email Address</Label>
            <Input
              id="newsletter-email"
              data-testid="input-newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="border-gray-300 h-12"
            />
          </div>
          
          <Button
            type="submit"
            data-testid="button-submit-newsletter"
            disabled={submitMutation.isPending}
            className="w-full bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold h-12 rounded-full"
          >
            {submitMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : (
              "Join Free Academy"
            )}
          </Button>
          
          <p className="text-xs text-gray-500 text-center">
            No credit card required. Unsubscribe anytime.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
