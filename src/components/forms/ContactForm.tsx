"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validations";
import MagneticButton from "@/components/ui/MagneticButton";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setStatus("error");
        setServerError(json.error || "Something went wrong");
        return;
      }

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setServerError("Network error. Please try again.");
    }
  };

  const fieldClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-surface-elevated px-4 py-3 text-sm text-white outline-none transition-all duration-300 ${
      hasError
        ? "border-red-500/50 focus:border-red-500"
        : "border-border focus:border-accent/50"
    }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm text-muted">
            Name
          </label>
          <input
            id="name"
            {...register("name")}
            className={fieldClass(!!errors.name)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 animate-pulse text-xs text-red-400" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-muted">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={fieldClass(!!errors.email)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-400" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="company" className="mb-2 block text-sm text-muted">
          Company
        </label>
        <input
          id="company"
          {...register("company")}
          className={fieldClass(!!errors.company)}
          aria-invalid={!!errors.company}
        />
        {errors.company && (
          <p className="mt-1.5 text-xs text-red-400" role="alert">
            {errors.company.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm text-muted">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          className={`${fieldClass(!!errors.message)} resize-none`}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-red-400" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {status === "success" && (
        <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400" role="status">
          Message sent successfully. We&apos;ll be in touch within 24 hours.
        </div>
      )}

      {serverError && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400" role="alert">
          {serverError}
        </div>
      )}

      <MagneticButton type="submit" variant="primary" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send Message"}
      </MagneticButton>
    </form>
  );
}
