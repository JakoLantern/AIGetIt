<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseButton from '../components/Common/BaseButton.vue'

const router = useRouter()

function handleHeroCta() {
  router.push('/login')
}
</script>

<template>
  <main class="landing-page">
    <section class="landing-page__hero" aria-labelledby="landing-page-title">
      <div class="landing-page__hero-content">
        <div class="landing-page__hero-copy">
          <p class="landing-page__eyebrow">AI-powered learning support</p>

          <div class="landing-page__landing-content">
            <div class="landing-page__content-text">
              <h1 id="landing-page-title" class="landing-page__title">AI Get It</h1>

              <p class="landing-page__subtitle">
                Turn study material into flashcards, understand performance with test results
                analysis, and learn faster with guided AI support.
              </p>
            </div>

            <div class="max-w-[300px]">
                <BaseButton variant="mossy" data-testid="hero-cta" @click="handleHeroCta">
              Sign in to start
            </BaseButton>
            </div>
            
          </div>
        </div>
      </div>

      <div class="landing-page__transition" aria-hidden="true"></div>
    </section>

    <section class="landing-page__features" aria-labelledby="features-heading">
      <div class="landing-page__section-shell">
        <h2 id="features-heading" class="landing-page__section-title">Core Features</h2>

        <div class="features-grid">
          <article class="features-grid__item" data-testid="feature-card">
            <p class="features-grid__index">01</p>
            <h3 class="features-grid__title">Creating flashcards</h3>
            <p class="features-grid__copy">
              Build review-ready flashcards from your notes in a few clicks.
            </p>
          </article>

          <article class="features-grid__item" data-testid="feature-card">
            <p class="features-grid__index">02</p>
            <h3 class="features-grid__title">Test results analysis</h3>
            <p class="features-grid__copy">
              Spot strengths, gaps, and patterns in your results without manual number crunching.
            </p>
          </article>

          <article class="features-grid__item" data-testid="feature-card">
            <p class="features-grid__index">03</p>
            <h3 class="features-grid__title">AI assisted learning</h3>
            <p class="features-grid__copy">
              Get guided explanations and study support when you need a smarter way forward.
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="landing-page__message" aria-labelledby="message-heading">
      <div class="landing-page__section-shell landing-page__message-shell">
        <h2
          id="message-heading"
          class="landing-page__section-title landing-page__section-title--dark"
        >
          Message
        </h2>

        <div
          class="landing-page__editable"
          contenteditable="true"
          data-testid="footer-message"
          role="textbox"
          aria-multiline="true"
          aria-label="Editable message placeholder"
          spellcheck="false"
        >
          Editable text placeholder for announcements or welcome notes.
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
@reference "../assets/main.css";

.landing-page {
  @apply min-h-screen bg-white text-primary;
}

.landing-page__hero {
  @apply relative flex h-screen flex-col overflow-hidden;
}

.landing-page__hero-content {
  @apply relative z-10 flex flex-1 items-center px-6;
}

.landing-page__landing-content{
    @apply flex flex-col gap-10;
}

.landing-page__hero-copy {
  @apply mx-auto w-full max-w-6xl;
}

.landing-page__eyebrow {
  @apply mb-4 text-sm font-medium uppercase tracking-[0.24em] text-mossy-pale;
}

.landing-page__title {
  @apply m-0 text-5xl font-bold tracking-tight leading-none text-mossy-main sm:text-6xl lg:text-7xl;
}

.landing-page__subtitle {
  @apply mt-6 max-w-3xl text-lg leading-snug text-primary-200 sm:text-xl;
}

.landing-page__cta {
  @apply mt-8 inline-flex items-center justify-center rounded-full bg-mossy-main px-6 py-3 text-base font-semibold text-primary transition hover:bg-mossy-400;
}

.landing-page__transition {
  @apply absolute bottom-0 left-0 h-70 w-full pointer-events-none;
  background: linear-gradient(to bottom, transparent 0%, var(--color-mossy-dark) 100%);
}

.landing-page__features {
  @apply bg-mossy-dark px-6 py-16;
}

.landing-page__section-shell {
  @apply mx-auto w-full max-w-6xl;
}

.landing-page__section-title {
  @apply m-0 text-sm font-semibold uppercase tracking-[0.24em] text-mossy-light;
}

.landing-page__section-title--dark {
  @apply text-primary;
}

.features-grid {
  @apply mt-8 grid gap-6 md:grid-cols-3;
}

.features-grid__item {
  @apply rounded-3xl border border-primary-50 bg-primary/20 p-6 shadow-sm text-mossy-pale;
}

.features-grid__index {
  @apply m-0 text-sm font-semibold uppercase tracking-[0.24em] text-mossy-light;
}

.features-grid__title {
  @apply mt-4 text-2xl font-semibold leading-tight text-mossy-light;
}

.features-grid__copy {
  @apply mt-3 text-sm leading-relaxed;
}

.landing-page__message {
  @apply bg-white px-6 py-16;
}

.landing-page__message-shell {
  @apply rounded-3xl border border-primary-50 bg-mossy-30 p-8 shadow-sm;
}

.landing-page__editable {
  @apply mt-4 min-h-32 rounded-2xl border border-primary-50 bg-white p-4 text-base leading-relaxed text-primary outline-none transition;
}

.landing-page__editable:focus-visible {
  @apply border-mossy-main ring-2 ring-mossy-pale/40;
}

@media (min-width: 768px) {
  .landing-page__hero-content,
  .landing-page__features,
  .landing-page__message {
    @apply px-10;
  }
}

@media (min-width: 1024px) {
  .landing-page__hero-content,
  .landing-page__features,
  .landing-page__message {
    @apply px-12;
  }
}
</style>
