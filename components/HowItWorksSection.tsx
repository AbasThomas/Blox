"use client";

import { motion } from "framer-motion";
import {
  FiLink,
  FiCpu,
  FiLayers,
} from "react-icons/fi";
import { Rocket } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Connect",
    description: "Link accounts securely.",
    icon: FiLink,
  },
  {
    step: "02",
    title: "Analyze",
    description: "AI extracts key data.",
    icon: FiCpu,
  },
  {
    step: "03",
    title: "Generate",
    description: "Create pro designs.",
    icon: FiLayers,
  },
  {
    step: "04",
    title: "Launch",
    description: "Publish & track growth.",
    icon: Rocket,
  }
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-[#0a0f1f]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white">
            How It Works
          </h2>
          <p className="text-slate-400 text-lg">
            Simple, fast, and powerful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden hover:bg-white/10 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] transition-all duration-500"
            >
              {/* Top Border Color Effect */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Shiny Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Glossy Reflection */}
              <div className="absolute inset-y-0 top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 left-[-100%] group-hover:animate-shine" />

              <div className="relative z-10">
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 text-white group-hover:scale-110 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-all duration-300 shadow-lg shadow-black/20 backdrop-blur-md border border-white/10">
                  <item.icon className="w-6 h-6" />
                </div>
                
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-xs font-mono text-slate-500 group-hover:text-cyan-400 transition-colors duration-300">{item.step}</span>
                  <h3 className="text-lg font-semibold text-white group-hover:text-cyan-100 transition-colors">{item.title}</h3>
                </div>
                
                <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
