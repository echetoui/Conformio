import React, { useState, useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(true);
  const contentId = useId();
  const questionId = `${contentId}-question`;

  return (
    <div className="glass-panel rounded-2xl px-5">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        id={questionId}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="focus-ring flex w-full items-center justify-between py-5 text-left"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <span className="text-lg font-medium text-slate-100">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 ml-4"
        >
          <ChevronDown className="w-5 h-5 text-cyan-300" aria-hidden="true" />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
            id={contentId}
            role="region"
            aria-labelledby={questionId}
          >
            <div className="pb-6 text-slate-300">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQItem;
