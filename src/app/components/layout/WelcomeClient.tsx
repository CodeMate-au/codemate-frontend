"use client"
import { useRouter, usePathname } from 'next/navigation';

type Props = {}

function WelcomeClient({ children }: { children: React.ReactNode; }) {
  const pathname = usePathname();

  const showWelcome = pathname !== '/';
  return (
    <>
      {showWelcome && children}
    </>
  )
}

export default WelcomeClient