"use client";

import HeroSection from "@/components/HeroSection";
import VisualFeatures from "@/components/VisualFeatures";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import { TestimonialsSection } from "@/components/ui/testimonials-section";
import WaitlistSection from "@/components/WaitlistSection";
import { ParticleBackground } from "@/components/ui/particle-background";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-brand-navy text-white selection:bg-brand-cyan selection:text-brand-navy overflow-x-hidden relative">
      <ParticleBackground />
      <HeroSection />
      <div id="features"><VisualFeatures /></div>
      <div id="how-it-works"><HowItWorksSection /></div>
      {/* <div id="testimonials"><TestimonialsSection /></div> */}
      <div id="waitlist"><WaitlistSection /></div>
      
      <Footer />
    </main>
  );
}
