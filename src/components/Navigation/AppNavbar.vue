<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { navigationItems } from '../../constants/navigation'

const router = useRouter()
const authStore = useAuthStore()

function toTestId(label: string) {
  return `nav-link-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
}

async function handleLogout() {
  const success = await authStore.logout()

  if (success) {
    await router.push({ name: 'login' })
  }
}
</script>

<template>
  <nav class="navbar" aria-label="Primary navigation">
    <ul class="navbar__list">
      <li v-for="item in navigationItems" :key="item.path" class="navbar__item">
        <RouterLink
          class="navbar__link"
          :to="item.path"
          :data-testid="toTestId(item.label)"
        >
          <span class="navbar__icon" aria-hidden="true">{{ item.icon }}</span>
          <span class="navbar__label">{{ item.label }}</span>
        </RouterLink>
      </li>

      <li class="navbar__item navbar__item--action">
        <button class="navbar__logout" type="button" data-testid="nav-logout" @click="handleLogout">
          Logout
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
@reference "./../../assets/main.css";

.navbar {
  --navbar-border: rgba(255, 255, 255, 0.28);
  --navbar-surface: rgba(255, 255, 255, 0.1);
  @apply fixed z-50 pointer-events-auto rounded-lg border shadow-lg;
  top: var(--navbar-offset, 16px);
  left: var(--navbar-offset, 16px);
  right: var(--navbar-offset, 16px);
  height: var(--navbar-height, 64px);
  border-color: var(--navbar-border);
  background: var(--navbar-surface);
  backdrop-filter: blur(16px) saturate(180%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.35),
    0 8px 30px rgba(0, 0, 0, 0.14);
}

.navbar__list {
  @apply flex h-full flex-wrap items-center gap-3 px-6;
  list-style: none;
  margin: 0;
}

.navbar__item {
  @apply m-0;
}

.navbar__item--action {
  @apply ml-auto;
}

.navbar__link,
.navbar__logout {
  @apply inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium no-underline transition;
}

.navbar__link {
  @apply text-primary-main;
  border: 1px solid transparent;
}

.navbar__link.router-link-active,
.navbar__link.router-link-exact-active {
  @apply text-white;
  border-color: rgba(255, 255, 255, 0.34);
  background: color-mix(in srgb, var(--color-mossy-main) 74%, rgba(255, 255, 255, 0.16));
  backdrop-filter: blur(16px) saturate(180%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    0 4px 24px rgba(0, 0, 0, 0.12);
}

.navbar__link:hover:not(.router-link-active):not(.router-link-exact-active) {
  background: color-mix(in srgb, var(--color-mossy-main) 18%, rgba(255, 255, 255, 0.12));
  border-color: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(16px) saturate(180%);
}

.navbar__icon {
  @apply text-xs uppercase tracking-[0.16em];
}

.navbar__label {
  @apply leading-none;
}

.navbar__logout {
  @apply bg-mossy-main text-white;
}

.navbar__logout:hover {
  @apply bg-mossy-400;
}
</style>