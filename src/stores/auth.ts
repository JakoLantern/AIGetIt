import { computed, shallowRef } from 'vue'
import { defineStore } from 'pinia'

export interface AuthUser {
  id: string
  name: string
  email: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = shallowRef<AuthUser | null>(null)

  const isAuthenticated = computed(() => user.value !== null)
  const authStatus = computed(() => {
    if (!user.value) {
      return 'Signed out'
    }

    return `Signed in as ${user.value.name}`
  })

  function login(nextUser: AuthUser) {
    user.value = nextUser
  }

  function logout() {
    user.value = null
  }

  return {
    user,
    isAuthenticated,
    authStatus,
    login,
    logout,
  }
})