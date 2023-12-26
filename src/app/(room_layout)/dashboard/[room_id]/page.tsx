"use client";
import { Room } from "../../../components/Room";
import { CollaborativeEditor } from "../../../components/ui/CodeMirror/Editor";
import styles from "@styles/style";


import { useState } from 'react';
import OutputTerminal from '../../../components/ui/outputTerminal';
import LanguageDropdown from '../../../components/ui/LanguageDropdown';
import { LANGUAGE_OPTIONS } from "@src/app/components/ui/LanguageDropdown/constant";


export default function Page() {
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGE_OPTIONS[0]);

  return (

    <div className={`${styles.padding}`}>
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
