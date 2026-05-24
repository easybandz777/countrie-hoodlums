"use client";

import { useState, type FormEvent } from "react";
import { Mail, MessageCircle, ExternalLink } from "lucide-react";

const SUBJECT_OPTIONS = [
  "General Inquiry",
  "Order Issue",
  "Wholesale/Bulk",
  "Collaboration",
  "Press/Media",
] as const;

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  function validate(): FormErrors {
    const newErrors: FormErrors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.subject) {
      newErrors.subject = "Please select a subject.";
    }

    if (!formData.message || formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    return newErrors;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSuccessMessage("");
    setSubmitError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSuccessMessage(data.message);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClasses =
    "w-full bg-card border border-border text-foreground rounded-lg px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors";

  return (
    <section className="px-4 md:px-8 lg:px-12 py-12 max-w-[1400px] mx-auto">
      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 font-[family-name:var(--font-display)]">
        GET IN TOUCH
      </h1>
      <p className="text-muted-foreground text-lg mb-12 max-w-xl">
        Got questions, ideas, or business inquiries? Hit us up and we&apos;ll get back to you.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left Column — Contact Form */}
        <div>
          {successMessage && (
            <div className="mb-6 p-4 rounded-lg bg-green-900/30 border border-green-700 text-green-300 text-sm">
              {successMessage}
            </div>
          )}

          {submitError && (
            <div className="mb-6 p-4 rounded-lg bg-red-900/30 border border-red-700 text-red-300 text-sm">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClasses}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-destructive">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputClasses}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1.5">
                Subject
              </label>
              <select
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className={`${inputClasses} cursor-pointer`}
              >
                <option value="" disabled>
                  Select a subject
                </option>
                {SUBJECT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.subject && (
                <p className="mt-1 text-xs text-destructive">{errors.subject}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="What's on your mind?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`${inputClasses} resize-y min-h-[120px]`}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-destructive">{errors.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gold hover:bg-gold-dark text-background font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-[family-name:var(--font-display)] uppercase tracking-wide text-sm"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Right Column — Contact Info */}
        <div className="space-y-6">
          {/* Email Card */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-gold" />
              </div>
              <h3 className="text-lg font-semibold font-[family-name:var(--font-display)] uppercase">
                Email Us
              </h3>
            </div>
            <a
              href="mailto:info@thehoodlumscountryclub.com"
              className="text-muted-foreground hover:text-gold transition-colors text-sm"
            >
              info@thehoodlumscountryclub.com
            </a>
          </div>

          {/* Social Links Card */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                <ExternalLink className="w-5 h-5 text-gold" />
              </div>
              <h3 className="text-lg font-semibold font-[family-name:var(--font-display)] uppercase">
                Follow Us
              </h3>
            </div>
            <div className="space-y-2">
              <a
                href="https://instagram.com/hoodlumscountryclub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                @hoodlumscountryclub
              </a>
              <a
                href="https://tiktok.com/@hoodlumscountryclub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                TikTok
              </a>
            </div>
          </div>

          {/* Business Inquiries Card */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold font-[family-name:var(--font-display)] uppercase mb-3">
              Business Inquiries
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              For wholesale, collaborations, and press inquiries, select the
              appropriate subject in the form or email us directly. We typically
              respond within 24-48 hours.
            </p>
          </div>

          {/* Urgent Note */}
          <div className="bg-gold/5 border border-gold/20 rounded-xl p-5">
            <p className="text-sm text-gold-light leading-relaxed">
              For urgent order issues, DM us on Instagram{" "}
              <a
                href="https://instagram.com/hoodlumscountryclub"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-2 hover:text-gold"
              >
                @hoodlumscountryclub
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
