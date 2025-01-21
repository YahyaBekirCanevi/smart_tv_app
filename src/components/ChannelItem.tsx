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
  const border = isFocused ? "border-blue-500 bg-blue-100" : "border-gray-300";
  return (
    <div
      key={index}
      className={`p-2 border rounded w-[180px] h-[120px] overflow-hidden ${border}`}
      onClick={onClick}
    >
      <div
        className="flex items-end justify-between w-full h-full"
        style={{ backgroundImage: `url(${channel.image_url})` }}
      >
        <div className="flex-1 ml-2 overflow-hidden">
          <h3 className="text-md font-semibold truncate">{channel.title}</h3>
          <p className="text-sm text-gray-500 truncate">{channel.timestamps}</p>
        </div>
      </div>
    </div>
  );
};

export default ChannelItem;
