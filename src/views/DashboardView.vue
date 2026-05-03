<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import BaseButton from '../components/Common/BaseButton.vue'
import BaseCard from '../components/Common/BaseCard.vue'
import BaseProgressBar from '../components/Common/BaseProgressBar.vue'
import SchedulingCalendar, {
  type CalendarEvent,
} from '../components/Calendar/SchedulingCalendar.vue'
import { useAuthStore } from '../stores/auth'

type TopicCard = {
  title: string
  copy: string
  progress: number
  tag: string
}

type Flashcard = {
  front: string
  back: string
  tag: string
}

type Deadline = {
  date: string
  title: string
  time: string
}

type ProficiencyStat = {
  label: string
  value: string
  progress: number
}

const router = useRouter()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const learnerName = computed(() => {
  const profile = user.value

  return (
    profile?.user_metadata?.full_name ??
    profile?.user_metadata?.name ??
    profile?.email?.split('@')[0] ??
    'Learner'
  )
})

const learningProgress = 72
const streakCount = 12
const currentSubject = 'Biology'

const topicCards: TopicCard[] = [
  {
    title: 'Cell structure',
    copy: 'Review organelles and how they support the whole system.',
    progress: 86,
    tag: 'Core topic',
  },
  {
    title: 'Membrane transport',
    copy: 'Lock in diffusion, osmosis, and active transport patterns.',
    progress: 64,
    tag: 'In progress',
  },
  {
    title: 'Genetics basics',
    copy: 'Practice inheritance rules, allele pairs, and outcomes.',
    progress: 48,
    tag: 'Needs review',
  },
  {
    title: 'Ecology loops',
    copy: 'Refresh ecosystems, energy flow, and population balance.',
    progress: 78,
    tag: 'Strong area',
  },
]

const flashcards: Flashcard[] = [
  {
    front: 'What moves through the cell membrane?',
    back: 'Small molecules and ions can move by diffusion, osmosis, or active transport.',
    tag: 'Biology',
  },
  {
    front: 'What is the role of the nucleus?',
    back: 'It stores the genetic material and controls cell activity.',
    tag: 'Recall',
  },
  {
    front: 'What is a phenotype?',
    back: 'It is the observable expression of a trait.',
    tag: 'Genetics',
  },
  {
    front: 'What is energy transfer in food chains?',
    back: 'Energy passes from producers to consumers, with losses at each stage.',
    tag: 'Ecology',
  },
]

const deadlines: Deadline[] = [
  {
    date: 'Mon 29 Apr',
    title: 'Chemistry quiz review',
    time: '4:00 PM',
  },
  {
    date: 'Wed 01 May',
    title: 'History worksheet upload',
    time: '11:30 AM',
  },
  {
    date: 'Fri 03 May',
    title: 'Biology practice set',
    time: '6:00 PM',
  },
]

const scheduleEvents: CalendarEvent[] = [
  {
    start: '2026-04-29 09:00',
    end: '2026-04-29 10:00',
    title: 'Biology review',
    content: 'Revisit cell structure and membrane transport.',
  },
  {
    start: '2026-04-30 15:30',
    end: '2026-04-30 16:15',
    title: 'Quiz practice',
    content: 'Run through quick recall questions.',
  },
  {
    start: '2026-05-02 18:00',
    end: '2026-05-02 18:45',
    title: 'Deadline check-in',
    content: 'Prepare uploads and finish review notes.',
  },
]

const proficiencyStats: ProficiencyStat[] = [
  {
    label: 'Accuracy',
    value: '84%',
    progress: 84,
  },
  {
    label: 'Consistency',
    value: '5 days',
    progress: 68,
  },
  {
    label: 'Confidence',
    value: 'Medium',
    progress: 55,
  },
]

function goToLessons() {
  router.push('/lessons')
}

function goToUpload() {
  router.push('/upload')
}

function goToQuizzes() {
  router.push('/quizzes')
}
</script>

