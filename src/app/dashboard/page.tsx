import Link from "next/link";

type code = {
  code: string;

}
export default async function Page() {
  // const params = {
  //   scope: "read:user",
  //   client_id: process.env.GITHUB_OAUTH_CLIENT_ID as string,
  // };

  // // Convert parameters to a URL-encoded string
  // const urlEncodedParams = new URLSearchParams(params).toString();

  // const res = await fetch(`https://github.com/login/oauth/authorize?${urlEncodedParams}`)

  // const data: code = await res.json();
  return <Link href={'/login/github'}>login</Link>;
}