import React, { useEffect, useState } from "react";
import { Channel } from "../models/Channel";
import { useFocusStore } from "../stores/focusIndex";
import { useWindowSize } from "../stores/windowSize";
import ChannelItem from "./ChannelItem";

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
  const [startIndex, setStartIndex] = useState(0);
  const {
    focusedIndex,
    rowIndex,
    rowAmount,
    setFocusedIndex,
    setRowIndex,
    setRowAmount,
  } = useFocusStore();

  useEffect(() => {
    const amount = width >= 1280 ? 8 : width >= 768 ? 5 : 3;
    setRowAmount(amount);
  }, [width, setRowAmount]);

  useEffect(() => {
    const itemsLength = channels.length;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
      )
        return;
      if (rowIndex !== index) return;
      //console.log(rowIndex, index, itemsLength, maxRows);

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
        setStartIndex(focusedIndex - rowAmount + 1);
      } else if (focusedIndex < startIndex) {
        setStartIndex(focusedIndex);
      }
    };
    calculateStartIndex();
  }, [focusedIndex, rowAmount, index, rowIndex]);

  return (
    <div>
      <h1 className="text-xl font-bold text-center mb-2">
        focusedIndex: {focusedIndex} rowIndex: {rowIndex}
      </h1>
      <h1 className="text-xl font-bold text-start ml-4">{category}</h1>
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
              isFocused={focusedIndex === i + startIndex && rowIndex === index}
              onClick={() => {
                setFocusedIndex(i + startIndex);
                setRowIndex(index);
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default CategoryRow;
