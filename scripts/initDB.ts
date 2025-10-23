// scripts/initDB.ts
import clientPromise from '@/lib/mongodb';

async function initializeDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db('fantasynames');

    // Create indexes for fast queries
    await db.collection('names').createIndex({ category: 1, subcategory: 1 });
    await db.collection('names').createIndex({ tags: 1 });
    await db.collection('names').createIndex({ race: 1 });
    await db.collection('names').createIndex({ gender: 1 });
    await db.collection('names').createIndex({ popularity: -1 });
    
    // Create categories collection with initial data
    const categories = [
      {
        name: "Fantasy Races",
        description: "Names for fantasy races and species",
        subcategories: ["Elf Names", "Dwarf Names", "Orc Names", "Fairy Names", "Angel Names", "Demon Names"],
        icon: "🧙",
        color: "#8B5CF6",
        count: 0,
        isActive: true,
        createdAt: new Date()
      },
      // Add more categories...
    ];

    await db.collection('categories').insertMany(categories);
    
    console.log('Database initialized successfully!');
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
}

initializeDatabase();