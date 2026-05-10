<template>
  <section
    class="bg-white shadow-sm border border-gray-100 overflow-hidden"
    :class="[padded ? 'rounded-xl p-8' : 'rounded-xl']"
  >
    <header
      v-if="title || $slots.actions"
      class="flex items-center justify-between gap-4 border-gray-100"
      :class="padded ? 'mb-8' : 'border-b p-4'"
    >
      <h1 :class="titleClass">{{ title }}</h1>
      <div v-if="$slots.actions" class="flex items-center gap-2">
        <slot name="actions" />
      </div>
    </header>
    
    <!-- Content -->
    <div>
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  padded?: boolean
  titleClass?: string
}>()
</script>