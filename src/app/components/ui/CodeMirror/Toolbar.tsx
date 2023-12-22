import * as Y from "yjs";
import styles from "@styles/Toolbar.module.css";
import { ArrowUturnRightIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

type Props = {
  yUndoManager: Y.UndoManager;
};

export function Toolbar({ yUndoManager }: Props) {
  return (
    <div className={styles.toolbar}>
      <button className={styles.button} onClick={() => yUndoManager.undo()}>
        <ArrowUturnLeftIcon />
      </button>
      <button className={styles.button} onClick={() => yUndoManager.redo()}>
        <ArrowUturnRightIcon />
      </button>
    </div>
  );
}