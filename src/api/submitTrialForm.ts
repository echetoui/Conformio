/**
 * Submit trial form data using Formspree
 * This is a serverless solution that doesn't require a backend
 */

export interface TrialFormData {
  fullName: string;
  email: string;
  companyName: string;
  teamSize: string;
  objectives: string[];
  utmSource?: string;
}

/**
 * Submit trial form using Formspree
 * Formspree ID should be set as VITE_FORMSPREE_ID environment variable
 *
 * Get your Formspree ID at: https://formspree.io/
 */
export async function submitTrialForm(data: TrialFormData): Promise<{ success: boolean; error?: string }> {
  try {
    // Get Formspree ID from environment
    const formspreeId = import.meta.env.VITE_FORMSPREE_ID;

    if (!formspreeId) {
      console.error('VITE_FORMSPREE_ID environment variable not set');
      return {
        success: false,
        error: 'Form submission is not configured. Please contact support.',
      };
    }

    // Format data for Formspree
    const formattedData = {
      fullName: data.fullName,
      email: data.email,
      companyName: data.companyName,
      teamSize: data.teamSize,
      objectives: data.objectives.join(', '),
      utmSource: data.utmSource || 'direct',
      _subject: 'New Trial Form Submission - Conformio',
      _replyto: data.email,
    };

    // Submit to Formspree
    const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    });

    if (!response.ok) {
      console.error('Formspree error:', response.statusText);
      return {
        success: false,
        error: 'Failed to submit form. Please try again.',
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Error submitting trial form:', error);
    return {
      success: false,
      error: 'An error occurred while submitting the form.',
    };
  }
}
