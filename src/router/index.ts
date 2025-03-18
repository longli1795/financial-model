import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      meta: { requiresAuth: true },
      component: () => import('@/views/dashboard.vue')
    },
    {
      path: '/prediction',
      name: 'Prediction',
      component: () => import('@/views/prediction.vue'),
      meta: { requiresAuth: true }
    }
  ],
    scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  const isAuthenticated = localStorage.getItem('isLogin')
  if (to.meta.requiresAuth && !isAuthenticated) {
    return '/login'
  }
  if (to.path === '/login' && isAuthenticated) {
    return { path: '/dashboard' }
  }
})

export default router