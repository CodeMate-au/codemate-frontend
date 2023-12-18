import { Liveblocks } from '@liveblocks/node';
import { NextRequest } from 'next/server';
import { getUser } from '../user';
import type { LiveblockUser } from '@src/app/lib/definitions';
const API_KEY = process.env.LIVEBLOCKS_SECRET_KEY;

const liveblocks = new Liveblocks({ secret: API_KEY! });

export async function POST(request: NextRequest) {
  // Get the current user's info from your database

  const session_user = await getUser();
  const user = {
    id: `${session_user.email}`,
    info: {
      name: `${session_user.name}`,
      color: '#D583F0',
      picture: `${session_user.avatar}`,
    },
  };

  // Create a session for the current user
  // UserInfo is made available in Liveblocks presence hooks, e.g. useOthers
  const session = liveblocks.prepareSession(user.id, {
    userInfo: user.info,
  });

  // Give the user access to the room
  const { room } = await request.json();
  session.allow(room, session.FULL_ACCESS);

  // Authorize the user and return the result
  const { body, status } = await session.authorize();
  return new Response(body, { status });
}
