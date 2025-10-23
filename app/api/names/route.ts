// app/api/names/route.ts
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  
  // This is where you'll connect to MongoDB
  // For now, return mock data
  const mockNames = [
    { _id: '1', name: 'Example Name 1', meaning: 'Brave warrior', origin: 'Ancient' },
    { _id: '2', name: 'Example Name 2', meaning: 'Wise sage', origin: 'Mythical' },
    // ... more names
  ];
  
  return Response.json(mockNames);
}