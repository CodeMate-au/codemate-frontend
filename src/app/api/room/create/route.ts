import { NextRequest } from 'next/server';
export async function POST(request: NextRequest) {
  const room = await request.formData();
  console.log('room response', room);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room`,
    {
      body: room,
      method: 'POST',
    },
  );
  console.log('response', response);
  return response.json();
}
