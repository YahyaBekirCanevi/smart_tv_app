import { create } from "zustand";

interface FocusStore {
  focusedIndex: number;
  setFocusedIndex: (eventKey: string, itemsLength: number, numRows: number) => void;
}

export const useFocusStore = create<FocusStore>((set, _get) => ({
  focusedIndex: 0,
  setFocusedIndex: (eventKey: string, itemsLength: number, numRows: number) => {
    set((state) => {
      const prev = state.focusedIndex;

      switch (eventKey) {
        case "ArrowUp":
          return { focusedIndex: prev - numRows >= 0 ? prev - numRows : prev };
        case "ArrowDown":
          return { focusedIndex: prev + numRows < itemsLength ? prev + numRows : prev };
        case "ArrowLeft":
          return { focusedIndex: prev % numRows === 0 ? prev : prev - 1 };
        case "ArrowRight":
          return {
            focusedIndex: (prev + 1) % numRows === 0 || prev + 1 >= itemsLength ? prev : prev + 1,
          };
        default:
          return { focusedIndex: prev };
      }
    });
  },
}));
