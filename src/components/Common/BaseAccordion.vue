<script setup lang="ts">
import { computed, ref } from 'vue'

interface BaseAccordionProps {
  defaultOpen?: boolean
  maxHeight?: number
  dataTestid?: string
}

const props = withDefaults(defineProps<BaseAccordionProps>(), {
  defaultOpen: false,
  maxHeight: 400,
  dataTestid: 'base-accordion',
})

const isOpen = ref(props.defaultOpen)

const accordionClasses = computed(() => [
  'base-accordion',
  {
    'base-accordion--open': isOpen.value,
  },
])

const panelStyle = computed(() => ({
  '--base-accordion-max-height': `${props.maxHeight}px`,
}))

function toggleAccordion() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <section :class="accordionClasses" :data-testid="dataTestid">
    <button
      class="base-accordion__trigger"
      type="button"
      :aria-expanded="isOpen"
      :aria-controls="`${dataTestid}-panel`"
      :data-testid="`${dataTestid}-trigger`"
      @click="toggleAccordion"
    >
      <span class="base-accordion__trigger-copy">
        <slot name="header" />
      </span>

      <span class="base-accordion__icon" aria-hidden="true">
        {{ isOpen ? '−' : '+' }}
      </span>
    </button>

    <div
      :id="`${dataTestid}-panel`"
      class="base-accordion__panel"
      :style="panelStyle"
      :aria-hidden="!isOpen"
    >
      <div class="base-accordion__panel-shell">
        <div class="base-accordion__body">
          <slot name="body" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "../../assets/main.css";

.base-accordion {
  @apply flex flex-col gap-4;
}

.base-accordion__trigger {
  --base-accordion-background: var(--color-white);
  --base-accordion-border: var(--color-primary-50);
  --base-accordion-text: var(--color-primary);
  @apply flex w-full items-center justify-between border shadow-md transition duration-200 ease-out;
  background-color: var(--base-accordion-background);
  border-color: var(--base-accordion-border);
  color: var(--base-accordion-text);
  padding: 1.25rem 1.25rem;
}

.base-accordion__trigger:hover {
  @apply cursor-pointer -translate-y-0.5 shadow-lg;
}

.base-accordion__trigger:focus-visible {
  @apply outline-none ring-2 ring-mossy-pale/40;
}

.base-accordion__trigger-copy {
  @apply flex min-w-0 flex-1 flex-col items-start gap-1 text-left;
}

.base-accordion__panel-shell {
  @apply rounded-3xl border p-4;
  border-color: rgba(201, 210, 188, 0.8);
  background: color-mix(in srgb, var(--color-mossy-30) 72%, var(--color-white));
}

.base-accordion__panel {
  @apply overflow-hidden transition-[max-height,opacity] duration-300 ease-out;
  max-height: 0;
  opacity: 0;
}

.base-accordion__icon {
  @apply inline-flex h-8 w-8 flex-none items-center justify-center rounded-full border text-lg font-semibold;
  border-color: rgba(34, 197, 94, 0.25);
  background: rgba(34, 197, 94, 0.08);
  color: var(--color-mossy-main);
}

.base-accordion--open .base-accordion__panel {
  opacity: 1;
  max-height: var(--base-accordion-max-height);
  overflow-y: auto;
}

.base-accordion__body {
  @apply flex flex-col gap-4;
}
</style>
