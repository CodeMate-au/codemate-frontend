import { ThemeButton } from ".";
import Welcome from "./Welcome";
import { clsx } from "clsx";
import { cookies } from 'next/headers';
import WelcomeClient from "./WelcomeClient";


export default function Header() {


  const cookieStore = cookies();
  const token = cookieStore.get('session-token')?.value;


  return (
    <header className="w-full flex px-6 justify-between items-center navbar mt-[40px]">

      <h1
        className="text-[25px]"
      >
        Code <span className="text-[#407BBF]"> Mates</span>
        <span className="font-inter text-[#407BBF]">.</span>
      </h1>
      <WelcomeClient>
        <Welcome />
      </WelcomeClient>
      <ThemeButton></ThemeButton>
    </header>
  )
}