"use client";
import { Room } from "@src/app/components/Room";
import { CollaborativeEditor } from "@src/app/components/ui/CodeMirror/Editor";
import styles from "@styles/style";


import { useState } from 'react';
import LanguageDropdown from '@src/app/components/ui/LanguageDropdown';
import { LANGUAGE_OPTIONS } from "@src/app/components/ui/LanguageDropdown/constant";
import ShareModal from "@src/app/components/ui/Dashboard/Share/ShareModal";


export default function Page() {
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGE_OPTIONS[0]);

  return (

    <div className={`${styles.padding}`}>
      <ShareModal />
      <LanguageDropdown
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
      <Room>
        <CollaborativeEditor selectedLanguage={selectedLanguage} />
      </Room>
    </div>
  );
}