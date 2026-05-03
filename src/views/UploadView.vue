<script setup lang="ts">
import BaseButton from '../components/Common/BaseButton.vue'
import BaseIcon from '../components/Common/BaseIcon.vue'
</script>

<template>
  <section class="upload-view">
    <div class="upload-view__shell">
      <header class="upload-hero">
        <div class="upload-hero__lottie" aria-hidden="true" />

        <div class="upload-hero__copy">
          <h1 class="upload-hero__title">What shall we study today?</h1>
          <p class="upload-hero__subtitle">Upload or type anything you wish to study</p>
        </div>
      </header>

      <div class="upload-view__composer-wrap">
        <div class="upload-input-group" role="group" aria-label="Study input composer">
          <button class="upload-input-group__add" type="button" aria-label="Add files">
            <BaseIcon name="plus" :size="20" class="upload-input-group__icon" />
          </button>

          <label class="upload-input-group__field">
            <span class="sr-only">Study topic or notes</span>
            <input
              class="upload-input-group__input"
              type="text"
              placeholder="Topic, textbook chapter, or paste notes..."
            />
          </label>

          <BaseButton
            class="upload-input-group__submit"
            variant="mossy"
            type="button"
            data-testid="upload-submit-button"
          >
            <BaseIcon name="arrow-up" :size="18" class="upload-input-group__submit-icon" />
            <span>Send</span>
          </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "../assets/main.css";

.upload-view {
  @apply flex h-[100vh] items-center justify-center px-4 pb-28 pt-10 sm:px-6 lg:px-8 lg:pb-16;
  background:
    radial-gradient(circle at top, rgba(186, 192, 149, 0.16), transparent 38%),
    radial-gradient(circle at bottom right, rgba(15, 23, 42, 0.04), transparent 34%),
    linear-gradient(180deg, #ffffff 0%, rgba(247, 249, 244, 0.9) 100%);
}

.upload-view__shell {
  @apply grid w-full max-w-6xl gap-12 lg:grid-cols-12 lg:items-center;
}

.upload-hero {
  @apply flex flex-col items-center gap-6 text-center lg:col-span-12;
}

.upload-hero__lottie {
  @apply h-32 w-32 rounded-full bg-mossy-pale/20 shadow-sm animate-pulse;
}

.upload-hero__copy {
  @apply flex flex-col items-center gap-3;
}

.upload-hero__title {
  @apply m-0 text-4xl font-bold tracking-tight text-primary;
}

.upload-hero__subtitle {
  @apply m-0 max-w-2xl text-lg leading-snug text-mossy-pale;
}

.upload-view__composer-wrap {
  @apply w-full lg:col-start-3 lg:col-span-8;
}

.upload-input-group {
  @apply flex w-full items-stretch gap-3 rounded-3xl border border-primary-50 bg-primary/5 p-3 transition;
}

.upload-input-group:focus-within {
  border-color: var(--color-mossy-main);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-mossy-main) 16%, transparent);
}

.upload-input-group__add {
  @apply inline-flex h-14 w-14 flex-none items-center justify-center rounded-2xl border border-primary-50 bg-white text-primary transition;
}

.upload-input-group__add:hover {
  @apply border-mossy-main text-mossy-main;
}

.upload-input-group__add:focus-visible {
  @apply outline-none ring-2 ring-mossy-pale/40;
}

.upload-input-group__icon,
.upload-input-group__submit-icon {
  @apply shrink-0;
}

.upload-input-group__field {
  @apply flex min-w-0 flex-1 items-center;
}

.upload-input-group__input {
  @apply min-w-0 w-full border-0 bg-transparent px-2 text-base leading-6 text-primary placeholder:text-primary-300 focus:outline-none;
}

.upload-input-group__input::placeholder {
  color: var(--color-primary-300);
}

.upload-input-group__submit {
  @apply h-14 gap-2 px-6 text-base shadow-sm;
}

@media (max-width: 639px) {
  .upload-input-group {
    @apply flex-col;
  }

  .upload-input-group__add,
  .upload-input-group__submit {
    @apply w-full;
  }

  .upload-input-group__field {
    @apply min-h-14 rounded-2xl bg-white px-4;
  }
}

@media (min-width: 640px) {
  .upload-input-group__field {
    @apply px-1;
  }
}

@media (min-width: 1024px) {
  .upload-view {
    @apply px-12;
  }
}
</style>
