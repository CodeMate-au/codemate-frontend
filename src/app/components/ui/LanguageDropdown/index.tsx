import React, { useEffect, Fragment, useState } from 'react'
import { LANGUAGE_OPTIONS } from './constant';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

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
  // useEffect(() => {
  //   const storedLanguage = localStorage.getItem('selectedLanguage');
  //   if (storedLanguage) {
  //     setSelectedLanguage(JSON.parse(storedLanguage));
  //   }
  // }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = LANGUAGE_OPTIONS.find((option) => option.value === Number(e.target.value)) || LANGUAGE_OPTIONS[0];
    setSelectedLanguage(newLanguage);
    // Store the selected language in local storage
    localStorage.setItem('selectedLanguage', JSON.stringify(newLanguage));
  };

  return (
    <>
      <div className='w-64 mb-8'>
        <Listbox value={selectedLanguage} onChange={setSelectedLanguage} horizontal>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white dark:bg-slate-700 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{selectedLanguage.label}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-slate-700 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {LANGUAGE_OPTIONS.map((language) => (
                  <Listbox.Option
                    key={language.value}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                      }`
                    }
                    value={language}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                            }`}
                        >
                          {language.label}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </>
  );
}