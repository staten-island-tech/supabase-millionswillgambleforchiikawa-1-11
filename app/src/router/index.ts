// Replace with your Supabase URL and Anon Key
// Import the Supabase client
// Replace with your Supabase URL and Anon Key

// Create a Supabase client
// Example function to fetch data from a table

// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/landing',
      name: 'landing',
      component: () => import('../views/e.vue'),
    },
    {
      path: '/landing',         // ✅ URL: http://localhost:5173/landing
      name: 'landing',
      component: () => import('../views/e.vue'),
    },
  ],
})

export default router;