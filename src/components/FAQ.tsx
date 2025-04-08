import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import FAQItem from './FAQItem';
import { motion } from 'framer-motion';

const FAQ = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const faqItems = {
    fr: [
      {
        question: "Pourquoi se conformer à la TGV au Québec ?",
        answer: "La TGV (Trousse globale de vérification) est un standard essentiel pour les startups québécoises travaillant avec le gouvernement. Elle permet d'évaluer et de démontrer votre niveau de sécurité, facilitant ainsi l'accès aux marchés publics. C'est un avantage compétitif majeur qui renforce la confiance de vos partenaires gouvernementaux."
      },
      {
        question: "Quels sont les avantages de la Loi 25 pour les startups ?",
        answer: "La Loi 25 (anciennement projet de loi 64) modernise la protection des données au Québec. Pour les startups, c'est l'opportunité de : renforcer la confiance des clients, se démarquer sur le marché nord-américain, et éviter des amendes importantes. Une conformité précoce devient un atout commercial significatif."
      },
      {
        question: "Pourquoi SOC 2 est essentiel pour les startups tech qui veulent scaler ?",
        answer: "La certification SOC 2 est un standard de confiance incontournable pour les startups B2B. Elle ouvre les portes des grands comptes, facilite les levées de fonds, et accélère les cycles de vente. C'est un investissement stratégique pour votre croissance internationale."
      },
      {
        question: "Est-ce que la mise en conformité prend beaucoup de temps ?",
        answer: "Avec notre approche automatisée, la mise en conformité devient plus rapide et moins contraignante. Nous simplifions le processus en fournissant des modèles, des workflows automatisés et un accompagnement personnalisé. La plupart de nos clients obtiennent leur première certification en 3 à 6 mois."
      }
    ],
    en: [
      {
        question: "Why comply with TGV in Quebec?",
        answer: "The TGV (Global Verification Toolkit) is an essential standard for Quebec startups working with the government. It helps evaluate and demonstrate your security level, facilitating access to public markets. It's a major competitive advantage that strengthens trust with government partners."
      },
      {
        question: "What are the benefits of Bill 25 for startups?",
        answer: "Bill 25 (formerly Bill 64) modernizes data protection in Quebec. For startups, it's an opportunity to: strengthen customer trust, stand out in the North American market, and avoid significant fines. Early compliance becomes a significant business asset."
      },
      {
        question: "Why is SOC 2 essential for tech startups looking to scale?",
        answer: "SOC 2 certification is a must-have trust standard for B2B startups. It opens doors to enterprise clients, facilitates fundraising, and accelerates sales cycles. It's a strategic investment for your international growth."
      },
      {
        question: "Does compliance take a lot of time?",
        answer: "With our automated approach, compliance becomes faster and less constraining. We simplify the process by providing templates, automated workflows, and personalized support. Most of our clients achieve their first certification in 3 to 6 months."
      }
    ]
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-white"
      id="faq"
    >
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'fr' ? 'Questions fréquentes' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-xl text-gray-600">
            {language === 'fr' 
              ? 'Pourquoi la conformité est un levier pour les startups québécoises ?' 
              : 'Why compliance is a growth lever for Quebec startups?'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          {faqItems[language].map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ; 