<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseCard from '../Common/BaseCard.vue'
import 'vue-cal/dist/vuecal.css'
import VueCal from 'vue-cal'

export interface CalendarEvent {
  start: string
  end: string
  title: string
  content: string
}

interface SchedulingCalendarEvent extends CalendarEvent {
  backgroundColor: string
  class: string
}

type CellClickPayload = Date | { date: Date }

const props = defineProps<{
  events: CalendarEvent[]
}>()

const selectedDate = ref<Date | null>(null)

const calendarEvents = computed<SchedulingCalendarEvent[]>(() =>
  props.events.map((event, index) => ({
    ...event,
    backgroundColor:
      index % 2 === 0 ? 'var(--color-mossy-light)' : 'var(--color-mossy-pale)',
    class: 'scheduling-calendar__event',
  })),
)

const selectedDateKey = computed(() => (selectedDate.value ? toDateKey(selectedDate.value) : null))

const selectedEvents = computed(() => {
  if (!selectedDateKey.value) {
    return []
  }

  return props.events.filter(
    (event) => toDateKey(parseCalendarDate(event.start)) === selectedDateKey.value,
  )
})

const selectedDateLabel = computed(() => {
  if (!selectedDate.value) {
    return ''
  }

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(selectedDate.value)
})

const hasSelection = computed(() => Boolean(selectedDate.value))
const hasSelectedEvents = computed(() => selectedEvents.value.length > 0)

function toDateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function parseCalendarDate(value: string) {
  return new Date(value.includes('T') ? value : value.replace(' ', 'T'))
}

function formatTimeRange(start: string, end: string) {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
  }

  const startLabel = new Intl.DateTimeFormat('en-US', options).format(parseCalendarDate(start))
  const endLabel = new Intl.DateTimeFormat('en-US', options).format(parseCalendarDate(end))

  return `${startLabel} - ${endLabel}`
}

function handleCellClick(payload: CellClickPayload) {
  selectedDate.value = 'date' in payload ? payload.date : payload
}
</script>

<template>
  <section class="scheduling-calendar" aria-label="Scheduling calendar" data-testid="scheduling-calendar">
    <BaseCard
      rounded="md"
      noPadding
      class="scheduling-calendar__surface"
      data-testid="scheduling-calendar-surface"
    >
      <VueCal
        :events="calendarEvents"
        active-view="month"
        :disable-views="['years', 'year', 'day']"
        :editable-events="false"
        :hide-view-selector="false"
        :events-on-month-view="false"
        class="scheduling-calendar__vuecal"
        @cell-click="handleCellClick"
      >
        <template #event="{ event }">
          <span
            class="scheduling-calendar__event-pill"
            :style="{ '--event-background': event.backgroundColor }"
          >
            {{ event.title }}
          </span>
        </template>
      </VueCal>
    </BaseCard>

    <BaseCard
      rounded="md"
      class="scheduling-calendar__detail-surface"
      data-testid="scheduling-calendar-detail"
    >
      <div
        v-if="!hasSelection"
        class="scheduling-calendar__empty-state"
        data-testid="scheduling-calendar-empty-state"
      >
        <p class="scheduling-calendar__detail-eyebrow">Event details</p>
        <h3 class="scheduling-calendar__detail-title">Select a date to preview events</h3>
        <p class="scheduling-calendar__detail-copy">
          Click any day in the calendar to reveal the scheduled cards for that date.
        </p>
      </div>

      <div
        v-else-if="!hasSelectedEvents"
        class="scheduling-calendar__empty-state"
        data-testid="scheduling-calendar-no-events-state"
      >
        <p class="scheduling-calendar__detail-eyebrow">{{ selectedDateLabel }}</p>
        <h3 class="scheduling-calendar__detail-title">No events scheduled</h3>
        <p class="scheduling-calendar__detail-copy">
          There are no study items on this date yet. Pick a different day to view cards.
        </p>
      </div>

      <div v-else class="scheduling-calendar__event-list" data-testid="scheduling-calendar-event-state">
        <div class="scheduling-calendar__detail-header">
          <div>
            <p class="scheduling-calendar__detail-eyebrow">{{ selectedDateLabel }}</p>
            <h3 class="scheduling-calendar__detail-title">
              {{ selectedEvents.length }} scheduled event{{ selectedEvents.length === 1 ? '' : 's' }}
            </h3>
          </div>
        </div>

        <article
          v-for="event in selectedEvents"
          :key="`${event.start}-${event.title}`"
          class="scheduling-calendar__detail-event"
          :style="{ '--event-background': event.backgroundColor }"
        >
          <div class="scheduling-calendar__detail-event-head">
            <p class="scheduling-calendar__detail-event-title">{{ event.title }}</p>
            <span class="scheduling-calendar__detail-event-time">
              {{ formatTimeRange(event.start, event.end) }}
            </span>
          </div>
          <p class="scheduling-calendar__detail-event-copy">{{ event.content }}</p>
        </article>
      </div>
    </BaseCard>
  </section>
</template>

<style scoped>
@reference "../../assets/main.css";

.scheduling-calendar {
  @apply flex flex-col gap-4;
}

.scheduling-calendar__surface {
  @apply overflow-hidden;
}

.scheduling-calendar__vuecal {
  @apply w-full;
}

.scheduling-calendar__event-pill {
  --event-background: var(--color-mossy-light);
  @apply inline-flex max-w-full items-center rounded-full border border-primary-50 px-2 py-1 text-xs font-medium text-primary;
  background-color: var(--event-background);
}

