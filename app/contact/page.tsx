import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "@/components/forms/contact-form";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Photon Security",
  description:
    "Get in touch with our security experts. Available in Bangalore, serving Indian enterprises.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-col min-h-screen pt-8">
        <section className="w-full py-16 md:py-24 border-b border-border/40">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Get in Touch
              </h1>
              <p className="text-xl text-foreground/70">
                Our security experts are ready to help. Reach out via email,
                phone, or WhatsApp.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-20">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {/* Contact Info Cards */}
              <Card className="glass p-6 flex flex-col items-center text-center">
                <Mail className="text-primary mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2">Email</h3>
                <p className="text-foreground/70">hello@photonsecurity.com</p>
              </Card>

              <Card className="glass p-6 flex flex-col items-center text-center">
                <Phone className="text-primary mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2">Phone & WhatsApp</h3>
                <p className="text-foreground/70">+91 1234 567 890</p>
              </Card>

              <Card className="glass p-6 flex flex-col items-center text-center">
                <MapPin className="text-primary mb-4" size={32} />
                <h3 className="font-bold text-lg mb-2">Office</h3>
                <p className="text-foreground/70">Bangalore, India</p>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="max-w-2xl mx-auto">
              <ContactForm />
            </div>
          </div>
        </section>

        <section className="w-full py-20 bg-card/20 border-t border-border/40">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Response Time</h2>
            <p className="text-lg text-foreground/70">
              We typically respond to inquiries within 24 hours during business
              days.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
