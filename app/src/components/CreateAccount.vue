<template>
  <div>
    <form @submit.prevent="createAccount">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit" :disabled="authStore.loading">Create Account</button>
      <div v-if="authStore.error">{{ authStore.error }}</div>
    </form>
    <p>Already have an account? <button @click="switchToLogin">Sign In</button></p>
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

const createAccount = async () => {
  try {
    const { error } = await authStore.signUp(email.value, password.value)
    if (error) {
      authStore.error = error // Set error message in the store
      console.error('Sign up failed:', error)
    } else {
      // Redirect to the desired page after successful account creation
      router.push('/AboutView') // Change '/AboutView' to your desired route
    }
  } catch (error) {
    console.error('Sign up failed:', error) // Handle error appropriately
  }
}

const switchToLogin = () => {
  // Logic to switch to the login form can be implemented here
  // For example, you could emit an event or change a state variable
}
</script>
