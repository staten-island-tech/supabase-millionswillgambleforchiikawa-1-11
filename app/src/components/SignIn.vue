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
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/pinia'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()

const login = async () => {
  await authStore.login(email.value, password.value)

  // ✅ After login, redirect if user is set
  if (authStore.user) {
    router.push('/landing') // or /about or any route
  }
}
</script>
