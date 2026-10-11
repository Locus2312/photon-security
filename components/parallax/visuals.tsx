// Small product-UI panels for the Parallax page, after the feature row on
// neon.com: dark panel, hairline border, mono labels. Illustrative only;
// "acme.com" stands in for the client's domain.

const PANEL = "pxl-panel-ui relative overflow-hidden rounded-[10px] border border-white/10 bg-[#0b0b0d]";

/** Discover: pixel chart of assets found vs approved, rising over time. */
export function AssetPixels() {
  const cols = 22;
  const rows = 10;
  const found = Array.from({ length: cols }, (_, c) => Math.min(rows, 2 + Math.round(c * 0.36 + Math.sin(c * 0.9) * 1.2)));
  return (
    <div className={`${PANEL} p-4`}>
      <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }} aria-hidden="true">
        {Array.from({ length: rows }).flatMap((_, r) =>
          found.map((h, c) => {
            const level = rows - r;
            const on = level <= h;
            const approved = on && level <= h - 2;
            return (
              <span
                key={`${r}-${c}`}
                className={`aspect-square rounded-[1px] ${approved ? "bg-[#22d3ee]" : on ? "bg-[#22d3ee]/35" : "bg-white/[0.06]"}`}
              />
            );
          }),
        )}
      </div>
      <div className="mt-3 flex gap-4 font-mono text-[10px] text-white/50">
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 bg-[#22d3ee]" />Approved</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 bg-[#22d3ee]/35" />Newly found</span>
      </div>
    </div>
  );
}

/** Harden: a check run against one domain. */
export function CheckRun() {
  const checks: [string, "ok" | "warn" | "fail"][] = [
    ["TLS 1.3 enforced", "ok"],
    ["DMARC policy is p=none", "warn"],
    ["RDP open on 203.0.113.24", "fail"],
    ["Certificate valid 214 days", "ok"],
  ];
  const mark = { ok: "text-[#22d3ee]", warn: "text-[#f6a04d]", fail: "text-[#f87171]" } as const;
  const glyph = { ok: "✓", warn: "!", fail: "✕" } as const;
  return (
    <div className={`${PANEL} font-mono text-[11px]`}>
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-white/60">
        <span className="rounded bg-white/[0.06] px-2 py-0.5 text-white/80">● acme.com</span>
        <span>4/4 checks</span>
      </div>
      <ul className="space-y-2.5 px-4 py-4">
        {checks.map(([label, state]) => (
          <li key={label} className="flex items-center gap-3 text-white/70">
            <span className={`w-3 ${mark[state]}`}>{glyph[state]}</span>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Protect: lookalikes branching off the real domain. */
export function LookalikeTree() {
  const nodes: [string, string][] = [
    ["acme-login.com", "Phishing"],
    ["acrne.com", "Typosquat"],
    ["acme-support.app", "Fake app"],
  ];
  return (
    <div className={`${PANEL} px-4 py-5`}>
      <div className="relative flex flex-col items-center">
        <span className="absolute top-6 bottom-3 w-px bg-gradient-to-b from-[#22d3ee] to-[#22d3ee]/20" aria-hidden="true" />
        <span className="relative z-10 rounded-full bg-white px-3 py-1 font-mono text-[11px] font-semibold text-black">acme.com</span>
        <ul className="relative z-10 mt-5 w-full space-y-3.5">
          {nodes.map(([domain, kind]) => (
            <li key={domain} className="flex items-center justify-center">
              <span className="rounded border border-white/15 bg-[#121214] px-2.5 py-1 font-mono text-[11px] text-white/75">/{domain}</span>
              <span className="ml-2 rounded bg-[#f87171]/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#fca5a5]">{kind}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Detect: a leak alert with masked values. */
export function LeakAlert() {
  return (
    <div className={`${PANEL} font-mono text-[11px]`}>
      <div className="m-3 flex items-center gap-2 rounded border border-white/10 px-3 py-2 text-white/80">
        <span className="h-1.5 w-1.5 rounded-full bg-[#f6a04d] shadow-[0_0_8px_#f6a04d]" />
        <span className="text-[#f6a04d]">ALERT</span>
        <span className="text-white/60">credentials · acme.com</span>
      </div>
      <ul className="space-y-2 px-4 pb-4 text-white/55">
        <li className="flex justify-between"><span>j•••@acme.com</span><span className="text-white/35">forum</span></li>
        <li className="flex justify-between"><span>r•••@acme.com</span><span className="text-white/35">paste</span></li>
        <li className="flex justify-between"><span>ceo@•••.com</span><span className="text-white/35">breach</span></li>
      </ul>
    </div>
  );
}

/** Exposure score: an example 12-week grade trend, D improving to A. */
export function ExposureTrend() {
  const grades = ["D", "D", "C", "C", "C", "B", "C", "B", "B", "A", "B", "A"];
  const level: Record<string, number> = { A: 4, B: 3, C: 2, D: 1, F: 0 };
  const w = 600;
  const h = 200;
  const step = w / (grades.length - 1);
  const y = (g: string) => h - 16 - (level[g] / 4) * (h - 40);
  const line = grades.map((g, i) => `${i === 0 ? "M" : "L"}${(i * step).toFixed(1)},${y(g).toFixed(1)}`).join(" ");
  return (
    <div className={`${PANEL}`}>
      <div className="relative">
        <svg viewBox={`0 0 ${w} ${h}`} className="block w-full h-auto" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="pxl-trend-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#22d3ee" stopOpacity="0.35" />
              <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
            </linearGradient>
            <pattern id="pxl-trend-grid" width="12" height="12" patternUnits="userSpaceOnUse">
              <path d="M12 0V12" stroke="white" strokeOpacity="0.05" />
            </pattern>
          </defs>
          <rect width={w} height={h} fill="url(#pxl-trend-grid)" />
          {["A", "B", "C", "D"].map((g) => (
            <line key={g} x1="0" x2={w} y1={y(g)} y2={y(g)} stroke="white" strokeOpacity="0.06" />
          ))}
          <path d={`${line} L${w},${h} L0,${h} Z`} fill="url(#pxl-trend-fill)" />
          <path d={line} fill="none" stroke="#22d3ee" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex flex-col justify-between py-2 font-mono text-[10px] text-white/40" aria-hidden="true">
          {["A", "B", "C", "D"].map((g) => <span key={g}>{g}</span>)}
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-white/10 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em]">
        <span className="text-white/70"><span className="text-white">D → A</span> in 12 weeks</span>
        <span className="text-white/35">Example trend</span>
      </div>
    </div>
  );
}
