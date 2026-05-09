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
      
      <!-- Chọn người quyết định -->
      <div class="min-w-[180px]">
        <SelectFilter
          :value="localFilters.decider"
          placeholder="Chọn người quyết định"
          @update:value="localFilters.decider = $event"
        >
          <a-select-option value="">Tất cả</a-select-option>
          <a-select-option value="Nguyễn Minh Quân">Nguyễn Minh Quân</a-select-option>
          <a-select-option value="Trần Thị B">Trần Thị B</a-select-option>
        </SelectFilter>
      </div>
      
      <!-- Chọn trạng thái -->
      <div class="min-w-[150px]">
        <SelectFilter
          :value="localFilters.status"
          placeholder="Chọn trạng thái"
          @update:value="localFilters.status = $event"
        >
          <a-select-option value="">Tất cả</a-select-option>
          <a-select-option value="published">Đã ban hành</a-select-option>
          <a-select-option value="draft">Nháp</a-select-option>
          <a-select-option value="cancelled">Đã hủy</a-select-option>
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
import InputSearch from "@/components/atoms/inputs/InputSearch.vue";
import SelectFilter from "@/components/atoms/inputs/SelectFilter.vue";
import ButtonSearch from "@/components/atoms/buttons/ButtonSearch.vue";
import ButtonReset from "@/components/atoms/buttons/ButtonReset.vue";

interface RewardDecisionFilterState {
  search: string
  decider: string
  status: string
}

const props = defineProps<{
  filters: RewardDecisionFilterState
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
  localFilters.decider = ''
  localFilters.status = ''
  emit('reset')
}
</script>
