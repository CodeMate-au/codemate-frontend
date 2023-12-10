"use client"
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url, { credentials: 'include' }).then(res => res.json());

export default function Page() {
  const { data: user, error } = useSWR(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`, fetcher);

  if (error) return <div>Failed to load user info.</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div>Welcome, {user.name}!</div>
  );
};
