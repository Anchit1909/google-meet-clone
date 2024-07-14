"use client";

import { useSocket } from "@/context/socket";
import { useState, useEffect, useRef } from "react";
import { Peer } from "peerjs";
import { useParams } from "next/navigation";

const usePeer = () => {
  const params = useParams<{ roomId: string }>();
  const socket = useSocket();
  const roomId = params.roomId as string;
  const [peer, setPeer] = useState<Peer | null>(null);
  const [myId, setMyId] = useState<string>("");
  const isPeerSet = useRef<boolean>(false);

  useEffect(() => {
    if (isPeerSet.current || !roomId || !socket) return;
    isPeerSet.current = true;

    (async function initPeer() {
      // const { default: Peer } = await import("peerjs");
      const myPeer = new Peer();
      setPeer(myPeer);

      myPeer.on("open", (id: string) => {
        console.log(`your peer id is ${id}`);
        setMyId(id);
        socket?.emit("join-room", roomId, id);
      });
    })();
  }, [roomId, socket]);

  return {
    peer,
    myId,
  };
};

export default usePeer;
