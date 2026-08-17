"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "What does an app development company do?",
    a: "An app development company helps businesses plan, design, develop, test, launch, and maintain applications. It may also provide strategy, integrations, security, and ongoing technical support.",
  },
  {
    q: "What are app development services?",
    a: "App development services are the activities required to turn an idea or business requirement into a working application. They can include planning, UI/UX design, development, testing, deployment, integrations, and maintenance.",
  },
  {
    q: "How much does app development cost?",
    a: "The cost depends on features, complexity, design, platforms, integrations, security requirements, technology, and project scope. A detailed estimate normally requires a clear understanding of your requirements.",
  },
  {
    q: "How long does it take to develop an application?",
    a: "The timeline depends on application size and complexity. An MVP can often be developed faster than a large application with advanced integrations, several user roles, and complex features.",
  },
  {
    q: "How do I choose the right app development agency?",
    a: "Look at the agency's technical experience, development process, case studies, communication, relevant industry knowledge, security approach, support options, and ability to handle your project requirements.",
  },
  {
    q: "Can you build mobile, web, and desktop applications?",
    a: "Yes. ClickMasters provides development capabilities for mobile, web, desktop, AI-powered, and specialized applications based on project needs.",
  },
  {
    q: "Who owns the application source code after development?",
    a: "Source-code ownership should be clearly defined in your project agreement before development begins. This helps avoid confusion about intellectual property and future application changes.",
  },
  {
    q: "Do you provide support after an application launches?",
    a: "Yes. Post-launch services can include maintenance, fixes, security updates, performance improvements, new features, and application scaling.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-32 md:py-40 border-t border-white/5">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-5 text-center">
          — FAQ
        </div>
        <h2 className="text-chrome text-center text-5xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.02] mb-16">
          Frequently Asked Questions About App Development
        </h2>
        <div className="divide-y divide-white/5 border-y border-white/5">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <button
                key={i}
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full text-left py-7 flex flex-col group"
              >
                <div className="flex items-center justify-between gap-6">
                  <span className="text-lg md:text-xl text-white font-medium tracking-tight">
                    {f.q}
                  </span>
                  <span
                    className={`flex-shrink-0 h-9 w-9 rounded-full border border-white/15 bg-gradient-to-b from-white/[0.06] to-transparent grid place-items-center transition-transform duration-500 ${
                      isOpen ? "rotate-45 bg-chrome border-transparent" : ""
                    }`}
                  >
                    <Plus
                      className={`h-4 w-4 transition-colors ${isOpen ? "text-[#050505]" : "text-chrome"}`}
                    />
                  </span>
                </div>
                <div
                  className="grid transition-all duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pt-5 pr-16 text-white/55 leading-relaxed">
                      {f.a}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