<template>
  <section class="dashboard">
    <div class="dashboard__container">
      <header class="dashboard__hero" aria-labelledby="dashboard-title">
        <p class="dashboard__eyebrow">Private dashboard</p>
        <h1 id="dashboard-title" class="dashboard__title">Welcome back, {{ learnerName }}</h1>
        <p class="dashboard__subtitle">
          This is your learning lane for flashcards, topic review, and guided practice.
        </p>
      </header>

      <div class="dashboard__grid">
        <main class="dashboard__main" aria-label="Main study feed">
          <section class="dashboard__section" aria-labelledby="currently-learning-heading">
            <BaseCard
              rounded="lg"
              data-testid="dashboard-currently-learning"
              class="dashboard__learning-card"
            >
              <template #header>
                <div class="dashboard__card-header">
                  <div>
                    <p class="dashboard__section-kicker">Currently Learning</p>
                    <h2 id="currently-learning-heading" class="dashboard__section-title">
                      {{ currentSubject }} focus session
                    </h2>
                  </div>

                  <BaseButton
                    variant="bordered"
                    type="button"
                    data-testid="dashboard-continue-button"
                    @click="goToLessons"
                  >
                    Continue
                  </BaseButton>
                </div>
              </template>

              <p class="dashboard__section-copy">
                Keep momentum with a short session on {{ currentSubject.toLowerCase() }} and finish
                the review path before your next quiz.
              </p>

              <BaseProgressBar
                label="Session progress"
                :value="learningProgress"
                :showPercentage="true"
                size="lg"
                data-testid="dashboard-learning-progress"
              />

              <div class="dashboard__learning-stats">
                <div class="dashboard__learning-stat">
                  <span class="dashboard__learning-stat-label">Focus streak</span>
                  <span class="dashboard__learning-stat-value">{{ streakCount }} days</span>
                </div>

                <div class="dashboard__learning-stat">
                  <span class="dashboard__learning-stat-label">Next up</span>
                  <span class="dashboard__learning-stat-value">Membrane transport</span>
                </div>

                <div class="dashboard__learning-stat">
                  <span class="dashboard__learning-stat-label">Saved time</span>
                  <span class="dashboard__learning-stat-value">18 min</span>
                </div>
              </div>
            </BaseCard>
          </section>

          <section class="dashboard__section" aria-labelledby="topics-heading">
            <div class="dashboard__section-heading-row">
              <div>
                <p class="dashboard__section-kicker">Topics</p>
                <h2 id="topics-heading" class="dashboard__section-title">
                  Your current focus areas
                </h2>
              </div>

              <BaseButton
                variant="bordered"
                type="button"
                data-testid="dashboard-upload-button"
                @click="goToUpload"
              >
                Upload notes
              </BaseButton>
            </div>

            <div class="dashboard__topics-grid">
              <BaseCard
                v-for="topic in topicCards"
                :key="topic.title"
                rounded="lg"
                :data-testid="`dashboard-topic-${topic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`"
                class="dashboard__topic-card"
              >
                <template #header>
                  <div class="dashboard__topic-header">
                    <p class="dashboard__topic-tag">{{ topic.tag }}</p>
                    <span class="dashboard__topic-progress">{{ topic.progress }}%</span>
                  </div>
                </template>

                <h3 class="dashboard__topic-title">{{ topic.title }}</h3>
                <p class="dashboard__topic-copy">{{ topic.copy }}</p>

                <BaseProgressBar
                  :value="topic.progress"
                  size="sm"
                  :customColor="'var(--color-mossy-pale)'"
                  :showPercentage="false"
                  :label="`${topic.progress}% complete`"
                  data-testid="dashboard-topic-progress"
                />
              </BaseCard>
            </div>
          </section>

          <section class="dashboard__section" aria-labelledby="flashcards-heading">
            <div class="dashboard__section-heading-row">
              <div>
                <p class="dashboard__section-kicker">Flashcards</p>
                <h2 id="flashcards-heading" class="dashboard__section-title">
                  Swipe through quick recall
                </h2>
              </div>

              <BaseButton
                variant="bordered"
                type="button"
                data-testid="dashboard-quizzes-button"
                @click="goToQuizzes"
              >
                Start quiz
              </BaseButton>
            </div>

            <div class="dashboard__flashcards-list" aria-label="Flashcards preview list">
              <BaseCard
                v-for="card in flashcards"
                :key="card.front"
                rounded="lg"
                noPadding
                :data-testid="`dashboard-flashcard-${card.tag.toLowerCase()}`"
                class="dashboard__flashcard-card"
              >
                <div class="dashboard__flashcard-content">
                  <p class="dashboard__flashcard-tag">{{ card.tag }}</p>
                  <p class="dashboard__flashcard-front">{{ card.front }}</p>
                  <p class="dashboard__flashcard-back">{{ card.back }}</p>
                </div>
              </BaseCard>
            </div>
          </section>

          <section class="dashboard__section" aria-labelledby="proficiency-heading">
            <BaseCard
              rounded="lg"
              data-testid="dashboard-proficiency-card"
              class="dashboard__proficiency-card"
            >
              <template #header>
                <div class="dashboard__section-heading-row">
                  <div>
                    <p class="dashboard__section-kicker">Proficiency</p>
                    <h2 id="proficiency-heading" class="dashboard__section-title">
                      Your study summary
                    </h2>
                  </div>

                  <span class="dashboard__proficiency-badge">On track</span>
                </div>
              </template>

              <p class="dashboard__section-copy">
                You are building a solid foundation. Focus the next session on weak spots and keep
                the repetition tight.
              </p>

              <div class="dashboard__proficiency-grid">
                <article
                  v-for="stat in proficiencyStats"
                  :key="stat.label"
                  class="dashboard__proficiency-stat"
                >
                  <div class="dashboard__proficiency-stat-row">
                    <span class="dashboard__proficiency-stat-label">{{ stat.label }}</span>
                    <span class="dashboard__proficiency-stat-value">{{ stat.value }}</span>
                  </div>

                  <BaseProgressBar
                    :value="stat.progress"
                    size="sm"
                    :showPercentage="false"
                    :label="`${stat.label} progress`"
                    data-testid="dashboard-proficiency-progress"
                  />
                </article>
              </div>
            </BaseCard>
          </section>
        </main>

        <aside class="dashboard__right-rail" data-testid="dashboard-right-rail">
          <div class="dashboard__right-rail-stack">
            <BaseCard
              rounded="lg"
              data-testid="dashboard-daily-streak"
              class="dashboard__rail-card"
            >
              <template #header>
                <div class="dashboard__rail-header">
                  <span
                    class="dashboard__rail-icon dashboard__rail-icon--streak"
                    aria-hidden="true"
                  >
                    7
                  </span>
                  <div>
                    <p class="dashboard__rail-kicker text-warning">Daily Streak</p>
                    <h3 class="dashboard__rail-title">{{ streakCount }} day streak</h3>
                  </div>
                </div>
              </template>

              <p class="dashboard__rail-copy">
                One more review session keeps the streak alive and the habit strong.
              </p>
            </BaseCard>

            <SchedulingCalendar
              :events="scheduleEvents"
              class="dashboard__rail-calendar"
              data-testid="dashboard-calendar"
            />

            <BaseCard rounded="lg" data-testid="dashboard-deadlines" class="dashboard__rail-card">
              <template #header>
                <div class="dashboard__rail-header">
                  <span class="dashboard__rail-icon" aria-hidden="true">!</span>
                  <div>
                    <p class="dashboard__rail-kicker">Upcoming Deadlines</p>
                    <h3 class="dashboard__rail-title">Keep these in sight</h3>
                  </div>
                </div>
              </template>

              <ul class="dashboard__deadline-list" aria-label="Upcoming deadlines">
                <li
                  v-for="deadline in deadlines"
                  :key="deadline.title"
                  class="dashboard__deadline-item"
                >
                  <div>
                    <p class="dashboard__deadline-date">{{ deadline.date }}</p>
                    <p class="dashboard__deadline-title">{{ deadline.title }}</p>
                  </div>
                  <span class="dashboard__deadline-time">{{ deadline.time }}</span>
                </li>
              </ul>
            </BaseCard>

            <BaseCard
              rounded="lg"
              data-testid="dashboard-coach"
              class="dashboard__coach-card"
              customBgColor="color-mix(in srgb, var(--color-primary) 5%, var(--color-white))"
            >
              <template #header>
                <div class="dashboard__rail-header">
                  <span class="dashboard__rail-icon dashboard__rail-icon--coach" aria-hidden="true">
                    AI
                  </span>
                  <div>
                    <p class="dashboard__rail-kicker">AI Study Coach</p>
                    <h3 class="dashboard__rail-title">Need a quick nudge?</h3>
                  </div>
                </div>
              </template>

              <div class="dashboard__coach-tip" role="note" aria-label="AI study coach tip">
                <p class="dashboard__coach-tip-copy">
                  You haven't brushed up on {{ currentSubject }} yet.
                </p>
              </div>

              <template #footer>
                <BaseButton
                  variant="glassy"
                  type="button"
                  data-testid="dashboard-coach-button"
                  @click="goToLessons"
                >
                  Open coach
                </BaseButton>
              </template>
            </BaseCard>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "../assets/main.css";

