"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ParticleBackground } from "./ui/particle-background";
import { CheckCircle2, ChevronRight } from "lucide-react";

const INNER_FEATURES = ["Resume", "Portfolio", "Analytics"];
const OUTER_FEATURES = ["AI-Powered", "Automation", "Integrations", "Network"];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function HeroSection() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: "", email: "" });
  };

  return (
    <section className="py-24 bg-brand-navy relative overflow-hidden h-[100vh]">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-64 w-120 h-120 bg-brand-cyan/5 rounded-full blur-4xl" />
        <div className="absolute bottom-1/4 -left-64 w-120 h-120 bg-brand-cyan-glow/5 rounded-full blur-5xl" />
        
        {/* Abstract Logo Grid Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] rotate-12">
            <div className="grid grid-cols-2 gap-4 w-full h-full">
                <div className="bg-brand-cyan rounded-3xl" />
                <div className="border-4 border-brand-cyan rounded-3xl" />
                <div className="border-4 border-brand-cyan rounded-3xl" />
                <div className="border-4 border-brand-cyan rounded-3xl" />
            </div>
        </div>
      </div>

    </section>
  );
}

// Reusable Orbit Component

