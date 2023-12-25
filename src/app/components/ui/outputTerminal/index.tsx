"use client"
import React, { useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";

import EditorStyles from "@styles/Editor.module.css";


type Props = {
  output: string
  stdoutRef: React.RefObject<HTMLDivElement>
}

export default function OutputTerminal({ output, stdoutRef }: Props) {
  useEffect(() => {
    let view: EditorView | null;

    if (stdoutRef.current) {
      const state = EditorState.create({
        doc: output,
        extensions: [basicSetup, EditorView.editable.of(false)],
      })

      view = new EditorView({
        state: state,
        parent: stdoutRef.current,
      })
    }
    return () => {
      view?.destroy();
    }
  }, [stdoutRef, output])

  return (
    <div className={EditorStyles.container}>

      <div
        className={EditorStyles.inputOutputContainer}
        ref={stdoutRef}
      />
    </div>
  )
}