.dashboard {
  @apply w-full;
}

.dashboard__container {
  @apply mx-auto max-w-[100rem] px-6 py-8 md:px-8 md:py-8 lg:px-12 lg:py-12;
}

.dashboard__hero {
  @apply flex max-w-6xl flex-col gap-4;
}

.dashboard__eyebrow {
  @apply m-0 inline-flex w-fit items-center rounded-full border px-4 py-2 text-sm font-medium leading-none text-mossy-main;
  border-color: rgba(34, 197, 94, 0.25);
  background: rgba(34, 197, 94, 0.08);
}

.dashboard__title {
  @apply m-0 text-3xl font-semibold tracking-tight text-primary lg:text-5xl;
}

.dashboard__subtitle {
  @apply m-0 max-w-2xl text-base leading-7 text-primary-200;
}

.dashboard__grid {
  @apply flex flex-col gap-8 md:gap-6 lg:grid lg:grid-cols-12 lg:gap-6;
}

.dashboard__main {
  @apply order-1 flex flex-col gap-8 lg:order-none lg:col-span-8;
}

.dashboard__right-rail {
  @apply order-2 flex flex-col gap-5 lg:order-none lg:col-span-4 lg:sticky lg:top-[calc(var(--navbar-height,64px)+1.5rem)] lg:h-fit;
}

