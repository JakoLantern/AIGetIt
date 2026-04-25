<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseButton from '../components/Common/BaseButton.vue'
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

        <BaseButton variant="mossy" type="submit" data-testid="login-submit">
          Sign in
        </BaseButton>
      </form>
    </div>
  </section>
</template>

<style scoped>
@reference "../assets/main.css";

.login-page {
  @apply flex min-h-[calc(100vh-7rem)] items-center justify-center px-4 py-10 sm:px-6 lg:px-8;
  background:
    radial-gradient(circle at top, rgba(186, 192, 149, 0.16), transparent 38%),
    radial-gradient(circle at bottom right, rgba(15, 23, 42, 0.04), transparent 34%),
    linear-gradient(180deg, #ffffff 0%, rgba(247, 249, 244, 0.9) 100%);
}

.login-page__text {
  @apply flex flex-col;
}

.login-page__card {
  @apply w-full max-w-2xl rounded-3xl border border-primary-50 bg-primary/5 p-8 shadow-lg backdrop-blur-md;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    0 12px 36px rgba(15, 23, 42, 0.08);
}

.login-page__title {
  @apply m-0 text-3xl font-bold tracking-tight text-primary;
}

.login-page__subtitle {
  @apply mt-4 text-sm leading-6 text-mossy-pale;
}

.login-page__form {
  @apply mt-8 grid gap-5;
}

.login-page__field {
  @apply grid gap-2;
}

.login-page__label {
  @apply text-sm font-medium text-primary;
}

.login-page__input {
  @apply w-full rounded-2xl border border-primary-50 bg-primary/5 px-4 py-3 text-primary outline-none transition placeholder:text-primary-300;
}

.login-page__input:focus-visible {
  border-color: var(--color-mossy-main);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-mossy-main) 16%, transparent);
}

.login-page__error {
  @apply m-0 rounded-2xl border border-danger-main bg-danger-30 px-4 py-3 text-sm text-danger-main;
}
</style>
