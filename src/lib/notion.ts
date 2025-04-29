import { Client } from '@notionhq/client';

// Créer un client Notion uniquement si la clé API est disponible
// Cela évite l'erreur dans le navigateur
let notion: Client | null = null;

// Vérifier si nous sommes dans un environnement où les variables d'environnement sont disponibles
try {
  const apiKey = import.meta.env.VITE_NOTION_API_KEY;
  if (apiKey) {
    notion = new Client({
      auth: apiKey,
    });
  }
} catch (error) {
  console.warn('Notion API key not available in this environment');
}

export async function addLeadToNotion(data: {
  fullName: string;
  email: string;
  companyName: string;
  teamSize: string;
  objectives: string[];
  utmSource?: string;
}) {
  try {
    // Vérifier si le client Notion est disponible
    if (!notion) {
      console.error('Notion client not initialized');
      return { success: false, error: 'Notion API not available' };
    }
    
    const response = await notion.pages.create({
      parent: {
        database_id: import.meta.env.VITE_NOTION_DATABASE_ID || '',
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: data.fullName,
              },
            },
          ],
        },
        Email: {
          email: data.email,
        },
        Company: {
          rich_text: [
            {
              text: {
                content: data.companyName,
              },
            },
          ],
        },
        'Team Size': {
          select: {
            name: data.teamSize,
          },
        },
        Objectives: {
          multi_select: data.objectives.map(objective => ({
            name: objective,
          })),
        },
        'UTM Source': {
          rich_text: [
            {
              text: {
                content: data.utmSource || 'direct',
              },
            },
          ],
        },
        Status: {
          select: {
            name: 'New',
          },
        },
        Date: {
          date: {
            start: new Date().toISOString(),
          },
        },
      },
    });

    return { success: true, data: response };
  } catch (error) {
    console.error('Error adding lead to Notion:', error);
    throw error;
  }
} 