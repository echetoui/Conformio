import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle } from 'lucide-react';
import { submitTrialForm } from '../api/submitTrialForm';

// Schéma de validation Zod
const getValidationMessages = (language: string) => ({
  fullName: language === 'fr' ? 'Le nom complet est requis' : 'Full name is required',
  email: language === 'fr' ? 'Email professionnel invalide' : 'Invalid professional email',
  emailPro: language === 'fr' ? 'Veuillez utiliser votre email professionnel' : 'Please use your professional email',
  companyName: language === 'fr' ? 'Le nom de l\'entreprise est requis' : 'Company name is required',
  objectives: language === 'fr' ? 'Sélectionnez au moins un objectif' : 'Select at least one objective'
});

function TrialForm() {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const validationMessages = getValidationMessages(language);

  // Définir les valeurs d'objectifs comme constantes pour assurer la cohérence des types
  const OBJECTIVES = {
    LOI_25: 'Loi 25',
    SOC_2: 'SOC 2',
    TGV: 'TGV',
    ISO_27001: 'ISO 27001'
  } as const;
  
  // Créer un type à partir des valeurs d'objectifs
  type ObjectiveValue = typeof OBJECTIVES[keyof typeof OBJECTIVES];
  
  const trialFormSchema = z.object({
    fullName: z.string().min(2, validationMessages.fullName),
    email: z.string().email(validationMessages.email).refine(
      (email) => !email.includes('@gmail.com') && !email.includes('@yahoo.') && !email.includes('@hotmail.'),
      validationMessages.emailPro
    ),
    companyName: z.string().min(2, validationMessages.companyName),
    teamSize: z.enum(['1-5', '6-20', '21-50', '50+']),
    objectives: z.array(z.enum([OBJECTIVES.LOI_25, OBJECTIVES.SOC_2, OBJECTIVES.TGV, OBJECTIVES.ISO_27001])).min(1, validationMessages.objectives),
    utmSource: z.string().optional()
  });

  type TrialFormData = z.infer<typeof trialFormSchema>;

  const teamSizeOptions = {
    fr: [
      { value: '1-5', label: '1-5 employés' },
      { value: '6-20', label: '6-20 employés' },
      { value: '21-50', label: '21-50 employés' },
      { value: '50+', label: '50+ employés' }
    ],
    en: [
      { value: '1-5', label: '1-5 employees' },
      { value: '6-20', label: '6-20 employees' },
      { value: '21-50', label: '21-50 employees' },
      { value: '50+', label: '50+ employees' }
    ]
  };

  const objectiveOptions = {
    fr: [
      { value: OBJECTIVES.LOI_25, label: 'Loi 25' },
      { value: OBJECTIVES.SOC_2, label: 'SOC 2' },
      { value: OBJECTIVES.ISO_27001, label: 'ISO 27001' },
      { value: OBJECTIVES.TGV, label: 'TGV (Trousse globale de vérification)' }
    ],
    en: [
      { value: OBJECTIVES.LOI_25, label: 'Bill 25' },
      { value: OBJECTIVES.SOC_2, label: 'SOC 2' },
      { value: OBJECTIVES.ISO_27001, label: 'ISO 27001' },
      { value: OBJECTIVES.TGV, label: 'TGV (Global Verification Toolkit)' }
    ]
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<TrialFormData>({
    resolver: zodResolver(trialFormSchema),
    defaultValues: {
      objectives: [],
      utmSource: new URLSearchParams(window.location.search).get('utm_source') || 'direct'
    }
  });

  const onSubmit = async (data: TrialFormData) => {
    setIsSubmitting(true);
    setError('');

    try {
      // Envoyer les données du formulaire via Formspree
      const result = await submitTrialForm(data);

      if (!result.success) {
        setError(
          result.error ||
          (language === 'fr'
            ? 'Une erreur est survenue. Veuillez réessayer.'
            : 'An error occurred. Please try again.')
        );
        return;
      }

      setIsSuccess(true);
    } catch (err) {
      setError(
        language === 'fr'
          ? 'Une erreur est survenue. Veuillez réessayer.'
          : 'An error occurred. Please try again.'
      );
      console.error('Error submitting form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8 rounded-2xl bg-green-50 border border-green-100"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {language === 'fr' ? 'Merci de votre intérêt !' : 'Thank you for your interest!'}
        </h3>
        <p className="text-gray-600">
          {language === 'fr'
            ? 'Notre équipe vous contactera dans les prochaines 24 heures pour démarrer votre essai gratuit.'
            : 'Our team will contact you within the next 24 hours to start your free trial.'}
        </p>
      </motion.div>
    );
  }

  return (
    <section className="py-16 bg-white" id="trial">
      <div className="max-w-xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {language === 'fr' ? 'Commencez votre essai gratuit' : 'Start your free trial'}
          </h2>
          <p className="text-lg text-gray-600">
            {language === 'fr' 
              ? 'Découvrez comment Conformio peut vous aider à gérer votre conformité efficacement'
              : 'Discover how Conformio can help you manage your compliance effectively'}
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'fr' ? 'Nom complet' : 'Full Name'}
            </label>
            <input
              type="text"
              id="fullName"
              autoComplete="name"
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              {...register('fullName')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Jean Dupont"
            />
            {errors.fullName && (
              <p id="fullName-error" className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'fr' ? 'Email professionnel' : 'Professional Email'}
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register('email')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="jean@entreprise.com"
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'fr' ? 'Nom de l\'entreprise' : 'Company Name'}
            </label>
            <input
              type="text"
              id="companyName"
              autoComplete="organization"
              aria-invalid={!!errors.companyName}
              aria-describedby={errors.companyName ? "companyName-error" : undefined}
              {...register('companyName')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Entreprise Inc."
            />
            {errors.companyName && (
              <p id="companyName-error" className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'fr' ? 'Taille de l\'équipe' : 'Team Size'}
            </label>
            <select
              id="teamSize"
              aria-invalid={!!errors.teamSize}
              aria-describedby={errors.teamSize ? "teamSize-error" : undefined}
              {...register('teamSize')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">{language === 'fr' ? 'Sélectionnez une taille' : 'Select a size'}</option>
              {teamSizeOptions[language].map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.teamSize && (
              <p id="teamSize-error" className="mt-1 text-sm text-red-600">{errors.teamSize.message}</p>
            )}
          </div>

          <div>
            <fieldset className="space-y-2" aria-describedby={errors.objectives ? "objectives-error" : undefined}>
            <legend className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'fr' ? 'Objectifs de conformité' : 'Compliance Objectives'}
            </legend>
            <Controller
              name="objectives"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  {objectiveOptions[language as keyof typeof objectiveOptions].map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`objective-${option.value}`}
                        value={option.value}
                        checked={field.value.includes(option.value)}
                        aria-invalid={!!errors.objectives}
                        onChange={(e) => {
                          // La valeur est maintenant correctement typée grâce à notre constante OBJECTIVES
                          const value = option.value;
                          const newValues = e.target.checked
                            ? [...field.value, value]
                            : field.value.filter((v: ObjectiveValue) => v !== value);
                          field.onChange(newValues);
                        }}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              )}
            />
            </fieldset>
            {errors.objectives && (
              <p id="objectives-error" className="mt-1 text-sm text-red-600">{errors.objectives.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting
              ? (language === 'fr' ? 'Envoi en cours...' : 'Sending...')
              : (language === 'fr' ? '🎁 Commencer l\'essai gratuit' : '🎁 Start free trial')}
          </button>

          {error && (
            <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
          )}
        </motion.form>
      </div>
    </section>
  );
}

export default TrialForm; 