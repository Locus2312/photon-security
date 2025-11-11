import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqAccordion() {
  const faqs = [
    {
      q: "What is the typical engagement timeline?",
      a: "Timelines vary based on scope. Most VAPT engagements range from 2-6 weeks, while audits typically take 4-8 weeks. We provide a detailed timeline during discovery.",
    },
    {
      q: "Do you provide remediation support?",
      a: "Yes. We provide detailed remediation guidance, implementation support, and re-testing to ensure all vulnerabilities are properly resolved.",
    },
    {
      q: "Are you CERT-In empanelled?",
      a: "We offer CERT-In guidelines compliance advisory and readiness assessment. We align with CERT-In frameworks and best practices.",
    },
    {
      q: "What deliverables can we expect?",
      a: "Each engagement includes a comprehensive PDF report with findings, severity ratings, detailed remediation guidance, executive summary, and a re-test certificate upon completion.",
    },
    {
      q: "Do you serve Indian enterprises only?",
      a: "We specialize in the Indian market and are familiar with RBI, SEBI, CERT-In, and local regulatory requirements. We also serve global enterprises with India operations.",
    },
  ];

  return (
    <section className="w-full py-20">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-foreground/70">
            Common questions about our services and engagement model.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="border-border/40"
            >
              <AccordionTrigger className="hover:text-primary transition-colors">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
