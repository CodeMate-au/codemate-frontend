// "use client"
// 'use server'

import { useUser } from '../../lib/data';
import { getUser } from '../../api/user'
import { Room } from "../../components/Room";
import { CollaborativeEditor } from "../../components/ui/dashboard/CodeMirror/Editor";

export default async function Page() {

  const user = await getUser();
  return (
    <Room>
      <CollaborativeEditor />
    </Room>
  );
}
