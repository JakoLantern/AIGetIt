import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import DashboardView from '../views/DashboardView.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import LessonsView from '../views/LessonsView.vue'
import UploadView from '../views/UploadView.vue'
import QuizzesView from '../views/QuizzesView.vue'

let authInitializationPromise: Promise<void> | null = null

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/lessons',
      name: 'lessons',
      component: LessonsView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/upload',
      name: 'upload',
      component: UploadView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/quizzes',
      name: 'quizzes',
      component: QuizzesView,
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  if (!authStore.isInitialized) {
    authInitializationPromise ??= authStore.initialize()
    await authInitializationPromise
  }

  if (to.name === 'login' && authStore.user) {
    return {
      name: 'dashboard',
    }
  }

  if (to.matched.some((record) => record.meta.requiresAuth) && !authStore.user) {
    return {
      name: 'login',
      query: {
        redirect: to.fullPath,
      },
    }
  }

  return true
})

export default router
