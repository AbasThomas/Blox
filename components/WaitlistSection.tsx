"use client";

import { WaitlistHero } from "./waitlist-hero";

export default function WaitlistSection() {
  const handleJoin = async (data: { email: string; name: string }) => {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to join waitlist');
    }

    return result;
  };

  return (
    <section id="waitlist" className="relative bg-brand-navy">
      <WaitlistHero 
        onSubmit={handleJoin} 
        className="min-h-[60vh] md:min-h-[80vh] border-t border-white/5"
      />
    </section>
  );
}
