<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterView, useRoute } from 'vue-router'
import AppNavbar from './components/Navigation/AppNavbar.vue'
import { navigationItems } from './constants/navigation'
import { useBreakpoint } from './composables/useBreakpoint'
import { useAuthStore } from './stores/auth'

const route = useRoute()
const authStore = useAuthStore()
const { isAuthenticated, isInitialized } = storeToRefs(authStore)
const { isDesktop } = useBreakpoint()

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
    <AppNavbar v-if="showNavbar && isDesktop" />

    <nav
      v-if="showNavbar && !isDesktop"
      class="app-shell__bottom-nav"
      aria-label="Primary navigation"
      data-testid="mobile-bottom-nav"
    >
      <RouterLink
        v-for="item in navigationItems"
        :key="item.path"
        :to="item.path"
        class="app-shell__bottom-nav-link"
      >
        <span class="app-shell__bottom-nav-icon" aria-hidden="true">{{ item.icon }}</span>
        <span class="app-shell__bottom-nav-label">{{ item.label }}</span>
      </RouterLink>
    </nav>

    <main :class="['app-shell__content', { 'app-shell__content--with-navbar': showNavbar }]">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
@reference "../src/assets/main.css";

.app-shell {
  --navbar-height: 64px;
  --navbar-offset: 16px;
  @apply relative min-h-screen bg-white;
}

.app-shell__content {
  @apply min-h-screen;
}

.app-shell__content--with-navbar {
  @apply pb-[80px] lg:pb-0 lg:pt-[calc(var(--navbar-height,64px)+var(--navbar-offset,16px))];
}

.app-shell__bottom-nav {
  @apply fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-primary-50 bg-white/70 px-6 py-3 shadow-lg backdrop-blur-md;
}

.app-shell__bottom-nav-link {
  @apply flex min-w-16 flex-col items-center justify-center gap-1 rounded-full px-3 py-2 text-[10px] font-medium leading-none text-primary transition;
}

.app-shell__bottom-nav-link.router-link-active,
.app-shell__bottom-nav-link.router-link-exact-active {
  @apply text-mossy-main;
}

.app-shell__bottom-nav-icon {
  @apply text-xl leading-none;
}

.app-shell__bottom-nav-label {
  @apply text-[10px] leading-none;
}
</style>
