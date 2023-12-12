import { cookies } from 'next/headers';
import { User } from '../lib/definitions';

export async function getUser() {
  const cookieStore = cookies();
  const token = cookieStore.get('session-token')?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`, {
    headers: {
      Cookie: `session-token=${token};`,
    },
  });

  const json = await res.json();
  if (res.status !== 200) {
    throw new Error(json.message);
  }
  return json as User;
}
