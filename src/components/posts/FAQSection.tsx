"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQ { question: string; answer: string }

export default function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="mt-8 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="border-b border-gray-200 px-5 py-4 text-lg font-bold text-gray-900 dark:border-gray-700 dark:text-white">
        Frequently Asked Questions
      </h3>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
              <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
              <ChevronDown className={`h-4 w-4 flex-shrink-0 text-gray-400 transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm text-gray-600 dark:text-gray-400">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
