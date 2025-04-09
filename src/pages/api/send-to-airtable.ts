import { NextApiRequest, NextApiResponse } from 'next';
import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID || '');

const tableName = process.env.AIRTABLE_TABLE_NAME || 'Leads';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { fullName, email, companyName, teamSize, objectives, utmSource } = req.body;

    if (!process.env.AIRTABLE_BASE_ID) {
      throw new Error('Airtable base ID not configured');
    }

    const record = await base(tableName).create([
      {
        fields: {
          'Nom complet': fullName,
          'Email': email,
          'Entreprise': companyName,
          'Taille équipe': teamSize,
          'Objectifs': objectives,
          'Source': utmSource || 'direct',
          'Statut': 'Nouveau',
          'Date création': new Date().toISOString()
        }
      }
    ]);

    res.status(200).json({ message: 'Success', record });
  } catch (error) {
    res.status(500).json({ message: 'Error sending to Airtable' });
  }
} 