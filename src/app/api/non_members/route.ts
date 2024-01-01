import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getRoom } from '../actions';
import { all } from 'ramda';
export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get('session-token')?.value;
  const searchParams = request.nextUrl.searchParams;
  const roomId = searchParams.get('room_id');
  // console.log('url here', `${process.env.NEXT_PsUBLIC_BACKEND_URL}/api/members`);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/members`,
    {
      headers: {
        Cookie: `session-token=${token};`,
      },
    },
  );
  // console.log('response from fetch', response);
  const allMembers = await response.json();
  // console.log('all members', allMembers);

  const roomMembers = await getRoom(Number(roomId));

  // console.log('room members', roomMembers);

  // Create a Set of room member IDs for efficient lookup
  const roomMemberIds = new Set(
    roomMembers.members.map((member: any) => member.id),
  );

  // console.log('room member ids', roomMemberIds);
  // Filter allMembers to exclude the members that are in roomMembers
  const nonMembers = allMembers.filter(
    (member: any) => !roomMemberIds.has(member.id),
  );

  // console.log('non members', nonMembers);
  // console.log(data);
  return NextResponse.json(nonMembers);
}
