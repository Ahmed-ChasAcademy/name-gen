// app/api/names/route.ts
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('fantasynames');
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    const query = category ? { category } : {};
    const names = await db.collection('names')
      .find(query)
      .limit(50)
      .toArray();
    
    return Response.json(names);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch names' }, { status: 500 });
  }
}