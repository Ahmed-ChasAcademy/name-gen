// scripts/importNames.ts
import clientPromise from '@/lib/mongodb';
import fs from 'fs';

async function importNames() {
  const client = await clientPromise;
  const db = client.db('fantasynames');

  // Read your names data (CSV, JSON, etc.)
  const namesData = JSON.parse(fs.readFileSync('./data/names.json', 'utf-8'));

  // Transform and insert
  const names = namesData.map((name: any) => ({
    ...name,
    createdAt: new Date(),
    updatedAt: new Date(),
    popularity: Math.floor(Math.random() * 100), // Temporary
    likes: 0,
    usageCount: 0
  }));

  await db.collection('names').insertMany(names);
  console.log(`Imported ${names.length} names successfully!`);
}

importNames();