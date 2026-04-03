import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertContactSubmissionSchema, insertNewsletterSignupSchema, insertAuditSubmissionSchema } from "@shared/schema";
import { sendContactNotification, sendContactAutoReply, sendNewsletterWelcome, sendAuditResults, sendAuditNotification } from "./email";
import { pushToKlipy } from "./klipy";
import path from "path";
import fs from "fs";

// Simple admin authentication middleware
const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const adminKey = req.headers['x-admin-key'] || req.query.adminKey;
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
  // Serve sitemap.xml with correct content type
  app.get("/sitemap.xml", (_req, res) => {
    const sitemapPath = path.resolve(process.cwd(), "public", "sitemap.xml");
    if (fs.existsSync(sitemapPath)) {
      res.setHeader("Content-Type", "application/xml");
      res.sendFile(sitemapPath);
    } else {
      res.status(404).send("Sitemap not found");
    }
  });

  // Serve robots.txt
  app.get("/robots.txt", (_req, res) => {
    const robotsPath = path.resolve(process.cwd(), "public", "robots.txt");
    if (fs.existsSync(robotsPath)) {
      res.setHeader("Content-Type", "text/plain");
      res.sendFile(robotsPath);
    } else {
      res.status(404).send("Robots.txt not found");
    }
  });

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

  // Static location pages — must come BEFORE the wildcard redirect below
  app.get("/locations/sunshine-coast", (_req, res) => {
    const filePath = path.resolve(process.cwd(), "client", "static", "locations", "sunshine-coast.html");
    res.setHeader("Content-Type", "text/html");
    res.sendFile(filePath);
  });
  app.get("/locations/sunshine-coast/", (_req, res) => res.redirect(301, "/locations/sunshine-coast"));

  app.get("/locations/brisbane", (_req, res) => {
    const filePath = path.resolve(process.cwd(), "client", "static", "locations", "brisbane.html");
    res.setHeader("Content-Type", "text/html");
    res.sendFile(filePath);
  });
  app.get("/locations/brisbane/", (_req, res) => res.redirect(301, "/locations/brisbane"));

  app.get("/locations/gold-coast", (_req, res) => {
    const filePath = path.resolve(process.cwd(), "client", "static", "locations", "gold-coast.html");
    res.setHeader("Content-Type", "text/html");
    res.sendFile(filePath);
  });
  app.get("/locations/gold-coast/", (_req, res) => res.redirect(301, "/locations/gold-coast"));

  app.get("/locations/queensland", (_req, res) => {
    const filePath = path.resolve(process.cwd(), "client", "static", "locations", "queensland.html");
    res.setHeader("Content-Type", "text/html");
    res.sendFile(filePath);
  });
  app.get("/locations/queensland/", (_req, res) => res.redirect(301, "/locations/queensland"));

  // Locations → Homepage (wildcard — catches anything not specifically listed above)
  app.get("/locations/:slug", (_req, res) => res.redirect(301, "/"));
  app.get("/locations/:slug/", (_req, res) => res.redirect(301, "/"));

  // Static industry pages — must come BEFORE the wildcard redirect below
  app.get("/industries/legal", (_req, res) => {
    const filePath = path.resolve(process.cwd(), "client", "static", "industries", "legal.html");
    res.setHeader("Content-Type", "text/html");
    res.sendFile(filePath);
  });

  // Industries → Homepage (wildcard — catches anything not specifically listed above)
  app.get("/industries/:slug", (_req, res) => res.redirect(301, "/"));

  // Insights index — must come BEFORE the wildcard redirect below; canonical first, slash-redirect second
  app.get("/insights", (_req, res) => {
    const filePath = path.resolve(process.cwd(), "client", "static", "insights", "index.html");
    res.setHeader("Content-Type", "text/html");
    res.sendFile(filePath);
  });
  app.get("/insights/", (_req, res) => res.redirect(301, "/insights"));

  // Insights articles — must come BEFORE the wildcard redirect below
  app.get("/insights/how-australia-uses-ai-2026", (_req, res) => {
    const filePath = path.resolve(process.cwd(), "client", "static", "insights", "how-australia-uses-ai-2026.html");
    res.setHeader("Content-Type", "text/html");
    res.sendFile(filePath);
  });
  app.get("/insights/claude-vs-chatgpt-2026", (_req, res) => {
    const filePath = path.resolve(process.cwd(), "client", "static", "insights", "claude-vs-chatgpt-2026.html");
    res.setHeader("Content-Type", "text/html");
    res.sendFile(filePath);
  });
  app.get("/insights/claude-vs-chatgpt-2026/", (_req, res) => res.redirect(301, "/insights/claude-vs-chatgpt-2026"));
  app.get("/insights/ai-impact-by-industry", (_req, res) => {
    const filePath = path.resolve(process.cwd(), "client", "static", "insights", "ai-impact-by-industry.html");
    res.setHeader("Content-Type", "text/html");
    res.sendFile(filePath);
  });
  app.get("/insights/ai-impact-by-industry/", (_req, res) => res.redirect(301, "/insights/ai-impact-by-industry"));

  // Insights → Homepage (wildcard — catches anything not specifically listed above)
  app.get("/insights/:slug", (_req, res) => res.redirect(301, "/"));

  // Guides → Academy
  app.get("/guides/:slug", (_req, res) => res.redirect(301, "/academy"));
  app.get("/guides/:slug/", (_req, res) => res.redirect(301, "/academy"));

  // Static pages served directly — canonical route FIRST, trailing-slash redirect SECOND
  app.get("/security", (_req, res) => {
    const filePath = path.resolve(process.cwd(), "client", "static", "security.html");
    res.setHeader("Content-Type", "text/html");
    res.sendFile(filePath);
  });
  app.get("/security/", (_req, res) => res.redirect(301, "/security"));

  // Individual removed pages
  // /research is now a live page — no redirect
  app.get("/report/", (_req, res) => res.redirect(301, "/report"));

  app.get("/assessment/", (_req, res) => res.redirect(301, "/assessment"));

  app.get("/audit-tool", (_req, res) => res.redirect(301, "/assessment"));
  app.get("/audit-tool/", (_req, res) => res.redirect(301, "/assessment"));
  app.get("/ai-ethics", (_req, res) => res.redirect(301, "/about"));
  app.get("/openclaw", (_req, res) => {
    const filePath = path.resolve(process.cwd(), "client", "static", "openclaw.html");
    res.setHeader("Content-Type", "text/html");
    res.sendFile(filePath);
  });
  app.get("/openclaw/", (_req, res) => res.redirect(301, "/openclaw"));
  // /events is a live React SPA page — no redirect
  app.get("/resources", (_req, res) => res.redirect(301, "/academy"));
  app.get("/resources/", (_req, res) => res.redirect(301, "/academy"));

  // ===== Legacy redirects (WordPress era + old site) =====

  app.get("/for-business", (_req, res) => res.redirect(301, "/"));
  app.get("/for-business/", (_req, res) => res.redirect(301, "/"));
  app.get("/contact-us", (_req, res) => res.redirect(301, "/contact"));
  app.get("/contact-us/", (_req, res) => res.redirect(301, "/contact"));
  app.get("/about-us", (_req, res) => res.redirect(301, "/about"));
  app.get("/about-us/", (_req, res) => res.redirect(301, "/about"));
  app.get("/blog", (_req, res) => res.redirect(301, "/"));
  app.get("/blog/", (_req, res) => res.redirect(301, "/"));
  app.get("/blog/:slug", (_req, res) => res.redirect(301, "/"));
  app.get("/blog/:slug/", (_req, res) => res.redirect(301, "/"));
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

  // ===== API Endpoints =====

  app.post("/api/contact", async (req, res) => {
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

      // Fire-and-forget Beehiiv subscription (tagged contact-form)
      const beehiivApiKey = process.env.BEEHIIV_API_KEY;
      const beehiivPubId = process.env.BEEHIIV_PUBLICATION_ID;
      if (beehiivApiKey && beehiivPubId) {
        fetch(`https://api.beehiiv.com/v2/publications/${beehiivPubId}/subscriptions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${beehiivApiKey}`,
          },
          body: JSON.stringify({
            email: validatedData.email,
            reactivate_existing: true,
            send_welcome_email: false,
            tags: ["contact-form"],
          }),
        })
          .then(async (response) => {
            if (!response.ok) {
              const body = await response.text().catch(() => "");
              console.error(`Beehiiv contact sync returned ${response.status}: ${body}`);
            }
          })
          .catch((err) => console.error("Beehiiv contact sync failed:", err));
      }

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
      res.status(500).json({ error: "Failed to fetch submissions" });
    }
  });

  app.post("/api/newsletter", async (req, res) => {
    try {
      const { source: rawSource, ...rest } = req.body;
      const source = typeof rawSource === "string" && rawSource.length < 80 ? rawSource : undefined;
      const validatedData = insertNewsletterSignupSchema.parse(rest);

      const existing = await storage.getNewsletterSignupByEmail(validatedData.email);
      if (existing) {
        if (source === "report-download") {
          sendNewsletterWelcome(validatedData.email, source).catch((err) =>
            console.error("Report re-download email failed:", err)
          );
          pushToKlipy({
            name: validatedData.email.split("@")[0],
            email: validatedData.email,
            source: "report-download",
          });
          const _bApiKey = process.env.BEEHIIV_API_KEY;
          const _bPubId = process.env.BEEHIIV_PUBLICATION_ID;
          if (_bApiKey && _bPubId) {
            fetch(`https://api.beehiiv.com/v2/publications/${_bPubId}/subscriptions`, {
              method: "POST",
              headers: { "Content-Type": "application/json", Authorization: `Bearer ${_bApiKey}` },
              body: JSON.stringify({ email: validatedData.email, reactivate_existing: true, send_welcome_email: false, tags: ["report-download"] }),
            }).catch((err) => console.error("Beehiiv re-tag failed:", err));
          }
          return res.json({ success: true, id: existing.id });
        }
        return res.status(400).json({ error: "This email is already subscribed." });
      }

      const signup = await storage.createNewsletterSignup(validatedData);

      sendNewsletterWelcome(validatedData.email, source).catch((err) =>
        console.error("Newsletter welcome email failed:", err)
      );

      pushToKlipy({
        name: validatedData.email.split("@")[0],
        email: validatedData.email,
        source: source ?? "website-newsletter",
      });

      const beehiivApiKey = process.env.BEEHIIV_API_KEY;
      const beehiivPubId = process.env.BEEHIIV_PUBLICATION_ID;
      if (beehiivApiKey && beehiivPubId) {
        fetch(`https://api.beehiiv.com/v2/publications/${beehiivPubId}/subscriptions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${beehiivApiKey}`,
          },
          body: JSON.stringify({
            email: validatedData.email,
            reactivate_existing: false,
            send_welcome_email: false,
            ...(source ? { tags: [source] } : {}),
          }),
        })
          .then(async (response) => {
            if (!response.ok) {
              const body = await response.text().catch(() => "");
              console.error(`Beehiiv sync returned ${response.status}: ${body}`);
            }
          })
          .catch((err) => console.error("Beehiiv sync failed:", err));
      }

      res.json({ success: true, id: signup.id });
    } catch (error) {
      console.error("Newsletter signup error:", error);
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "Invalid submission",
      });
    }
  });


  app.post("/api/audit", async (req, res) => {
    try {
      const validatedData = insertAuditSubmissionSchema.parse(req.body);
      const submission = await storage.createAuditSubmission(validatedData);

      let recommendations: string[] = [];
      try { recommendations = JSON.parse(validatedData.results); } catch { /* results may be plain text */ }

      sendAuditResults({
        email: validatedData.email,
        name: validatedData.name,
        score: validatedData.score,
        tier: validatedData.suggestedTier,
        recommendations,
      }).catch((err) => console.error("Audit results email failed:", err));

      sendAuditNotification({
        name: validatedData.name,
        email: validatedData.email,
        business: validatedData.business || "",
        score: validatedData.score,
        tier: validatedData.suggestedTier,
      }).catch((err) => console.error("Audit notification failed:", err));

      pushToKlipy({
        name: validatedData.name,
        email: validatedData.email,
        company: validatedData.business || undefined,
        source: "ai-readiness-assessment",
      });

      const beehiivApiKey = process.env.BEEHIIV_API_KEY;
      const beehiivPubId = process.env.BEEHIIV_PUBLICATION_ID;
      if (beehiivApiKey && beehiivPubId) {
        fetch(`https://api.beehiiv.com/v2/publications/${beehiivPubId}/subscriptions`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${beehiivApiKey}` },
          body: JSON.stringify({ email: validatedData.email, reactivate_existing: true, send_welcome_email: false, tags: ["ai-readiness-assessment"] }),
        }).catch((err) => console.error("Beehiiv audit sync failed:", err));
      }

      res.json({ success: true, id: submission.id });
    } catch (error) {
      console.error("Audit submission error:", error);
      res.status(400).json({ success: false, error: error instanceof Error ? error.message : "Invalid submission" });
    }
  });

  return httpServer;
}
