<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from './BaseButton.vue'

interface BaseSearchBarProps {
  modelValue?: string
  placeholder?: string
  ariaLabel?: string
  searchLabel?: string
  clearLabel?: string
  searchHandler?: (query: string) => void
  dataTestid?: string
}

const props = withDefaults(defineProps<BaseSearchBarProps>(), {
  modelValue: '',
  placeholder: 'Search subjects',
  ariaLabel: 'Search subjects',
  searchLabel: 'Search',
  clearLabel: 'Clear search',
  dataTestid: 'base-search-bar',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  search: [value: string]
  clear: []
}>()

const currentValue = computed(() => props.modelValue ?? '')
const hasValue = computed(() => currentValue.value.trim().length > 0)

function updateValue(event: Event) {
  const input = event.target as HTMLInputElement

  emit('update:modelValue', input.value)
}

function submitSearch() {
  const query = currentValue.value.trim()

  emit('search', query)
  props.searchHandler?.(query)
}

function clearSearch() {
  emit('update:modelValue', '')
  emit('clear')
  emit('search', '')
  props.searchHandler?.('')
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key !== 'Enter') {
    return
  }

  event.preventDefault()
  submitSearch()
}
</script>

<template>
  <div class="base-search-bar" role="search" :data-testid="dataTestid">
    <label class="base-search-bar__field">
      <span class="sr-only">{{ ariaLabel }}</span>

      <input
        class="base-search-bar__input"
        type="search"
        :value="currentValue"
        :placeholder="placeholder"
        :aria-label="ariaLabel"
        @input="updateValue"
        @keydown="handleKeydown"
      />

      <button
        v-if="hasValue"
        class="base-search-bar__clear"
        type="button"
        :aria-label="clearLabel"
        @click="clearSearch"
      >
        {{ clearLabel }}
      </button>
    </label>

    <BaseButton
      class="base-search-bar__submit"
      variant="bordered"
      type="button"
      :data-testid="`${dataTestid}-submit`"
      @click="submitSearch"
    >
      {{ searchLabel }}
    </BaseButton>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.base-search-bar {
  @apply flex w-full flex-col gap-3 sm:flex-row sm:items-stretch;
}

.base-search-bar__field {
  @apply relative flex min-h-14 min-w-0 flex-1 items-center rounded-3xl border border-primary-50 bg-primary/5 transition;
}

.base-search-bar__field:focus-within {
  border-color: var(--color-mossy-main);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-mossy-main) 16%, transparent);
}

.base-search-bar__input {
  @apply min-w-0 w-full border-0 bg-transparent py-4 pl-4 pr-24 text-base leading-6 text-primary placeholder:text-primary-300 focus:outline-none;
}

.base-search-bar__input::placeholder {
  color: var(--color-primary-300);
}

.base-search-bar__clear {
  @apply absolute right-3 top-1/2 inline-flex -translate-y-1/2 items-center rounded-full border border-primary-50 bg-white px-3 py-1 text-xs font-semibold text-primary-400 transition;
}

.base-search-bar__clear:hover {
  @apply border-mossy-main text-mossy-main;
}

.base-search-bar__clear:focus-visible {
  @apply outline-none ring-2 ring-mossy-pale/40;
}

.base-search-bar__submit {
  @apply h-14 shrink-0 px-6;
}

@media (max-width: 639px) {
  .base-search-bar__submit {
    @apply w-full;
  }
}
</style>
