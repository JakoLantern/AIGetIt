<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterView, useRoute } from 'vue-router'
import AppNavbar from './components/Navigation/AppNavbar.vue'
import { useAuthStore } from './stores/auth'

const route = useRoute()
const authStore = useAuthStore()
const { isAuthenticated, isInitialized } = storeToRefs(authStore)

const showNavbar = computed(() => {
  return (
    isInitialized.value &&
    isAuthenticated.value &&
    route.matched.some((record) => record.meta.requiresAuth === true)
  )
})
</script>

<template>
  <div class="app-shell">
    <AppNavbar v-if="showNavbar" />
    <RouterView />
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.app-shell {
  @apply min-h-screen bg-white;
}
</style>
