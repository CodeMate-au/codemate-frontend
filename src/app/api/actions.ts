'use server';
import { cookies } from 'next/headers';
import { User } from '../lib/definitions';
import { redirect } from 'next/navigation';

export async function createRoom(formData: FormData) {
  const cookieStore = cookies();
  const token = cookieStore.get('session-token')?.value;

  try {
    console.log('room response', formData);
    console.log('room name', formData.get('name'));

    formData.append('userId', `${(await getUser()).id}`);
    console.log('form data', formData);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room`,
      {
        body: formData,
        method: 'POST',
        headers: {
          Cookie: `session-token=${token};`,
        },
      },
    );
    console.log('response', response.json());
    return response.json();
  } catch (err) {
    console.log(err);
  }
}

export async function getRooms() {
  const cookieStore = cookies();
  const token = cookieStore.get('session-token')?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room`, {
    headers: {
      Cookie: `session-token=${token};`,
    },
  });
  const roomsData = await res.json();

  return roomsData;
}

export async function getUser() {
  const cookieStore = cookies();
  const token = cookieStore.get('session-token')?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`, {
    headers: {
      Cookie: `session-token=${token};`,
    },
  });
  // console.log('res catch', res);

  return res.json();
}
