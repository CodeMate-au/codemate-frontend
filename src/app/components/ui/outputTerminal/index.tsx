"use client"
import { useEffect, useRef } from "react";

type Props = {
  output: string
}

export default function OutputTerminal({ output }: Props) {
  return (
    <div
      className="block px-1 w-full h-36 text-sm bg-gray-800 text-white border focus:ring-0 border-gray-400 mt-2"
    >
      {output}

    </div>
  )
}