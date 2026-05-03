<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import BaseAccordion from '../components/Common/BaseAccordion.vue'
import BaseButton from '../components/Common/BaseButton.vue'
import BaseCard from '../components/Common/BaseCard.vue'
import BaseProgressBar from '../components/Common/BaseProgressBar.vue'
import BaseSearchBar from '../components/Common/BaseSearchBar.vue'
import type { SubjectGroup } from '../interfaces/subject'

const router = useRouter()

const subjectGroups: SubjectGroup[] = [
  {
    id: 'biology-foundations',
    name: 'Biology',
    description: 'Core building blocks, transport, and ecosystem review.',
    competencies: [
      {
        id: 'cell-structure-review',
        title: 'Cell Structure Review',
        summary: 'Revisit organelles, membranes, and how cells stay organized.',
        progress: 84,
        status: 'Current lesson',
        duration: '18 min',
      },
      {
        id: 'membrane-transport',
        title: 'Membrane Transport',
        summary: 'Practice diffusion, osmosis, and active transport patterns.',
        progress: 62,
        status: 'In progress',
        duration: '12 min',
      },
      {
        id: 'genetics-fundamentals',
        title: 'Genetics Fundamentals',
        summary: 'Lock in inheritance, genotype, phenotype, and allele rules.',
        progress: 48,
        status: 'Needs review',
        duration: '22 min',
      },
    ],
  },
  {
    id: 'chemistry-essentials',
    name: 'Chemistry',
    description: 'Matter, reactions, and the math behind chemical behavior.',
    competencies: [
      {
        id: 'bonding-basics',
        title: 'Bonding Basics',
        summary: 'Review ionic, covalent, and metallic bonding patterns.',
        progress: 76,
        status: 'Current lesson',
        duration: '16 min',
      },
      {
        id: 'reaction-rates',
        title: 'Reaction Rates',
        summary: 'Explore collision theory, catalysts, and rate changes.',
        progress: 53,
        status: 'In progress',
        duration: '14 min',
      },
      {
        id: 'periodic-trends',
        title: 'Periodic Trends',
        summary: 'Refresh atomic radius, electronegativity, and ionization energy.',
        progress: 39,
        status: 'Needs review',
        duration: '20 min',
      },
    ],
  },
  {
    id: 'ecology-systems',
    name: 'Ecology',
    description: 'Energy flow, habitats, and the balance of populations.',
    competencies: [
      {
        id: 'ecology-systems-review',
        title: 'Ecology Systems',
        summary: 'Refresh energy flow, ecosystems, and population balance.',
        progress: 71,
        status: 'Ready for revision',
        duration: '19 min',
      },
      {
        id: 'food-webs',
        title: 'Food Webs',
        summary: 'Trace producer and consumer relationships in a simple food web.',
        progress: 58,
        status: 'In progress',
        duration: '11 min',
      },
      {
        id: 'population-dynamics',
        title: 'Population Dynamics',
        summary: 'Look at growth curves, limiting factors, and carrying capacity.',
        progress: 44,
        status: 'Needs review',
        duration: '15 min',
      },
    ],
  },
]

const searchQuery = ref('')
const appliedSearchQuery = ref('')

watch(searchQuery, (value) => {
  if (!value.trim()) {
    appliedSearchQuery.value = ''
  }
})

const normalizedQuery = computed(() => appliedSearchQuery.value.trim().toLowerCase())

const filteredSubjectGroups = computed(() => {
  if (!normalizedQuery.value) {
    return subjectGroups
  }

  return subjectGroups
    .map((group) => {
      const groupMatches = [group.name, group.description]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery.value)

      const competencies = groupMatches
        ? group.competencies
        : group.competencies.filter((competency) => {
            const searchableText = [
              competency.title,
              competency.summary,
              competency.status,
              competency.duration,
            ]
              .join(' ')
              .toLowerCase()

            return searchableText.includes(normalizedQuery.value)
          })

      if (!groupMatches && competencies.length === 0) {
        return null
      }

      return {
        ...group,
        competencies,
      }
    })
    .filter((group): group is SubjectGroup => group !== null)
})

