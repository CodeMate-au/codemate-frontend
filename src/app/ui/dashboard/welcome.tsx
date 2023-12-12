import { getUser } from "@src/app/api/user";
export default async function Welcome() {
  const user = await getUser();
  return (
    <div>Welcome, {user.name}!</div>
  );
}