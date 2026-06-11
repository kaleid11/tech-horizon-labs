import { describe, it, expect, beforeAll } from "vitest";
import express, { type Express } from "express";
import request from "supertest";
import { serveStatic } from "../server/static";

// serveStatic reads from dist/static (preferred) or client/static, plus the
// public/ dir for robots.txt / sitemap. No DB or email dependencies.
function buildApp(): Express {
  const app = express();
  serveStatic(app);
  return app;
}

let app: Express;
beforeAll(() => {
  app = buildApp();
});

describe("robots.txt content signals", () => {
  it("declares Open Content-Signal preferences while keeping the AI allow-list", async () => {
    const res = await request(app).get("/robots.txt");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/text\/plain/);
    expect(res.text).toMatch(/Content-Signal:\s*search=yes,\s*ai-input=yes,\s*ai-train=yes/);
    expect(res.text).toContain("User-agent: GPTBot");
    expect(res.text).toContain("Sitemap: https://techhorizonlabs.com/sitemap.xml");
  });
});

describe("GET /.well-known/api-catalog", () => {
  it("returns an application/linkset+json catalog of the public API", async () => {
    const res = await request(app).get("/.well-known/api-catalog");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/application\/linkset\+json/);
    const body = JSON.parse(res.text);
    expect(Array.isArray(body.linkset)).toBe(true);
    const anchors = body.linkset.map((e: { anchor: string }) => e.anchor);
    expect(anchors).toContain("https://techhorizonlabs.com/api/health");
    expect(anchors).toContain("https://techhorizonlabs.com/api/contact");
    expect(anchors).toContain("https://techhorizonlabs.com/api/newsletter");
    expect(anchors).toContain("https://techhorizonlabs.com/api/audit");
    for (const entry of body.linkset) {
      expect(entry["service-doc"][0].href).toMatch(/llms\.txt$/);
      expect(entry.status[0].href).toMatch(/\/api\/health$/);
    }
  });
});

describe("GET /.well-known/agent-skills/index.json", () => {
  it("returns a skills index with schema and digested entries", async () => {
    const res = await request(app).get("/.well-known/agent-skills/index.json");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/application\/json/);
    const body = JSON.parse(res.text);
    expect(typeof body.schema).toBe("string");
    expect(Array.isArray(body.skills)).toBe(true);
    expect(body.skills.length).toBeGreaterThan(0);
    for (const skill of body.skills) {
      expect(skill.name).toBeTruthy();
      expect(skill.type).toBeTruthy();
      expect(skill.description).toBeTruthy();
      expect(skill.url).toMatch(/^https:\/\/techhorizonlabs\.com\//);
      expect(skill.digest).toMatch(/^sha256:[0-9a-f]{64}$/);
    }
    const names = body.skills.map((s: { name: string }) => s.name);
    expect(names).toContain("llms.txt");
    expect(names).toContain("sitemap.xml");
  });
});

describe("discovery Link headers", () => {
  it("advertises sitemap, llms.txt, catalogs, and markdown alternate on pages", async () => {
    const res = await request(app).get("/work");
    expect(res.status).toBe(200);
    const link = res.headers["link"];
    expect(link).toContain('rel="sitemap"');
    expect(link).toContain("/llms.txt>; rel=\"describedby\"");
    expect(link).toContain("/.well-known/api-catalog>; rel=\"api-catalog\"");
    expect(link).toContain("/.well-known/agent-skills/index.json>; rel=\"service-desc\"");
    expect(link).toContain('/work.md>; rel="alternate"; type="text/markdown"');
  });
});

describe("markdown content negotiation", () => {
  it("returns markdown when Accept: text/markdown is requested", async () => {
    const res = await request(app).get("/work").set("Accept", "text/markdown");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/text\/markdown/);
    expect(res.text.trimStart()).toMatch(/^#\s/);
    expect(res.text).not.toContain("<!DOCTYPE");
  });

  it("returns HTML by default for browser-like Accept", async () => {
    const res = await request(app)
      .get("/work")
      .set("Accept", "text/html,application/xhtml+xml,*/*;q=0.8");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/text\/html/);
    expect(res.text).toContain("<!DOCTYPE");
  });

  it("returns HTML for a wildcard Accept", async () => {
    const res = await request(app).get("/work").set("Accept", "*/*");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/text\/html/);
  });

  it("supports markdown negotiation on static (non-core) pages too", async () => {
    const res = await request(app)
      .get("/insights/claude-vs-chatgpt-2026")
      .set("Accept", "text/markdown");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/text\/markdown/);
  });
});
