import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const cookieStore = cookies();
  const token = cookieStore.get('session-token')?.value;

  const formData = await request.formData();
  console.log('param room', params.id);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room/${params.id}`,
    {
      headers: {
        Cookie: `session-token=${token};`,
      },
      method: 'PUT',
      body: formData,
    },
  );

  const data = await response.json();
  console.log(data);

  return Response.json(data);
}
