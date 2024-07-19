import { Mic, Video, PhoneOff, MicOff, VideoOff } from "lucide-react";

interface BottomProps {
  muted: boolean;
  playing: boolean;
  toggleAudio: () => void;
  toggleVideo: () => void;
  leaveRoom: () => void;
}

const Bottom: React.FC<BottomProps> = ({
  muted,
  playing,
  toggleAudio,
  toggleVideo,
  leaveRoom,
}) => {
  return (
    <div className="absolute flex justify-between bottom-8 lg:bottom-4 left-0 right-0 mx-auto w-[300px] mb-0 lg:mb-8">
      {muted ? (
        <MicOff
          className="p-4 rounded-full cursor-pointer bg-gray-100 hover:bg-gray-300"
          size={55}
          onClick={toggleAudio}
        />
      ) : (
        <Mic
          className="p-4 rounded-full cursor-pointer bg-gray-100 hover:bg-gray-300"
          size={55}
          onClick={toggleAudio}
        />
      )}
      {playing ? (
        <Video
          className="p-4 rounded-full cursor-pointer bg-gray-100 hover:bg-gray-300"
          size={55}
          onClick={toggleVideo}
        />
      ) : (
        <VideoOff
          className="p-4 rounded-full cursor-pointer bg-gray-100 hover:bg-gray-300"
          size={55}
          onClick={toggleVideo}
        />
      )}
      <PhoneOff
        className="p-4 rounded-full cursor-pointer bg-red-300 hover:bg-red-400"
        size={55}
        onClick={leaveRoom}
      />
    </div>
  );
};

export default Bottom;
