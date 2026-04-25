<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
})

function resolveRedirect() {
  const redirect = route.query.redirect

  if (typeof redirect === 'string' && redirect.startsWith('/')) {
    return redirect
  }

  return '/dashboard'
}

function handleLogin() {
  authStore.login({
    id: 'demo-user',
    name: 'Demo Learner',
    email: form.email.trim(),
  })

  router.replace(resolveRedirect())
}
</script>

<template>
  <section class="login-page">
    <div class="login-page__panel">
      <p class="login-page__badge">Secure study access</p>
      <h1 class="login-page__title">Sign in to AI Get It</h1>
      <p class="login-page__subtitle">
        Enter your details to access the private dashboard and continue your study workflow.
      </p>

      <form class="login-page__form" @submit.prevent="handleLogin">
        <label class="login-page__field" for="login-email">
          <span class="login-page__label">Email</span>
          <input
            id="login-email"
            v-model="form.email"
            class="login-page__input"
            data-testid="login-email-input"
            autocomplete="email"
            required
            type="email"
          />
        </label>

        <label class="login-page__field" for="login-password">
          <span class="login-page__label">Password</span>
          <input
            id="login-password"
            v-model="form.password"
            class="login-page__input"
            data-testid="login-password-input"
            autocomplete="current-password"
            required
            type="password"
          />
        </label>

        <button class="login-page__button" type="submit" data-testid="login-submit-button">
          Sign in
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped>
@reference "tailwindcss";

.login-page {
  @apply flex min-h-[calc(100vh-7rem)] items-center justify-center;
}

.login-page__panel {
  --login-surface: rgba(15, 23, 42, 0.92);
  --login-border: rgba(255, 255, 255, 0.1);
  @apply w-full max-w-xl rounded-3xl border p-8 shadow-2xl backdrop-blur;
  background: var(--login-surface);
  border-color: var(--login-border);
}

.login-page__badge {
  @apply mb-4 inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium leading-none;
  border-color: rgba(34, 211, 238, 0.3);
  background: rgba(34, 211, 238, 0.1);
  color: #a5f3fc;
}

.login-page__title {
  @apply m-0 text-3xl font-semibold tracking-tight text-white;
}

.login-page__subtitle {
  @apply mt-4 text-sm leading-6 text-slate-300;
}

.login-page__form {
  @apply mt-8 grid gap-5;
}

.login-page__field {
  @apply grid gap-2;
}

.login-page__label {
  @apply text-sm font-medium text-slate-200;
}

.login-page__input {
  @apply w-full rounded-2xl border bg-slate-950 px-4 py-3 text-slate-50 outline-none transition;
  border-color: var(--login-border);
}

.login-page__input:focus-visible {
  @apply border-cyan-400 ring-2 ring-cyan-400/30;
}

.login-page__button {
  @apply inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-base font-semibold text-slate-950 transition;
}

.login-page__button:hover {
  @apply bg-cyan-300;
}
</style>