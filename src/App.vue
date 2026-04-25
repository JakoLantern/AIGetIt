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
    <main
      :class="['app-shell__content', { 'app-shell__content--with-navbar': showNavbar }]"
    >
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.app-shell {
  --navbar-height: 64px;
  --navbar-offset: 16px;
  @apply relative min-h-screen bg-white;
}

.app-shell__content {
  @apply min-h-screen;
}

.app-shell__content--with-navbar {
  padding-top: calc(var(--navbar-height) + var(--navbar-offset));
}
</style>
