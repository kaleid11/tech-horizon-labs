import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertNewsletterSignupSchema, insertAuditSubmissionSchema } from "@shared/schema";
import { sendContactNotification, sendNewsletterWelcome, sendAuditResults, sendAuditNotification } from "./email";
import { pushToKlipy } from "./klipy";
import path from "path";
import fs from "fs";

// Simple admin authentication middleware
// In production, use proper session-based auth or OAuth
const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const adminKey = req.headers['x-admin-key'] || req.query.adminKey;
  const expectedKey = process.env.ADMIN_API_KEY;

  if (!expectedKey) {
    // If no admin key is configured, block access entirely in production
    if (process.env.NODE_ENV === 'production') {
      return res.status(503).json({ error: 'Admin API not configured' });
    }
    // In development, allow access with warning
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

  // 301 Redirects from old URLs to new equivalents
  app.get("/for-business/", (_req, res) => res.redirect(301, "/services/audit"));
  app.get("/for-business", (_req, res) => res.redirect(301, "/services/audit"));
  app.get("/contact-us/", (_req, res) => res.redirect(301, "/"));
  app.get("/contact-us", (_req, res) => res.redirect(301, "/"));
  app.get("/about-us/", (_req, res) => res.redirect(301, "/about"));
  app.get("/about-us", (_req, res) => res.redirect(301, "/about"));
  app.get("/blog/", (_req, res) => res.redirect(301, "/resources"));
  app.get("/blog", (_req, res) => res.redirect(301, "/resources"));
  app.get("/membership", (_req, res) => res.redirect(301, "/academy"));
  app.get("/membership/", (_req, res) => res.redirect(301, "/academy"));
  app.get("/workshops", (_req, res) => res.redirect(301, "/academy"));
  app.get("/workshops/", (_req, res) => res.redirect(301, "/academy"));
  app.get("/ai-workshop-business-sunshine-coast/", (_req, res) => res.redirect(301, "/academy"));
  app.get("/ai-workshop-business-sunshine-coast", (_req, res) => res.redirect(301, "/academy"));

  // Blog to insights redirects
  app.get("/blog/claude-vs-chatgpt-2026", (_req, res) => res.redirect(301, "/insights/claude-vs-chatgpt-2026"));
  app.get("/blog/claude-vs-chatgpt-2026/", (_req, res) => res.redirect(301, "/insights/claude-vs-chatgpt-2026"));

  // Catch-all redirects for old blog/category/tag URLs (WordPress patterns)
  app.get("/blog/:slug", (_req, res) => res.redirect(301, "/resources"));
  app.get("/blog/:slug/", (_req, res) => res.redirect(301, "/resources"));
  app.get("/category/:slug", (_req, res) => res.redirect(301, "/resources"));
  app.get("/category/:slug/", (_req, res) => res.redirect(301, "/resources"));
  app.get("/tag/:slug", (_req, res) => res.redirect(301, "/resources"));
  app.get("/tag/:slug/", (_req, res) => res.redirect(301, "/resources"));

  // Old WordPress page patterns
  app.get("/page/:slug", (_req, res) => res.redirect(301, "/"));
  app.get("/page/:slug/", (_req, res) => res.redirect(301, "/"));
  app.get("/wp-content/:slug", (_req, res) => res.redirect(301, "/"));
  app.get("/wp-admin", (_req, res) => res.redirect(301, "/"));
  app.get("/wp-login.php", (_req, res) => res.redirect(301, "/"));
  app.get("/feed", (_req, res) => res.redirect(301, "/"));
  app.get("/feed/", (_req, res) => res.redirect(301, "/"));

  // Old service/workshop page patterns
  app.get("/services", (_req, res) => res.redirect(301, "/services/audit"));
  app.get("/services/", (_req, res) => res.redirect(301, "/services/audit"));
  app.get("/workshop/:slug", (_req, res) => res.redirect(301, "/academy"));
  app.get("/workshop/:slug/", (_req, res) => res.redirect(301, "/academy"));
  app.get("/workshops/:slug", (_req, res) => res.redirect(301, "/academy"));
  app.get("/workshops/:slug/", (_req, res) => res.redirect(301, "/academy"));
  app.get("/course/:slug", (_req, res) => res.redirect(301, "/academy"));
  app.get("/course/:slug/", (_req, res) => res.redirect(301, "/academy"));

  // Common old page variants
  app.get("/home", (_req, res) => res.redirect(301, "/"));
  app.get("/home/", (_req, res) => res.redirect(301, "/"));
  app.get("/index.html", (_req, res) => res.redirect(301, "/"));
  app.get("/index.php", (_req, res) => res.redirect(301, "/"));
  // /contact is now a real page — removed legacy redirect

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

  app.post("/api/audit-submission", async (req, res) => {
    try {
      const validatedData = insertAuditSubmissionSchema.parse(req.body);
      const submission = await storage.createAuditSubmission(validatedData);

      // Parse results for email
      let recommendations: string[] = [];
      try {
        const parsed = JSON.parse(validatedData.results);
        recommendations = parsed.recommendations || [];
      } catch { /* ignore parse errors */ }

      // Send emails in background
      sendAuditResults({
        email: validatedData.email,
        name: validatedData.name,
        score: validatedData.score,
        tier: validatedData.suggestedTier,
        recommendations,
      });

      sendAuditNotification({
        name: validatedData.name,
        email: validatedData.email,
        business: validatedData.business || '',
        score: validatedData.score,
        tier: validatedData.suggestedTier,
      });

      // Fire-and-forget CRM sync
      pushToKlipy({
        name: validatedData.name,
        email: validatedData.email,
        company: validatedData.business || undefined,
        source: "website-audit",
        metadata: { score: validatedData.score, tier: validatedData.suggestedTier },
      });

      res.json({ success: true, id: submission.id });
    } catch (error) {
      console.error("Audit submission error:", error);
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "Invalid submission"
      });
    }
  });

  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSignupSchema.parse(req.body);
      
      const existing = await storage.getNewsletterSignupByEmail(validatedData.email);
      if (existing) {
        return res.status(400).json({ 
          success: false, 
          error: "Email already subscribed" 
        });
      }
      
      const signup = await storage.createNewsletterSignup(validatedData);
      
      await sendNewsletterWelcome(validatedData.email);

      // Fire-and-forget CRM sync
      pushToKlipy({
        name: validatedData.email.split("@")[0],
        email: validatedData.email,
        source: "website-newsletter",
      });

      res.json({ success: true, id: signup.id });
    } catch (error) {
      console.error("Newsletter signup error:", error);
      res.status(400).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Invalid email" 
      });
    }
  });

  // Protected admin endpoints - require authentication
  app.get("/api/contact-submissions", adminAuth, async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      res.status(500).json({ error: "Failed to fetch submissions" });
    }
  });

  app.get("/api/newsletter-signups", adminAuth, async (req, res) => {
    try {
      const signups = await storage.getAllNewsletterSignups();
      res.json(signups);
    } catch (error) {
      console.error("Error fetching signups:", error);
      res.status(500).json({ error: "Failed to fetch signups" });
    }
  });

  return httpServer;
}
