import { create } from "zustand";
import { Channel } from "../models/Channel";

interface ChannelState {
  channels: Channel[];
  isLoading: boolean;
  fetchChannels: () => Promise<void>;
  getChannelsByCategory: (category: string) => Channel[];
}

export const useChannelStore = create<ChannelState>((set, get) => ({
  channels: [],
  isLoading: false,
  fetchChannels: async () => {
    try {
      set({ isLoading: true });
      const response = await fetch("/channels.json");
      const data: Channel[] = await response.json();
      set({ isLoading: false, channels: data });
    } catch (error) {
      console.error("Error fetching channels:", error);
    }
  },
  getChannelsByCategory: (category: string) => {
    return get()
      .channels.filter((channel) => channel.category === category)
      .slice(0, 20);
  },
}));
