"use client";

import { ReactNode } from "react";
import { RoomProvider } from "@/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import { useParams } from 'next/navigation'


export function Room({ children }: { children: ReactNode }) {
  const params = useParams<{ room_id: string }>()

  const roomId = `room-${params.room_id}`
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
      }}
    >
      <ClientSideSuspense fallback={<div>Loading...</div>}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  )
}
