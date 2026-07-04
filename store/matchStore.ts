import { create } from 'zustand';
import { matchService } from '../api';

interface MatchState {
  matches: any[];
  isLoading: boolean;
  error: string | null;
  fetchMatches: () => Promise<void>;
  likeUser: (userId: string) => Promise<any>;
  dislikeUser: (userId: string) => Promise<void>;
  unmatch: (userId: string) => Promise<void>;
}

export const useMatchStore = create<MatchState>((set, get) => ({
  matches: [],
  isLoading: false,
  error: null,

  fetchMatches: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await matchService.getMatches();
      set({ matches: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  likeUser: async (userId: string) => {
    try {
      const response = await matchService.likeUser(userId);
      if (response.data.isMatch) {
        await get().fetchMatches();
      }
      return response.data;
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  dislikeUser: async (userId: string) => {
    try {
      await matchService.dislikeUser(userId);
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  unmatch: async (userId: string) => {
    try {
      await matchService.unmatch(userId);
      set({ matches: get().matches.filter((m) => m._id !== userId) });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },
}));
