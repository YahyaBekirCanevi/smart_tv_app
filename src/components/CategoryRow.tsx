import React, { useEffect } from "react";
import { Channel } from "../models/Channel";
import { useFocusStore } from "../stores/focusIndex";
import { useWindowSize } from "../stores/windowSize";
import ChannelItem from "./ChannelItem";
import { ChevronLeft, ChevronRight } from "./ChevronArrows";

interface CategoryRowProps {
  category: string;
  channels: Channel[];
  index: number;
  maxRows: number;
}

const CategoryRow: React.FC<CategoryRowProps> = ({
  category,
  channels,
  index,
  maxRows,
}) => {
  const { width } = useWindowSize();
  const {
    focusedIndex,
    rowIndex,
    rowAmount,
    setFocusedIndex,
    setRowIndex,
    setRowAmount,
    setStartIndex,
    getStartIndex,
  } = useFocusStore();

  const startIndex = getStartIndex(index);

  useEffect(() => {
    const amount = width >= 1280 ? 8 : width >= 768 ? 5 : 3;
    setRowAmount(amount);
  }, [width, setRowAmount]);

  useEffect(() => {
    const itemsLength = channels.length;
    const handleKeyDown = (event: KeyboardEvent) => {
      const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
      if (!keys.includes(event.key)) return;
      if (rowIndex !== index) return;

      const prev = focusedIndex;
      const row = rowIndex;

      switch (event.key) {
        case "ArrowUp":
          setRowIndex(row > 0 ? row - 1 : 0);
          return;
        case "ArrowDown":
          setRowIndex(row < maxRows - 1 ? row + 1 : maxRows - 1);
          return;
        case "ArrowLeft":
          setFocusedIndex(
            prev === 0 ? itemsLength - 1 : (prev - 1) % itemsLength
          );
          return;
        case "ArrowRight":
          setFocusedIndex((prev + 1) % itemsLength);
          return;
        default:
          return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [focusedIndex, rowIndex, index, channels.length, maxRows]);

  useEffect(() => {
    const handleFocusChange = () => {
      if (rowIndex !== index) return;
      const newFocus = Math.max(0, Math.min(focusedIndex, channels.length - 1));
      setFocusedIndex(newFocus);
    };
    handleFocusChange();
  }, [rowIndex]);

  useEffect(() => {
    const calculateStartIndex = () => {
      if (rowIndex !== index) return;

      const visibleEnd = startIndex + rowAmount;
      if (focusedIndex >= visibleEnd) {
        setStartIndex(index, focusedIndex - rowAmount + 1);
      } else if (focusedIndex < startIndex) {
        setStartIndex(index, focusedIndex);
      }
    };
    calculateStartIndex();
  }, [focusedIndex, rowAmount, index, rowIndex, startIndex, setStartIndex]);

  const handleLeftClick = () => {
    const current = getStartIndex(index);
    const newIndex = current === 0 ? 0 : current - 1;
    if (focusedIndex >= newIndex && rowIndex === index) {
      setFocusedIndex(focusedIndex === 0 ? (channels.length - 1) : (focusedIndex - 1) % channels.length);
    }
    setStartIndex(index, newIndex);
  };

  const handleRightClick = () => {
    const current = getStartIndex(index);

    const newIndex =
      current < channels.length - rowAmount
        ? current + 1
        : channels.length - rowAmount;
    if (focusedIndex < newIndex && rowIndex === index) {
      setFocusedIndex(newIndex);
    }
    if(newIndex === current) {
      setFocusedIndex((focusedIndex + 1) % channels.length)
    } else {
      setStartIndex(index, newIndex);
    }
  };

  return (
    <div className="relative">
      <h1 className="text-xl font-bold text-start text-white ml-4">
        {category}
      </h1>
      <div className="relative">
        {/* Left Navigation Icon */}
        <button
          onClick={handleLeftClick}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-transparent text-white p-2 rounded-full hover:bg-gray-500"
        >
          <ChevronLeft />
        </button>

        {/* Right Navigation Icon */}
        <button
          onClick={handleRightClick}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-transparent text-white p-2 rounded-full hover:bg-gray-500"
        >
          <ChevronRight />
        </button>
        {/* Grid */}
        <div
          className={`grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-8 gap-4 p-4`}
        >
          {channels
            .slice(startIndex, startIndex + rowAmount)
            .map((channel, i) => (
              <ChannelItem
                key={channel.id}
                channel={channel}
                index={i + startIndex}
                isFocused={
                  focusedIndex === i + startIndex && rowIndex === index
                }
                onClick={() => {
                  setFocusedIndex(i + startIndex);
                  setRowIndex(index);
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryRow;
