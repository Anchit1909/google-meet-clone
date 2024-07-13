"use client";

import { useSocket } from "@/context/socket";
import { useEffect } from "react";

export default function Home() {
  const socket = useSocket();

  useEffect(() => {
    socket?.on("connect", () => {
      console.log(socket.id);
    });
  }, [socket]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
