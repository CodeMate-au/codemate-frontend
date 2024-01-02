import { ThemeButton } from ".";
import Welcome from "./Welcome";
import { clsx } from "clsx";
import { cookies } from 'next/headers';
import WelcomeClient from "./WelcomeClient";


export default function Header() {


  // const cookieStore = cookies();
  // const token = cookieStore.get('session-token')?.value;


  return (

      <WelcomeClient>
        <Welcome />
      </WelcomeClient>

  )
}