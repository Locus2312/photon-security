"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function LeadCaptureBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-sm z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="glass glass-accent p-6 rounded-lg border border-primary/20">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg">Get Your Security Assessment</h3>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 hover:bg-card rounded transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <p className="text-sm text-foreground/70 mb-4">
          Free 30-minute consultation with our security experts.
        </p>
        <Button size="sm" className="w-full">
          Schedule Now
        </Button>
      </div>
    </div>
  );
}
