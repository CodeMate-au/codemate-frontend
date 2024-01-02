'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'

const ThemeButton = () => {
  const { resolvedTheme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return null
  }

  return (

    <button
      aria-label='Toggle Dark Mode'
      type='button'
      className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6  hover:bg-gray-800 hover:text-white"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? (
        <>
        <SunIcon className='h-6 w-6 shrink-0 text-orange-300' aria-hidden="true"/>
        Light Mode</>
      ) : (
        <>
        <MoonIcon className='h-6 w-6 shrink-0 text-slate' aria-hidden="true"/>
        Dark Mode</>
      )}
    </button>

  )
}

export default ThemeButton