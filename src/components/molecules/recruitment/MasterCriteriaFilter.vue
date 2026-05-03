<template>
  <div class="p-6 flex flex-wrap items-center gap-3 bg-[#fcfcfd] border-b border-gray-100">
    <div class="flex-1 min-w-[200px]">
      <InputSearch 
        v-model="localFilters.keyword" 
        placeholder="Tìm kiếm" 
        @search="$emit('search')"
      />
    </div>
    <div class="w-[200px]">
      <a-select 
        v-model:value="localFilters.status" 
        placeholder="Chọn trạng thái" 
        class="w-full !h-[38px]"
        @change="$emit('search')"
      >
        <a-select-option value="all">Tất cả trạng thái</a-select-option>
        <a-select-option value="ACTIVE">Đang hoạt động</a-select-option>
        <a-select-option value="INACTIVE">Ngừng hoạt động</a-select-option>
      </a-select>
    </div>
    <div class="flex items-center gap-2">
      <ButtonSearch @click="$emit('search')" />
      <ButtonReset @click="handleReset" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import InputSearch from '@/components/atoms/inputs/InputSearch.vue'
import ButtonSearch from '@/components/atoms/buttons/ButtonSearch.vue'
import ButtonReset from '@/components/atoms/buttons/ButtonReset.vue'

const props = defineProps<{
  filters: {
    keyword: string
    status: string
  }
}>()

const emit = defineEmits(['update:filters', 'search', 'reset'])

const localFilters = reactive({ ...props.filters })

watch(() => props.filters, (newFilters) => {
  Object.assign(localFilters, newFilters)
}, { deep: true })

watch(localFilters, (newFilters) => {
  emit('update:filters', newFilters)
}, { deep: true })

const handleReset = () => {
  localFilters.keyword = ''
  localFilters.status = 'all'
  emit('reset')
}
</script>

<style scoped>
:deep(.ant-select-selector) {
  height: 38px !important;
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
  display: flex;
  align-items: center;
}
</style>
