// stores/authStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import supabase from '../main'; // Adjust the path as necessary
import type { User } from '@supabase/supabase-js'; // Import User type

export interface AuthStore {
  user: User | null;
  error: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ user: User | null; error: string | null }>;
  signUp: (email: string, password: string) => Promise<{ user: User | null; error: string | null }>;
  logout: () => Promise<void>;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);

  const login = async (email: string, password: string): Promise<{ user: User | null; error: string | null }> => {
    loading.value = true;
    error.value = null;

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    loading.value = false;

    if (loginError) {
      error.value = loginError.message; // Handle login error
      return { user: null, error: loginError.message }; // Return error
    } else {
      user.value = data.user; // Access the user from the data object
      return { user: data.user, error: null }; // Return user
    }
  };

  const signUp = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    loading.value = false;

    if (signUpError) {
      error.value = signUpError.message; // Handle sign-up error
      return { user: null, error: signUpError.message }; // Return error
    } else {
      user.value = data.user; // Set the user if sign-up is successful
      return { user: data.user, error: null }; // Return user
    }
  };

  const logout = async () => {
    const { error: logoutError } = await supabase.auth.signOut();
    if (logoutError) {
      console.error('Logout error:', logoutError.message); // Handle logout error
    } else {
      user.value = null; // Clear the user on logout
    }
  };



  return {
    user,
    error,
    loading,
    login,
    signUp,
    logout,
    
  };
});