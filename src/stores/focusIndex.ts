import { create } from "zustand";

interface FocusStore {
  focusedIndex: number;
  rowIndex: number;
  rowAmount: number;
  setFocusedIndex: (newIndex: number) => void;
  setRowIndex: (newIndex: number) => void;
  setRowAmount: (amount: number) => void;
  // initializeKeyboardEvents: (
  //   currentRowIndex: number,
  //   itemsLength: number,
  //   maxRows: number
  // ) => () => void;
}

export const useFocusStore = create<FocusStore>((set) => ({
  focusedIndex: 0,
  rowIndex: 0,
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

  // initializeKeyboardEvents: (
  //   currentRowIndex: number,
  //   itemsLength: number,
  //   maxRows: number
  // ) => {

  // },
}));
