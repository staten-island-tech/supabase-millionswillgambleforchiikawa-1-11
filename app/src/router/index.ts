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
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/landing',
      name: 'landing',
      component: () => import('../views/LandingPage.vue'),
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('../views/GachaDesc.vue'),
    },
  ],
})

// ✅ Navigation guard
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