.dashboard__right-rail-stack {
  @apply flex flex-col gap-5;
}

.dashboard__rail-calendar {
  @apply w-full;
}

.dashboard__section {
  @apply flex flex-col gap-4;
}

.dashboard__card-header,
.dashboard__section-heading-row,
.dashboard__rail-header,
.dashboard__topic-header,
.dashboard__proficiency-stat-row,
.dashboard__progress-meta {
  @apply flex flex-col gap-4 md:flex-row md:items-center md:justify-between;
}

.dashboard__section-kicker,
.dashboard__topic-tag,
.dashboard__rail-kicker,
.dashboard__learning-stat-label,
.dashboard__proficiency-stat-label {
  @apply m-0 text-xs font-semibold uppercase tracking-[0.2em] text-mossy-pale;
}

.dashboard__section-title {
  @apply m-0 text-2xl font-semibold tracking-tight text-primary;
}

.dashboard__section-copy,
.dashboard__rail-copy,
.dashboard__coach-tip-copy,
.dashboard__topic-copy {
  @apply m-0 text-sm leading-6 text-primary-200;
}

.dashboard__learning-card,
.dashboard__proficiency-card,
.dashboard__rail-card,
.dashboard__coach-card,
.dashboard__topic-card {
  @apply w-full;
}

.dashboard__learning-stat-value,
.dashboard__proficiency-stat-value,
.dashboard__deadline-time {
  @apply text-sm font-semibold text-primary;
}

.dashboard__learning-stats,
.dashboard__proficiency-grid {
  @apply grid grid-cols-1 gap-4 md:grid-cols-3;
}

.dashboard__learning-stat,
.dashboard__proficiency-stat {
  @apply rounded-2xl bg-primary-30 p-4;
}

.dashboard__learning-stat {
  @apply flex flex-col gap-2;
}

.dashboard__learning-stat-value {
  @apply text-base;
}

.dashboard__topics-grid {
  @apply grid grid-cols-1 gap-4 md:grid-cols-2;
}

.dashboard__topic-card {
  @apply flex flex-col gap-4;
}

.dashboard__topic-title {
  @apply m-0 text-lg font-semibold text-primary;
}

.dashboard__topic-progress {
  @apply text-sm font-semibold text-mossy-main;
}

.dashboard__flashcards-list {
  @apply flex gap-4 overflow-x-auto pb-2;
}

.dashboard__flashcard-card {
  @apply min-w-64 shrink-0;
}

.dashboard__flashcard-content {
  @apply flex h-full min-h-56 flex-col gap-4 rounded-[inherit];
}

.dashboard__flashcard-tag {
  @apply m-0 inline-flex w-fit items-center rounded-full bg-mossy-main px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white;
}

.dashboard__flashcard-front {
  @apply m-0 text-lg font-semibold leading-7 text-primary;
}

.dashboard__flashcard-back {
  @apply m-0 text-sm leading-6 text-primary-200;
}

.dashboard__proficiency-badge {
  @apply inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold text-mossy-main;
  border-color: rgba(34, 197, 94, 0.25);
  background: rgba(34, 197, 94, 0.08);
}

.dashboard__rail-card,
.dashboard__coach-card {
  @apply flex flex-col gap-4;
}

.dashboard__rail-icon {
  @apply inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-mossy-main text-sm font-bold text-white;
}

.dashboard__rail-icon--streak {
  @apply bg-warning-main text-white;
}

.dashboard__rail-icon--coach {
  @apply bg-primary text-white;
}

.dashboard__rail-title {
  @apply m-0 text-lg font-semibold text-primary;
}

.dashboard__deadline-list {
  @apply m-0 grid gap-3 p-0;
  list-style: none;
}

.dashboard__deadline-item {
  @apply flex items-start justify-between gap-4 rounded-2xl bg-primary-50 p-4;
}

.dashboard__deadline-date,
.dashboard__deadline-title {
  @apply m-0;
}

.dashboard__deadline-date {
  @apply text-xs font-semibold uppercase tracking-[0.18em] text-mossy-pale;
}

.dashboard__deadline-title {
  @apply mt-2 text-sm font-semibold text-primary;
}

.dashboard__coach-tip {
  @apply rounded-3xl border border-primary-50 bg-white px-4 py-4 shadow-sm;
}

.dashboard__coach-tip-copy {
  @apply m-0 rounded-2xl bg-primary-50 px-4 py-4 text-sm leading-6 text-primary;
}

.dashboard__learning-stats {
  @apply md:grid-cols-3;
}

.dashboard__proficiency-grid {
  @apply md:grid-cols-2 lg:grid-cols-3;
}
</style>
