<template>
  <section class="lessons-page">
    <h1 class="lessons-page__title">My Lessons</h1>
    <p class="lessons-page__copy">This area will hold your lesson list and study progress.</p>
  </section>
</template>

<style scoped>
@reference "tailwindcss";

.lessons-page {
  --lessons-muted: #cbd5e1;
  @apply rounded-3xl border p-8;
  border-color: rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
}

.lessons-page__title {
  @apply m-0 text-3xl font-semibold tracking-tight text-white;
}

.lessons-page__copy {
  @apply mt-4 text-sm leading-6;
  color: var(--lessons-muted);
}
</style>