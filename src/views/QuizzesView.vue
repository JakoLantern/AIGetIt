<template>
  <section class="quizzes-page">
    <h1 class="quizzes-page__title">Quizzes</h1>
    <p class="quizzes-page__copy">This area will hold your quiz activity and results.</p>
  </section>
</template>

<style scoped>
@reference "tailwindcss";

.quizzes-page {
  --quizzes-muted: #cbd5e1;
  @apply rounded-3xl border p-8;
  border-color: rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
}

.quizzes-page__title {
  @apply m-0 text-3xl font-semibold tracking-tight text-white;
}

.quizzes-page__copy {
  @apply mt-4 text-sm leading-6;
  color: var(--quizzes-muted);
}
</style>