import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function addLeadToNotion(data: {
  fullName: string;
  email: string;
  companyName: string;
  teamSize: string;
  objectives: string[];
  utmSource?: string;
}) {
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID || '',
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