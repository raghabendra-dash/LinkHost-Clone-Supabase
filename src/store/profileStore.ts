import { create } from 'zustand';
import { auth } from '../lib/api';

interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  address?: string;
  avatarUrl?: string;
}

interface ProfileState {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
  uploadAvatar: (file: File) => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: null,
  isLoading: false,
  error: null,

  fetchProfile: async () => {
    try {
      set({ isLoading: true, error: null });
      
      // For development purposes, mock a profile
      const mockProfile = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        company: 'Example Corp',
        country: 'US',
        address: '123 Main St, Anytown, USA',
      };
      
      set({ profile: mockProfile, isLoading: false });
      
      // Uncomment for real API call
      // const profile = await auth.getProfile();
      // set({ profile, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateProfile: async (profileData) => {
    try {
      set({ isLoading: true, error: null });
      
      // For development purposes, mock a profile update
      const { profile } = get();
      if (!profile) throw new Error('No profile found');
      
      const updatedProfile = {
        ...profile,
        ...profileData,
      };
      
      set({ profile: updatedProfile, isLoading: false });
      
      // Uncomment for real API call
      // const updatedProfile = await auth.updateProfile(profileData);
      // set({ profile: updatedProfile, isLoading: false });
      
      return updatedProfile;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  uploadAvatar: async (file) => {
    try {
      set({ isLoading: true, error: null });
      
      // For development purposes, mock an avatar upload
      const { profile } = get();
      if (!profile) throw new Error('No profile found');
      
      // Create a mock avatar URL
      const mockAvatarUrl = URL.createObjectURL(file);
      
      set({ 
        profile: { ...profile, avatarUrl: mockAvatarUrl },
        isLoading: false 
      });
      
      // Uncomment for real API call
      /*
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('avatar', file);
      
      // Make a POST request to upload the avatar
      const response = await fetch('/api/auth/upload-avatar', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload avatar');
      }
      
      const data = await response.json();
      
      // Update the profile with the new avatar URL
      const { profile } = get();
      set({ 
        profile: { ...profile!, avatarUrl: data.avatarUrl },
        isLoading: false 
      });
      */
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },
}));