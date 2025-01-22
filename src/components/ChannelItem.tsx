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
  const focused = "border-white border-2 scale-110";
  const hovered = "hover:scale-110";
  return (
    <div
      key={index}
      className={`rounded w-[180px] h-[120px] shrink-0 overflow-hidden bg-black text-white ${hovered} ${
        isFocused ? focused : ""
      }`}
      onClick={onClick}
    >
      <div
        className="flex items-end justify-between w-full h-full"
        style={{
          backgroundImage: `linear-gradient(#fff0 ${
            isFocused ? "10%" : "30%"
          }, #000 100%), url(${channel.image_url})`,
          backgroundSize: "contain", // Scale background image on focus
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundColor: "#555",
        }}
      >
        <div className="flex-1 ml-2 overflow-hidden">
          <p className="text-sm text-[#999] truncate">{channel.timestamps}</p>
          <h3 className="text-md font-semibold truncate">{channel.title}</h3>
        </div>
      </div>
    </div>
  );
};

export default ChannelItem;
