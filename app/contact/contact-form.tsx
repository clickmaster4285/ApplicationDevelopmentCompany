"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";

type SubmissionState = "idle" | "sending" | "success" | "error";

const inputClassName =
  "mt-2 h-12 w-full rounded-[13px] border border-white/[0.12] bg-black/30 px-4 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] outline-none transition duration-200 placeholder:text-white/30 placeholder:transition-colors hover:border-white/20 focus:border-white/40 focus:bg-black/45 focus:ring-2 focus:ring-white/[0.07] focus:placeholder:text-white/40";

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<SubmissionState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Your message could not be sent. Please try again.");
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  }

  return (
    <form className={compact ? "space-y-3" : "space-y-[18px]"} onSubmit={handleSubmit}>
      <div className={`grid ${compact ? "gap-4" : "gap-5"} sm:grid-cols-2`}>
        <label className="block text-[11px] font-medium tracking-[0.015em] text-white/70">
          Your name <span className="text-white/35">*</span>
          <input className={inputClassName} name="name" autoComplete="name" placeholder="Alex Morgan" required />
        </label>
        <label className="block text-[11px] font-medium tracking-[0.015em] text-white/70">
          Work email <span className="text-white/35">*</span>
          <input className={inputClassName} name="email" type="email" autoComplete="email" placeholder="alex@company.com" required />
        </label>
      </div>
      <div className={`grid ${compact ? "gap-4" : "gap-5"} sm:grid-cols-2`}>
        <label className="block text-[11px] font-medium tracking-[0.015em] text-white/70">
          Phone <span className="text-white/35">(optional)</span>
          <input className={inputClassName} name="phone" type="tel" autoComplete="tel" placeholder="+1 (555) 000-0000" />
        </label>
        <label className="block text-[11px] font-medium tracking-[0.015em] text-white/70">
          Company <span className="text-white/35">(optional)</span>
          <input className={inputClassName} name="company" autoComplete="organization" placeholder="Your company" />
        </label>
      </div>
      <label className="block text-[11px] font-medium tracking-[0.015em] text-white/70">
        What are you looking to build? <span className="text-white/35">*</span>
        <textarea
          className={`${compact ? "mt-2 min-h-28" : "mt-2 min-h-36"} w-full resize-y rounded-[13px] border border-white/[0.12] bg-black/30 px-4 py-3 text-sm leading-6 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] outline-none transition duration-200 placeholder:text-white/30 placeholder:transition-colors hover:border-white/20 focus:border-white/40 focus:bg-black/45 focus:ring-2 focus:ring-white/[0.07] focus:placeholder:text-white/40`}
          name="message"
          placeholder="Tell us about the idea, the challenge, or what you need help with..."
          required
        />
      </label>

      <div aria-live="polite" className={compact ? "text-sm" : "min-h-5 text-sm"}>
        {status === "success" && <p className="text-emerald-300">Thanks for reaching out. Your message has been sent.</p>}
        {status === "error" && <p className="text-rose-300">We couldn&rsquo;t send your message. Please try again or email us directly.</p>}
      </div>

      <button
        className="group inline-flex h-13 w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-white/35 bg-gradient-to-r from-white via-[#e1e5e9] to-[#aab0b8] px-7 text-sm font-semibold text-[#080808] shadow-[0_8px_28px_-14px_rgba(255,255,255,0.65),inset_0_1px_0_rgba(255,255,255,0.9)] transition duration-300 hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_12px_36px_-14px_rgba(255,255,255,0.75)] active:translate-y-0 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? (
          <>
            Sending <LoaderCircle className="h-4 w-4 animate-spin" />
          </>
        ) : (
          <>
            Send project details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
      <p className="text-[11px] leading-5 text-white/35">
        By submitting, you agree that our team may contact you about your inquiry.
      </p>
    </form>
  );
}
