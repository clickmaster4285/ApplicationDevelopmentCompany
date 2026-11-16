// app/components/shared/FAQAccordion.tsx
"use client";

import { useId, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { MarkdownText } from "./MarkdownText";

export interface FAQ {
  question: string;
  answer: string;
}

export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const idPrefix = useId();

  return (
    <div className="bg-white/[0.02] divide-y divide-white/5 border-y border-white/5 rounded-2xl overflow-hidden">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${idPrefix}-faq-q-${index}`;
        const panelId = `${idPrefix}-faq-a-${index}`;
        // The whole card toggles (as before). The header <button> provides
        // keyboard/screen-reader access; its click bubbles here. Links inside
        // the answer navigate without collapsing the item.
        const toggle = (event: MouseEvent<HTMLDivElement>) => {
          if ((event.target as HTMLElement).closest("a")) return;
          setOpenIndex(isOpen ? null : index);
        };

        return (
          <motion.div
            key={index}
            onClick={toggle}
            className="w-full text-left py-6 md:py-8 px-6 md:px-8 flex flex-col group relative overflow-hidden"
            initial={false}
            animate={{ backgroundColor: isOpen ? "rgba(255,255,255,0.04)" : "transparent" }}
            transition={{ duration: 0.3 }}
          >
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full items-start justify-between gap-6 text-left"
            >
              <span className="text-lg md:text-xl lg:text-2xl text-white font-medium tracking-tight leading-[1.2] pr-12">
                {faq.question}
              </span>
              <motion.div
                className="flex-shrink-0 h-10 w-10 rounded-full border bg-gradient-to-b from-white/[0.06] to-transparent grid place-items-center"
                animate={{
                  rotate: isOpen ? 45 : 0,
                  borderColor: isOpen ? "transparent" : "rgba(255,255,255,0.15)",
                  backgroundColor: isOpen ? "var(--primary)" : "rgba(255,255,255,0.03)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <Plus
                  className={`h-5 w-5 transition-colors ${isOpen ? "text-[#050505]" : "text-white/60"}`}
                />
              </motion.div>
            </button>
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              initial={false}
              animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
                paddingTop: isOpen ? "1.5rem" : 0,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.5 }}
              className="overflow-hidden"
            >
              <MarkdownText
                text={faq.answer}
                className="pr-16 text-white/55 leading-relaxed text-base md:text-lg"
              />
            </motion.div>
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isOpen ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full h-full bg-gradient-to-r from-primary via-primary/50 to-transparent" />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}