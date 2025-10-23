// app/api/names/route.ts
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('fantasynames');
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    console.log('Searching for category:', category); // Debug log
    
    // Build proper query to filter by category
    let query = {};
    
    if (category && category !== 'all') {
      // Search in both category and subcategory fields
      query = {
        $or: [
          { category: { $regex: category, $options: 'i' } },
          { subcategory: { $regex: category, $options: 'i' } }
        ]
      };
    }
    
    const names = await db.collection('names')
      .find(query)
      .limit(50)
      .toArray();

    console.log('Found names:', names.length); // Debug log
    
    return Response.json(names);
    
  } catch (error: any) {
    console.log('DATABASE ERROR:', error.message);
    // Return empty array instead of test data
    return Response.json([]);
  }
}