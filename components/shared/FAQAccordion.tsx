'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className={`group overflow-hidden rounded-2xl border transition-all duration-300 ${
              isOpen
                ? 'border-white/[0.12] bg-white/[0.04]'
                : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]'
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-white/[0.02]"
            >
              <span className={`text-[15px] font-medium transition-colors duration-300 md:text-base ${
                isOpen ? 'text-white' : 'text-white/80 group-hover:text-white'
              }`}>
                {faq.question}
              </span>

              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                isOpen
                  ? 'border-white/20 bg-white text-[#050505]'
                  : 'border-white/10 bg-transparent text-white/40 group-hover:border-white/20 group-hover:text-white/70'
              }`}>
                {isOpen ? (
                  <Minus className="h-4 w-4 transition-transform duration-300" />
                ) : (
                  <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
                )}
              </div>
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-white/[0.06] px-6 pb-6 pt-4">
                  <p className="text-[15px] leading-relaxed text-white/60 md:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}