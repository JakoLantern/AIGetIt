<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    name: string
    size?: number
  }>(),
  {
    size: 24,
  },
)

const spriteHref = computed(() => `/assets/icons-sprite.svg#${props.name}`)
</script>

<template>
  <svg
    :width="props.size"
    :height="props.size"
    fill="none"
    aria-hidden="true"
    focusable="false"
    class="shrink-0"
    viewBox="0 0 24 24"
  >
    <use :href="spriteHref" />
  </svg>
</template>