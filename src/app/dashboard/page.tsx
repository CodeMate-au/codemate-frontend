
import CreateRoomModal from "@src/app/components/ui/Dashboard/Modal";
import Link from "next/link";
import styles from "@styles/style";
import ModalButton from "@src/app/components/ui/Dashboard/Modal/ModalButton";
import { getRooms } from "@src/app/api/actions";
import { Room } from "@src/app/lib/definitions";
import DeleteButton from "@src/app/components/ui/Dashboard/DeleteButton";

import avatarStyles from "@styles/Avatars.module.css";
function Avatar({ picture, name }: { picture: string; name: string }) {
  return (
    <div className={avatarStyles.avatar} data-tooltip={name}>
      <img
        src={picture}
        className={avatarStyles.avatar_picture}
        data-tooltip={name}
      />
    </div>
  );
}
export default async function Page() {
  const roomsmap = await getRooms();
  return (
    <>
      <div className={`flex-col ${styles.flexEnd}`}>
        <div className={`${styles.flexCenter} space-x-4`}>

          <DeleteButton />
          <ModalButton />
        </div>
      </div >
      <div className="w-full py-16 space-y-4">
        {roomsmap.map((room: Room) => (
          <Link
            key={room.id}
            href={`dashboard/${room.id}`}
            className={
              ` flex cursor-pointer rounded-lg px-5 py-6 shadow-2xl bg-white dark:bg-gray-600
             hover:bg-pink-100/40 hover:dark:bg-slate-900/40 transition duration-300 ease-in-out text-lg font-medium`
            }
          >
            <div className={`flex items-center justify-between w-full`}>

              {room.name}
              {
                room.members && room.members.map((member) => {
                  return (
                    <div key={member.id} className="flex">
                      <Avatar picture={member.avatar || ''} name={member.name || ''} />
                    </div>
                  )
                })
              }
            </div>
          </Link>
        ))
        }
      </div>
      {/* <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    className="px-3 py-3 border-b-2 border-gray-200 dark:bg-gray-900 bg-gray-300 text-left text-xs font-semibold  uppercase tracking-wider">
                    Room ID
                  </th>

                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 dark:bg-gray-900 bg-gray-300 text-left text-xs font-semibold  uppercase tracking-wider">
                    Room Name
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-5 py-5 dark:bg-gray-900 bg-gray-300 text-sm">
                    <div className="ml-3">
                      <p className="whitespace-no-wrap">
                        1
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-5 dark:bg-gray-900 bg-gray-300 text-sm">
                    <span className="relative">Alonzo Cox</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              className="px-5 py-5 dark:bg-gray-900 bg-gray-300 border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
              <span className="text-xs xs:text-sm ">
                Showing 1 to 4 of 50 Entries
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button
                  className="text-sm  transition duration-150 hover:bg-[#1E2B3A]  font-semibold py-2 px-4 rounded-l">
                  Prev
                </button>
                &nbsp; &nbsp;
                <button
                  className="text-sm  transition duration-150 hover:bg-[#1E2B3A]  font-semibold py-2 px-4 rounded-r">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

    </>

  );
}
