<script setup lang="ts">
import { computed } from 'vue'

export type BaseProgressBarSize = 'sm' | 'md' | 'lg'

interface BaseProgressBarProps {
  value: number
  max?: number
  label?: string
  showPercentage?: boolean
  size?: BaseProgressBarSize
  customColor?: string
}

const props = withDefaults(defineProps<BaseProgressBarProps>(), {
  max: 100,
  showPercentage: false,
  size: 'md',
})

const normalizedMax = computed(() => Math.max(props.max, 1))
const clampedValue = computed(() => Math.min(Math.max(props.value, 0), normalizedMax.value))
const progressPercentage = computed(() => (clampedValue.value / normalizedMax.value) * 100)
const displayPercentage = computed(() => Math.round(progressPercentage.value))
const hasInfo = computed(() => Boolean(props.label || props.showPercentage))

const trackClass = computed(() => [
  'progress-bar__track',
  `progress-bar__track--${props.size}`,
])

const fillStyle = computed(() => {
  const style: Record<string, string> = {
    width: `${progressPercentage.value}%`,
  }

  if (props.customColor) {
    style['--progress-bar-fill'] = props.customColor
  }

  return style
})
</script>

<template>
  <div class="progress-bar">
    <div v-if="hasInfo" class="progress-bar__info">
      <span v-if="label" class="progress-bar__label">{{ label }}</span>
      <span v-if="showPercentage" class="progress-bar__percentage">{{ displayPercentage }}%</span>
    </div>

    <div
      :class="trackClass"
      role="progressbar"
      :aria-valuemin="0"
      :aria-valuemax="normalizedMax"
      :aria-valuenow="clampedValue"
      :aria-label="label"
    >
      <div class="progress-bar__fill" :style="fillStyle" />
    </div>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.progress-bar {
  @apply flex flex-col gap-2;
}

.progress-bar__info {
  @apply flex items-center justify-between gap-4;
}

.progress-bar__label,
.progress-bar__percentage {
  @apply text-sm font-medium leading-none text-primary;
}

.progress-bar__track {
  @apply w-full overflow-hidden rounded-full bg-primary-100/10;
}

.progress-bar__track--sm {
  height: 4px;
}

.progress-bar__track--md {
  height: 8px;
}

.progress-bar__track--lg {
  height: 16px;
}

.progress-bar__fill {
  --progress-bar-fill: var(--color-mossy-pale);
  @apply h-full rounded-full transition-all duration-700 ease-in-out;
  width: 0;
  background-color: var(--progress-bar-fill);
}
</style>
