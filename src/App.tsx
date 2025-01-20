import React, { useEffect } from "react";
import { useFocusStore } from "./stores/focusIndex";
import { useWindowSize } from "./stores/windowSize";

const items = Array.from({ length: 12 }, (_, i) => `Item ${i + 1}`);

const App: React.FC = () => {
  const { width } = useWindowSize();
  const { focusedIndex, setFocusedIndex } = useFocusStore();

  function getRowAmount(): number {
    if (width >= 1024) return 8;
    if (width >= 768) return 5;
    return 3;
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) return;
      setFocusedIndex(event.key, items.length, getRowAmount());
    };
  
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setFocusedIndex, getRowAmount, width]);
  

  return (
    <div className={`grid grid-cols-3 md:grid-cols-5 xl:grid-cols-8 gap-4 p-4`}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`p-4 border rounded ${
            focusedIndex === index
              ? "border-blue-500 bg-blue-100"
              : "border-gray-300"
          }`}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default App;
