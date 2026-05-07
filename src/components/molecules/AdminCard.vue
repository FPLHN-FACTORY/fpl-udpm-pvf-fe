<template>
  <section
    class="bg-white shadow-sm border border-gray-100 overflow-hidden"
    :class="[padded ? 'rounded-xl p-8' : 'rounded-xl']"
  >
    <header
      v-if="title || $slots.actions"
      class="flex items-center justify-between gap-4 border-gray-100"
      :class="padded ? 'mb-8' : 'border-b p-6'"
    >
      <h1 :class="titleClass">{{ title }}</h1>
      <div v-if="$slots.actions" class="flex items-center gap-3">
        <slot name="actions" />
      </div>
    </header>

    <slot />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  title?: string
  padded?: boolean
  titleSize?: 'md' | 'lg' | 'xl'
}>(), {
  padded: false,
  titleSize: 'lg'
})

const titleClass = computed(() => [
  'font-bold text-[#566a7f]',
  props.titleSize === 'xl' ? 'text-xl' : props.titleSize === 'lg' ? 'text-lg' : 'text-base'
])
</script>
