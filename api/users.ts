import apiClient from './client';

export interface UpdateProfileData {
  name?: string;
  bio?: string;
  location?: string;
  interests?: string[];
}

export const userService = {
  updateProfile: async (data: UpdateProfileData) => {
    return await apiClient.put('/users/profile', data);
  },

  uploadImages: async (images: any[]) => {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append('images', {
        uri: image.uri,
        type: image.type || 'image/jpeg',
        name: image.fileName || `image-${index}.jpg`,
      } as any);
    });

    return await apiClient.post('/users/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteImage: async (publicId: string) => {
    return await apiClient.delete(`/users/images/${publicId}`);
  },

  getDiscoverUsers: async (limit = 20, skip = 0) => {
    return await apiClient.get(`/users/discover?limit=${limit}&skip=${skip}`);
  },

  getUserById: async (id: string) => {
    return await apiClient.get(`/users/${id}`);
  },
};
