import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { fullName, email, companyName, teamSize, objectives, utmSource } = req.body;

    if (!databaseId) {
      throw new Error('Notion database ID not configured');
    }

    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: fullName,
              },
            },
          ],
        },
        Email: {
          email: email,
        },
        'Company Name': {
          rich_text: [
            {
              text: {
                content: companyName,
              },
            },
          ],
        },
        'Team Size': {
          select: {
            name: teamSize,
          },
        },
        Objectives: {
          multi_select: objectives.map((objective: string) => ({
            name: objective,
          })),
        },
        'UTM Source': {
          rich_text: [
            {
              text: {
                content: utmSource || 'direct',
              },
            },
          ],
        },
        Status: {
          select: {
            name: 'New',
          },
        },
        'Created At': {
          date: {
            start: new Date().toISOString(),
          },
        },
      },
    });

    res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('Error sending to Notion:', error);
    res.status(500).json({ message: 'Error sending to Notion' });
  }
} 