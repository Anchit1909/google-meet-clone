"use client";

import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function HomePage() {
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
    <div className="relative flex justify-center items-center flex-col space-y-8 font-poppins">
      <div className="absolute w-[600px] h-[600px] 3xl:w-[700px] 3xl:h-[700px] bottom-[50px] bg-purple-200/[35%] -z-10 rounded-full blur-3xl" />
      <div className="absolute w-[600px] h-[600px] 3xl:w-[700px] 3xl:h-[700px] left-[0px] bg-green-200/[35%] -z-10 rounded-full blur-3xl" />
      <div className="absolute w-[600px] h-[600px] 3xl:w-[700px] 3xl:h-[700px] right-[0px] bg-red-200/[35%] -z-10 rounded-full blur-3xl" />
      <Card className="w-[300px] sm:w-[400px]">
        <CardHeader>
          <CardTitle className="text-lg">New Meeting</CardTitle>
          <CardDescription>
            Connect, collaborate, and celebrate from anywhere with MeetSync
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
          <form>
            <Input
              id="RoomId"
              placeholder="Enter Room ID"
              value={roomId}
              onChange={handleInputChange}
            />
          </form>
        </CardContent>
        <CardFooter className="flex justify-center space-x-2">
          <Button onClick={joinRoom}>Join Room</Button>
          <Button onClick={createAndJoin} variant={"secondary"}>
            Create a new room
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
