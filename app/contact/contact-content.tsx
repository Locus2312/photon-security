"use client";

import { useRef, useEffect } from "react";
import { ContactForm } from "@/components/forms/contact-form";
import { 
  EnvelopeSimple, 
  PhoneCall, 
  MapPin, 
  Clock,
  ChatCircleText
} from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_NODES = [
  {
    icon: EnvelopeSimple,
    label: "Email Us",
    value: "info@photonsecurity.in",
    href: "mailto:sales@photonsecurity.in",
    status: "READY_TO_REPLY"
  },
  {
    icon: PhoneCall,
    label: "Call Us",
    value: "+91 79902 82583",
    href: "tel:+917990282583",
    status: "LINE_ACTIVE"
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "GIFT City, Gujarat, India",
    href: "#",
    status: "OFFICE_LOCATED"
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon-Fri: 9AM - 6PM IST",
    href: "#",
    status: "OPEN_NOW"
  },
];

export default function ContactContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-hero-content", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });

      gsap.from(".info-node", {
        x: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".info-grid",
          start: "top 80%"
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-[#050505] text-white selection:bg-white selection:text-black min-h-screen">
      {/* Simple & Premium Hero */}
      <section className="relative h-[60vh] flex flex-col items-center justify-center text-center px-8 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-bold text-white/[0.012] tracking-tighter pointer-events-none select-none uppercase">
          CONTACT_US
        </div>

        <div className="relative z-10 max-w-4xl">
          <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-10 contact-hero-content">
             <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/50">We&apos;re here to help</span>
          </div>
          <h1 className="text-7xl md:text-8xl font-bold tracking-tighter leading-none mb-10 contact-hero-content">
            GET IN<br />
            <span className="text-white/30 italic">TOUCH.</span>
          </h1>
          <p className="text-xl text-white/30 max-w-xl mx-auto font-light leading-relaxed contact-hero-content">
            Have a question or ready to start an assessment? Reach out through any of our channels below.
          </p>
        </div>
      </section>

      <section className="py-32 max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Left: Info Nodes */}
          <div className="lg:col-span-5 space-y-12 info-grid">
             <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/20 mb-6">Contact Info</div>
                <h2 className="text-4xl font-bold tracking-tight">Our <span className="text-white/30 italic">Details</span></h2>
             </div>

             <div className="space-y-4">
                {CONTACT_NODES.map((node) => (
                  <div 
                    key={node.status}
                    className="info-node group p-8 bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 rounded-2xl relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-8">
                       <div className="text-[9px] font-mono text-white/10 group-hover:text-white/30 tracking-[0.2em] transition-colors uppercase">
                          {node.status}
                       </div>
                       <node.icon size={20} weight="light" className="text-white/20 group-hover:text-white transition-colors" />
                    </div>
                    <div className="space-y-1">
                       <p className="text-[10px] font-mono uppercase tracking-widest text-white/20">{node.label}</p>
                       {node.href !== "#" ? (
                         <a href={node.href} className="text-xl font-bold text-white/80 hover:text-white transition-colors">
                           {node.value}
                         </a>
                       ) : (
                         <p className="text-xl font-bold text-white/80">{node.value}</p>
                       )}
                    </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7">
             <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-10 md:p-16 relative overflow-hidden">
                <div className="relative z-10">
                   <div className="flex items-center gap-4 mb-12">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                         <ChatCircleText size={24} weight="light" className="text-white/60" />
                      </div>
                      <div>
                         <h3 className="text-2xl font-bold tracking-tight">Send us a Message</h3>
                         <p className="text-sm text-white/30 font-mono uppercase tracking-widest">We&apos;ll get back to you shortly</p>
                      </div>
                   </div>
                   <ContactForm />
                </div>
                
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 p-8">
                   <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                </div>
             </div>
             
             <div className="mt-8 flex items-center justify-center gap-8 py-6 border-y border-white/5">
                {[1,2,3,4].map(i => (
                  <div key={i} className="flex items-center gap-3 opacity-20">
                     <div className="w-1.5 h-1.5 rounded-full bg-white" />
                     <span className="text-[9px] font-mono uppercase tracking-[0.3em]">Direct Support Node {i}</span>
                  </div>
                ))}
             </div>
          </div>

        </div>
      </section>
    </main>
  );
}


