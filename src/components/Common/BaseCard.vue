<script setup lang="ts">
import { computed } from 'vue'

export type BaseCardRounded = 'none' | 'sm' | 'md' | 'lg' | 'full'
export type BaseCardVariant = 'mossy' | 'glassy'

interface BaseCardProps {
  variant?: BaseCardVariant
  rounded?: BaseCardRounded
  customBorderColor?: string
  customBgColor?: string
  customHoverBgColor?: string
  customHoverTextColor?: string
  noPadding?: boolean
  dataTestid?: string
}

const props = withDefaults(defineProps<BaseCardProps>(), {
  variant: 'mossy',
  rounded: 'md',
  noPadding: false,
  dataTestid: 'base-card',
})

const roundedClassMap: Record<BaseCardRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-3xl',
}

const cardClasses = computed(() => [
  'base-card',
  `base-card--${props.variant}`,
  `base-card--${props.rounded}`,
  roundedClassMap[props.rounded],
  {
    'base-card--no-padding': props.noPadding,
    'p-4': !props.noPadding,
  },
])

const cardStyle = computed(() => {
  const style: Record<string, string> = {}

  if (props.customBorderColor) {
    style['--base-card-border'] = props.customBorderColor
  }

  if (props.customBgColor) {
    style['--base-card-background'] = props.customBgColor
  }

  if (props.variant !== 'glassy' && props.customHoverBgColor) {
    style['--base-card-background-hover'] = props.customHoverBgColor
    style['--base-card-border-hover'] = props.customHoverBgColor
  }

  if (props.variant !== 'glassy' && props.customHoverTextColor) {
    style['--base-card-text-hover'] = props.customHoverTextColor
  }

  if (props.variant === 'glassy') {
    style['--base-card-background-hover'] = style['--base-card-background'] ?? 'var(--base-card-background)'
    style['--base-card-border-hover'] = style['--base-card-border'] ?? 'var(--base-card-border)'
    style['--base-card-text-hover'] = style['--base-card-text'] ?? 'var(--base-card-text)'
  }

  return style
})
</script>

<template>
  <article :class="cardClasses" :style="cardStyle" :data-testid="dataTestid">
    <header v-if="$slots.header" class="base-card__header">
      <slot name="header" />
    </header>

    <div class="base-card__body">
      <slot />
    </div>

    <footer v-if="$slots.footer" class="base-card__footer">
      <slot name="footer" />
    </footer>
  </article>
</template>

<style scoped>
@reference "../../assets/main.css";

.base-card {
  --base-card-background: var(--color-white);
  --base-card-border: var(--color-primary-50);
  --base-card-text: var(--color-primary);
  @apply border bg-white shadow-md;
  background-color: var(--base-card-background);
  border-color: var(--base-card-border);
  color: var(--base-card-text);
  transition-property: background-color, border-color, color, box-shadow, transform;
}

.base-card--glassy {
  --base-card-background: rgba(255, 255, 255, 0.1);
  --base-card-border: rgba(255, 255, 255, 0.25);
  --base-card-text: var(--color-primary);
  border-width: 1px;
  background-color: var(--base-card-background);
  border-color: var(--base-card-border);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    0 4px 24px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(16px) saturate(180%);
}

.base-card--no-padding {
  @apply p-0;
}

.base-card__header,
.base-card__body,
.base-card__footer {
  @apply w-full;
}

.base-card__body {
  @apply flex flex-col gap-4;
}

.base-card__header + .base-card__body {
  @apply mt-0;
}

.base-card__footer {
  @apply mt-4;
}
</style>
