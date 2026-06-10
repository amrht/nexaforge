import type { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";
import NewsletterForm from "@/components/forms/NewsletterForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the NexaForge team.",
};

export default function ContactPage() {
  return (
    <div className="px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Contact
            </span>
            <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
              Let&apos;s build something exceptional
            </h1>
            <p className="mt-6 max-w-md leading-relaxed text-muted">
              Tell us about your engineering challenges. Our team responds within
              24 hours with a tailored approach.
            </p>

            <div className="mt-12">
              <h2 className="mb-4 text-sm font-medium text-white">
                Stay updated
              </h2>
              <NewsletterForm />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-8 md:p-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
