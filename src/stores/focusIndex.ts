import { create } from "zustand";

interface FocusStore {
  focusedIndex: number;
  rowIndex: number;
  startIndex: number;
  rowAmount: number;
  setFocusedIndex: (newIndex: number) => void;
  setRowIndex: (newIndex: number) => void;
  setRowAmount: (amount: number) => void;
  calculateStartIndex: (currentRowIndex: number) => void;
  initializeKeyboardEvents: (currentRowIndex: number, itemsLength: number, maxRows: number) => () => void;
}

export const useFocusStore = create<FocusStore>((set, get) => ({
  focusedIndex: 0,
  rowIndex: 0,
  startIndex: 0,
  rowAmount: 3,
  
  setFocusedIndex: (newIndex: number) => {
    set(() => ({
      focusedIndex: newIndex,
    }));
  },
  
  setRowIndex: (newIndex: number) => {
    set(() => ({
      rowIndex: newIndex,
    }));
  },

  setRowAmount: (amount: number) => {
    set(() => ({
      rowAmount: amount,
    }));
  },
  
  calculateStartIndex: (currentRowIndex: number) => {
    const { focusedIndex, rowIndex, startIndex, rowAmount } = get();
    if (currentRowIndex !== rowIndex) return;
    
    const visibleEnd = startIndex + rowAmount;
    if (focusedIndex >= visibleEnd) {
      set({ startIndex: focusedIndex - rowAmount + 1 });
    } else if (focusedIndex < startIndex) {
      set({ startIndex: focusedIndex });
    }
  },

  initializeKeyboardEvents: (currentRowIndex: number, itemsLength: number, maxRows: number) => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) return;
      const { rowIndex } = get();
      if (rowIndex !== currentRowIndex) return;
      
      set((state) => {
        const prev = state.focusedIndex;
        const row = state.rowIndex;

        switch (event.key) {
          case "ArrowUp":
            return {
              rowIndex: row > 0 ? row - 1 : 0,
              focusedIndex: Math.max(0, Math.min(prev, itemsLength - 1)),
            };
          case "ArrowDown":
            return {
              rowIndex: row < maxRows - 1 ? row + 1 : maxRows - 1,
              focusedIndex: Math.max(0, Math.min(prev, itemsLength - 1)),
            };
          case "ArrowLeft":
            return {
              focusedIndex: prev === 0 ? itemsLength - 1 : (prev - 1) % itemsLength,
            };
          case "ArrowRight":
            return {
              focusedIndex: (prev + 1) % itemsLength,
            };
          default:
            return { focusedIndex: prev };
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  },
}));
