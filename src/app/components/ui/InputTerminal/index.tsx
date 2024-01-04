import { useEffect } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';


import EditorStyles from '@styles/Editor.module.css';

type Props = {
  stdinRef: React.RefObject<HTMLDivElement>
  setStdin: React.Dispatch<React.SetStateAction<string>>
  stdin: string
}

export default function InputTerminal({ stdinRef, stdin, setStdin }: Props) {

  const onUpdate = EditorView.updateListener.of((v) => {
    setStdin(v.state.doc.toString())
    // console.log(stdin)
  })
  useEffect(() => {
    let view: EditorView | null = null;

    if (stdinRef.current) {
      const state = EditorState.create({
        doc: stdin,
        extensions: [basicSetup,
          onUpdate
        ],
      });

      view = new EditorView({
        state,
        parent: stdinRef.current,
      });
    }

    return () => {
      view?.destroy(); // Clean up on unmount
    };
  }, []);

  return (
    <div className={EditorStyles.container}>
      <div ref={stdinRef} className={EditorStyles.inputOutputContainer}></div>
    </div>
  );
}