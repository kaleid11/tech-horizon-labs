import type { Express, Request, Response, NextFunction } from "express";
import { createServer } from "http";
import type { Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import rateLimit from "express-rate-limit";
import { insertContactSubmissionSchema, insertNewsletterSignupSchema } from "@shared/schema";
import { sendContactNotification, sendContactAutoReply, sendNewsletterWelcome, sendAuditResults, sendAuditNotification } from "./email";
import { pushToKlipy } from "./klipy";
import { pushToBeehiiv } from "./beehiiv";

// Rate limiters for API endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 requests per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: "Too many requests. Please try again later." },
});

// Simple admin authentication middleware
const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const adminKey = req.headers['x-admin-key'];
  const expectedKey = process.env.ADMIN_API_KEY;

  if (!expectedKey) {
    if (process.env.NODE_ENV === 'production') {
      return res.status(503).json({ error: 'Admin API not configured' });
    }
    console.warn('WARNING: ADMIN_API_KEY not set. Admin endpoints accessible without auth.');
    return next();
  }

  if (adminKey !== expectedKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // ===== 301 Redirects — old React SPA routes to new static pages =====

  // Portfolio → Work
  app.get("/portfolio", (_req, res) => res.redirect(301, "/work"));
  app.get("/portfolio/", (_req, res) => res.redirect(301, "/work"));
  app.get("/portfolio/:slug", (_req, res) => res.redirect(301, "/work"));
  app.get("/portfolio/:slug/", (_req, res) => res.redirect(301, "/work"));

  // Services → Homepage
  app.get("/services", (_req, res) => res.redirect(301, "/"));
  app.get("/services/", (_req, res) => res.redirect(301, "/"));
  app.get("/services/:slug", (_req, res) => res.redirect(301, "/"));
  app.get("/services/:slug/", (_req, res) => res.redirect(301, "/"));

  // NOTE: Wildcard redirects for /locations/:slug, /industries/:slug, /insights/:slug
  // are registered in static.ts AFTER the specific page routes, to avoid catching them.

  // Guides → Academy
  app.get("/guides/:slug", (_req, res) => res.redirect(301, "/academy"));
  app.get("/guides/:slug/", (_req, res) => res.redirect(301, "/academy"));

  // Individual removed pages
  app.get("/audit-tool", (_req, res) => res.redirect(301, "/assessment"));
  app.get("/audit-tool/", (_req, res) => res.redirect(301, "/assessment"));
  app.get("/ai-ethics", (_req, res) => res.redirect(301, "/about"));
  app.get("/events", (_req, res) => res.redirect(301, "/"));
  app.get("/resources", (_req, res) => res.redirect(301, "/academy"));
  app.get("/resources/", (_req, res) => res.redirect(301, "/academy"));

  // ===== Legacy redirects (WordPress era + old site) =====

  app.get("/for-business", (_req, res) => res.redirect(301, "/"));
  app.get("/for-business/", (_req, res) => res.redirect(301, "/"));
  app.get("/contact-us", (_req, res) => res.redirect(301, "/contact"));
  app.get("/contact-us/", (_req, res) => res.redirect(301, "/contact"));
  app.get("/about-us", (_req, res) => res.redirect(301, "/about"));
  app.get("/about-us/", (_req, res) => res.redirect(301, "/about"));
  app.get("/blog", (_req, res) => res.redirect(301, "/insights"));
  app.get("/blog/", (_req, res) => res.redirect(301, "/insights"));
  app.get("/blog/:slug", (_req, res) => res.redirect(301, "/insights"));
  app.get("/blog/:slug/", (_req, res) => res.redirect(301, "/insights"));
  app.get("/membership", (_req, res) => res.redirect(301, "/academy"));
  app.get("/membership/", (_req, res) => res.redirect(301, "/academy"));
  app.get("/workshops", (_req, res) => res.redirect(301, "/academy"));
  app.get("/workshops/", (_req, res) => res.redirect(301, "/academy"));
  app.get("/ai-workshop-business-sunshine-coast", (_req, res) => res.redirect(301, "/academy"));
  app.get("/ai-workshop-business-sunshine-coast/", (_req, res) => res.redirect(301, "/academy"));
  app.get("/category/:slug", (_req, res) => res.redirect(301, "/"));
  app.get("/category/:slug/", (_req, res) => res.redirect(301, "/"));
  app.get("/tag/:slug", (_req, res) => res.redirect(301, "/"));
  app.get("/tag/:slug/", (_req, res) => res.redirect(301, "/"));
  app.get("/page/:slug", (_req, res) => res.redirect(301, "/"));
  app.get("/page/:slug/", (_req, res) => res.redirect(301, "/"));
  app.get("/wp-content/:slug", (_req, res) => res.redirect(301, "/"));
  app.get("/wp-admin", (_req, res) => res.redirect(301, "/"));
  app.get("/wp-login.php", (_req, res) => res.redirect(301, "/"));
  app.get("/privacy-policy", (_req, res) => res.redirect(301, "/privacy"));
  app.get("/privacy-policy/", (_req, res) => res.redirect(301, "/privacy"));
  app.get("/terms-of-service", (_req, res) => res.redirect(301, "/terms"));
  app.get("/terms-of-service/", (_req, res) => res.redirect(301, "/terms"));
  app.get("/book-here", (_req, res) => res.redirect(301, "/contact"));
  app.get("/book-here/", (_req, res) => res.redirect(301, "/contact"));
  app.get("/feed", (_req, res) => res.redirect(301, "/"));
  app.get("/feed/", (_req, res) => res.redirect(301, "/"));
  app.get("/workshop/:slug", (_req, res) => res.redirect(301, "/academy"));
  app.get("/workshop/:slug/", (_req, res) => res.redirect(301, "/academy"));
  app.get("/workshops/:slug", (_req, res) => res.redirect(301, "/academy"));
  app.get("/workshops/:slug/", (_req, res) => res.redirect(301, "/academy"));
  app.get("/course/:slug", (_req, res) => res.redirect(301, "/academy"));
  app.get("/course/:slug/", (_req, res) => res.redirect(301, "/academy"));
  app.get("/home", (_req, res) => res.redirect(301, "/"));
  app.get("/home/", (_req, res) => res.redirect(301, "/"));
  app.get("/index.html", (_req, res) => res.redirect(301, "/"));
  app.get("/index.php", (_req, res) => res.redirect(301, "/"));

  // ===== Additional WordPress legacy redirects =====
  app.get("/ai-business-training-sunshine-coast", (_req, res) => res.redirect(301, "/academy"));
  app.get("/ai-business-training-sunshine-coast/", (_req, res) => res.redirect(301, "/academy"));
  app.get("/ai-consultant-sunshine-coast-business-transformation", (_req, res) => res.redirect(301, "/locations/sunshine-coast"));
  app.get("/ai-consultant-sunshine-coast-business-transformation/", (_req, res) => res.redirect(301, "/locations/sunshine-coast"));
  app.get("/unctad-2025-ai-report-australia-guide", (_req, res) => res.redirect(301, "/insights"));
  app.get("/unctad-2025-ai-report-australia-guide/", (_req, res) => res.redirect(301, "/insights"));
  app.get("/for-home", (_req, res) => res.redirect(301, "/academy"));
  app.get("/for-home/", (_req, res) => res.redirect(301, "/academy"));
  app.get("/author/huxleythzn-world", (_req, res) => res.redirect(301, "/about"));
  app.get("/author/huxleythzn-world/", (_req, res) => res.redirect(301, "/about"));
  app.get("/event/tech-horizon-labs-ai-for-business-launch-event", (_req, res) => res.redirect(301, "/academy"));
  app.get("/event/tech-horizon-labs-ai-for-business-launch-event/", (_req, res) => res.redirect(301, "/academy"));
  app.get("/event/ai-workshop-for-business-noosa", (_req, res) => res.redirect(301, "/academy"));
  app.get("/event/ai-workshop-for-business-noosa/", (_req, res) => res.redirect(301, "/academy"));
  app.get("/event/ai-for-business-sunshine-coast", (_req, res) => res.redirect(301, "/academy"));
  app.get("/event/ai-for-business-sunshine-coast/", (_req, res) => res.redirect(301, "/academy"));
  app.get("/courses", (_req, res) => res.redirect(301, "/academy"));
  app.get("/courses/", (_req, res) => res.redirect(301, "/academy"));
  app.get("/courses/sample-course", (_req, res) => res.redirect(301, "/academy"));
  app.get("/courses/sample-course/", (_req, res) => res.redirect(301, "/academy"));
  app.get("/product-category/support", (_req, res) => res.redirect(301, "/contact"));
  app.get("/product-category/support/", (_req, res) => res.redirect(301, "/contact"));
  app.get("/product/free-pre-discovery-call", (_req, res) => res.redirect(301, "/contact"));
  app.get("/product/free-pre-discovery-call/", (_req, res) => res.redirect(301, "/contact"));

  // ===== API Endpoints =====

  app.post("/api/contact", apiLimiter, async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);

      await sendContactNotification({
        name: validatedData.name,
        email: validatedData.email,
        company: validatedData.company || undefined,
        message: validatedData.message
      });

      // Auto-reply to submitter — fire-and-forget
      sendContactAutoReply({
        name: validatedData.name,
        email: validatedData.email,
      }).catch((err) => console.error("Contact auto-reply failed:", err));

      // Fire-and-forget CRM sync
      pushToKlipy({
        name: validatedData.name,
        email: validatedData.email,
        company: validatedData.company || undefined,
        source: "website-contact",
      });

      pushToBeehiiv(validatedData.email, { tags: ["contact-form"] });

      res.json({ success: true, id: submission.id });
    } catch (error) {
      console.error("Contact submission error:", error);
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "Invalid submission"
      });
    }
  });

  // Protected admin endpoint
  app.get("/api/contact-submissions", adminAuth, async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      res.status(500).json({ success: false, error: "Failed to fetch submissions" });
    }
  });

  app.post("/api/newsletter", apiLimiter, async (req, res) => {
    try {
      const { source: rawSource, name: rawName, ...rest } = req.body;
      const source = typeof rawSource === "string" && rawSource.length < 80 ? rawSource : undefined;
      const name = typeof rawName === "string" && rawName.trim().length > 0 && rawName.length < 200 ? rawName.trim() : undefined;
      const validatedData = insertNewsletterSignupSchema.parse({ ...rest, source });

      const existing = await storage.getNewsletterSignupByEmail(validatedData.email);
      if (existing) {
        if (source === "report-download") {
          sendNewsletterWelcome(validatedData.email, source, name).catch((err) =>
            console.error("Report re-download email failed:", err)
          );
          pushToKlipy({
            name: name ?? validatedData.email.split("@")[0],
            email: validatedData.email,
            source: "report-download",
          });
          pushToBeehiiv(validatedData.email, { tags: ["report-download"] });
          return res.json({ success: true, id: existing.id });
        }
        return res.status(400).json({ success: false, error: "This email is already subscribed." });
      }

      const signup = await storage.createNewsletterSignup(validatedData);

      sendNewsletterWelcome(validatedData.email, source, name).catch((err) =>
        console.error("Newsletter welcome email failed:", err)
      );

      pushToKlipy({
        name: name ?? validatedData.email.split("@")[0],
        email: validatedData.email,
        source: (source ?? "website-newsletter") as "website-newsletter" | "report-download",
      });

      pushToBeehiiv(validatedData.email, {
        reactivate: false,
        ...(source ? { tags: [source] } : {}),
      });

      res.json({ success: true, id: signup.id });
    } catch (error) {
      console.error("Newsletter signup error:", error);
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "Invalid submission",
      });
    }
  });


  // Server-side scoring data for the 10-question AI readiness assessment
  const AUDIT_OPTION_SCORES = [0, 3, 7, 10]; // scores for options 0–3 (applies to all 10 questions)
  const AUDIT_STAGES = [
    {
      range: [0, 25], num: "Stage 1", name: "Unaware",
      recs: [
        "Run a data audit: list every system where your business information currently lives.",
        "Identify 2–3 high-volume, repetitive tasks that could realistically be automated first.",
        "Assign one team member as your AI champion and give them dedicated exploration time.",
      ],
    },
    {
      range: [26, 50], num: "Stage 2", name: "ChatGPT Plateau",
      recs: [
        "Document your 3 most important workflows before connecting any AI system to them.",
        "Run a focused 30-day pilot: one process, one tool, clear success metrics.",
        "Get your whole team trained on prompt engineering basics — not just the champions.",
      ],
    },
    {
      range: [51, 75], num: "Stage 3", name: "Enabled",
      recs: [
        "Audit which current AI tools are genuinely integrated into documented workflows.",
        "Build a data layer that feeds your AI systems clean, real-time information.",
        "Establish governance: who owns AI decisions, data quality, and model updates?",
      ],
    },
    {
      range: [76, 100], num: "Stage 4", name: "AI-Native",
      recs: [
        "Shift from tool-level thinking to system-level AI architecture.",
        "Invest in custom model fine-tuning or RAG systems for domain-specific knowledge.",
        "Systematically measure ROI across all AI deployments and scale what's working.",
      ],
    },
  ];

  app.post("/api/audit", apiLimiter, async (req, res) => {
    try {
      // Parse and validate request
      // name/email are optional — only required when user opts in to contact/email
      const auditRequestSchema = z.object({
        name: z.string().min(1).max(100).optional(),
        email: z.string().email().optional(),
        business: z.string().max(200).nullable().optional(),
        answers: z.string().min(1),  // JSON array of 10 option indices (0-3)
        wantsResultsEmail: z.boolean().optional().default(false),
        wantsContact: z.boolean().optional().default(false),
        wantsNewsletter: z.boolean().optional().default(false),
      });
      const input = auditRequestSchema.parse(req.body);

      // If any opt-in is checked, name and email are required
      const anyOptIn = input.wantsResultsEmail || input.wantsContact || input.wantsNewsletter;
      if (anyOptIn) {
        if (!input.name || !input.email) {
          return res.status(400).json({ success: false, error: "Name and email are required when opting in." });
        }
      }

      // Deserialise and validate answer indices
      let answerIndices: number[];
      try {
        answerIndices = JSON.parse(input.answers);
        if (!Array.isArray(answerIndices) || answerIndices.length !== 10) {
          throw new Error("Expected 10 answer indices");
        }
        answerIndices.forEach((idx, i) => {
          if (typeof idx !== "number" || idx < 0 || idx > 3) {
            throw new Error(`Answer ${i} out of range: ${idx}`);
          }
        });
      } catch (err) {
        return res.status(400).json({ success: false, error: "Invalid answers format." });
      }

      // Compute score server-side
      const score = answerIndices.reduce((sum, idx) => sum + AUDIT_OPTION_SCORES[idx], 0);
      const stage = AUDIT_STAGES.find(s => score >= s.range[0] && score <= s.range[1]) ?? AUDIT_STAGES[AUDIT_STAGES.length - 1];
      const suggestedTier = `${stage.num} — ${stage.name}`;
      const recommendations = stage.recs;

      // Store to DB — use placeholders if no contact info provided
      const submitterName = input.name ?? "anonymous";
      const submitterEmail = input.email ?? "no-email@anonymous.local";

      const submission = await storage.createAuditSubmission({
        name: submitterName,
        email: submitterEmail,
        business: input.business ?? null,
        score,
        answers: input.answers,
        results: JSON.stringify(recommendations),
        suggestedTier,
        contactRequested: input.wantsContact ?? false,
        wantsNewsletter: input.wantsNewsletter ?? false,
      });

      // Send results email only if requested
      if (input.wantsResultsEmail && input.email && input.name) {
        sendAuditResults({
          email: input.email,
          name: input.name,
          score,
          tier: suggestedTier,
          recommendations,
        }).catch((err) => console.error("Audit results email failed:", err));
      }

      // Send internal notification only if user wants contact
      if (input.wantsContact && input.email && input.name) {
        sendAuditNotification({
          name: input.name,
          email: input.email,
          business: input.business || "",
          score,
          tier: suggestedTier,
          wantsResultsEmail: input.wantsResultsEmail ?? false,
          wantsContact: true,
          wantsNewsletter: input.wantsNewsletter ?? false,
        }).catch((err) => console.error("Audit notification failed:", err));
      }

      // CRM and Beehiiv sync only if user submitted contact info
      if (input.email && input.name) {
        pushToKlipy({
          name: input.name,
          email: input.email,
          company: input.business || undefined,
          source: "ai-readiness-assessment",
        });

        if (input.wantsNewsletter) {
          pushToBeehiiv(input.email, { tags: ["ai-readiness-assessment"] });
        }
      }

      res.json({ success: true, id: submission.id });
    } catch (error) {
      console.error("Audit submission error:", error);
      res.status(400).json({ success: false, error: error instanceof Error ? error.message : "Invalid submission" });
    }
  });

  return httpServer;
}
