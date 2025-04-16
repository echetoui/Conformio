import dotenv from 'dotenv';
import { Client } from '@notionhq/client';

dotenv.config();

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function testNotionForm() {
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID,
      },
      properties: {
        'Nom complet': {
          title: [
            {
              text: {
                content: 'Test User',
              },
            },
          ],
        },
        'Email professionnel': {
          email: 'test@example.com',
        },
        'Nom de l\'entreprise': {
          rich_text: [
            {
              text: {
                content: 'Test Company',
              },
            },
          ],
        },
        'Taille de l\'équipe': {
          select: {
            name: '1-10',
          },
        },
        'Objectifs de conformité': {
          select: {
            name: 'ISO 27001'
          }
        },
      },
    });

    console.log('Formulaire de test envoyé avec succès !');
    console.log('ID de la page créée :', response.id);
  } catch (error) {
    console.error('Erreur lors de l\'envoi du formulaire de test :', error);
  }
}

testNotionForm(); 