// "use client"
// 'use server'

import { useUser } from '../lib/data';
import { getUser } from '../api/user'
import { Room } from "../components/Room";
import { CollaborativeEditor } from "../components/ui/dashboard/CodeMirror/Editor";
import styles from "@/styles/style";

export default async function Page() {

  const user = await getUser();
  return (
    <div className={`${styles.flexStart}`}>
      <div className={`${styles.boxWidth} ${styles.paddingX} ${styles.paddingY}`}>
        <Room>
          <CollaborativeEditor />
        </Room>
      </div>
    </div>
  );
}
