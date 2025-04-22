import { defineStore } from 'pinia'
import { createClient } from '@supabase/supabase-js'

// Optional: define interfaces
interface AuthState {
  user: any | null
  error: string | null
}

const supabaseUrl = 'https://YOUR-PROJECT.supabase.co'
const supabaseKey = 'YOUR-ANON-KEY'
const supabase = createClient(supabaseUrl, supabaseKey)

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    error: null,
  }),
  actions: {
    async login(email: string, password: string) {
      this.error = null
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        this.error = error.message
      } else {
        this.user = data.user
        console.log('Logged in:', data.user)
      }
    },
    async logout() {
      await supabase.auth.signOut()
      this.user = null
    }
  }
})