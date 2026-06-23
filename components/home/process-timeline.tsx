"use client";

const COLORS = {
  obsidian: { bg: "#0a0a0a", text: "#ffffff", muted: "rgba(255,255,255,0.5)", num: "rgba(255,255,255,0.2)" },
  teal: { bg: "#2d6a6f", text: "#ffffff", muted: "rgba(255,255,255,0.7)", num: "rgba(255,255,255,0.3)" },
  coral: { bg: "#c85a3a", text: "#ffffff", muted: "rgba(255,255,255,0.8)", num: "rgba(255,255,255,0.3)" },
  ivory: { bg: "#ffffff", text: "#0a0a0a", muted: "rgba(10,10,10,0.6)", num: "rgba(10,10,10,0.2)" }, // Used white here so it contrasts against the ivory container
};

const STEPS = [
  {
    num: "01",
    title: "DISCOVERY & ENUMERATION",
    desc: "Map your environment, attack surface, and business-critical assets through structured interviews and technical enumeration.",
    color: COLORS.obsidian,
  },
  {
    num: "02",
    title: "VULNERABILITY ASSESSMENT",
    desc: "Execute comprehensive security testing using industry-standard methodologies like PTES, OWASP, NIST, and custom research.",
    color: COLORS.teal,
  },
  {
    num: "03",
    title: "REMEDIATION STRATEGY",
    desc: "Deliver severity-prioritised findings with step-by-step remediation guidance and dedicated developer support.",
    color: COLORS.coral,
  },
  {
    num: "04",
    title: "RETEST & CERTIFICATION",
    desc: "Verify all fixes, issue compliance certificates, and deliver a board-ready final report with executive summary.",
    color: COLORS.ivory,
  },
];

export function ProcessTimeline() {
  return (
    <section id="how-we-work" data-theme="light" className="relative w-full min-h-screen bg-[#ede8df] text-[#0a0a0a] flex flex-col justify-between pt-32">
      {/* Top Header Section */}
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-24 w-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-16 h-full items-center">
          <div>
            <p className="text-[11px] font-mono tracking-[0.3em] uppercase mb-6 opacity-50 font-bold">
              Our Methodology
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tighter uppercase leading-[0.9]">
              Methodology.<br />
              Zero Friction.
            </h2>
          </div>
          <div className="flex flex-col justify-end h-full max-w-lg md:ml-auto">
            <hr className="border-[#0a0a0a]/10 mb-8" />
            <p className="text-lg leading-relaxed opacity-80">
              A proven four-phase approach that delivers actionable security outcomes. We integrate directly with your engineering workflows to secure code at the speed of modern deployment.
            </p>

            <div className="mt-12 relative isolate overflow-hidden group border border-[#0a0a0a]/20 w-[180px] h-[50px] flex items-center justify-center">
              <span className="relative z-10 text-[11px] font-mono tracking-widest font-bold uppercase transition-colors duration-300 group-hover:text-white">
                Learn More
              </span>
              <div className="absolute inset-0 bg-[#0a0a0a] translate-y-[101%] transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" />
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#0a0a0a] group-hover:border-white transition-colors duration-300" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#0a0a0a] group-hover:border-white transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#0a0a0a] group-hover:border-white transition-colors duration-300" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#0a0a0a] group-hover:border-white transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Edge-to-Edge Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 lg:rounded-t-[2rem] overflow-hidden">
        {STEPS.map((step) => (
          <div
            key={step.num}
            className="p-10 lg:p-12 xl:p-16 flex flex-col justify-between min-h-[400px] xl:min-h-[500px]"
            style={{ backgroundColor: step.color.bg }}
          >
            <div className="flex flex-col h-full">
              <h3
                className="text-3xl md:text-4xl lg:text-3xl font-bold mb-12 uppercase tracking-tighter leading-[1.1]"
                style={{ color: step.color.text }}
              >
                {step.title}
              </h3>

              {/* Graphic pattern using the number */}
              <div
                className="flex-1 flex items-center justify-center text-[10rem] font-bold tracking-tighter leading-none select-none opacity-40 overflow-hidden"
                style={{ color: step.color.num }}
              >
                {step.num}
              </div>
            </div>

            <div className="mt-12 flex items-end justify-between">
              <p
                className="text-sm font-mono tracking-wider max-w-[250px] leading-relaxed uppercase"
                style={{ color: step.color.muted }}
              >
                {step.desc}
              </p>
              <span className="text-sm font-mono tracking-widest opacity-50 block ml-4 shrink-0" style={{ color: step.color.text }}>
                {step.num} / 04
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
