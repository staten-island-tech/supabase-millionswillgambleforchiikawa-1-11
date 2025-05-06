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
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/pinia' // Adjust path as needed

const authStore = useAuthStore()
const email = ref<string>('')
const password = ref<string>('')
const router = useRouter()
const login = async () => {
  try {
    await authStore.login(email.value, password.value)
    if (authStore.user) {
      console.log('Login successful:', authStore.user)
      router.push('/about') // ✅ route after successful login
    }
  } catch (error) {
    console.error('Login failed:', error)
  }
}
</script>
