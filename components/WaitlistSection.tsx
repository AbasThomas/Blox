"use client";

import { WaitlistHero } from "./waitlist-hero";

export default function WaitlistSection() {
  const handleJoin = async (data: any) => {
    // Mock submission
    console.log("Joined waitlist:", data);
    return new Promise<void>((resolve) => setTimeout(resolve, 1500));
  };

  return (
    <section id="waitlist" className="relative bg-brand-navy">
      <WaitlistHero 
        onSubmit={handleJoin} 
        className="!min-h-[80vh] border-t border-white/5"
      />
    </section>
  );
}
