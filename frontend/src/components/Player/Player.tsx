import ReactPlayer from "react-player";
import { Mic, MicOff, UserSquare2 } from "lucide-react";
import classNames from "classnames";

interface PlayerProps {
  url: string;
  muted: boolean;
  playing: boolean;
  isActive: boolean;
}

const Player: React.FC<PlayerProps> = ({ url, muted, playing, isActive }) => {
  return (
    <div
      className={classNames("relative overflow-hidden mb-5 h-full", {
        "rounded-lg": isActive,
        "rounded-md h-min w-[200px] shadow-md": !isActive,
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
      ) : (
        <UserSquare2
          className={classNames("text-white", {
            "size-400": isActive,
            "size-150": !isActive,
          })}
        />
      )}

      {!isActive &&
        (muted ? (
          <MicOff className="text-white absolute right-2 bottom-2" size={20} />
        ) : (
          <Mic className="text-white absolute right-2 bottom-2" size={20} />
        ))}
    </div>
  );
};

export default Player;
