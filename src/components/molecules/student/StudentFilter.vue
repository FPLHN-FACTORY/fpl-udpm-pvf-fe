<template>
  <div class="flex items-center justify-between gap-4 p-6 bg-white border-b border-gray-100">
    <div class="flex-1 max-w-[300px]">
      <InputSearch 
        v-model="filters.search" 
        placeholder="Tìm kiếm" 
      />
    </div>
    <div class="flex items-center gap-2">
      <ButtonSearch @click="$emit('search')" />
      <ButtonReset @click="onReset" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import InputSearch from '@/components/atoms/inputs/InputSearch.vue'
import ButtonSearch from '@/components/atoms/buttons/ButtonSearch.vue'
import ButtonReset from '@/components/atoms/buttons/ButtonReset.vue'

const props = defineProps<{
  initialFilters: { search: string; status: any }
}>()

const emit = defineEmits(['search', 'reset', 'update:filters'])

const filters = reactive({ 
  ...props.initialFilters 
})

watch(() => props.initialFilters, (newVal) => {
  Object.assign(filters, newVal)
}, { deep: true })

watch(filters, (newVal) => {
  emit('update:filters', newVal)
}, { deep: true })

const onReset = () => {
  filters.search = ''
  filters.status = undefined
  emit('reset')
}
</script>
