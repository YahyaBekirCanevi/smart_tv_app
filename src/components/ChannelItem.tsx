import React from "react";
import { Channel } from "../models/Channel";

interface ChannelItemProps {
  channel: Channel;
  index: number;
  isFocused: boolean;
  onClick: () => void;
}

const ChannelItem: React.FC<ChannelItemProps> = ({
  channel,
  index,
  isFocused,
  onClick,
}) => {
  const focused = "border-white border-2 scale-110"
  const hovered = "hover:scale-110"
  const border = isFocused && focused;
  return (
    <div
      key={index}
      className={`p-2 rounded w-[180px] h-[120px] overflow-hidden bg-black text-white ${hovered} ${border}`}
      onClick={onClick}
    >
      <div
        className="flex items-end justify-between w-full h-full"
        style={{ backgroundImage: `url(${channel.image_url})` }}
      >
        <div className="flex-1 ml-2 overflow-hidden">
          <p className="text-sm text-gray-500 truncate">{channel.timestamps}</p>
          <h3 className="text-md font-semibold truncate">{channel.title}</h3>
        </div>
      </div>
    </div>
  );
};

export default ChannelItem;
