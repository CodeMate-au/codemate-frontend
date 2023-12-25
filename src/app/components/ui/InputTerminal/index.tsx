import { useEffect } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';

import EditorStyles from '@styles/Editor.module.css';

type Props = {
  stdinRef: React.RefObject<HTMLDivElement>
}

export default function InputTerminal({ stdinRef }: Props) {
  useEffect(() => {
    let view: EditorView | null = null;

    if (stdinRef.current) {
      const state = EditorState.create({
        doc: '',
        extensions: [basicSetup],
      });

      view = new EditorView({
        state,
        parent: stdinRef.current,
      });
    }

    return () => {
      view?.destroy(); // Clean up on unmount
    };
  }, [stdinRef]);

  return (
    <div className={EditorStyles.container}>
      <div ref={stdinRef} className={EditorStyles.inputOutputContainer}></div>
    </div>
  );
}