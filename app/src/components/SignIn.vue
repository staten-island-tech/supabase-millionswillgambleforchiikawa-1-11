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
      router.push({ path: `/about` }) // Change '/dashboard' to your desired route
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
  size: 3rem;
  font-size: 3 rem;
}
input {
  width: 12rem;
  height: 2rem;
}
</style>
