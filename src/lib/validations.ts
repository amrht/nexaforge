import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .transform((s) => s.trim()),
  email: z
    .string()
    .email("Please enter a valid email")
    .transform((s) => s.trim().toLowerCase()),
  company: z
    .string()
    .min(1, "Company is required")
    .max(200)
    .transform((s) => s.trim()),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long")
    .transform((s) => s.trim()),
});

export const newsletterSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email")
    .transform((s) => s.trim().toLowerCase()),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
