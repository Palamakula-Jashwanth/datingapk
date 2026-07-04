import apiClient from './client';

export const chatService = {
  getChats: async () => {
    return await apiClient.get('/chats');
  },

  getMessages: async (chatId: string, limit = 50, skip = 0) => {
    return await apiClient.get(`/chats/${chatId}/messages?limit=${limit}&skip=${skip}`);
  },

  sendMessage: async (chatId: string, content: string) => {
    return await apiClient.post(`/chats/${chatId}/messages`, { content });
  },
};
