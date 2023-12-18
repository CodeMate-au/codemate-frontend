import { User } from "@/src/app/lib/definitions";
import { getUser } from "@src/app/api/user";
import { redirect } from "next/navigation";

export default async function Welcome() {
  const user = await getUser();

  return (
    <div>
      {user ? `Welcome ${user.name}` : `Welcome`}
    </div>
  );
}