"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema, type NewsletterInput } from "@/lib/validations";

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterInput) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(json.error || "Subscription failed");
        return;
      }
      setStatus("success");
      setMessage("You're subscribed!");
      reset();
    } catch {
      setStatus("error");
      setMessage("Network error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 sm:flex-row">
      <div className="flex-1">
        <input
          type="email"
          placeholder="your@email.com"
          {...register("email")}
          className="w-full rounded-full border border-border bg-surface-elevated px-5 py-3 text-sm text-white outline-none focus:border-accent/50"
          aria-label="Email for newsletter"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "loading" ? "..." : "Subscribe"}
      </button>
      {status === "success" && <p className="text-sm text-green-400">{message}</p>}
      {status === "error" && <p className="text-sm text-red-400">{message}</p>}
    </form>
  );
}
