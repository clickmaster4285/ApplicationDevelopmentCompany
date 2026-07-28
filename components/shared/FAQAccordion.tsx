// app/components/shared/FAQAccordion.tsx
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

export interface FAQ {
  question: string;
  answer: string;
}

export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-white/5 border-y border-white/5">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <button
            key={index}
            onClick={() => setOpenIndex(isOpen ? null : index)}
            className="w-full text-left py-7 flex flex-col group"
          >
            <div className="flex items-center justify-between gap-6">
              <span className="text-lg md:text-xl text-white font-medium tracking-tight">
                {faq.question}
              </span>
              <span
                className={`flex-shrink-0 h-9 w-9 rounded-full border border-white/15 bg-gradient-to-b from-white/[0.06] to-transparent grid place-items-center transition-transform duration-500 ${
                  isOpen ? "rotate-45 bg-white border-transparent" : ""
                }`}
              >
                <Plus
                  className={`h-4 w-4 transition-colors ${isOpen ? "text-[#050505]" : "text-white"}`}
                />
              </span>
            </div>
            <div
              className="grid transition-all duration-500 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="pt-5 pr-16 text-white/55 leading-relaxed text-[15px] md:text-base">
                  {faq.answer}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
