import apiClient from './client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  interestedIn: 'male' | 'female' | 'both';
  location: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  register: async (data: RegisterData) => {
    const response = await apiClient.post('/auth/register', data);
    if (response.success && response.data.token) {
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response;
  },

  login: async (data: LoginData) => {
    const response = await apiClient.post('/auth/login', data);
    if (response.success && response.data.token) {
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response;
  },

  logout: async () => {
    await apiClient.post('/auth/logout');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  },

  getMe: async () => {
    const response = await apiClient.get('/auth/me');
    if (response.success) {
      await AsyncStorage.setItem('user', JSON.stringify(response.data));
    }
    return response;
  },

  getCurrentUser: async () => {
    const userStr = await AsyncStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken: async () => {
    return await AsyncStorage.getItem('token');
  },
};
