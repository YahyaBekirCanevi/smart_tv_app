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
    initializeKeyboardEvents,
  } = useFocusStore();

  useEffect(() => {
    const amount = width >= 1280 ? 8 : width >= 768 ? 5 : 3;
    setRowAmount(amount);
  }, [width, setRowAmount]);

  useEffect(() => {
    const cleanup = initializeKeyboardEvents(index, channels.length, maxRows);
    return cleanup;
  }, [initializeKeyboardEvents, index, channels.length, maxRows]);

  useEffect(() => {
    const calculateStartIndex = (currentRowIndex: number) => {
      if (currentRowIndex !== rowIndex) return;
      
      const visibleEnd = startIndex + rowAmount;
      if (focusedIndex >= visibleEnd) {
        setStartIndex(focusedIndex - rowAmount + 1)
      } else if (focusedIndex < startIndex) {
        setStartIndex(focusedIndex)
      }
    }
    calculateStartIndex(index);
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
