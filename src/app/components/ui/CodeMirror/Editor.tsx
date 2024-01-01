"use client";

import * as Y from "yjs";
import { yCollab } from "y-codemirror.next";
import { EditorView, basicSetup } from "codemirror";
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { EditorState } from "@codemirror/state";
import { indentWithTab, defaultKeymap, historyKeymap, history } from "@codemirror/commands"
import { drawSelection, keymap, lineNumbers } from "@codemirror/view"
import { javascript } from "@codemirror/lang-javascript";
import { useCallback, useEffect, useState, useRef } from "react";
import LiveblocksProvider from "@liveblocks/yjs";
import { TypedLiveblocksProvider, useRoom, useSelf } from "@/liveblocks.config";
import EditorStyles from "@styles/Editor.module.css";
import styles from "@styles/style";

import { Avatars } from "./Avatars";
import { Toolbar } from "./Toolbar";

import { LiveblockUser } from "@src/app/lib/definitions";
import { LANGUAGE_OPTIONS } from "../LanguageDropdown/constant";
import OutputTerminal from "../outputTerminal";
import { DEFAULT_OUTPUT_VALUE } from "../outputTerminal/constant";
import { assoc } from "ramda";
import { Tab } from "@headlessui/react";
import CodeAction from "../CodeActions";
import InputTerminal from "../InputTerminal";
type Props = {
  selectedLanguage: typeof LANGUAGE_OPTIONS[0]
}
// Collaborative code editor with undo/redo, live cursors, and live avatars
export function CollaborativeEditor({ selectedLanguage }: Props) {
  const room = useRoom();
  const [element, setElement] = useState<HTMLElement>();
  const [yUndoManager, setYUndoManager] = useState<Y.UndoManager>();
  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [output, setOutput] = useState(DEFAULT_OUTPUT_VALUE);
  const [ytext, setYtext] = useState<Y.Text>(new Y.Text());

  const [stdin, setStdin] = useState<string>('');

  // Get user info from Liveblocks authentication endpoint
  const userInfo: LiveblockUser | unknown = useSelf((me) => me.info);
  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    setElement(node);
  }, []);

  const customKeymap = keymap.of([
    indentWithTab
  ]);

  useEffect(() => {
    if (ytext) {
      ytext.delete(0, ytext.length); // Clear the existing text
      ytext.insert(0, selectedLanguage.stub); // Insert the new stub
    }
  }, [selectedLanguage]);

  useEffect(() => {
    // Observe changes to the Yjs document
    if (ytext) {

      const observer = () => {
        setCode(ytext.toString());
        console.log('Document changed:', ytext.toString());
      };
      ytext.observe(observer);
    }
  }, [ytext]);

  useEffect(() => {
    let provider: TypedLiveblocksProvider;
    let ydoc: Y.Doc;
    let view: EditorView;
    // let inputView: EditorView;


    if (!element || !room || !userInfo) {
      return;
    }

    // Create Yjs provider and document
    ydoc = new Y.Doc();
    provider = new LiveblocksProvider(room as any, ydoc);
    const ytextInstance = ydoc.getText("codemirror");
    setYtext(ytextInstance);
    const undoManager = new Y.UndoManager(ytextInstance);
    setYUndoManager(undoManager);

    console.log(selectedLanguage)

    // Set up CodeMirror and extensions
    const state = EditorState.create({
      doc: ytext.toString(),
      extensions: [
        basicSetup,
        selectedLanguage ? selectedLanguage.title === 'Java' ? java() : selectedLanguage.title === 'Python' ? python() : javascript() : javascript(),
        yCollab(ytextInstance, provider.awareness, { undoManager }),
        customKeymap
      ],
    });

    // Attach CodeMirror to element
    view = new EditorView({
      state,
      parent: element,
    });

    return () => {
      ydoc?.destroy();
      provider?.destroy();
      view?.destroy();
    };
  }, [element, room, userInfo]);


  const runEditorCode = async () => {
    try {
      setIsLoading(true);
      clearOutput();

      const token = await submitCodeHandler({ source_code: code, language_id: selectedLanguage.value, stdin: stdin });

      const response = await fetch(`/api/get_submission?token=${token!}`, {
        method: 'GET',
      });

      let outputData = await response.json();

      while (outputData.status.id === 1 || outputData.status.id === 2) {
        const statusResponse = await fetch(`/api/get_submission?token=${outputData.token}`);
        outputData = await statusResponse.json();
        console.log('output', outputData);
        // Wait for a second before polling again to avoid overloading the server
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      console.log('outpåut', outputData);

      setOutput(assoc('data', outputData.stdout || outputData.stderr));
      setOutput(assoc('status', outputData.status.id));

      setSelectedIndex(1);

    }
    catch (error) {
      console.log('error', error);
    }
    finally {
      setIsLoading(false);
    }
  }

  const clearOutput = () => {
    setOutput(DEFAULT_OUTPUT_VALUE);
  };

  const submitCodeHandler = async ({ source_code, language_id, stdin }: {
    source_code: string
    language_id: number,
    stdin: string | null
  }) => {
    console.log('code submitted', source_code)
    const payload = { source_code, language_id, stdin };
    const response = await fetch(`/api/run_code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    console.log('submission response', data);

    return data.token
  }

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }



  const inputStateRef = useRef(null);
  const outputStateRef = useRef(null);

  const [selectedIndex, setSelectedIndex] = useState(0)


  return (
    <>
      <div className={`${EditorStyles.container} mb-2`}>
        <div className={EditorStyles.editorHeader}>
          <div>
            {yUndoManager ? <Toolbar yUndoManager={yUndoManager} /> : null}
          </div>
          <Avatars />
        </div>
        <div className={EditorStyles.editorContainer} ref={ref}></div>
      </div>

      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className='space-x-2'>
          <Tab className={({ selected }) =>
            classNames(
              'text-xl dark:bg-slate-700 bg-white px-2',
              'focus:outline-none',
              selected
                ? 'focus-visible:ring-0'
                : 'opacity-40 bg hover:opacity-90'
            )
          }>Input</Tab>
          <Tab className={({ selected }) =>
            classNames(
              'text-xl dark:bg-slate-700 bg-white px-2 ',
              'focus:outline-none',
              selected
                ? 'focus-visible:ring-0'
                : 'opacity-40 bg hover:bg-white/[0.12]'
            )
          }> Output</Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <InputTerminal stdinRef={inputStateRef} setStdin={setStdin} stdin={stdin} />
          </Tab.Panel>
          <Tab.Panel>
            <OutputTerminal output={output?.data} stdoutRef={outputStateRef} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group >
      < CodeAction
        runEditorCode={runEditorCode}
      />
    </>
  );
}
