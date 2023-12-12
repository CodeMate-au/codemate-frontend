import useSWR from 'swr';
import { User } from './definitions';
import fetcher from './fetcher';

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8888';

export function useUser() {
  const {
    data: user,
    error,
    isLoading,
  } = useSWR(`${BACKEND_URL}/api/user`, fetcher);

  return {
    user,
    isLoading,
    isError: error,
  };
}
