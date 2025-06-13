<template>
  <div class="container">
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
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/pinia' // Adjust path as needed

const authStore = useAuthStore()
const email = ref<string>('')
const password = ref<string>('')
const router = useRouter()
const login = async () => {
  try {
    await authStore.login(email.value, password.value)
    // Check if the user is logged in successfully
    if (authStore.user) {
      // Redirect to the desired page after successful login
      console.log('help')
      router.push({ path: `/landing` }) // Change '/dashboard' to your desired route
    } else {
      console.log('help me')
    }
  } catch (error) {
    console.error('Login failed:', error)
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
