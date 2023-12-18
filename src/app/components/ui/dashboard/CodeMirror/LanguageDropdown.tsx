"use client"
import React from 'react'
import { useState } from 'react'

type Props = {
  selectedLanguage: string;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
}

export default function LanguageDropdown({ selectedLanguage, setSelectedLanguage }: Props) {
  return (
    <select
      value={selectedLanguage}
      onChange={(e) => setSelectedLanguage(e.target.value)}
      className='rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-100 bg-inherit'
    >
      <option value="javascript"><span>JavaScript</span></option>
      <option value="java">Java</option>
      <option value="python">Python</option>
    </select>
  );
}
