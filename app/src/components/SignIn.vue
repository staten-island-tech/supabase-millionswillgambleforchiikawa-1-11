<template>
  <div>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="eemail" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="epassword" required />
      </div>
      <button type="submit" :disabled="authStore.loading">Sign In</button>
      <div v-if="authStore.error">{{ authStore.error }}</div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/pinia' // Ensure this path is correct
import { useRouter } from 'vue-router' // Import useRouter

const authStore = useAuthStore()
const email = ref<string>('') // Explicitly define the type as string
const password = ref<string>('') // Explicitly define the type as string
const router = useRouter() // Initialize the router

const login = async () => {
  try {
    await authStore.login(email.value, password.value)
    // Check if the user is logged in successfully
    const { error } = await authStore.login(email.value, password.value)
    if (authStore.user) {
      // Redirect to the desired page after successful login
      console.log('help')
      router.push({ path: `/about` }) // Change '/dashboard' to your desired route
    } else {
      console.log('help me')
    }
  } catch (error) {
    console.error('Login failed:', error) // Handle error appropriately
  }
}
</script>
