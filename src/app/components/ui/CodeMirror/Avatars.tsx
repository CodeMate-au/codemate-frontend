import { useOthers, useSelf } from "@/liveblocks.config";
import styles from "@styles/Avatars.module.css";
interface Info {
  picture: string;
  name: string;
}

// Type guard to check if an object is of type Info
function isInfo(object: any): object is Info {
  return (
    object !== null &&
    typeof object === 'object' &&
    'picture' in object &&
    typeof object.picture === 'string' &&
    'name' in object &&
    typeof object.name === 'string'
  );
}

export function Avatars() {
  const users = useOthers();
  const currentUser = useSelf();
  // console.log("Users:", users);
  // console.log("Current User:", currentUser);


  return (
    <div className={styles.avatars}>
      {users.map(({ connectionId, info }) => {

        if (isInfo(info)) {
          return (
            <Avatar key={connectionId} picture={info.picture} name={info.name} />
          );
        }
      })}

      {currentUser && isInfo(currentUser.info) && (
        <div className="relative ml-8 first:ml-0">
          <Avatar
            picture={currentUser.info.picture}
            name={currentUser.info.name}
          />
        </div>
      )}
    </div>
  );
}
export function Avatar({ picture, name }: { picture: string; name: string }) {
  return (
    <div className={styles.avatar} data-tooltip={name}>
      <img
        src={picture}
        className={styles.avatar_picture}
        data-tooltip={name}
      />
    </div>
  );
}