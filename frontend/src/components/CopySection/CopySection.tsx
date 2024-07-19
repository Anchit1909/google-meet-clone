import { CopyToClipboard } from "react-copy-to-clipboard";
import { Copy } from "lucide-react";

interface CopySectionProps {
  roomId: string;
}

const CopySection: React.FC<CopySectionProps> = ({ roomId }) => {
  const truncateRoomId = (roomId: string) => {
    return roomId.length > 20 ? roomId.slice(0, 20) + "..." : roomId;
  };
  return (
    <div className="flex flex-col absolute border rounded p-3 left-[20px] bottom-[90px] md:bottom-[40px] lg:bottom-[80px] font-poppins">
      <div className="text-sm font-semibold">Copy Room ID:</div>
      <hr className="my-1" />
      <div className="flex items-center text-sm">
        <span>{truncateRoomId(roomId)}</span>
        <CopyToClipboard text={roomId}>
          <Copy className="ml-3 cursor-pointer" size={20} />
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default CopySection;
