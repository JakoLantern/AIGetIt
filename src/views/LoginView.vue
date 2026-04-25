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

async function handleLogin() {
  const success = await authStore.login(form.email.trim(), form.password)

  if (!success) {
    return
  }

  await router.replace(resolveRedirect())
}
</script>

<template>
  <section class="login-page">
    <div class="login-page__card">
      <div class="login-page__text">
        <h1 class="login-page__title">Sign in</h1>
        <p class="login-page__subtitle">Fill in the fields below to access your account.</p>
      </div>

      <form class="login-page__form" @submit.prevent="handleLogin">
        <label class="login-page__field" for="login-email">
          <span class="login-page__label">Email</span>
          <input
            id="login-email"
            v-model="form.email"
            placeholder="youremailhere@example.com"
            class="login-page__input"
            data-testid="login-email"
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
            placeholder="Enter your password"
            class="login-page__input"
            data-testid="login-password"
            autocomplete="current-password"
            required
            type="password"
          />
        </label>

        <p v-if="authStore.error" class="login-page__error" role="alert">
          {{ authStore.error }}
        </p>

        <button class="login-page__button" type="submit" data-testid="login-submit">Sign in</button>
      </form>
    </div>
  </section>
</template>

<style scoped>
@reference "../assets/main.css";

.login-page {
  @apply flex min-h-[calc(100vh-7rem)] items-center justify-center px-4;
}

.login-page__text {
  @apply flex flex-col;
}

.login-page__card {
  @apply w-full max-w-xl rounded-3xl border border-primary-30 bg-white p-8 shadow-lg backdrop-blur;
}

.login-page__title {
  @apply m-0 text-3xl font-semibold tracking-tight text-slate-900;
}

.login-page__subtitle {
  @apply mt-4 text-sm text-secondary-main leading-6;
}

.login-page__form {
  @apply mt-8 grid gap-5;
}

.login-page__field {
  @apply grid gap-2;
}

.login-page__label {
  @apply text-sm font-medium text-slate-700;
}

.login-page__input {
  @apply w-full rounded-2xl border bg-white px-4 py-3 text-slate-900 outline-none transition;
}

.login-page__input:focus-visible {
  @apply border-mossy-main;
}

.login-page__error {
  @apply m-0 rounded-2xl border border-danger-main bg-danger-30 px-4 py-3 text-sm text-danger-main;
}

.login-page__button {
  @apply inline-flex items-center justify-center rounded-full bg-mossy-main px-6 py-3 text-base font-semibold text-white transition;
}

.login-page__button:hover {
  @apply bg-mossy-dark;
}
</style>
