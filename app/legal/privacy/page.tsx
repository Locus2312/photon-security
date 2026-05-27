import type { Metadata } from "next";
import Link from "next/link";
import { Lock, ShieldCheck } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Privacy Policy | Photon Security",
  description: "Privacy policy and data protection protocols for Photon Security.",
  alternates: {
    canonical: "https://www.photonsecurity.in/legal/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="bg-[#050505] min-h-screen pt-32 pb-24 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Metadata */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-8">
            <ShieldCheck size={14} weight="bold" className="text-white/40" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40">Data_Protection_Protocol</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-none mb-6">
            PRIVACY<br />
            <span className="text-white/30 italic">POLICY.</span>
          </h1>
          <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-widest text-white/20">
             <span>Last Updated: December 2025</span>
             <div className="w-1 h-1 rounded-full bg-white/20" />
             <span>Version: 2.1.0</span>
          </div>
        </div>

        {/* Content Matrix */}
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-10 md:p-16 backdrop-blur-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10">
             <Lock size={120} weight="thin" className="text-white" />
          </div>

          <div className="relative z-10 space-y-16">
            <section className="space-y-6">
              <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20 flex items-center gap-4">
                 <div className="w-8 h-px bg-white/10" />
                 01. Information_Collection
              </h2>
              <p className="text-lg text-white/50 leading-relaxed font-light">
                Photon Security collects information you provide directly through our secure portals, such as:
              </p>
              <ul className="space-y-4">
                {[
                  "Entity identity, email, and structural metadata",
                  "Organization security infrastructure details",
                  "Communication telemetry and inquiry logs"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-white/40 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-white/40 transition-colors" />
                    <span className="text-sm tracking-wide">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20 flex items-center gap-4">
                 <div className="w-8 h-px bg-white/10" />
                 02. Data_Utilization
              </h2>
              <p className="text-lg text-white/50 leading-relaxed font-light">
                We utilize collected telemetry to:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Respond to assessment inquiries",
                  "Deliver offensive security support",
                  "Refine our platform research",
                  "Maintain compliance integrity"
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-sm text-white/40 font-light">
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20 flex items-center gap-4">
                 <div className="w-8 h-px bg-white/10" />
                 03. Security_Framework
              </h2>
              <p className="text-lg text-white/50 leading-relaxed font-light">
                We implement industry-standard encryption and isolation protocols to protect your information. 
                Our infrastructure is audited regularly to ensure the highest standard of data residency and security.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20 flex items-center gap-4">
                 <div className="w-8 h-px bg-white/10" />
                 04. Entity_Rights
              </h2>
              <p className="text-lg text-white/50 leading-relaxed font-light">
                You maintain absolute control over your metadata. To request access, modification, or termination of your data, 
                contact our Privacy Office at <Link href="mailto:info@photonsecurity.in" className="text-white hover:underline underline-offset-4 decoration-white/30">info@photonsecurity.in</Link>.
              </p>
            </section>
          </div>
        </div>

        {/* Footer Support */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 py-8 border-t border-white/5">
           <p className="text-[10px] font-mono text-white/10 uppercase tracking-widest">
             © {new Date().getFullYear()} Photon_Security
           </p>
           <div className="flex gap-8">
             <Link href="/legal/terms" className="text-[10px] font-mono text-white/20 hover:text-white transition-colors uppercase tracking-widest">Terms</Link>
             <Link href="/legal/cookies" className="text-[10px] font-mono text-white/20 hover:text-white transition-colors uppercase tracking-widest">Cookies</Link>
           </div>
        </div>
      </div>
    </main>
  );
}

