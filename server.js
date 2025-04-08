const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Configuration du transporteur d'emails
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Endpoint pour l'envoi d'emails
app.post('/api/send-email', async (req, res) => {
  try {
    const { email } = req.body;

    // Email envoyé à info@cybernow.io
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'info@cybernow.io',
      subject: 'Nouvelle inscription - Conformio',
      html: `
        <h2>Nouvelle inscription sur Conformio</h2>
        <p>Un nouveau client s'est inscrit avec l'adresse email suivante :</p>
        <p><strong>${email}</strong></p>
        <p>Date d'inscription : ${new Date().toLocaleString('fr-FR')}</p>
      `
    });

    // Email de confirmation envoyé au client
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Bienvenue chez Conformio',
      html: `
        <h2>Merci de votre inscription chez Conformio</h2>
        <p>Nous avons bien reçu votre demande et nous vous contacterons dans les plus brefs délais.</p>
        <p>À bientôt !</p>
        <p>L'équipe Conformio</p>
      `
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 