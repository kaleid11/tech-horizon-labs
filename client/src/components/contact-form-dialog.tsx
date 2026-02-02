import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Calendar, Mail } from "lucide-react";

export const BOOKING_URL = "https://app.klipy.ai/book/pre-discovery/free-pre-discovery";

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
            Schedule a free 15-minute discovery call to explore AI opportunities for your business.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold h-12 rounded-full transition-colors"
            data-testid="link-book-calendar"
          >
            <Calendar className="h-5 w-5" />
            Book Now - Pick a Time
          </a>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or send a message</span>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
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
            variant="outline"
            className="w-full border-gray-300 text-aubergine-900 font-medium h-12 rounded-full hover:bg-gray-50"
          >
            {submitMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Send Message Instead
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
