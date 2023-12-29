
'use client'
import Link from "next/link";
import styles from "@styles/style";
import MotionList from "@src/app/components/ui/Dashboard/motionList";
import { useEffect, useState } from "react";

import { deleteRoom } from "@src/app/api/actions";

import { getRooms } from "@src/app/api/actions";
import { Room } from "@src/app/lib/definitions";

export default function Page() {
  const [rooms, setRooms] = useState<Room[]>([]);


  useEffect(() => {
    const updateRooms = async () => {
      const updatedRooms = await getRooms()
      setRooms(updatedRooms)
    }

    updateRooms()
  }, [])
  return (
    <>
      <div className={`flex-col ${styles.flexEnd}`}>
        <div className="flex items-center justify-center">
          <Link
            href={{ pathname: '/dashboard', }}


            className="rounded-md bg-orange-400 px-6 py-4 text-sm font-medium text-white hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
          >
            Done
          </Link>
        </div>

      </div >
      <div className="w-full py-16 space-y-4">
        {rooms.map((room: Room) => (

          <MotionList room_id={room.id}>
            <div
              // key={room.id}
              className={
                `flex cursor-pointer rounded-lg px-5 py-6 shadow-2xl bg-white dark:bg-gray-600
              hover:bg-rose-500/40 hover:dark:bg-rose-500/40 transition duration-300 ease-in-out text-lg font-medium`
              }
            >
              <button className={`w-full ${styles.justifyStart}`} onClick={async () => {
                console.log("delete room")
                await deleteRoom(room.id);
                setRooms(rooms.filter((r) => r.id !== room.id));
              }}>
                {room.name}
              </button>
            </div>
          </MotionList>
        ))
        }
      </div >
    </>

  );
}
