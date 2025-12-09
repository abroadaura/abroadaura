import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What services does Abroad Aura provide?",
    answer:
      "We offer comprehensive support including university selection, application guidance, visa assistance, scholarship support, and post-arrival help for students planning to study abroad.",
  },
  {
    question: "Is the consultation free?",
    answer:
      "Yes! We provide a free initial consultation to help you understand your options and plan your study-abroad journey effectively.",
  },
  {
    question: "Which countries can I apply to through Abroad Aura?",
    answer:
      "We assist with applications to top destinations such as the USA, UK, Canada, Australia, and across Europe and Asia.",
  },
  {
    question: "How soon will I hear back after booking a consultation?",
    answer:
      "Our counselors usually reach out within 2 business days after receiving your consultation request.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-xl shadow-sm bg-white"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-800 font-medium hover:text-blue-700 transition-colors"
          >
            {faq.question}
            {openIndex === index ? (
              <ChevronUp className="text-blue-600" size={20} />
            ) : (
              <ChevronDown className="text-gray-500" size={20} />
            )}
          </button>

          {openIndex === index && (
            <div className="px-6 pb-4 text-gray-600 border-t border-gray-100">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