const subjectSummary = computed(() => {
  if (!normalizedQuery.value) {
    return 'View current subjects and keep track of what is next in your study flow.'
  }

  const count = filteredSubjectGroups.value.length
  const noun = count === 1 ? 'subject' : 'subjects'

  return `Showing ${count} ${noun} for "${appliedSearchQuery.value.trim()}".`
})

function handleSubjectSearch(query: string) {
  appliedSearchQuery.value = query
}

function openCompetency(lessonId: string) {
  router.push({ name: 'single-lesson', params: { lessonId } })
}
</script>

<template>
  <section class="lessons-page">
    <div class="lessons-page__container">
      <header class="lessons-page__hero" aria-labelledby="lessons-title">
        <p class="lessons-page__eyebrow">Learning lane</p>
        <h1 id="lessons-title" class="lessons-page__title">Subjects</h1>
        <p class="lessons-page__copy">{{ subjectSummary }}</p>
      </header>

      <section class="lessons-page__search-section" aria-labelledby="lessons-search-heading">
        <BaseCard rounded="lg" class="lessons-page__search-card">
          <template #header>
            <div class="lessons-page__section-header">
              <div>
                <p class="lessons-page__section-kicker">Current subjects</p>
                <h2 id="lessons-search-heading" class="lessons-page__section-title">
                  Find the subject you need
                </h2>
              </div>
            </div>
          </template>

          <BaseSearchBar
            v-model="searchQuery"
            placeholder="Search subjects, topics, or notes..."
            aria-label="Search subjects"
            search-label="Search"
            clear-label="Clear"
            :search-handler="handleSubjectSearch"
            data-testid="lessons-search-bar"
          />
        </BaseCard>
      </section>

      <section class="lessons-page__results" aria-labelledby="lessons-results-heading">
        <div class="lessons-page__section-header lessons-page__section-header--results">
          <div>
            <p class="lessons-page__section-kicker">Current subjects</p>
            <h2 id="lessons-results-heading" class="lessons-page__section-title">Study list</h2>
          </div>

          <BaseButton variant="bordered" type="button" class="lessons-page__section-action">
            Add a subject
          </BaseButton>
        </div>

        <div v-if="filteredSubjectGroups.length" class="lessons-page__subject-list">
          <BaseAccordion
            v-for="group in filteredSubjectGroups"
            :key="group.id"
            :data-testid="`subject-accordion-${group.id}`"
            class="lessons-page__subject-accordion"
          >
            <template #header>
              <span class="lessons-page__accordion-kicker">Subject</span>
              <span class="lessons-page__accordion-title">{{ group.name }}</span>
              <span class="lessons-page__accordion-subtitle"
                >{{ group.competencies.length }} competencies</span
              >
            </template>

            <template #body>
              <p class="lessons-page__subject-copy">
                {{ group.description }}
              </p>

              <div class="lessons-page__competency-list" aria-label="Competencies in subject">
                <BaseCard
                  v-for="competency in group.competencies"
                  :key="competency.id"
                  variant="secondary"
                  rounded="lg"
                  clickable
                  noPadding
                  class="lessons-page__competency-row"
                  @click="openCompetency(competency.id)"
                >
                  <div class="lessons-page__competency-row-layout">
                    <div class="lessons-page__competency-copy">
                      <p class="lessons-page__competency-tag">{{ competency.duration }}</p>
                      <div class="lessons-page__competency-title-row">
                        <h4 class="lessons-page__competency-title">{{ competency.title }}</h4>
                        <span class="lessons-page__lesson-status">{{ competency.status }}</span>
                      </div>
                      <p class="lessons-page__competency-summary">{{ competency.summary }}</p>
                    </div>

                    <div class="lessons-page__competency-analytics">
                      <BaseProgressBar
                        :value="competency.progress"
                        size="lg"
                        :showPercentage="true"
                        :label="'Your progress'"
                        customColor="var(--color-mossy-100)"
                      />
                    </div>
                  </div>
                </BaseCard>
              </div>
            </template>
          </BaseAccordion>
        </div>

        <BaseCard v-else rounded="lg" class="lessons-page__empty-state">
          <p class="lessons-page__empty-title">No subjects match this search.</p>
          <p class="lessons-page__empty-copy">Try a broader subject name or clear the search.</p>
        </BaseCard>
      </section>
    </div>
  </section>
