// "use client"
// 'use server'

import { useUser } from '../lib/data';
import { getUser } from '../api/user'
import Welcome from '../ui/dashboard/welcome';

export default async function Page() {

  const user = await getUser();
  return (
    <Welcome></Welcome>
  );
}
