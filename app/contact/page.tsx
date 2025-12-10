"use client";

import { ContactForm } from "@/components/forms/contact-form";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-linear-to-br from-primary/10 via-background to-background">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Ready to secure your business? Contact us today for a free
              consultation.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
                <p className="text-foreground/70 mb-8">
                  Fill out the form below and we'll get back to you within 24
                  hours.
                </p>
                <ContactForm />
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6">
                    Contact Information
                  </h2>
                  <p className="text-foreground/70 mb-8">
                    Reach out to us through any of these channels.
                  </p>
                </div>

                <div className="space-y-6">
                  <Card className="glass p-6 hover:border-primary/50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Mail className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Email</h3>
                        <a
                          href="mailto:admin@photonsecurity.in"
                          className="text-foreground/70 hover:text-primary transition-colors"
                        >
                          admin@photonsecurity.in
                        </a>
                      </div>
                    </div>
                  </Card>

                  <Card className="glass p-6 hover:border-primary/50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Phone className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Phone</h3>
                        <a
                          href="tel:+919574737506"
                          className="text-foreground/70 hover:text-primary transition-colors"
                        >
                          +91 95747 37506
                        </a>
                      </div>
                    </div>
                  </Card>

                  <Card className="glass p-6 hover:border-primary/50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <MapPin className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Location</h3>
                        <p className="text-foreground/70">
                          GIFT City, Gujarat, India
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="glass p-6 hover:border-primary/50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Clock className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
                          Business Hours
                        </h3>
                        <p className="text-foreground/70">
                          Monday - Friday: 9:00 AM - 6:00 PM IST
                        </p>
                        <p className="text-foreground/70">
                          Saturday: 10:00 AM - 4:00 PM IST
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
