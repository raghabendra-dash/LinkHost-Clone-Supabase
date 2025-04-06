import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  updateProfile: (profileData: any) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
  },

  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      
      // For development purposes, mock a successful login
      // Remove this in production and uncomment the Supabase auth code
      const mockUser = {
        id: '1',
        email: email,
        firstName: 'John',
        lastName: 'Doe',
      };
      
      set({ 
        user: mockUser, 
        isAuthenticated: true, 
        isLoading: false 
      });
      
      // Uncomment this for real Supabase authentication
      /*
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Get user profile data
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      const user = {
        id: data.user.id,
        email: data.user.email!,
        firstName: profileData?.first_name,
        lastName: profileData?.last_name,
      };

      set({ 
        user, 
        isAuthenticated: true, 
        isLoading: false 
      });
      */
      
      return;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  register: async (userData) => {
    try {
      set({ isLoading: true, error: null });
      
      // For development purposes, mock a successful registration
      // Remove this in production and uncomment the Supabase auth code
      const mockUser = {
        id: '1',
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
      };
      
      set({ 
        user: mockUser,
        isAuthenticated: true,
        isLoading: false 
      });
      
      // Uncomment this for real Supabase authentication
      /*
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });

      if (error) throw error;
      if (!data.user) throw new Error('Registration failed');

      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: data.user.id,
          email: userData.email,
          first_name: userData.firstName,
          last_name: userData.lastName,
        });

      if (profileError) throw profileError;

      const user = {
        id: data.user.id,
        email: data.user.email!,
        firstName: userData.firstName,
        lastName: userData.lastName,
      };

      set({ 
        user,
        isAuthenticated: true,
        isLoading: false 
      });
      */
      
      return;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      // For development purposes, just clear the user
      // Remove this in production and uncomment the Supabase auth code
      set({ 
        user: null, 
        isAuthenticated: false
      });
      
      // Uncomment this for real Supabase authentication
      // await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  updateProfile: async (profileData) => {
    try {
      set({ isLoading: true, error: null });
      
      // For development purposes, mock a profile update
      // Remove this in production and uncomment the Supabase auth code
      const { user } = useAuthStore.getState();
      
      if (!user) throw new Error('No user found');
      
      const updatedUser = {
        ...user,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
      };
      
      set({ 
        user: updatedUser, 
        isLoading: false 
      });
      
      // Uncomment this for real Supabase authentication
      /*
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('profiles')
        .update({
          first_name: profileData.firstName,
          last_name: profileData.lastName,
          phone: profileData.phone,
          company: profileData.company,
          country: profileData.country,
          address: profileData.address
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      const updatedUser = {
        id: user.id,
        email: user.email!,
        firstName: data.first_name,
        lastName: data.last_name,
      };

      set({ 
        user: updatedUser, 
        isLoading: false 
      });
      */
      
      return;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },
}));