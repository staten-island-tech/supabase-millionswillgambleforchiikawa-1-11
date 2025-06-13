<template>
  <div class="container">
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
      // Change '/AboutView' to your desired route
    }
  } catch (error) {
    console.error('Sign up failed:', error)
  }
}
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff; /* White for high contrast */
  border: 2px solid #000000; /* High contrast border */
  border-radius: 10px;
}

.form-group {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

label {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #000000; /* Black text for max contrast */
}

input {
  font-size: 1.1rem;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #000000;
  color: #000000;
  background-color: #ffffff; /* White background */
}

button {
  font-size: 1.2rem;
  padding: 0.75rem 1.5rem;
  background-color: #0055aa; /* Dark blue */
  color: #ffffff; /* White text */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
}

button:disabled {
  background-color: #999999; /* Still passes contrast */
  color: #ffffff;
  cursor: not-allowed;
}

.error {
  color: #cc0000; /* Strong red with high contrast */
  margin-top: 1rem;
  font-size: 1rem;
  text-align: center;
}
</style>
