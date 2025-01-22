import { create } from "zustand";

interface FocusStore {
  focusedIndex: number;
  rowIndex: number;
  rowAmount: number;
  startIndexes: number[];
  setFocusedIndex: (newIndex: number) => void;
  setRowIndex: (newIndex: number) => void;
  setRowAmount: (amount: number) => void;
  setStartIndex: (row: number, startIndex: number) => void;
  getStartIndex: (row: number) => number;
}

export const useFocusStore = create<FocusStore>((set, get) => ({
  focusedIndex: 0,
  rowIndex: 0,
  rowAmount: 3,
  startIndexes: [],

  setFocusedIndex: (newIndex: number) => {
    set(() => ({
      focusedIndex: newIndex,
    }));
  },

  setRowIndex: (newRowIndex: number) => {
    set((state) => {
      const { startIndexes, rowAmount, focusedIndex } = state;

      const newStartIndex = startIndexes[newRowIndex] ?? 0;
      const clampedFocus = Math.min(
        focusedIndex,
        rowAmount - 1 + newStartIndex
      );

      const updatedStartIndexes = [...startIndexes];
      updatedStartIndexes[newRowIndex] = Math.min(
        newStartIndex,
        Math.max(0, clampedFocus - rowAmount + 1)
      );

      return {
        rowIndex: newRowIndex,
        startIndexes: updatedStartIndexes,
        focusedIndex: clampedFocus,
      };
    });
  },

  setRowAmount: (amount: number) => {
    set(() => ({
      rowAmount: amount,
    }));
  },

  setStartIndex: (row: number, startIndex: number) => {
    set((state) => {
      const newStartIndexes = [...state.startIndexes];
      newStartIndexes[row] = startIndex;
      return { startIndexes: newStartIndexes };
    });
  },

  getStartIndex: (row: number) => {
    const { startIndexes } = get();
    return startIndexes[row] ?? 0;
  },
}));
