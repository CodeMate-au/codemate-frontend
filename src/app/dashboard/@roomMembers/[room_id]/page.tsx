import styles from "@styles/Avatars.module.css";
import { getRoom } from "@src/app/api/actions";
// import { Avatar } from '../../../components/ui/CodeMirror/Avatars';
export default async function RoomMember({ params }: { params: { room_id: string } }) {
  const room = await getRoom(Number(params.room_id));
  const members = room.members;

  return (
    <div>
      {members && members.map((member) => {
        return (
          <div key={member.id}>
            {member.name}
            {member.avatar}
            <Avatar picture={member.avatar} name={member.name} />
          </div>
        )
      })}
    </div>
  )
}



function Avatar({ picture, name }: { picture: string; name: string }) {
  return (
    <div className={`${styles.avatar} ${styles.sidebar}`} data-tooltip={name}>
      <img
        src={picture}
        className={styles.avatar_picture}
        data-tooltip={name}
      />
    </div>
  );
}