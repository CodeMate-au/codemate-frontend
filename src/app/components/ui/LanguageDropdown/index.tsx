import React, { useEffect } from 'react'
import { LANGUAGE_OPTIONS } from './constant';

type Props = {
  selectedLanguage: {
    title: string;
    value: number;
    label: string;
    stub: string;
  };
  setSelectedLanguage: React.Dispatch<React.SetStateAction<{
    title: string;
    value: number;
    label: string;
    stub: string;
  }>>;
}

export default function LanguageDropdown({ selectedLanguage, setSelectedLanguage }: Props) {
  // Load the selected language from local storage when the component mounts
  useEffect(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage) {
      setSelectedLanguage(JSON.parse(storedLanguage));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = LANGUAGE_OPTIONS.find((option) => option.value === Number(e.target.value)) || LANGUAGE_OPTIONS[0];
    setSelectedLanguage(newLanguage);
    // Store the selected language in local storage
    localStorage.setItem('selectedLanguage', JSON.stringify(newLanguage));
  };

  return (
    <select
      onChange={handleChange}
      className='rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-100 bg-inherit'
      value={selectedLanguage.value}
    >
      {LANGUAGE_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}