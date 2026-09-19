"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  company: z.string().min(2, "Company name is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(result.error || "Failed to send message");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Success State */}
      {submitted && (
        <Card className="glass border-primary/50 bg-primary/5 p-6 flex gap-4">
          <CheckCircle className="text-primary shrink-0" size={24} />
          <div>
            <h3 className="font-bold text-lg">Message Sent!</h3>
            <p className="text-foreground/70">
              We&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Card className="glass border-destructive/50 bg-destructive/5 p-6 flex gap-4">
          <AlertCircle className="text-destructive shrink-0" size={24} />
          <div>
            <h3 className="font-bold text-lg">Error</h3>
            <p className="text-foreground/70">{error}</p>
          </div>
        </Card>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2 text-black/70">Name</label>
          <Input
            {...register("name")}
            placeholder="Your name"
            className="bg-white border-black/10 text-black placeholder:text-black/30 focus-visible:border-[#c85a3a] focus-visible:ring-[#c85a3a]/10"
          />
          {errors.name && (
            <p className="text-destructive text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-black/70">Email</label>
          <Input
            {...register("email")}
            type="email"
            placeholder="your.email@company.com"
            className="bg-white border-black/10 text-black placeholder:text-black/30 focus-visible:border-[#c85a3a] focus-visible:ring-[#c85a3a]/10"
          />
          {errors.email && (
            <p className="text-destructive text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-black/70">Company</label>
          <Input
            {...register("company")}
            placeholder="Your organization"
            className="bg-white border-black/10 text-black placeholder:text-black/30 focus-visible:border-[#c85a3a] focus-visible:ring-[#c85a3a]/10"
          />
          {errors.company && (
            <p className="text-destructive text-sm mt-1">
              {errors.company.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-black/70">Message</label>
          <Textarea
            {...register("message")}
            placeholder="Tell us about your security inquiry..."
            rows={5}
            className="bg-white border-black/10 text-black placeholder:text-black/30 focus-visible:border-[#c85a3a] focus-visible:ring-[#c85a3a]/10 resize-none"
          />
          {errors.message && (
            <p className="text-destructive text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Honeypot field (hidden from users) */}
        <input {...register("honeypot")} type="hidden" />

        <button
          type="submit"
          disabled={loading}
          className="group relative w-full inline-flex items-center justify-center px-16 py-5 bg-black text-white font-bold uppercase tracking-[0.3em] text-xs overflow-hidden transition-all duration-500 rounded-full hover:shadow-[0_0_40px_rgba(0,0,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="absolute inset-0 bg-[#c85a3a] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
          <span className="relative z-10 transition-colors duration-500">
            {loading ? "Sending..." : "Send Message"}
          </span>
        </button>
      </form>
    </div>
  );
}
