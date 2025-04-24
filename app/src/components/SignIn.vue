<template>
  <div>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit" :disabled="authStore.loading">Sign In</button>
      <div v-if="authStore.error">{{ authStore.error }}</div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/pinia.ts' // Ensure this path is correct
import { useRouter } from 'vue-router' // Import useRouter

const authStore = useAuthStore()
const email = ref<string>('') // Explicitly define the type as string
const password = ref<string>('') // Explicitly define the type as string
const router = useRouter() // Initialize the router

const login = async () => {
  try {
    await authStore.login(email.value, password.value)
    // Check if the user is logged in successfully
    if (authStore.user) {
      // Redirect to the desired page after successful login
      router.push('/AboutView') // Change '/dashboard' to your desired route
    }
  } catch (error) {
    console.error('Login failed:', error) // Handle error appropriately
  }
}
</script>
