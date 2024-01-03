"use server";
import { cookies } from "next/headers";
import { User } from "../lib/definitions";
import { redirect } from "next/navigation";

import { revalidatePath, revalidateTag } from "next/cache";

export async function createRoom(formData: FormData) {
  const cookieStore = cookies();
  const token = cookieStore.get("session-token")?.value;

  try {
    // console.log('room response', formData);
    // console.log('room name', formData.get('name'));

    formData.append("userId", `${(await getUser()).id}`);
    console.log("form data", formData);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room`,
      {
        body: formData,
        method: "POST",
        headers: {
          Cookie: `session-token=${token};`,
        },
      }
    );
    // const newRoom = await response.json();
    // return newRoom;
    revalidateTag("rooms");
    redirect("/dashboard");
    // revalidatePath('/dashboard');
    // return { message: 'Room created' };
  } catch (err) {
    return { message: "Failed to create room" };
  }
}

export async function getRooms() {
  const cookieStore = cookies();
  const token = cookieStore.get("session-token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room`, {
    next: { tags: ["rooms"], revalidate: 3600 },
    headers: {
      Cookie: `session-token=${token};`,
    },
  });
  const roomsData = await res.json();

  return roomsData;
}

export async function deleteRoom(id: number) {
  // console.log('id', id);
  const cookieStore = cookies();
  const token = cookieStore.get("session-token")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room/${id}`,
    {
      method: "DELETE",
      headers: {
        Cookie: `session-token=${token};`,
      },
    }
  );

  revalidatePath("/dashboard");
}

export async function getRoom(id: number) {
  const cookieStore = cookies();
  const token = cookieStore.get("session-token")?.value;
  // console.log('id', id);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/room/${id}`,
    {
      next: { tags: ["room"] },
      headers: {
        Cookie: `session-token=${token};`,
      },
    }
  );
  const roomData = await res.json();

  return roomData;
}

export async function getUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("session-token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`, {
    headers: {
      Cookie: `session-token=${token};`,
    },
  });
  // console.log('res catch', res);

  return res.json();
}
