"use client";

import * as Y from "yjs";
import { yCollab } from "y-codemirror.next";
import { EditorView, basicSetup } from "codemirror";
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { EditorState } from "@codemirror/state";
import { indentWithTab } from "@codemirror/commands"
import { keymap } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import { useCallback, useEffect, useState, useRef } from "react";
import LiveblocksProvider from "@liveblocks/yjs";
import { TypedLiveblocksProvider, useRoom, useSelf } from "@/liveblocks.config";
import styles from "@styles/Editor.module.css";
import { Avatars } from "./Avatars";
import { Toolbar } from "./Toolbar";
import LanguageDropdown from "./LanguageDropdown";
import { ExecuteButton } from "../Compiler";
import { LiveblockUser } from "@src/app/lib/definitions";

// Collaborative code editor with undo/redo, live cursors, and live avatars
export function CollaborativeEditor() {
  const room = useRoom();
  const [element, setElement] = useState<HTMLElement>();
  const [yUndoManager, setYUndoManager] = useState<Y.UndoManager>();
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  // Get user info from Liveblocks authentication endpoint
  const userInfo: LiveblockUser | unknown = useSelf((me) => me.info);

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    setElement(node);
  }, []);

  const customKeymap = keymap.of([
    indentWithTab
  ]);
  const providerRef = useRef<TypedLiveblocksProvider | null>(null);
  const ydocRef = useRef<Y.Doc | null>(null);
  const viewRef = useRef<EditorView | null>(null);
  const [code, setCode] = useState("");


  let provider: TypedLiveblocksProvider;
  let ydoc: Y.Doc;
  let view: EditorView;
  // Set up Liveblocks Yjs provider and attach CodeMirror editor
  useEffect(() => {

    if (!element || !room || !userInfo || !selectedLanguage) {
      return;
    }

    // Create Yjs provider and document
    ydocRef.current = new Y.Doc();
    providerRef.current = new LiveblocksProvider(room as any, ydocRef.current);
    const ytext = ydocRef.current.getText("codemirror");
    const undoManager = new Y.UndoManager(ytext);
    setYUndoManager(undoManager);

    // Attach user info to Yjs
    providerRef.current.awareness.setLocalStateField("user", {
      name: userInfo.name,
      color: userInfo.color,
      colorLight: userInfo.color + "80", // 6-digit hex code at 50% opacity
    });

    // Set up CodeMirror and extensions
    const state = EditorState.create({
      doc: ytext.toString(),
      extensions: [
        basicSetup,
        selectedLanguage === 'java' ? java() : selectedLanguage === 'python' ? python() : javascript(),
        yCollab(ytext, providerRef.current.awareness, { undoManager }),
        customKeymap,
      ],

    });

    // Attach CodeMirror to element
    viewRef.current = new EditorView({
      state,
      parent: element,

    });

    console.log('heree', viewRef.current.state);
    return () => {
      ydocRef.current?.destroy();
      providerRef.current?.destroy();
      viewRef.current?.destroy();
    };
  }, [element, room, userInfo, selectedLanguage]);

  return (
    <div className={styles.container}>
      <div className={styles.editorHeader}>
        <LanguageDropdown
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
        <div className="flex items-center">
          <div>
            {yUndoManager ? <Toolbar yUndoManager={yUndoManager} /> : null}
          </div>
          <Avatars />
        </div>
      </div>
      <div className={styles.editorContainer} ref={ref}></div>
      <ExecuteButton code={code} />
    </div>
  );
}