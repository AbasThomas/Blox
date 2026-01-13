"use client";

import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import WaitlistSection from "@/components/WaitlistSection";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-brand-navy text-white selection:bg-brand-cyan selection:text-brand-navy">
      <HeroSection />
      <FeaturesSection />
      {/* <HowItWorksSection /> */}
      {/* <WaitlistSection /> */}
      
      <footer className="py-8 bg-black text-center text-gray-600 text-sm">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Blox. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
