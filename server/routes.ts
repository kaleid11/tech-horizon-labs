import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertNewsletterSignupSchema } from "@shared/schema";
import { sendContactNotification, sendNewsletterWelcome } from "./email";
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

  // Locations → Homepage
  app.get("/locations/:slug", (_req, res) => res.redirect(301, "/"));
  app.get("/locations/:slug/", (_req, res) => res.redirect(301, "/"));

  // Industries → Homepage
  app.get("/industries/:slug", (_req, res) => res.redirect(301, "/"));
  app.get("/industries/:slug/", (_req, res) => res.redirect(301, "/"));

  // Insights → Homepage
  app.get("/insights/:slug", (_req, res) => res.redirect(301, "/"));
  app.get("/insights/:slug/", (_req, res) => res.redirect(301, "/"));

  // Guides → Academy
  app.get("/guides/:slug", (_req, res) => res.redirect(301, "/academy"));
  app.get("/guides/:slug/", (_req, res) => res.redirect(301, "/academy"));

  // Static pages served directly
  app.get("/security/", (_req, res) => res.redirect(301, "/security"));
  app.get("/security", (_req, res) => {
    const filePath = path.resolve(process.cwd(), "client", "static", "security.html");
    res.setHeader("Content-Type", "text/html");
    res.sendFile(filePath);
  });

  // Individual removed pages
  // /research is now a live page — no redirect
  app.get("/audit-tool", (_req, res) => res.redirect(301, "/"));
  app.get("/ai-ethics", (_req, res) => res.redirect(301, "/about"));
  app.get("/openclaw", (_req, res) => res.redirect(301, "/"));
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

      // Fire-and-forget CRM sync
      pushToKlipy({
        name: validatedData.name,
        email: validatedData.email,
        company: validatedData.company || undefined,
        source: "website-contact",
      });

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
      const validatedData = insertNewsletterSignupSchema.parse(req.body);

      const existing = await storage.getNewsletterSignupByEmail(validatedData.email);
      if (existing) {
        return res.status(400).json({ error: "This email is already subscribed." });
      }

      const signup = await storage.createNewsletterSignup(validatedData);

      sendNewsletterWelcome(validatedData.email).catch((err) =>
        console.error("Newsletter welcome email failed:", err)
      );

      pushToKlipy({
        name: validatedData.email.split("@")[0],
        email: validatedData.email,
        source: "website-newsletter",
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

  return httpServer;
}