.scheduling-calendar__detail-surface {
  @apply w-full;
}

.scheduling-calendar__empty-state,
.scheduling-calendar__event-list {
  @apply flex flex-col gap-4;
}

.scheduling-calendar__detail-header {
  @apply flex items-center justify-between gap-4;
}

.scheduling-calendar__detail-eyebrow {
  @apply m-0 text-xs font-semibold uppercase tracking-[0.2em] text-mossy-pale;
}

.scheduling-calendar__detail-title {
  @apply m-0 text-lg font-semibold text-primary;
  line-height: var(--leading-subtext);
  letter-spacing: var(--tracking-tight);
}

.scheduling-calendar__detail-copy {
  @apply m-0 text-sm text-primary-200;
  line-height: var(--leading-subtext);
}

.scheduling-calendar__detail-event {
  --event-background: var(--color-mossy-light);
  @apply flex flex-col gap-2 rounded-md border border-primary-50 p-4 shadow-sm;
  background-color: var(--event-background);
}

.scheduling-calendar__detail-event-head {
  @apply flex items-center justify-between gap-4;
}

.scheduling-calendar__detail-event-title {
  @apply m-0 text-sm font-semibold text-primary;
}

.scheduling-calendar__detail-event-time {
  @apply text-xs font-semibold uppercase tracking-[0.16em] text-primary-200;
}

.scheduling-calendar__detail-event-copy {
  @apply m-0 text-sm leading-6 text-primary;
}

.scheduling-calendar__surface :deep(.vuecal) {
  @apply border-0 bg-transparent text-primary;
  font-family: inherit;
}

.scheduling-calendar__surface :deep(.vuecal__header) {
  @apply border-b border-primary-100/10 px-4 py-4;
}

.scheduling-calendar__surface :deep(.vuecal__menu) {
  @apply gap-2;
}

.scheduling-calendar__surface :deep(.vuecal__view-btn),
.scheduling-calendar__surface :deep(.vuecal__today-btn),
.scheduling-calendar__surface :deep(.vuecal__arrow) {
  @apply rounded-full border border-primary-100/10 px-3 py-2 text-sm font-medium text-primary transition;
  line-height: var(--leading-subtext);
  letter-spacing: var(--tracking-tight);
}

.scheduling-calendar__surface :deep(.vuecal__view-btn--active) {
  @apply border-mossy-main bg-mossy-main text-primary;
}

.scheduling-calendar__surface :deep(.vuecal__view-btn--highlighted),
.scheduling-calendar__surface :deep(.vuecal__today-btn--highlighted),
.scheduling-calendar__surface :deep(.vuecal__arrow--highlighted) {
  @apply border-primary bg-primary-30;
}

.scheduling-calendar__surface :deep(.vuecal__title) {
  @apply text-sm font-semibold text-primary;
  line-height: var(--leading-subtext);
  letter-spacing: var(--tracking-tight);
}

.scheduling-calendar__surface :deep(.vuecal__cells) {
  @apply bg-transparent;
}

.scheduling-calendar__surface :deep(.vuecal__cell) {
  @apply border-primary-100/10 bg-primary-30;
}

.scheduling-calendar__surface :deep(.vuecal__cell--today) {
  @apply border-primary text-primary;
}

.scheduling-calendar__surface :deep(.vuecal__cell--selected) {
  @apply bg-mossy-main text-primary;
}

.scheduling-calendar__surface :deep(.vuecal__cell--selected .vuecal__cell-date),
.scheduling-calendar__surface :deep(.vuecal__cell--selected .vuecal__cell-content) {
  @apply text-primary;
}

.scheduling-calendar__surface :deep(.vuecal__cell-date),
.scheduling-calendar__surface :deep(.vuecal__cell-content) {
  @apply text-primary;
  line-height: var(--leading-subtext);
  letter-spacing: var(--tracking-tight);
}

.scheduling-calendar__surface :deep(.vuecal__cell-events),
.scheduling-calendar__surface :deep(.vuecal__cell-events-count) {
  @apply bg-transparent;
}

.scheduling-calendar__surface :deep(.vuecal__event) {
  @apply border-0 p-0 shadow-none;
  background: transparent;
}

.scheduling-calendar__surface :deep(.vuecal__event-title),
.scheduling-calendar__surface :deep(.vuecal__event-content) {
  @apply text-primary;
}

.scheduling-calendar__surface :deep(.vuecal__event--background) {
  @apply opacity-100;
}

.scheduling-calendar__surface :deep(.vuecal__cell--out-of-scope) {
  @apply bg-transparent text-primary-200;
}

.scheduling-calendar__surface :deep(.vuecal__cell--disabled) {
  @apply bg-primary-30 text-primary-200;
}

.scheduling-calendar__surface :deep(.vuecal__weekdays-headings),
.scheduling-calendar__surface :deep(.vuecal__weekdays-headings .weekdays-headings) {
  @apply bg-transparent;
}

.scheduling-calendar__surface :deep(.vuecal__cell .vuecal__cell-content),
.scheduling-calendar__surface :deep(.vuecal__cell .vuecal__cell-date) {
  @apply transition-colors;
}

.scheduling-calendar__surface :deep(.vuecal__header),
.scheduling-calendar__surface :deep(.vuecal__body) {
  @apply bg-transparent;
}
</style>
