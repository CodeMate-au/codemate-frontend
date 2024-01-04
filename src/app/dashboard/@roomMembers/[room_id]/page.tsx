/* eslint-disable react/no-unescaped-entities */
import styles from "@styles/Avatars.module.css";
import { getRoom } from "@src/app/api/actions";
import { User } from "@src/app/lib/definitions";
import Image from 'next/image'


export default async function RoomMember({ children, params }: { children: React.ReactNode, params: { room_id: string } }) {
  const room = await getRoom(Number(params.room_id));
  const members = room.members;

  return (
    <li>
      <div className="text-xs font-semibold leading-6 ">Room's Members</div>
      <ul role="list" className="mt-2 flex">
        {members && members.map((member: User) => {
          return (
            <div key={member.id}>

              <Avatar picture={member.avatar || ''} name={member.name || ''} />
            </div>
          )
        })}
      </ul>

      {children}



    </li>)
}



function Avatar({ picture, name }: { picture: string; name: string }) {
  return (
    <div className={`${styles.avatar} ${styles.sidebar}`} data-tooltip={name}>
      <Image
        width={24}
        height={24}
        src={picture}
        className={styles.avatar_picture}
        data-tooltip={name}
        alt={name}
      />
    </div>
  );
}