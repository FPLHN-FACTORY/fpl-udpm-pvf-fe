<template>
  <div class="flex flex-wrap items-center justify-between gap-4 p-6 bg-[#fcfcfd] border-b border-gray-100">
    <div class="flex flex-wrap items-center gap-4 flex-1">
      <div class="w-[240px]">
        <InputSearch v-model="filters.keyword" placeholder="Tìm kiếm" />
      </div>
      <a-date-picker 
        v-model:value="filters.date" 
        class="w-[240px] !h-[38px] !border-[#d9dee3]" 
        placeholder="Chọn thời gian" 
      />
      <div class="w-[220px]">
        <SelectFilter v-model:value="filters.status" placeholder="Chọn trạng thái">
          <a-select-option value="active">Đang hoạt động</a-select-option>
          <a-select-option value="inactive">Ngừng hoạt động</a-select-option>
        </SelectFilter>
      </div>
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
import SelectFilter from '@/components/atoms/inputs/SelectFilter.vue'
import ButtonSearch from '@/components/atoms/buttons/ButtonSearch.vue'
import ButtonReset from '@/components/atoms/buttons/ButtonReset.vue'

const props = defineProps<{
  initialFilters: {
    keyword: string
    date: any
    status: string | undefined
  }
}>()

const emit = defineEmits(['search', 'reset', 'update:filters'])

const filters = reactive({ ...props.initialFilters })

watch(() => props.initialFilters, (newVal) => {
  Object.assign(filters, newVal)
}, { deep: true })

watch(filters, (newVal) => {
  emit('update:filters', newVal)
}, { deep: true })

const onReset = () => {
  filters.keyword = ''
  filters.date = null
  filters.status = undefined
  emit('reset')
}
</script>
