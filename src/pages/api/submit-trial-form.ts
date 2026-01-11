import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import nodemailer from 'nodemailer';

// Validation schema for trial form data
const trialFormSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  teamSize: z.enum(['1-5', '6-20', '21-50', '50+'], {
    errorMap: () => ({ message: 'Invalid team size' })
  }),
  objectives: z.array(z.string()).min(1, 'At least one objective must be selected'),
  utmSource: z.string().optional(),
});

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASSWORD || '',
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    // Validate email configuration
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('Email configuration not set');
      return res.status(500).json({
        success: false,
        error: 'Server configuration error',
      });
    }

    // Validate request body
    const validatedData = trialFormSchema.parse(req.body);

    // Format the trial form data for email
    const emailContent = `
      <h2>Nouvelle demande d'essai gratuit - Conformio</h2>
      <p><strong>Informations du lead :</strong></p>
      <ul>
        <li><strong>Nom complet:</strong> ${validatedData.fullName}</li>
        <li><strong>Email:</strong> ${validatedData.email}</li>
        <li><strong>Entreprise:</strong> ${validatedData.companyName}</li>
        <li><strong>Taille de l'équipe:</strong> ${validatedData.teamSize}</li>
        <li><strong>Objectifs de conformité:</strong> ${validatedData.objectives.join(', ')}</li>
        <li><strong>Source UTM:</strong> ${validatedData.utmSource || 'direct'}</li>
        <li><strong>Date de soumission:</strong> ${new Date().toLocaleString('fr-FR')}</li>
      </ul>
    `;

    // Send email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to admin email
      subject: 'Nouvelle demande d\'essai gratuit - Conformio',
      html: emailContent,
      replyTo: validatedData.email,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: validatedData.email,
      subject: 'Confirmation de votre demande d\'essai gratuit - Conformio',
      html: `
        <h2>Merci pour votre intérêt !</h2>
        <p>Nous avons bien reçu votre demande d'essai gratuit.</p>
        <p>Notre équipe vous contactera dans les prochaines 24 heures pour démarrer votre essai.</p>
        <p>En attendant, si vous avez des questions, n'hésitez pas à nous écrire.</p>
        <br/>
        <p>À bientôt !</p>
        <p><strong>L'équipe Conformio</strong></p>
      `,
    });

    res.status(200).json({
      success: true,
      message: 'Trial form submitted successfully',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request data',
        details: error.errors,
      });
    }

    console.error('Error submitting trial form:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit trial form',
    });
  }
}
