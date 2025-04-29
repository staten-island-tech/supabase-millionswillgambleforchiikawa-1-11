<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

// Access the Vue Router
const router = useRouter()

// Access the auth store
const auth = useAuthStore()

// When this component mounts
onMounted(async () => {
  await auth.fetchUser() // Check if user is signed in

  if (auth.user) {
    router.push('/dashboard') // Redirect if signed in
  }
})
</script>

<template>
  <div v-if="!auth.user">
    <h1>Welcome to the Landing Page</h1>
    <p>This is a public view. Please log in to continue.</p>
    <router-link to="/login">Login</router-link>
  </div>
</template>
