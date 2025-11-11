export function TrustBar() {
  const logos = ["NASSCOM", "DSCI", "ISO 27001", "SOC 2", "CERT-In Aligned"];

  return (
    <section className="w-full py-12 border-y border-border/40 bg-card/20">
      <div className="container max-w-7xl mx-auto px-4">
        <p className="text-center text-xs font-semibold text-foreground/50 uppercase tracking-wide mb-8">
          Trusted by leading organizations
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {logos.map((logo) => (
            <div key={logo} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">
                  {logo[0]}
                </span>
              </div>
              <span className="text-sm text-foreground/70 font-medium">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
