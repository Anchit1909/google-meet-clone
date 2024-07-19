"use client";

import { useEffect, useState } from "react";
import { cloneDeep } from "lodash";
import { useSocket } from "@/context/socket";
import usePeer from "@/hooks/usePeer";
import useMediaStream from "@/hooks/useMediaStream";
import usePlayer from "@/hooks/usePlayer";
import Player from "@/components/Player/Player";
import Bottom from "@/components/Bottom/Bottom";
import CopySection from "@/components/CopySection/CopySection";
import Header from "@/components/Navigation/Header";

interface PlayerProps {
  url: MediaStream;
  muted: boolean;
  playing: boolean;
}

interface Players {
  [key: string]: PlayerProps;
}

interface Users {
  [key: string]: any;
}

const Room = ({ params }: { params: { roomId: string } }) => {
  const socket = useSocket();
  const roomId = params.roomId as string;
  const { peer, myId } = usePeer();
  const { stream } = useMediaStream();
  const {
    players,
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayers,
    toggleAudio,
    toggleVideo,
    leaveRoom,
  } = usePlayer(myId, roomId, peer);

  const [users, setUsers] = useState<Users>({});

  useEffect(() => {
    if (!socket || !peer || !stream) return;

    const handleUserConnected = (newUser: string) => {
      console.log(`user connected in room with userId ${newUser}`);
      const call = peer.call(newUser, stream);

      call.on("stream", (incomingStream: MediaStream) => {
        console.log(`incoming stream from ${newUser}`);
        setPlayers((prev: any) => ({
          ...prev,
          [newUser]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }));

        setUsers((prev: Users) => ({
          ...prev,
          [newUser]: call,
        }));
      });
    };

    socket.on("user-connected", handleUserConnected);

    return () => {
      socket.off("user-connected", handleUserConnected);
    };
  }, [socket, peer, stream, setPlayers]);

  useEffect(() => {
    if (!socket) return;

    const handleToggleAudio = (userId: string) => {
      console.log(`user with id ${userId} toggled audio`);
      setPlayers((prev: any) => {
        const copy = cloneDeep(prev);
        if (copy[userId]) {
          copy[userId].muted = !copy[userId].muted;
        }
        return { ...copy };
      });
    };

    const handleToggleVideo = (userId: string) => {
      console.log(`user with id ${userId} toggled video`);
      setPlayers((prev: any) => {
        const copy = cloneDeep(prev);
        if (copy[userId]) {
          copy[userId].playing = !copy[userId].playing;
        }
        return { ...copy };
      });
    };

    const handleUserLeave = (userId: string) => {
      console.log(`user ${userId} is leaving the room`);
      users[userId]?.close();
      setPlayers((prev: any) => {
        const copy = cloneDeep(prev);
        delete copy[userId];
        return { ...copy };
      });
    };

    socket.on("user-toggle-audio", handleToggleAudio);
    socket.on("user-toggle-video", handleToggleVideo);
    socket.on("user-leave", handleUserLeave);

    return () => {
      socket.off("user-toggle-audio", handleToggleAudio);
      socket.off("user-toggle-video", handleToggleVideo);
      socket.off("user-leave", handleUserLeave);
    };
  }, [socket, setPlayers, users]);

  useEffect(() => {
    if (!peer || !stream) return;

    peer.on("call", (call: any) => {
      const { peer: callerId } = call;
      call.answer(stream);

      call.on("stream", (incomingStream: MediaStream) => {
        console.log(`incoming stream from ${callerId}`);
        setPlayers((prev: any) => ({
          ...prev,
          [callerId]: {
            url: incomingStream,
            muted: true,
            playing: true,
          },
        }));

        setUsers((prev: Users) => ({
          ...prev,
          [callerId]: call,
        }));
      });
    });
  }, [peer, stream, setPlayers]);

  useEffect(() => {
    if (!stream || !myId) return;
    console.log(`setting my stream ${myId}`);
    setPlayers((prev: any) => ({
      ...prev,
      [myId]: {
        url: stream,
        muted: true,
        playing: true,
      },
    }));
  }, [myId, stream, setPlayers]);

  return (
    <>
      <div className="absolute w-9/12 left-0 right-0 mx-auto top-20 bottom-12 h-[calc(100vh-10rem)]">
        {playerHighlighted && (
          <Player
            url={playerHighlighted?.url}
            muted={playerHighlighted?.muted}
            playing={playerHighlighted?.playing}
            isActive
          />
        )}
      </div>
      <div className="absolute flex flex-col overflow-y-auto w-[200px] h-[calc(100vh-20px)] right-5 top-20">
        {Object.keys(nonHighlightedPlayers)?.map((playerId) => {
          const { url, muted, playing } = nonHighlightedPlayers[playerId];
          return (
            <Player
              key={playerId}
              url={url}
              muted={muted}
              playing={playing}
              isActive={false}
            />
          );
        })}
      </div>
      <CopySection roomId={roomId} />
      <Bottom
        muted={playerHighlighted?.muted}
        playing={playerHighlighted?.playing}
        toggleAudio={toggleAudio}
        toggleVideo={toggleVideo}
        leaveRoom={leaveRoom}
      />
    </>
  );
};

export default Room;
