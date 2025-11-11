"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CheckCircle, ChevronRight } from "lucide-react";

const quoteSchema = z.object({
  step: z.number(),
  companySize: z.string().optional(),
  scope: z.string().optional(),
  assets: z.string().optional(),
  timeline: z.string().optional(),
  email: z.string().email("Invalid email").optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;
type FormFieldKey = keyof Omit<QuoteFormData, "step">;

type Step = {
  title: string;
  description: string;
  key: FormFieldKey;
  options?: { label: string; value: string }[];
  isInput?: boolean;
  inputType?: string;
};

const steps: Step[] = [
  {
    title: "Company Size",
    description: "How many employees does your organization have?",
    options: [
      { label: "Startup (1-50)", value: "startup" },
      { label: "SMB (51-500)", value: "smb" },
      { label: "Enterprise (500+)", value: "enterprise" },
    ],
    key: "companySize",
  },
  {
    title: "Assessment Scope",
    description: "What type of assessment are you interested in?",
    options: [
      { label: "Audit", value: "audit" },
      { label: "VAPT", value: "vapt" },
      { label: "Managed Services", value: "mss" },
      { label: "Full Assessment", value: "full-assessment" },
    ],
    key: "scope",
  },
  {
    title: "Critical Assets",
    description: "Approximately how many critical assets need assessment?",
    isInput: true,
    key: "assets",
  },
  {
    title: "Timeline",
    description: "When do you want to start?",
    options: [
      { label: "Immediately", value: "immediate" },
      { label: "Within 2 weeks", value: "2weeks" },
      { label: "Within a month", value: "1month" },
      { label: "Within 3 months", value: "3months" },
    ],
    key: "timeline",
  },
  {
    title: "Your Email",
    description: "Where should we send your quote?",
    isInput: true,
    inputType: "email",
    key: "email",
  },
];

export function QuoteWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [quote, setQuote] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, watch, setValue } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    mode: "onChange",
  });

  const formData = watch();
  const step = steps[currentStep];

  const handleOptionSelect = (value: string) => {
    setValue(step.key, value);
  };

  const handleNext = async () => {
    if (currentStep === steps.length - 1) {
      // Submit
      setLoading(true);
      try {
        const response = await fetch("/api/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            companySize: formData.companySize,
            scope: formData.scope,
            assets: Number.parseInt(formData.assets || "0"),
            timeline: formData.timeline,
            email: formData.email,
          }),
        });

        const result = await response.json();
        if (result.success) {
          setQuote(result.quote.estimate);
          setSubmitted(true);
        }
      } catch (err) {
        console.error("Quote request failed:", err);
      } finally {
        setLoading(false);
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (submitted) {
    return (
      <div className="container max-w-2xl mx-auto px-4">
        <Card className="glass p-8 md:p-12 text-center space-y-6">
          <CheckCircle size={48} className="text-primary mx-auto" />
          <div>
            <h2 className="text-3xl font-bold mb-2">Quote Generated!</h2>
            <p className="text-lg text-foreground/70 mb-4">
              Based on your requirements, our estimated range is:
            </p>
            <div className="text-4xl font-bold text-primary mb-4">{quote}</div>
            <p className="text-foreground/70 mb-8">
              A detailed quote and proposal will be sent to your email within 24
              hours.
            </p>
          </div>
          <Button
            size="lg"
            onClick={() => {
              setSubmitted(false);
              setCurrentStep(0);
            }}
          >
            Start Over
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto px-4">
      <Card className="glass p-8 md:p-12">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 grow rounded-full transition-colors ${
                  idx <= currentStep ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-foreground/50">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        {/* Step Content */}
        <div className="mb-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{step.title}</h2>
            <p className="text-foreground/70">{step.description}</p>
          </div>

          {step.isInput ? (
            <Input
              type={step.inputType || "text"}
              placeholder={
                step.key === "email"
                  ? "your.email@company.com"
                  : "Enter number..."
              }
              {...register(step.key)}
              className="bg-card border-border/40 text-lg py-6"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {step.options?.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                  className={`p-4 rounded-lg border-2 transition-all text-left font-medium ${
                    formData[step.key] === option.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border/40 hover:border-primary/40"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={loading || !formData[step.key]}
            className="gap-2 grow"
          >
            {loading
              ? "Generating..."
              : currentStep === steps.length - 1
              ? "Get Quote"
              : "Next"}
            <ChevronRight size={18} />
          </Button>
        </div>
      </Card>
    </div>
  );
}
