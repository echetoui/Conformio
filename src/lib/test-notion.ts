import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function testNotionConnection() {
  try {
    const response = await notion.databases.retrieve({
      database_id: process.env.NOTION_DATABASE_ID || '',
    });

    console.log('Connexion à Notion réussie !');
    console.log('Base de données :', response.title[0].plain_text);
    console.log('Propriétés :', Object.keys(response.properties));
  } catch (error) {
    console.error('Erreur de connexion à Notion :', error);
  }
}

testNotionConnection(); 