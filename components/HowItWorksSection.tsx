"use client";

import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Connect Your World",
    description: "Link your existing accounts—LinkedIn, GitHub, Dribbble, Medium. Blox securely imports your history.",
    align: "left"
  },
  {
    step: "02",
    title: "AI Synthesis",
    description: "Our engine analyzes your data, identifying key skills, achievements, and career milestones automatically.",
    align: "right"
  },
  {
    step: "03",
    title: "Design Generation",
    description: "Blox generates stunning, professional portfolios and résumés tailored to your specific industry standards.",
    align: "left"
  },
  {
    step: "04",
    title: "Launch & Grow",
    description: "Publish instantly. Receive analytics on who's viewing your profile and get AI suggestions for improvement.",
    align: "right"
  }
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-[#080a0c] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            How <span className="text-brand-cyan">Blox</span> Works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From scattered data to a unified professional identity in minutes.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-cyan/0 via-brand-cyan/50 to-brand-cyan/0 transform -translate-x-1/2 hidden md:block" />

          {steps.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex flex-col md:flex-row items-center justify-between mb-16 md:mb-24 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Content Side */}
              <div className="w-full md:w-5/12 text-center md:text-left">
                <div className={`flex flex-col ${index % 2 === 0 ? "md:items-start" : "md:items-end md:text-right"}`}>
                  <span className="text-6xl font-bold text-white/5 mb-2 block">{item.step}</span>
                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Center Node */}
              <div className="relative z-10 w-8 h-8 rounded-full bg-brand-navy border-2 border-brand-cyan flex items-center justify-center my-4 md:my-0 shadow-[0_0_15px_rgba(49,197,244,0.5)]">
                <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
              </div>

              {/* Empty Side for balance */}
              <div className="w-full md:w-5/12 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
