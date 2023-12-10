
import { close, logo, menu } from "@/public/assets";
import { navLinks } from "@/constants";
import Image from 'next/image';

export default function NavBar() {

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar mt-[70px]">

      <h1

        className="text-[25px] text-[#ffffff]"
      >

        Code <span className="text-[#407BBF]"> Mates</span>
        <span className="font-inter text-[#407BBF]">.</span>
      </h1>

    </nav>
  )
}