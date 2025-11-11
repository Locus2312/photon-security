"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
    } catch (err) {
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
          <CheckCircle className="text-primary flex-shrink-0" size={24} />
          <div>
            <h3 className="font-bold text-lg">Message Sent!</h3>
            <p className="text-foreground/70">
              We'll get back to you within 24 hours.
            </p>
          </div>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Card className="glass border-destructive/50 bg-destructive/5 p-6 flex gap-4">
          <AlertCircle className="text-destructive flex-shrink-0" size={24} />
          <div>
            <h3 className="font-bold text-lg">Error</h3>
            <p className="text-foreground/70">{error}</p>
          </div>
        </Card>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Name</label>
          <Input
            {...register("name")}
            placeholder="Your name"
            className="bg-card border-border/40"
          />
          {errors.name && (
            <p className="text-destructive text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Email</label>
          <Input
            {...register("email")}
            type="email"
            placeholder="your.email@company.com"
            className="bg-card border-border/40"
          />
          {errors.email && (
            <p className="text-destructive text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Company</label>
          <Input
            {...register("company")}
            placeholder="Your organization"
            className="bg-card border-border/40"
          />
          {errors.company && (
            <p className="text-destructive text-sm mt-1">
              {errors.company.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Message</label>
          <Textarea
            {...register("message")}
            placeholder="Tell us about your security inquiry..."
            rows={5}
            className="bg-card border-border/40"
          />
          {errors.message && (
            <p className="text-destructive text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Honeypot field (hidden from users) */}
        <input {...register("honeypot")} type="hidden" />

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  );
}
