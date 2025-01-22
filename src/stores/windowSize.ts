import { useEffect } from "react";
import { create } from "zustand";

interface WindowStore {
  width: number;
  height: number;
  setWindowSize: (size: { width: number; height: number }) => void;
}
const useStore = create<WindowStore>((set) => ({
  width: window.innerWidth,
  height: window.innerHeight,
  setWindowSize: (size) => set({ width: size.width, height: size.height }),
}));
export const useWindowSize = () => {
  const { width, height, setWindowSize } = useStore();

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setWindowSize]);

  return { width, height };
};
