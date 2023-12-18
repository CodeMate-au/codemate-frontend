import { cookies } from 'next/headers';
import { User } from '../lib/definitions';
import { redirect } from 'next/navigation';

export async function getUser() {
  const cookieStore = cookies();
  const token = cookieStore.get('session-token')?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`, {
    headers: {
      Cookie: `session-token=${token};`,
    },
  });
  // console.log('res catch', res);

  if (!res.ok) {
    if (res.status === 401) {
      redirect('/');
    }
  }
  return res.json();
}
