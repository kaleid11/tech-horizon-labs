import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export function ContactFormDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const { toast } = useToast();

  const submitMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit");
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", company: "", message: "" });
      setOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-aubergine-900">Book Discovery Call</DialogTitle>
          <DialogDescription className="text-gray-600">
            Tell us about your business and we'll reach out within 24 hours to schedule a free 15-minute discovery call.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-aubergine-900 font-medium">Name *</Label>
            <Input
              id="name"
              data-testid="input-contact-name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your name"
              className="border-gray-300"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-aubergine-900 font-medium">Email *</Label>
            <Input
              id="email"
              data-testid="input-contact-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@company.com"
              className="border-gray-300"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company" className="text-aubergine-900 font-medium">Company</Label>
            <Input
              id="company"
              data-testid="input-contact-company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Your company name (optional)"
              className="border-gray-300"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message" className="text-aubergine-900 font-medium">Message *</Label>
            <Textarea
              id="message"
              data-testid="textarea-contact-message"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your automation goals..."
              className="min-h-[120px] border-gray-300"
            />
          </div>
          
          <Button
            type="submit"
            data-testid="button-submit-contact"
            disabled={submitMutation.isPending}
            className="w-full bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold h-12 rounded-full"
          >
            {submitMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
