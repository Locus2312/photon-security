import Link from "next/link";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";

export function CaseStudyCard() {
  return (
    <section className="w-full py-20 bg-card/20">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Case Study
          </h2>
          <p className="text-foreground/70">
            Real-world example of how we helped an enterprise secure their
            infrastructure.
          </p>
        </div>

        <Link href="/case-studies">
          <Card className="glass max-w-3xl mx-auto hover:border-primary/50 transition-all cursor-pointer overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-8 flex items-center justify-center min-h-80 md:min-h-auto">
                <div className="text-center">
                  <TrendingUp size={48} className="text-primary mx-auto mb-4" />
                  <p className="text-sm text-foreground/60">
                    98% Risk Reduction
                  </p>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-between">
                <div>
                  <Badge variant="secondary" className="mb-4">
                    BFSI | API Security
                  </Badge>
                  <CardTitle className="text-2xl mb-3">
                    Comprehensive API Security Audit for Leading Bank
                  </CardTitle>
                  <CardDescription className="text-base text-foreground/70 mb-4">
                    Identified critical vulnerabilities in payment APIs,
                    resulting in 98% risk reduction and improved compliance
                    posture.
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  className="w-fit gap-2 bg-transparent"
                >
                  Read Case Study <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </section>
  );
}
