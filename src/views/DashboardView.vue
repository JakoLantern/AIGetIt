<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const { user, authStatus } = storeToRefs(authStore)
</script>

<template>
  <section class="dashboard-page">
    <div class="dashboard-page__hero">
      <p class="dashboard-page__badge">Private dashboard</p>
      <h1 class="dashboard-page__title">Welcome back, {{ user?.name ?? 'Learner' }}</h1>
      <p class="dashboard-page__subtitle">
        {{ authStatus }}. This private space is ready for flashcards, progress analysis, and guided study
        workflows.
      </p>
    </div>

    <section class="dashboard-page__grid" aria-label="Dashboard summary">
      <article class="dashboard-card">
        <p class="dashboard-card__label">Flashcards</p>
        <h2 class="dashboard-card__title">Create and review faster</h2>
        <p class="dashboard-card__copy">
          Turn notes into structured review cards and keep learning focused.
        </p>
      </article>

      <article class="dashboard-card">
        <p class="dashboard-card__label">Analysis</p>
        <h2 class="dashboard-card__title">See your test patterns</h2>
        <p class="dashboard-card__copy">
          Track strengths, weak points, and progress trends in one place.
        </p>
      </article>

      <article class="dashboard-card">
        <p class="dashboard-card__label">Guidance</p>
        <h2 class="dashboard-card__title">Use AI when you need support</h2>
        <p class="dashboard-card__copy">
          Get targeted explanations and study support while you work.
        </p>
      </article>
    </section>
  </section>
</template>

<style scoped>
@reference "tailwindcss";

.dashboard-page {
  --dashboard-border: rgba(255, 255, 255, 0.1);
  --dashboard-surface: rgba(255, 255, 255, 0.05);
  --dashboard-muted: #cbd5e1;
  @apply flex flex-col gap-10;
}

.dashboard-page__hero {
  @apply max-w-3xl;
}

.dashboard-page__badge {
  @apply mb-4 inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium leading-none;
  border-color: rgba(34, 211, 238, 0.3);
  background: rgba(34, 211, 238, 0.1);
  color: #a5f3fc;
}

.dashboard-page__title {
  @apply m-0 font-semibold tracking-tight text-white;
  font-size: clamp(1.875rem, 4vw, 2.25rem);
}

.dashboard-page__subtitle {
  @apply mt-4 max-w-2xl text-sm leading-6 sm:text-base;
  color: var(--dashboard-muted);
}

.dashboard-page__grid {
  @apply grid gap-5 md:grid-cols-3;
}

.dashboard-card {
  @apply rounded-3xl p-6 shadow-2xl backdrop-blur;
  border: 1px solid var(--dashboard-border);
  background: var(--dashboard-surface);
}

.dashboard-card__label {
  @apply m-0 text-xs font-semibold uppercase tracking-[0.2em];
  color: #7dd3fc;
}

.dashboard-card__title {
  @apply mt-4 text-xl font-semibold text-white;
}

.dashboard-card__copy {
  @apply mt-3 text-sm leading-6;
  color: var(--dashboard-muted);
}
</style>