"use client";

import HeroSection from "@/components/HeroSection";
import VisualFeatures from "@/components/VisualFeatures";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import { TestimonialsSection } from "@/components/ui/testimonials-section";
import WaitlistSection from "@/components/WaitlistSection";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-brand-navy text-white selection:bg-brand-cyan selection:text-brand-navy overflow-hidden">
      <HeroSection />
      <div id="features"><VisualFeatures /></div>
      <div id="how-it-works"><HowItWorksSection /></div>
      <div id="testimonials"><TestimonialsSection /></div>
      <div id="waitlist"><WaitlistSection /></div>
      
      <footer className="py-12 bg-[#020617] text-center text-slate-600 text-sm border-t border-white/5">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Blox. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

