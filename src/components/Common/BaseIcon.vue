<script setup lang="ts">
import SpriteIcon from './SpriteIcon.vue'

interface BaseIconProps {
  name: string
  size?: number
}

const props = withDefaults(defineProps<BaseIconProps>(), {
  size: 20,
})
</script>

<template>
  <SpriteIcon :name="props.name" :size="props.size" v-bind="$attrs" />
</template>