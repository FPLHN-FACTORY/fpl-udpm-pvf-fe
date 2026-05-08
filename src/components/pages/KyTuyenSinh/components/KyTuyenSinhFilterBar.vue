<template>
  <div class="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
    <div class="flex w-full flex-col gap-3 md:flex-row xl:w-auto">
      <BaseInput
        v-model="filters.keyword"
        :placeholder="searchPlaceholder"
        icon="BxSearch"
        class="kyts-input w-full md:w-[280px]"
      />

      <a-date-picker
        v-if="showDate"
        v-model:value="filters.date"
        :placeholder="datePlaceholder"
        class="kyts-date w-full md:w-[220px]"
      />

      <a-select
        v-if="showStage"
        v-model:value="filters.stage"
        :placeholder="stagePlaceholder"
        class="kyts-select w-full md:w-[220px]"
        allow-clear
      >
        <a-select-option v-for="option in stageOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </a-select-option>
      </a-select>

      <a-select
        v-if="showAssignee"
        v-model:value="filters.assignee"
        :placeholder="assigneePlaceholder"
        class="kyts-select w-full md:w-[220px]"
        allow-clear
      >
        <a-select-option v-for="option in assigneeOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </a-select-option>
      </a-select>

      <a-select
        v-if="showStatus"
        v-model:value="filters.status"
        :placeholder="statusPlaceholder"
        class="kyts-select w-full md:w-[220px]"
        allow-clear
      >
        <a-select-option v-for="option in statusOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </a-select-option>
      </a-select>
    </div>

    <div class="flex items-center gap-2 xl:justify-end">
      <KyTuyenSinhActionButton label="Tìm Kiếm" icon="BxSearch" tone="secondary" @click="submitSearch" />
      <KyTuyenSinhActionButton icon="BxReset" tone="neutral" square @click="resetFilters" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { Dayjs } from 'dayjs'
import BaseInput from '../../../atoms/BaseInput.vue'
import type { KyTuyenSinhFilterPayload, SelectOption } from '../../../../types'
import KyTuyenSinhActionButton from './KyTuyenSinhActionButton.vue'

interface FilterState {
  keyword: string
  date: Dayjs | null
  stage: string | undefined
  assignee: string | undefined
  status: string | undefined
}

withDefaults(defineProps<{
  searchPlaceholder?: string
  datePlaceholder?: string
  stagePlaceholder?: string
  assigneePlaceholder?: string
  statusPlaceholder?: string
  showDate?: boolean
  showStage?: boolean
  showAssignee?: boolean
  showStatus?: boolean
  stageOptions?: SelectOption[]
  assigneeOptions?: SelectOption[]
  statusOptions: SelectOption[]
}>(), {
  searchPlaceholder: 'Tìm kiếm',
  datePlaceholder: 'Chọn thời gian',
  stagePlaceholder: 'Chọn giai đoạn',
  assigneePlaceholder: 'Chọn người phụ trách',
  statusPlaceholder: 'Chọn trạng thái',
  showDate: true,
  showStage: false,
  showAssignee: false,
  showStatus: true,
  stageOptions: () => [],
  assigneeOptions: () => []
})

const emit = defineEmits<{
  search: [value: KyTuyenSinhFilterPayload]
  reset: [value: KyTuyenSinhFilterPayload]
}>()

const filters = reactive<FilterState>({
  keyword: '',
  date: null,
  stage: undefined,
  assignee: undefined,
  status: undefined
})

const buildPayload = (): KyTuyenSinhFilterPayload => ({
  keyword: filters.keyword.trim(),
  date: filters.date ? filters.date.format('YYYY-MM-DD') : null,
  stage: filters.stage,
  assignee: filters.assignee,
  status: filters.status
})

const submitSearch = () => {
  emit('search', buildPayload())
}

const resetFilters = () => {
  filters.keyword = ''
  filters.date = null
  filters.stage = undefined
  filters.assignee = undefined
  filters.status = undefined

  emit('reset', buildPayload())
}
</script>
