import { useState } from "react";
import { Navbar, Footer, SkipLink } from "@/components/layout";
import { PageSEO, SEO_CONFIGS } from "@/components/seo/page-seo";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { BOOKING_URL } from "@/components/contact-form-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar,
  Mail,
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  GraduationCap,
  Loader2,
} from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export default function Contact() {
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

  const faqs = [
    {
      question: "What happens on the discovery call?",
      answer:
        "We spend 15 minutes understanding your business workflows, identify your most expensive bottleneck, and assess whether AI can help. No sales pitch. If AI isn't the right solution, we'll tell you.",
    },
    {
      question: "How fast do you respond?",
      answer:
        "Within 1 business day for messages. Discovery calls can usually be booked within 2-3 days.",
    },
    {
      question: "Do you work with businesses outside Queensland?",
      answer:
        "Yes. Our consulting works for businesses anywhere in Australia via remote collaboration. On-site work is available in SEQ (Sunshine Coast, Brisbane, Gold Coast).",
    },
    {
      question: "What if AI isn't right for my business?",
      answer:
        "We'll tell you honestly. We turn away roughly 30% of prospects because the ROI doesn't justify it yet. If you're not ready for consulting, our Academy is a great place to start learning.",
    },
  ];

  return (
    <div className="min-h-screen font-sans bg-background">
      <PageSEO {...SEO_CONFIGS.contact} />
      <SkipLink />
      <Navbar />

      <main id="main-content">
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-aubergine-900 via-aubergine-800 to-aubergine-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-salmon-500/10 via-transparent to-transparent" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Get in <span className="text-salmon-500">Touch</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
              Book a free discovery call, send us a message, or find our
              details. We respond within 1 business day.
            </p>
          </div>
        </section>

        <PageBreadcrumb items={[{ label: "Contact" }]} />

        {/* Contact Methods */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Card 1 — Book a Discovery Call */}
              <div className="rounded-2xl border-2 border-salmon-200 bg-white p-8 shadow-sm flex flex-col">
                <div className="w-14 h-14 bg-salmon-100 rounded-2xl flex items-center justify-center mb-6">
                  <Calendar className="h-7 w-7 text-salmon-600" />
                </div>
                <h2 className="text-xl font-bold text-aubergine-900 mb-3">
                  Book a Discovery Call
                </h2>
                <p className="text-gray-600 mb-6 flex-grow">
                  Free 15-minute call to explore AI opportunities for your
                  business. No sales pitch — just honest conversation.
                </p>
                <Button
                  size="lg"
                  className="w-full bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full transition-all hover:scale-105"
                  asChild
                >
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="link-contact-book"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Book Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <p className="text-sm text-gray-500 text-center mt-4">
                  Pick a time that works for you
                </p>
              </div>

              {/* Card 2 — Send a Message */}
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm flex flex-col">
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
                  <Mail className="h-7 w-7 text-aubergine-800" />
                </div>
                <h2 className="text-xl font-bold text-aubergine-900 mb-3">
                  Send a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4 flex-grow flex flex-col">
                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-name"
                      className="text-aubergine-900 font-medium"
                    >
                      Name *
                    </Label>
                    <Input
                      id="contact-name"
                      data-testid="input-contact-name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Your name"
                      className="border-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-email"
                      className="text-aubergine-900 font-medium"
                    >
                      Email *
                    </Label>
                    <Input
                      id="contact-email"
                      data-testid="input-contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="you@company.com"
                      className="border-gray-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="contact-company"
                      className="text-aubergine-900 font-medium"
                    >
                      Company
                    </Label>
                    <Input
                      id="contact-company"
                      data-testid="input-contact-company"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      placeholder="Your company name (optional)"
                      className="border-gray-300"
                    />
                  </div>

                  <div className="space-y-2 flex-grow">
                    <Label
                      htmlFor="contact-message"
                      className="text-aubergine-900 font-medium"
                    >
                      Message *
                    </Label>
                    <Textarea
                      id="contact-message"
                      data-testid="textarea-contact-message"
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
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
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Card 3 — Quick Info */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 shadow-sm flex flex-col">
                <div className="w-14 h-14 bg-gray-200 rounded-2xl flex items-center justify-center mb-6">
                  <MapPin className="h-7 w-7 text-aubergine-800" />
                </div>
                <h2 className="text-xl font-bold text-aubergine-900 mb-6">
                  Quick Info
                </h2>

                <div className="space-y-5 flex-grow">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-salmon-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-aubergine-900">Location</p>
                      <p className="text-sm text-gray-600">
                        Sunshine Coast, Queensland, Australia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-salmon-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-aubergine-900">
                        Service Area
                      </p>
                      <p className="text-sm text-gray-600">
                        Queensland-wide (remote) + SEQ (on-site)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-salmon-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-aubergine-900">
                        Response Time
                      </p>
                      <p className="text-sm text-gray-600">
                        Within 1 business day
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-salmon-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-aubergine-900">Email</p>
                      <a
                        href="mailto:hello@techhorizonlabs.com"
                        className="text-sm text-salmon-600 hover:underline"
                        data-testid="link-contact-email"
                      >
                        hello@techhorizonlabs.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-salmon-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-aubergine-900">Hours</p>
                      <p className="text-sm text-gray-600">
                        Mon-Fri, 9am-5pm AEST
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-10">
                <HelpCircle className="h-8 w-8 text-salmon-500" />
                <h2 className="text-3xl font-bold text-aubergine-900">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 border border-gray-200"
                  >
                    <h3 className="font-bold text-aubergine-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 bg-aubergine-900 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <GraduationCap className="h-12 w-12 text-salmon-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Not Ready for Consulting?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Start learning at Tech Horizon Academy. 1,300+ tested workflows,
              weekly workshops, and a community of 300+ SEQ operators.
            </p>
            <Button
              size="lg"
              className="bg-salmon-500 hover:bg-salmon-600 text-aubergine-900 font-bold rounded-full px-8 transition-all hover:scale-105"
              asChild
            >
              <a href="/academy" data-testid="link-contact-academy">
                <GraduationCap className="mr-2 h-5 w-5" />
                Explore the Academy
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
