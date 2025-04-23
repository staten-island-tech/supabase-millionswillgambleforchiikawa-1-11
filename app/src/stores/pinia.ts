// stores/useAuthStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import supabase from '../main'; // Adjust the path as necessary
import type { User } from '@supabase/supabase-js';



export interface AuthStore {
  user: User | null;
  error: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}


export const useAuthStore = defineStore('auth', (): AuthStore => {
  const user = ref<User | null>(null);
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);

  const login = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    loading.value = false;

    if (loginError) {
      error.value = loginError.message; // Handle login error
    } else {
      user.value = data.user; // Access the user from the data object
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
    user: user.value,
    error: error.value,
    loading: loading.value,
    login,
    logout,
  };
});










