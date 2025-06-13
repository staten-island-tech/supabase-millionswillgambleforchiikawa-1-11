import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import { useAuthStore } from '../stores/pinia' // ✅ Correct import
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: () => import('../views/UserInv.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/gacha',
      name: 'gacha',
      component: () => import('../views/GachaPage.vue'),
    },
    {
      path: '/landing',
      name: 'landing',
      component: () => import('../views/LandingPage.vue'),
    },
    {
      path: '/index',
      name: 'index-gacha',
      component: () => import('../views/IndexCards.vue'), 
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)

  const requiresAuth = to.meta.requiresAuth

  if (requiresAuth && !user.value) {
    next('/landing') // Redirect if not logged in
  } else {
    next() // Proceed
  }
})

export default router