import type { Metadata } from "next";
import Link from "next/link";
import { Scales, Gavel, Globe } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Terms of Service | Photon Security",
  description: "Official terms of service and engagement protocols for Photon Security.",
  alternates: {
    canonical: "https://www.photonsecurity.in/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="bg-[#050505] min-h-screen pt-32 pb-24 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Metadata */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-8">
            <Gavel size={14} weight="bold" className="text-white/40" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40">Engagement_Protocols</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-none mb-6">
            TERMS OF<br />
            <span className="text-white/30 italic">SERVICE.</span>
          </h1>
          <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-widest text-white/20">
             <span>Effective Date: December 2025</span>
             <div className="w-1 h-1 rounded-full bg-white/20" />
             <span>Ref: TOS_v4.2</span>
          </div>
        </div>

        {/* Content Matrix */}
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-10 md:p-16 backdrop-blur-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10">
             <Scales size={120} weight="thin" className="text-white" />
          </div>

          <div className="relative z-10 space-y-16">
            <section className="space-y-6">
              <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20 flex items-center gap-4">
                 <div className="w-8 h-px bg-white/10" />
                 01. Agreement_Acceptance
              </h2>
              <p className="text-lg text-white/50 leading-relaxed font-light">
                By accessing the Photon Security matrix, you agree to be bound by these Engagement Protocols. 
                Failure to comply with these terms will result in immediate termination of access.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20 flex items-center gap-4">
                 <div className="w-8 h-px bg-white/10" />
                 02. Platform_License
              </h2>
              <p className="text-lg text-white/50 leading-relaxed font-light">
                Photon Security grants a limited, non-transferable license to utilize this portal for informational 
                and communication purposes. Any attempt to scrape, reverse-engineer, or breach this platform 
                is strictly prohibited.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20 flex items-center gap-4">
                 <div className="w-8 h-px bg-white/10" />
                 03. Service_Exclusion
              </h2>
              <p className="text-lg text-white/50 leading-relaxed font-light">
                The content of this website does not constitute a formal security audit. Full VAPT, MSS, 
                and offensive research services are only provided under a separate, fully-executed Service Agreement.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20 flex items-center gap-4">
                 <div className="w-8 h-px bg-white/10" />
                 04. Jurisdictional_Control
              </h2>
              <p className="text-lg text-white/50 leading-relaxed font-light">
                These terms are governed by the laws of India. Any disputes shall be settled within the 
                jurisdiction of Gujarat courts, aligning with our GIFT City headquarters.
              </p>
            </section>
          </div>
        </div>

        {/* Footer Support */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 py-8 border-t border-white/5">
           <div className="flex items-center gap-4 text-[10px] font-mono text-white/10 uppercase tracking-widest">
             <Globe size={14} />
             <span>Global_Compliance_Node</span>
           </div>
           <div className="flex gap-8">
             <Link href="/legal/privacy" className="text-[10px] font-mono text-white/20 hover:text-white transition-colors uppercase tracking-widest">Privacy</Link>
             <Link href="/legal/cookies" className="text-[10px] font-mono text-white/20 hover:text-white transition-colors uppercase tracking-widest">Cookies</Link>
           </div>
        </div>
      </div>
    </main>
  );
}

