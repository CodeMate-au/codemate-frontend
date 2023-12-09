import { redirect } from 'next/navigation';

export async function GET() {
  const githubClientId = process.env.NEXT_JS_GITHUB_OAUTH_CLIENT_ID;
  const githubRedirectUri = encodeURIComponent(
    'http://localhost:8888/api/auth/login',
  );
  const scope = encodeURIComponent('read:user');

  const authUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${githubRedirectUri}&scope=${scope}`;

  const params = {
    scope: 'read:user',
    client_id: process.env.NEXT_JS_GITHUB_OAUTH_CLIENT_ID as string,
  };

  // Convert parameters to a URL-encoded string
  const urlEncodedParams = new URLSearchParams(params).toString();

  console.log('here', authUrl);
  redirect(authUrl);
}
