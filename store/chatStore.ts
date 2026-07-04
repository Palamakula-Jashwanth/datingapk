import { create } from 'zustand';
import { chatService } from '../api';

interface ChatState {
  chats: any[];
  messages: { [chatId: string]: any[] };
  isLoading: boolean;
  error: string | null;
  fetchChats: () => Promise<void>;
  fetchMessages: (chatId: string) => Promise<void>;
  sendMessage: (chatId: string, content: string) => Promise<void>;
  addMessage: (chatId: string, message: any) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  messages: {},
  isLoading: false,
  error: null,

  fetchChats: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await chatService.getChats();
      set({ chats: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchMessages: async (chatId: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await chatService.getMessages(chatId);
      set({
        messages: { ...get().messages, [chatId]: response.data },
        isLoading: false,
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  sendMessage: async (chatId: string, content: string) => {
    try {
      const response = await chatService.sendMessage(chatId, content);
      const currentMessages = get().messages[chatId] || [];
      set({
        messages: {
          ...get().messages,
          [chatId]: [...currentMessages, response.data],
        },
      });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  addMessage: (chatId: string, message: any) => {
    const currentMessages = get().messages[chatId] || [];
    set({
      messages: {
        ...get().messages,
        [chatId]: [...currentMessages, message],
      },
    });
  },
}));
