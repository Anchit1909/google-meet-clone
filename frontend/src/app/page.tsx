"use client";

import { useSocket } from "@/context/socket";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const router = useRouter();
  const [roomId, setRoomId] = useState<string>("");

  const createAndJoin = () => {
    const roomId = uuidv4();
    router.push(`/${roomId}`);
  };

  const joinRoom = () => {
    if (roomId) router.push(`/${roomId}`);
    else {
      alert("Please provide a valid room id");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-4/12 mx-auto p-2 border border-white rounded mt-8 text-white flex flex-col items-center">
        <h1 className="text-xl text-center">Google Meet Clone</h1>
        <div className="flex flex-col items-center mt-3 w-full">
          <input
            placeholder="Enter Room ID"
            value={roomId}
            onChange={handleInputChange}
            className="text-black text-lg p-1 rounded w-9/12 mb-3"
          />
          <button
            onClick={joinRoom}
            className="bg-buttonPrimary py-2 px-4 rounded"
          >
            Join Room
          </button>
        </div>
        <span className="my-3 text-xl">--------------- OR ---------------</span>
        <button
          onClick={createAndJoin}
          className="bg-buttonPrimary py-2 px-4 rounded"
        >
          Create a new room
        </button>
      </div>
    </main>
  );
}
