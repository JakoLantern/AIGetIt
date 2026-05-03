<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseButton from '../components/Common/BaseButton.vue'
import BaseCard from '../components/Common/BaseCard.vue'
import BaseProgressBar from '../components/Common/BaseProgressBar.vue'
import type { LessonDetail } from '../types/lesson'

const route = useRoute()
const router = useRouter()

const lessons: Record<string, LessonDetail> = {
  'cell-structure-review': {
    id: 'cell-structure-review',
    title: 'Cell Structure Review',
    subject: 'Biology',
    progress: 84,
    summary: 'Review the structures, functions, and relationships inside a living cell.',
    modules: [
      {
        id: 'module-1',
        title: 'Organelles and functions',
        summary: 'Identify the major organelles and what each one contributes to the cell.',
        progress: 92,
        status: 'Completed',
      },
      {
        id: 'module-2',
        title: 'Membrane transport',
        summary: 'Compare passive and active transport and how materials move through cells.',
        progress: 74,
        status: 'In progress',
      },
      {
        id: 'module-3',
        title: 'Cell communication',
        summary: 'Look at how cells signal, respond, and coordinate across systems.',
        progress: 48,
        status: 'Needs review',
      },
      {
        id: 'module-4',
        title: 'Practice checkpoint',
        summary: 'Run a quick self-check to confirm the cell concepts are sticking.',
        progress: 28,
        status: 'Next up',
      },
    ],
  },
  'membrane-transport': {
    id: 'membrane-transport',
    title: 'Membrane Transport',
    subject: 'Biology',
    progress: 62,
    summary: 'Practice diffusion, osmosis, and active transport patterns.',
    modules: [
      {
        id: 'module-1',
        title: 'Passive transport',
        summary: 'Review diffusion and osmosis across the membrane.',
        progress: 80,
        status: 'Completed',
      },
      {
        id: 'module-2',
        title: 'Active transport',
        summary: 'Compare energy use and transport proteins.',
        progress: 55,
        status: 'In progress',
      },
      {
        id: 'module-3',
        title: 'Checkpoint quiz',
        summary: 'Test whether transport examples are landing.',
        progress: 31,
        status: 'Needs review',
      },
    ],
  },
}

const lesson = computed(() => lessons[String(route.params.lessonId)] ?? lessons['cell-structure-review'])
const moduleCount = computed(() => lesson.value.modules.length)

function goBackToSubjects() {
  router.push({ name: 'subjects' })
}
</script>

<template>
  <section class="single-lesson">
    <div class="single-lesson__container">
      <BaseButton
        variant="bordered"
        type="button"
        class="single-lesson__back-button"
        data-testid="single-lesson-back-button"
        @click="goBackToSubjects"
      >
        Back to subjects
      </BaseButton>

      <header class="single-lesson__hero" aria-labelledby="single-lesson-title">
        <p class="single-lesson__eyebrow">{{ lesson.subject }}</p>
        <h1 id="single-lesson-title" class="single-lesson__title">{{ lesson.title }}</h1>
        <p class="single-lesson__copy">{{ lesson.summary }}</p>

        <div class="single-lesson__hero-meta">
          <span class="single-lesson__meta-pill">{{ moduleCount }} modules</span>
          <BaseProgressBar
            :value="lesson.progress"
            size="lg"
            showPercentage
            label="Lesson progress"
            customColor="var(--color-mossy-main)"
          />
        </div>
      </header>

      <section class="single-lesson__modules" aria-labelledby="single-lesson-modules-heading">
        <div class="single-lesson__section-header">
          <div>
            <p class="single-lesson__section-kicker">Modules</p>
            <h2 id="single-lesson-modules-heading" class="single-lesson__section-title">
              What is inside this lesson
            </h2>
          </div>
        </div>

        <div class="single-lesson__module-list">
          <BaseCard
            v-for="module in lesson.modules"
            :key="module.id"
            rounded="lg"
            variant="secondary"
            class="single-lesson__module-card"
          >
            <template #header>
              <div class="single-lesson__module-header">
                <div>
                  <p class="single-lesson__module-tag">Module</p>
                  <h3 class="single-lesson__module-title">{{ module.title }}</h3>
                </div>

                <span class="single-lesson__module-status">{{ module.status }}</span>
              </div>
            </template>

            <p class="single-lesson__module-copy">{{ module.summary }}</p>

            <BaseProgressBar
              :value="module.progress"
              size="md"
              :showPercentage="true"
              :label="`${module.title} progress`"
              customColor="var(--color-mossy-main)"
            />
          </BaseCard>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
@reference "../assets/main.css";

.single-lesson {
  width: 100%;
}

.single-lesson__container {
  @apply mx-auto flex max-w-[100rem] flex-col gap-8 px-6 py-8 md:px-8 md:py-8 lg:px-12 lg:py-12;
}

.single-lesson__back-button {
  @apply w-fit;
}

.single-lesson__hero {
  @apply flex max-w-6xl flex-col gap-4;
}

.single-lesson__eyebrow {
  @apply m-0 inline-flex w-fit items-center rounded-full border px-4 py-2 text-sm font-medium leading-none text-mossy-main;
  border-color: rgba(34, 197, 94, 0.25);
  background: rgba(34, 197, 94, 0.08);
}

.single-lesson__title {
  @apply m-0 text-3xl font-semibold tracking-tight text-primary lg:text-5xl;
}

.single-lesson__copy {
  @apply m-0 max-w-2xl text-base leading-7 text-primary-200;
}

.single-lesson__hero-meta {
  @apply flex flex-col gap-4 md:flex-row md:items-end md:justify-between;
}

.single-lesson__meta-pill {
  @apply inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-mossy-main;
  border-color: rgba(34, 197, 94, 0.25);
  background: rgba(34, 197, 94, 0.08);
}

.single-lesson__modules {
  @apply flex flex-col gap-4;
}

.single-lesson__section-header {
  @apply flex items-center justify-between gap-4;
}

.single-lesson__section-kicker,
.single-lesson__module-tag {
  @apply m-0 text-xs font-semibold uppercase tracking-[0.2em] text-mossy-pale;
}

.single-lesson__section-title {
  @apply m-0 text-2xl font-semibold tracking-tight text-primary;
}

.single-lesson__module-list {
  @apply flex flex-col gap-4;
}

.single-lesson__module-card {
  @apply w-full;
}

.single-lesson__module-header {
  @apply flex flex-col gap-3 md:flex-row md:items-center md:justify-between;
}

.single-lesson__module-title {
  @apply m-0 text-lg font-semibold text-primary;
}

.single-lesson__module-status {
  @apply inline-flex w-fit flex-none items-center rounded-full border px-3 py-1 text-xs font-semibold text-mossy-main;
  border-color: rgba(34, 197, 94, 0.25);
  background: rgba(34, 197, 94, 0.08);
}

.single-lesson__module-copy {
  @apply m-0 text-sm leading-6 text-primary-200;
}
</style>