<template>
  <div class="px-6 py-4 bg-white border-b border-gray-100">
    <div class="flex flex-wrap items-center gap-4">
      <!-- Tìm kiếm -->
      <div class="flex-1 min-w-[200px]">
        <InputSearch 
          v-model="localFilters.search"
          placeholder="Tìm kiếm..."
          class="w-full"
        />
      </div>
      
      <!-- Chọn thời gian -->
      <div class="min-w-[150px]">
        <a-date-picker
          v-model:value="localFilters.date"
          placeholder="Chọn thời gian"
          class="w-full !h-[38px] !border-[#d9dee3] rounded-md"
          format="DD/MM/YYYY"
        />
      </div>
      
      <!-- Chọn trạng thái -->
      <div class="min-w-[150px]">
        <SelectFilter
          :value="localFilters.status"
          placeholder="Chọn trạng thái"
          @update:value="localFilters.status = $event"
        >
          <a-select-option value="">Tất cả</a-select-option>
          <a-select-option value="active">Đã duyệt</a-select-option>
          <a-select-option value="pending">Chờ duyệt</a-select-option>
          <a-select-option value="rejected">Từ chối</a-select-option>
        </SelectFilter>
      </div>
      
      <!-- Buttons -->
      <div class="flex items-center gap-2">
        <ButtonSearch @click="handleSearch" />
        <ButtonReset @click="handleReset" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import InputSearch from '../atoms/inputs/InputSearch.vue'
import SelectFilter from '../atoms/inputs/SelectFilter.vue'
import ButtonSearch from '../atoms/buttons/ButtonSearch.vue'
import ButtonReset from '../atoms/buttons/ButtonReset.vue'

interface StudentFilter {
  search: string
  date: any
  status: string
}

const props = defineProps<{
  filters: StudentFilter
}>()

const emit = defineEmits(['search', 'reset', 'update:filters'])

const localFilters = reactive({ ...props.filters })

watch(localFilters, (newFilters) => {
  emit('update:filters', newFilters)
}, { deep: true })

const handleSearch = () => {
  emit('search')
}

const handleReset = () => {
  localFilters.search = ''
  localFilters.date = null
  localFilters.status = ''
  emit('reset')
}
</script>