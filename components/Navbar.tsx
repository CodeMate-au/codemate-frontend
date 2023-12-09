"use client"
import { useState } from 'react';
import { close, logo, menu } from "@/public/assets";
import { navLinks } from "@/constants";
import Image from 'next/image';

const Navbar: React.FC = () => {
  const [toggle, setToggle] = useState(false);
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

export default Navbar