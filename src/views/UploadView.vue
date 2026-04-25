<script setup lang="ts">
import BaseButton from '../components/Common/BaseButton.vue'

function handleUploadClick() {
  // Placeholder for the upload flow.
}
</script>

<template>
  <section class="upload-page">
    <div class="upload-page__hero">
      <p class="upload-page__badge">Private upload area</p>
      <h1 class="upload-page__title">Upload your study material</h1>
      <p class="upload-page__subtitle">
        Bring in notes, PDFs, or screenshots and get them ready for flashcards, review, and analysis.
      </p>
    </div>

    <section class="upload-page__panel" aria-label="Upload panel">
      <div class="upload-page__dropzone">
        <p class="upload-page__dropzone-label">Drop files here</p>
        <p class="upload-page__dropzone-copy">
          Supported formats: PDF, PNG, JPG, and plain text notes.
        </p>

        <BaseButton variant="glassy" type="button" data-testid="upload-button" @click="handleUploadClick">
          Choose files
        </BaseButton>
      </div>

      <article class="upload-page__card">
        <p class="upload-page__card-label">What happens next</p>
        <ul class="upload-page__steps">
          <li>Files are prepared for flashcard generation.</li>
          <li>Key topics are extracted for review sessions.</li>
          <li>Results can be reused across lessons and quizzes.</li>
        </ul>
      </article>
    </section>
  </section>
</template>

<style scoped>
@reference "../assets/main.css";

.upload-page {
  @apply flex min-h-screen flex-col gap-10 px-6 py-10 text-white;
  background:
    radial-gradient(circle at top left, rgba(34, 197, 94, 0.2), transparent 42%),
    radial-gradient(circle at top right, rgba(255, 255, 255, 0.08), transparent 30%),
    linear-gradient(180deg, var(--color-mossy-dark) 0%, #08110b 100%);
}

.upload-page__hero {
  @apply max-w-3xl;
}

.upload-page__badge {
  @apply mb-4 inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium leading-none;
  border-color: rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.08);
}

.upload-page__title {
  @apply m-0 font-semibold tracking-tight;
  font-size: clamp(2rem, 4vw, 3rem);
}

.upload-page__subtitle {
  @apply mt-4 max-w-2xl text-sm leading-6 sm:text-base;
  color: rgba(255, 255, 255, 0.8);
}

.upload-page__panel {
  @apply grid gap-6 lg:grid-cols-[1.2fr_0.8fr];
}

.upload-page__dropzone,
.upload-page__card {
  @apply rounded-3xl border p-8 shadow-2xl backdrop-blur;
  border-color: rgba(255, 255, 255, 0.24);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px) saturate(180%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.38),
    0 8px 30px rgba(0, 0, 0, 0.14);
}

.upload-page__dropzone {
  @apply flex flex-col items-start justify-between gap-6;
  min-height: 320px;
}

.upload-page__dropzone-label,
.upload-page__card-label {
  @apply m-0 text-xs font-semibold uppercase tracking-[0.2em];
  color: #f8fafc;
}

.upload-page__dropzone-copy {
  @apply m-0 max-w-xl text-sm leading-6;
  color: rgba(255, 255, 255, 0.82);
}

.upload-page__steps {
  @apply m-0 grid gap-4 pl-5 text-sm leading-6;
  color: rgba(255, 255, 255, 0.82);
}

@media (min-width: 768px) {
  .upload-page {
    @apply px-10 py-12;
  }
}

@media (min-width: 1024px) {
  .upload-page {
    @apply px-12 py-14;
  }
}
</style>