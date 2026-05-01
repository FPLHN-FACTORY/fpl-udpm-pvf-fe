<template>
  <div class="flex items-center justify-center gap-2">
    <IconButton
      v-for="action in actions"
      :key="action.label"
      :icon="action.icon"
      :label="action.label"
      :danger="action.danger"
      @click="action.onClick"
    />
  </div>
</template>

<script setup lang="ts">
import IconButton from '../atoms/IconButton.vue'

export interface TableAction {
  label: string
  icon: string
  danger?: boolean
  onClick: () => void
}

defineProps<{
  actions: TableAction[]
}>()
</script>
