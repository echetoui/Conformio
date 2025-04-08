import nodemailer from 'nodemailer';

// Configuration du transporteur d'emails
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Remplacer par votre serveur SMTP
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'votre-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'votre-mot-de-passe'
  }
});

// Fonction pour envoyer un email de notification
export const sendNotificationEmail = async (clientEmail: string): Promise<boolean> => {
  try {
    console.log('Starting email send process...');
    console.log('Email configuration:', {
      host: 'smtp.gmail.com',
      port: 587,
      user: process.env.EMAIL_USER || 'votre-email@gmail.com'
    });

    // Email envoyé à info@cybernow.io
    console.log('Sending notification email to info@cybernow.io...');
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'votre-email@gmail.com',
      to: 'info@cybernow.io',
      subject: 'Nouvelle inscription - Conformio',
      html: `
        <h2>Nouvelle inscription sur Conformio</h2>
        <p>Un nouveau client s'est inscrit avec l'adresse email suivante :</p>
        <p><strong>${clientEmail}</strong></p>
        <p>Date d'inscription : ${new Date().toLocaleString('fr-FR')}</p>
      `
    });
    console.log('Notification email sent successfully');

    // Email de confirmation envoyé au client
    console.log('Sending confirmation email to client...');
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'votre-email@gmail.com',
      to: clientEmail,
      subject: 'Bienvenue chez Conformio',
      html: `
        <h2>Merci de votre inscription chez Conformio</h2>
        <p>Nous avons bien reçu votre demande et nous vous contacterons dans les plus brefs délais.</p>
        <p>À bientôt !</p>
        <p>L'équipe Conformio</p>
      `
    });
    console.log('Confirmation email sent successfully');

    return true;
  } catch (error) {
    console.error('Erreur détaillée lors de l\'envoi de l\'email:', error);
    return false;
  }
}; 