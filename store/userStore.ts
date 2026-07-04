import { create } from 'zustand';
import { userService } from '../api';

interface UserState {
  discoverUsers: any[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  fetchDiscoverUsers: (reset?: boolean) => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  discoverUsers: [],
  isLoading: false,
  error: null,
  hasMore: true,

  fetchDiscoverUsers: async (reset = false) => {
    try {
      set({ isLoading: true, error: null });
      const skip = reset ? 0 : get().discoverUsers.length;
      const response = await userService.getDiscoverUsers(20, skip);
      
      set({
        discoverUsers: reset ? response.data : [...get().discoverUsers, ...response.data],
        hasMore: response.data.length === 20,
        isLoading: false,
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateProfile: async (data: any) => {
    try {
      set({ isLoading: true, error: null });
      await userService.updateProfile(data);
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },
}));
