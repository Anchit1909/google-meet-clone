import ReactPlayer from "react-player";

interface PlayerProps {
  playerId: string;
  url: any;
  muted: boolean;
  playing: boolean;
}

const Player = ({ playerId, url, muted, playing }: PlayerProps) => {
  return (
    <div>
      <ReactPlayer key={playerId} url={url} muted={muted} playing={playing} />
    </div>
  );
};

export default Player;
