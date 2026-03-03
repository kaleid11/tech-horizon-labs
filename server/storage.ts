import {
  type ContactSubmission,
  type InsertContactSubmission,
  type NewsletterSignup,
  type InsertNewsletterSignup,
  type AuditSubmission,
  type InsertAuditSubmission,
  contactSubmissions,
  newsletterSignups,
  auditSubmissions,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;

  createNewsletterSignup(signup: InsertNewsletterSignup): Promise<NewsletterSignup>;
  getNewsletterSignupByEmail(email: string): Promise<NewsletterSignup | undefined>;
  getAllNewsletterSignups(): Promise<NewsletterSignup[]>;

  createAuditSubmission(submission: InsertAuditSubmission): Promise<AuditSubmission>;
}

export class DatabaseStorage implements IStorage {
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [result] = await db.insert(contactSubmissions).values(submission).returning();
    return result;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions);
  }

  async createNewsletterSignup(signup: InsertNewsletterSignup): Promise<NewsletterSignup> {
    const [result] = await db.insert(newsletterSignups).values(signup).returning();
    return result;
  }

  async getNewsletterSignupByEmail(email: string): Promise<NewsletterSignup | undefined> {
    const [result] = await db.select().from(newsletterSignups).where(eq(newsletterSignups.email, email));
    return result;
  }

  async getAllNewsletterSignups(): Promise<NewsletterSignup[]> {
    return await db.select().from(newsletterSignups);
  }

  async createAuditSubmission(submission: InsertAuditSubmission): Promise<AuditSubmission> {
    const [result] = await db.insert(auditSubmissions).values(submission).returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
