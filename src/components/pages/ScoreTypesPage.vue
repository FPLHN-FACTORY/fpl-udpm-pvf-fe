<template>
  <div class="px-2 py-2">

    <!-- Breadcrumb + Page Title -->
    <div class="mb-5">
      <div class="flex items-center gap-1.5 text-sm text-gray-400 mb-1 select-none">
        <span>Quản lý học tập ngoại khóa</span>
        <span>/</span>
        <span class="cursor-pointer hover:text-red-500 transition-colors duration-150"
          :class="currentView === 'list' ? 'text-gray-600 font-medium' : 'text-gray-400'" @click="navigateTo('list')">
          Quản lý loại điểm
        </span>
        <!-- <template v-if="currentView !== 'list'">
          <span>/</span>
          <span class="text-red-500 font-medium">{{ VIEW_LABELS[currentView] }}</span>
        </template> -->
      </div>
    </div>

    <!-- ── Dynamic Component ── -->
    <Transition :name="transitionName" mode="out-in">
      <component :is="currentComponent" :key="currentView" v-bind="currentProps" v-on="currentListeners" />
    </Transition>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { message } from 'ant-design-vue'
import ScoreTypesList from '../organisms/ScoreTypesList.vue'
import ScoreTypesCreate from '../organisms/ScoreTypesCreate.vue'
import ScoreTypesDetail from '../organisms/ScoreTypesDetail.vue'
import ScoreTypesEdit from '../organisms/ScoreTypesEdit.vue'
import ScoreTypesDeleted from '../organisms/ScoreTypesDeleted.vue'

// ───── Types ─────
type ViewType = 'list' | 'create' | 'detail' | 'edit' | 'deleted'

export interface ScoreTypeRecord {
  id?: number
  name: string
  weight: number
  status: string
}

// ───── Constants ─────
const VIEW_LABELS: Record<ViewType, string> = {
  list: 'Danh sách',
  create: 'Thêm mới',
  detail: 'Chi tiết',
  edit: 'Chỉnh sửa',
  deleted: 'Đã xóa',
}

// Dùng để xác định hướng transition: index cao hơn = đi sâu hơn
const VIEW_DEPTH: Record<ViewType, number> = {
  list: 0,
  create: 1,
  detail: 1,
  deleted: 1,
  edit: 2,
}

// ───── State ─────
const currentView = ref<ViewType>('list')
const previousView = ref<ViewType>('list')
const selectedRecord = ref<ScoreTypeRecord | undefined>(undefined)

// ───── Component mapping ─────
const COMPONENT_MAP: Record<ViewType, object> = {
  list: ScoreTypesList,
  create: ScoreTypesCreate,
  detail: ScoreTypesDetail,
  edit: ScoreTypesEdit,
  deleted: ScoreTypesDeleted,
}

const currentComponent = computed(() => COMPONENT_MAP[currentView.value])

// ───── Props theo từng view ─────
const currentProps = computed<Record<string, unknown>>(() => {
  switch (currentView.value) {
    case 'detail':
      return { idScoreType: selectedRecord.value?.id }
    case 'edit':
      return { idScoreType: selectedRecord.value?.id }
    default:
      return {}
  }
})

// ───── Event listeners theo từng view ─────
const currentListeners = computed<Record<string, (...args: unknown[]) => void>>(() => {
  switch (currentView.value) {
    case 'list':
      return {
        add: () => navigateTo('create'),
        view: (record: ScoreTypeRecord) => handleView(record),
        edit: (record: ScoreTypeRecord) => handleEditFromList(record),
        deleted: () => navigateTo('deleted'),   // ← nút "Thùng rác" ở list
      }
    case 'create':
      return {
        back: () => navigateTo('list'),
        created: (record?: ScoreTypeRecord) => handleCreated(record),
      }
    case 'detail':
      return {
        back: () => navigateTo('list'),
        edit: () => navigateTo('edit'),
      }
    case 'edit':
      return {
        back: () => navigateTo('list'),
        submit: (data: ScoreTypeRecord) => handleEditSubmit(data),
      }
    case 'deleted':
      return {
        back: () => navigateTo('list'),
        restored: (record: ScoreTypeRecord) => handleRestored(record),
      }
    default:
      return {}
  }
})

// ───── Transition direction ─────
const transitionName = computed(() =>
  VIEW_DEPTH[currentView.value] >= VIEW_DEPTH[previousView.value]
    ? 'slide-forward'
    : 'slide-back'
)

// ───── Navigation helper ─────
function navigateTo(view: ViewType) {
  previousView.value = currentView.value
  currentView.value = view
}

// ───── Handlers ─────
function handleView(record: ScoreTypeRecord) {
  selectedRecord.value = record
  navigateTo('detail')
}

function handleEditFromList(record: ScoreTypeRecord) {
  selectedRecord.value = record
  navigateTo('edit')
}

function handleCreated(record?: ScoreTypeRecord) {
  if (record) selectedRecord.value = record
  message.success('Thêm loại điểm thành công!')
  navigateTo('list')
}

function handleEditSubmit(data: ScoreTypeRecord) {
  selectedRecord.value = { ...selectedRecord.value, ...data }
  message.success('Cập nhật loại điểm thành công!')
  navigateTo('detail')
}

function handleRestored(record: ScoreTypeRecord) {
  message.success(`Đã khôi phục "${record.name || ''}" về danh sách!`)
  // Nếu cần reload list thì emit hoặc refetch API ở đây
}
</script>

<style scoped>
/* ── Forward: đi sâu hơn (list → detail/create/deleted, detail → edit) ── */
.slide-forward-enter-active,
.slide-forward-leave-active {
  transition: all 0.26s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-forward-enter-from {
  opacity: 0;
  transform: translateX(32px);
}

.slide-forward-leave-to {
  opacity: 0;
  transform: translateX(-32px);
}

/* ── Back: quay lại (edit → detail, detail/create/deleted → list) ── */
.slide-back-enter-active,
.slide-back-leave-active {
  transition: all 0.26s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-back-enter-from {
  opacity: 0;
  transform: translateX(-32px);
}

.slide-back-leave-to {
  opacity: 0;
  transform: translateX(32px);
}
</style>