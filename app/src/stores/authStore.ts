// src/stores/authStore.ts
import { defineStore } from 'pinia'
import { createClient } from '@supabase/supabase-js'
import type { User } from '@supabase/supabase-js'; // Import User type

// Create Supabase client
const supabaseUrl = "https://mkumryudrsvmgwhydnxl.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rdW1yeXVkcnN2bWd3aHlkbnhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MDkxNjUsImV4cCI6MjA1OTE4NTE2NX0.ZZJ9_gEdXDP818MGRU7j0r7aKWlVtEY0ZAcq024aKY8"
const supabase = createClient(supabaseUrl, supabaseKey)

// Define your Pinia store
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,  // Holds the logged-in user or null
  }),

  actions: {
    // Method to fetch the current user from Supabase
    async fetchUser(): Promise<void> {
      const { data, error } = await supabase.auth.getUser()
      if (!error) {
        this.user = data.user     // Store user if logged in
      } else {
        this.user = null          // Otherwise, keep user as null
      }
    }
  }
})
