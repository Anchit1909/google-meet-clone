import ReactPlayer from "react-player";
import { Mic, MicOff, UserSquare2 } from "lucide-react";
import classNames from "classnames";

interface PlayerProps {
  url: MediaStream;
  muted: boolean;
  playing: boolean;
  isActive: boolean;
}

const Player: React.FC<PlayerProps> = ({ url, muted, playing, isActive }) => {
  return (
    <div
      className={classNames("relative overflow-hidden mb-5 h-full", {
        "rounded-lg": isActive,
        "rounded-md h-min w-[140px] md:w-[200px] shadow-md": !isActive,
        "flex items-center justify-center": !playing,
      })}
    >
      {playing ? (
        <ReactPlayer
          url={url}
          muted={muted}
          playing={playing}
          width="100%"
          height="100%"
        />
      ) : isActive ? (
        <UserSquare2 size={100} />
      ) : (
        <div className="h-10 md:h-40 flex justify-center items-center">
          <UserSquare2 size={30} />
        </div>
      )}
      {!isActive &&
        (muted ? (
          <MicOff className="absolute right-2 bottom-2 text-white" size={15} />
        ) : (
          <Mic className="absolute right-2 bottom-2 text-white" size={15} />
        ))}
    </div>
  );
};

export default Player;
