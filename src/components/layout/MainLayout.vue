<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const { authStatus, isAuthenticated, user } = storeToRefs(authStore)

const statusText = computed(() => authStatus.value)

async function handleLogout() {
  const success = await authStore.logout()

  if (success) {
    await router.push({ name: 'login' })
  }
}
</script>

<template>
  <div class="layout">
    <header class="layout__header">
      <div class="layout__bar">
        <div class="layout__brand-wrap">
          <p class="layout__brand">AI Get It</p>
          <p class="layout__tagline">Study tools for flashcards, results, and guided learning</p>
        </div>

        <div class="layout__status-wrap">
          <p class="layout__status-label">Auth Status</p>
          <p class="layout__status" data-testid="auth-status-indicator">
            {{ statusText }}
          </p>
          <p v-if="user" class="layout__user">{{ user.name }}</p>
        </div>

        <nav class="layout__nav" aria-label="Primary navigation">
          <RouterLink class="layout__link" to="/" data-testid="layout-home-link">
            Home
          </RouterLink>
          <RouterLink class="layout__link" to="/dashboard" data-testid="layout-dashboard-link">
            Dashboard
          </RouterLink>
          <RouterLink
            v-if="!isAuthenticated"
            class="layout__link layout__link--accent"
            to="/login"
            data-testid="layout-login-link"
          >
            Login
          </RouterLink>
          <button
            v-else
            class="layout__button"
            type="button"
            data-testid="layout-logout-button"
            @click="handleLogout"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>

    <main class="layout__content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.layout {
  --layout-bg: #020617;
  --layout-border: rgba(255, 255, 255, 0.08);
  --layout-surface: rgba(15, 23, 42, 0.82);
  --layout-muted: #cbd5e1;
  min-height: 100vh;
  background: var(--layout-bg);
  color: #f8fafc;
}

.layout__header {
  @apply sticky top-0 z-20 border-b backdrop-blur;
  background: var(--layout-surface);
  border-color: var(--layout-border);
}

.layout__bar {
  @apply mx-auto grid w-full max-w-6xl gap-4 px-6 py-4;
}

.layout__brand-wrap {
  @apply flex flex-col justify-center;
}

.layout__brand {
  @apply m-0 text-lg font-semibold tracking-tight text-white;
}

.layout__tagline {
  @apply m-0 text-sm;
  color: var(--layout-muted);
}

.layout__status-wrap {
  @apply flex flex-col justify-center rounded-2xl border px-4 py-3;
  border-color: var(--layout-border);
  background: rgba(255, 255, 255, 0.03);
}

.layout__status-label {
  @apply m-0 text-xs font-semibold uppercase tracking-[0.2em];
  color: #7dd3fc;
}

.layout__status {
  @apply m-0 mt-1 text-sm font-medium;
}

.layout__user {
  @apply m-0 mt-1 text-sm;
  color: var(--layout-muted);
}

.layout__nav {
  @apply flex flex-wrap items-center gap-3 lg:justify-end;
}

.layout__link,
.layout__button {
  @apply inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium no-underline transition;
}

.layout__link {
  @apply text-slate-300;
}

.layout__link:hover,
.layout__link.router-link-active,
.layout__link.router-link-exact-active {
  @apply bg-white/10 text-white;
}

.layout__link--accent {
  @apply bg-cyan-400 text-slate-950;
}

.layout__link--accent:hover,
.layout__link--accent.router-link-active,
.layout__link--accent.router-link-exact-active {
  @apply bg-cyan-300 text-slate-950;
}

.layout__button {
  @apply bg-cyan-400 text-slate-950;
}

.layout__button:hover {
  @apply bg-cyan-300;
}

.layout__content {
  @apply mx-auto w-full max-w-6xl px-6 py-10;
}

@media (min-width: 768px) {
  .layout__bar,
  .layout__content {
    @apply px-10;
  }
}

@media (min-width: 1024px) {
  .layout__bar {
    grid-template-columns: minmax(0, 1fr) auto auto;
  }

  .layout__bar,
  .layout__content {
    @apply px-12;
  }
}
</style>