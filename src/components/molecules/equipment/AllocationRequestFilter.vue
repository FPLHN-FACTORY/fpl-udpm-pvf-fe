<template>
  <div class="flex flex-wrap items-center justify-between gap-4 p-6 bg-[#fcfcfd] border-b border-gray-100">
    <div class="flex flex-wrap items-center gap-3 flex-1">
      <div class="min-w-[200px] flex-1 max-w-[300px]">
        <InputSearch 
          v-model="filters.search" 
          placeholder="Tìm kiếm" 
        />
      </div>
      <div class="w-[200px]">
        <SelectFilter 
          v-model:value="filters.equipmentType" 
          placeholder="Chọn dụng cụ"
        >
          <a-select-option value="day-khang-luc">Dây khăng lực</a-select-option>
          <a-select-option value="bong-da">Bóng đá</a-select-option>
          <a-select-option value="giay-the-thao">Giày thể thao</a-select-option>
        </SelectFilter>
      </div>
      <div class="w-[200px]">
        <SelectFilter 
          v-model:value="filters.status" 
          placeholder="Chọn trạng thái"
        >
          <a-select-option value="pending">Chờ duyệt</a-select-option>
          <a-select-option value="approved">Đã duyệt</a-select-option>
          <a-select-option value="rejected">Từ chối</a-select-option>
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
  initialFilters: any
}>()

const emit = defineEmits(['search', 'reset', 'update:filters'])

const filters = reactive({ 
  search: '',
  equipmentType: undefined,
  status: undefined,
  ...props.initialFilters 
})

watch(() => props.initialFilters, (newVal) => {
  filters.search = newVal.search ?? ''
  filters.equipmentType = newVal.equipmentType
  filters.status = newVal.status
}, { deep: true })

watch(filters, (newVal) => {
  emit('update:filters', newVal)
}, { deep: true })

const onReset = () => {
  filters.search = ''
  filters.equipmentType = undefined
  filters.status = undefined
  emit('reset')
}

defineExpose({ filters })
</script>
