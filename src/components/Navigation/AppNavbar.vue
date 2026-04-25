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
@reference "tailwindcss";

.navbar {
  --navbar-border: rgba(255, 255, 255, 0.1);
  --navbar-surface: rgba(15, 23, 42, 0.9);
  --navbar-muted: #cbd5e1;
  @apply rounded-3xl border backdrop-blur;
  border-color: var(--navbar-border);
  background: var(--navbar-surface);
}

.navbar__list {
  @apply flex flex-wrap items-center gap-3 p-4;
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
  @apply text-slate-300;
}

.navbar__link:hover,
.navbar__link.router-link-active,
.navbar__link.router-link-exact-active {
  @apply bg-white/10 text-white;
}

.navbar__icon {
  @apply text-xs uppercase tracking-[0.16em];
}

.navbar__label {
  @apply leading-none;
}

.navbar__logout {
  @apply bg-cyan-400 text-slate-950;
}

.navbar__logout:hover {
  @apply bg-cyan-300;
}
</style>