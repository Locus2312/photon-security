import type { Metadata } from "next";
import Link from "next/link";
import { Cookie, Eye, Gear } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Cookie Policy | Photon Security",
  description: "Cookie policy and tracking transparency protocols for Photon Security.",
  alternates: {
    canonical: "https://www.photonsecurity.in/legal/cookies",
  },
};

export default function CookiePolicyPage() {
  return (
    <main className="bg-[#050505] min-h-screen pt-32 pb-24 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Metadata */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-8">
            <Cookie size={14} weight="bold" className="text-white/40" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40">Tracking_Transparency</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-none mb-6">
            COOKIE<br />
            <span className="text-white/30 italic">POLICY.</span>
          </h1>
          <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-widest text-white/20">
             <span>Last Updated: January 2025</span>
             <div className="w-1 h-1 rounded-full bg-white/20" />
             <span>Ref: COOKIE_v2.0</span>
          </div>
        </div>

        {/* Content Matrix */}
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-10 md:p-16 backdrop-blur-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10">
             <Gear size={120} weight="thin" className="text-white" />
          </div>

          <div className="relative z-10 space-y-16">
            <section className="space-y-6">
              <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20 flex items-center gap-4">
                 <div className="w-8 h-px bg-white/10" />
                 01. Telemetry_Identification
              </h2>
              <p className="text-lg text-white/50 leading-relaxed font-light">
                Cookies are small metadata packets stored on your device to enhance structural navigation and maintain session integrity within the Photon matrix.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20 flex items-center gap-4">
                 <div className="w-8 h-px bg-white/10" />
                 02. Functional_Utilization
              </h2>
              <div className="space-y-4">
                {[
                  { title: "Essential Protocols", desc: "Required for core security and portal functionality." },
                  { title: "Research Analytics", desc: "Helps us understand matrix traversal patterns and improve platform speed." },
                  { title: "Interface Preferences", desc: "Retains your personalized aesthetic settings and dark mode status." }
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 group hover:border-white/20 transition-all duration-300">
                     <h4 className="text-white text-sm font-bold mb-2 uppercase tracking-widest">{item.title}</h4>
                     <p className="text-white/30 text-sm font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20 flex items-center gap-4">
                 <div className="w-8 h-px bg-white/10" />
                 03. Control_Protocols
              </h2>
              <p className="text-lg text-white/50 leading-relaxed font-light">
                You maintain the ability to terminate or restrict cookie utilization through your browser&apos;s security settings. 
                Note that restricting essential cookies may degrade the cinematic performance of this platform.
              </p>
            </section>
          </div>
        </div>

        {/* Footer Support */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 py-8 border-t border-white/5">
           <div className="flex items-center gap-4 text-[10px] font-mono text-white/10 uppercase tracking-widest">
             <Eye size={14} />
             <span>Active_Monitoring_Transparency</span>
           </div>
           <div className="flex gap-8">
             <Link href="/legal/privacy" className="text-[10px] font-mono text-white/20 hover:text-white transition-colors uppercase tracking-widest">Privacy</Link>
             <Link href="/legal/terms" className="text-[10px] font-mono text-white/20 hover:text-white transition-colors uppercase tracking-widest">Terms</Link>
           </div>
        </div>
      </div>
    </main>
  );
}

