// app/api/categories/route.ts
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('fantasynames');
    
    // Get all unique categories and subcategories from names
    const categories = await db.collection('names').aggregate([
      {
        $group: {
          _id: "$category",
          subcategories: { $addToSet: "$subcategory" }
        }
      },
      {
        $project: {
          category: "$_id",
          subcategories: 1,
          _id: 0
        }
      }
    ]).toArray();

    return Response.json(categories);
    
  } catch (error: any) {
    console.log('Categories error:', error.message);
    // Fallback categories if DB fails
    return Response.json([
      {
        category: "Fantasy Races",
        subcategories: ["Elf Names", "Dwarf Names", "Dragon Names", "Vampire Names"]
      },
      {
        category: "Characters", 
        subcategories: ["Wizard Names", "Warrior Names"]
      },
      {
        category: "Modern",
        subcategories: ["Robot Names"]
      }
    ]);
  }
}