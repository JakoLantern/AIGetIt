<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="home-page">
    <div class="home-page__hero">
      <p class="home-page__badge">AI-powered learning support</p>

      <h1 class="home-page__title">AI Get It</h1>

      <p class="home-page__subtitle">
        Turn study material into flashcards, understand performance with test results analysis, and learn
        faster with guided AI support.
      </p>

      <RouterLink class="home-page__cta" to="/login" data-testid="home-cta-link">
        Sign in to start
      </RouterLink>
    </div>

    <section class="home-page__features" aria-label="Core features">
      <article class="feature-card feature-card--cyan">
        <p class="feature-card__index">01</p>
        <h2 class="feature-card__title">Creating flashcards</h2>
        <p class="feature-card__description">
          Build review-ready flashcards from your notes in a few clicks.
        </p>
      </article>

      <article class="feature-card feature-card--emerald">
        <p class="feature-card__index">02</p>
        <h2 class="feature-card__title">Test results analysis</h2>
        <p class="feature-card__description">
          Spot strengths, gaps, and patterns in your results without manual number crunching.
        </p>
      </article>

      <article class="feature-card feature-card--violet">
        <p class="feature-card__index">03</p>
        <h2 class="feature-card__title">AI assisted learning</h2>
        <p class="feature-card__description">
          Get guided explanations and study support when you need a smarter way forward.
        </p>
      </article>
    </section>
  </section>
</template>

<style scoped>
@reference "tailwindcss";

.home-page {
  --home-badge: rgba(34, 211, 238, 0.1);
  --home-border: rgba(255, 255, 255, 0.1);
  --home-card-bg: rgba(255, 255, 255, 0.05);
  --home-muted: #cbd5e1;
  @apply flex flex-col gap-10;
}

.home-page__hero {
  @apply max-w-3xl;
}

.home-page__badge {
  @apply mb-4 inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium leading-none;
  border-color: rgba(34, 211, 238, 0.3);
  background: var(--home-badge);
  color: #a5f3fc;
}

.home-page__title {
  @apply m-0 font-semibold tracking-tight text-white;
  font-size: clamp(3rem, 7vw, 4.75rem);
  line-height: 0.95;
}

.home-page__subtitle {
  @apply mt-6 max-w-2xl leading-8;
  color: var(--home-muted);
  font-size: clamp(1.125rem, 2vw, 1.25rem);
}

.home-page__cta {
  @apply mt-8 inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-base font-semibold text-slate-950 no-underline transition;
}

.home-page__cta:hover {
  @apply bg-cyan-300;
  transform: translateY(-1px);
}

.home-page__features {
  @apply grid gap-5;
}

.feature-card {
  @apply rounded-3xl p-6 shadow-2xl backdrop-blur;
  border: 1px solid var(--home-border);
  background: var(--home-card-bg);
  box-shadow: 0 25px 50px rgba(8, 15, 31, 0.25);
}

.feature-card__index {
  @apply m-0 text-sm font-semibold uppercase tracking-[0.2em];
}

.feature-card__title {
  @apply mt-4 text-2xl font-semibold text-white;
}

.feature-card__description {
  @apply mt-3 text-sm leading-6;
  color: var(--home-muted);
}

.feature-card--cyan .feature-card__index {
  color: #67e8f9;
}

.feature-card--emerald .feature-card__index {
  color: #6ee7b7;
}

.feature-card--violet .feature-card__index {
  color: #c4b5fd;
}

@media (min-width: 768px) {
  .home-page__features {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>