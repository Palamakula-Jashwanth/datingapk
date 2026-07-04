import apiClient from './client';

export const matchService = {
  likeUser: async (userId: string) => {
    return await apiClient.post(`/matches/like/${userId}`);
  },

  dislikeUser: async (userId: string) => {
    return await apiClient.post(`/matches/dislike/${userId}`);
  },

  getMatches: async () => {
    return await apiClient.get('/matches');
  },

  unmatch: async (userId: string) => {
    return await apiClient.delete(`/matches/${userId}`);
  },
};