</template>

<style scoped>
@reference "../assets/main.css";

.lessons-page {
  width: 100%;
}

.lessons-page__container {
  @apply mx-auto flex max-w-[100rem] flex-col gap-8 px-6 py-8 md:px-8 md:py-8 lg:px-12 lg:py-12;
}

.lessons-page__hero {
  @apply flex max-w-6xl flex-col gap-4;
}

.lessons-page__eyebrow {
  @apply m-0 inline-flex w-fit items-center rounded-full border px-4 py-2 text-sm font-medium leading-none text-mossy-main;
  border-color: rgba(34, 197, 94, 0.25);
  background: rgba(34, 197, 94, 0.08);
}

.lessons-page__title {
  @apply m-0 text-3xl font-semibold tracking-tight text-primary lg:text-5xl;
}

.lessons-page__copy {
  @apply m-0 max-w-2xl text-base leading-7 text-primary-200;
}

.lessons-page__search-section,
.lessons-page__results {
  @apply flex flex-col gap-4;
}

.lessons-page__section-header {
  @apply flex flex-col gap-3 md:flex-row md:items-center md:justify-between;
}

.lessons-page__section-header--results {
  @apply items-start md:items-center;
}

.lessons-page__section-kicker,
.lessons-page__lesson-tag {
  @apply m-0 text-xs font-semibold uppercase tracking-[0.2em] text-mossy-pale;
}

.lessons-page__section-title {
  @apply m-0 text-2xl font-semibold tracking-tight text-primary;
}

.lessons-page__results-count,
.lessons-page__lesson-progress,
.lessons-page__lesson-status {
  @apply inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold;
}

.lessons-page__results-count {
  @apply border text-mossy-main;
  border-color: rgba(34, 197, 94, 0.25);
  background: rgba(34, 197, 94, 0.08);
}

.lessons-page__section-action {
  @apply self-start;
}

.lessons-page__subject-list {
  @apply flex flex-col gap-4;
}

.lessons-page__subject-accordion,
.lessons-page__search-card,
.lessons-page__empty-state {
  @apply w-full;
}

.lessons-page__accordion-kicker {
  @apply m-0 text-xs font-semibold uppercase tracking-[0.2em] text-mossy-pale;
}

.lessons-page__accordion-title {
  @apply text-left text-lg font-semibold tracking-tight text-primary;
}

.lessons-page__accordion-subtitle {
  @apply text-left text-sm font-medium text-primary-200;
}

.lessons-page__subject-copy {
  @apply m-0 text-sm leading-6 text-primary-200;
}

.lessons-page__competency-list {
  @apply flex flex-col gap-4;
}

.lessons-page__competency-row {
  @apply w-full;
}

.lessons-page__competency-row-layout {
  @apply flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between;
}

.lessons-page__competency-copy {
  @apply flex min-w-0 flex-1 flex-col gap-2;
}

.lessons-page__competency-title-row {
  @apply flex flex-wrap items-center gap-3;
}

.lessons-page__competency-tag {
  @apply m-0 text-xs font-semibold uppercase tracking-[0.2em] text-mossy-pale;
}

.lessons-page__competency-title {
  @apply m-0 text-lg font-semibold text-primary;
}

.lessons-page__competency-summary {
  @apply m-0 text-sm leading-6 text-primary-200;
}

.lessons-page__competency-analytics {
  @apply w-full md:max-w-sm md:flex-none;
}

.lessons-page__lesson-status {
  @apply inline-flex w-fit flex-none border text-mossy-main;
  border-color: rgba(34, 197, 94, 0.25);
  background: rgba(34, 197, 94, 0.08);
}

.lessons-page__empty-copy {
  @apply m-0 text-sm leading-6 text-primary-200;
}

.lessons-page__empty-title {
  @apply m-0 text-lg font-semibold text-primary;
}
</style>
