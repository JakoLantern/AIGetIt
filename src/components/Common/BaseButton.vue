<script setup lang="ts">
import { computed } from 'vue'

export type BaseButtonVariant = 'mossy' | 'glassy' | 'bordered'

interface BaseButtonProps {
  variant?: BaseButtonVariant
  customColor?: string
  customTextColor?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  dataTestid?: string
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
  variant: 'mossy',
  type: 'button',
  disabled: false,
  dataTestid: 'base-button',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClass = computed(() => [
  'base-button',
  `base-button--${props.variant}`,
  {
    'base-button--disabled': props.disabled,
  },
])

const buttonStyle = computed(() => {
  const style: Record<string, string> = {}

  if (props.customColor) {
    style['--base-button-accent'] = props.customColor
  }

  if (props.customTextColor) {
    style['--base-button-text'] = props.customTextColor
  }

  return style
})

function handleClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault()
    return
  }

  emit('click', event)
}
</script>

<template>
  <button
    :class="buttonClass"
    :style="buttonStyle"
    :type="type"
    :disabled="disabled"
    :data-testid="dataTestid"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<style scoped>
@reference "../../assets/main.css";

.base-button {
  --base-button-accent: var(--color-mossy-main);
  --base-button-text: var(--color-white);
  --base-button-background: transparent;
  --base-button-background-hover: transparent;
  --base-button-border: transparent;
  --base-button-border-hover: transparent;
  --base-button-text-hover: var(--base-button-text);
  @apply inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold transition;
  background-color: var(--base-button-background);
  border: 1px solid var(--base-button-border);
  color: var(--base-button-text);
}

.base-button:hover:not(:disabled) {
  @apply cursor-pointer;
  background-color: var(--base-button-background-hover);
  border-color: var(--base-button-border-hover);
  color: var(--base-button-text-hover);
}

.base-button:focus-visible {
  @apply outline-none ring-2 ring-mossy-pale/40;
}

.base-button:disabled,
.base-button--disabled {
  @apply cursor-not-allowed opacity-60;
}

.base-button--mossy {
  --base-button-background: var(--color-mossy-main);
  --base-button-background-hover: var(--color-mossy-400);
  --base-button-border: var(--color-mossy-main);
  --base-button-border-hover: var(--color-mossy-400);
  --base-button-text: var(--color-white);
  --base-button-text-hover: var(--color-white);
}

.base-button--glassy {
  --base-button-background: color-mix(in srgb, var(--color-primary) 20%, transparent);
  --base-button-background-hover: color-mix(in srgb, var(--color-primary) 28%, transparent);
  --base-button-border: var(--color-primary-50);
  --base-button-border-hover: var(--color-primary-50);
  --base-button-text: var(--color-mossy-light);
  --base-button-text-hover: var(--color-mossy-light);
  @apply backdrop-blur-md;
}

.base-button--bordered {
  --base-button-background: transparent;
  --base-button-background-hover: var(--base-button-accent);
  --base-button-border: var(--base-button-accent);
  --base-button-border-hover: var(--base-button-accent);
  --base-button-text: var(--base-button-accent);
  --base-button-text-hover: var(--color-primary);
  @apply border-2;
}
</style>
