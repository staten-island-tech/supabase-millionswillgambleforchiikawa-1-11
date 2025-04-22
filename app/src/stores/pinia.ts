// stores/useAuthStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import supabase from '../main'; // Adjust the path as necessary

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const error = ref(null);
  const loading = ref(false);

  const login = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;

    const { user: loggedInUser, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    loading.value = false;

    if (loginError) {
      error.value = loginError.message;
    } else {
      user.value = loggedInUser;
    }
  };

  const logout = async () => {
    const { error: logoutError } = await supabase.auth.signOut();
    if (logoutError) {
      console.error('Logout error:', logoutError.message);
    } else {
      user.value = null;
    }
  };

  return {
    user,
    error,
    loading,
    login,
    logout,
  };
});