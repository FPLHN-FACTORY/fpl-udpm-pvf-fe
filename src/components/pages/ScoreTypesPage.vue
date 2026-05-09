<template>
  <AdminPage title="Quản lý loại điểm" :breadcrumbs="breadcrumbs">
    <AdminCard :title="VIEW_LABELS[currentView]">
      <template #actions>
        <component 
          v-for="(action, index) in headerActions" 
          :is="action.component" 
          :key="index"
          @click="action.onClick"
        />
      </template>
      <Transition :name="transitionName" mode="out-in">
        <component 
          :is="currentComponent" 
          :key="currentView" 
          v-bind="currentProps" 
          v-on="currentListeners" 
        />
      </Transition>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { message } from 'ant-design-vue'
import AdminPage from '../templates/AdminPage.vue'
import AdminCard from '../molecules/AdminCard.vue'
import ScoreTypesList from '../organisms/ScoreTypesList.vue'
import ScoreTypesCreate from '../organisms/ScoreTypesCreate.vue'
import ScoreTypesDetail from '../organisms/ScoreTypesDetail.vue'
import ScoreTypesEdit from '../organisms/ScoreTypesEdit.vue'
import ScoreTypesDeleted from '../organisms/ScoreTypesDeleted.vue'

// ───── Breadcrumbs ─────
const breadcrumbs = computed(() => {
  const base = [
    { title: 'Quản lý học tập ngoại khóa', href: '#' },
    { title: 'Quản lý loại điểm', href: '#', onClick: () => navigateTo('list') }
  ]
  
  if (currentView.value !== 'list') {
    base.push({ title: VIEW_LABELS[currentView.value], href: '#' })
  }
  
  return base
})

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
  list: 'Danh sách loại điểm',
  create: 'Thêm mới loại điểm',
  detail: 'Chi tiết loại điểm',
  edit: 'Chỉnh sửa loại điểm',
  deleted: 'Danh sách loại điểm đã xóa',
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

// ───── Header Actions ─────
const headerActions = computed(() => {
  switch (currentView.value) {
    case 'list':
      return [
        { component: ButtonDeleteList, onClick: () => navigateTo('deleted') },
        { component: ButtonAdd, onClick: () => navigateTo('create') }
      ]
    case 'deleted':
    case 'create':
    case 'detail':
    case 'edit':
      return [
        { component: ButtonBack, onClick: () => navigateTo('list') }
      ]
    default:
      return []
  }
})

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
        view: (record: ScoreTypeRecord) => handleView(record),
        edit: (record: ScoreTypeRecord) => handleEditFromList(record),
      }
    case 'create':
      return {
        created: (record?: ScoreTypeRecord) => handleCreated(record),
      }
    case 'detail':
      return {
        edit: () => navigateTo('edit'),
      }
    case 'edit':
      return {
        submit: (data: ScoreTypeRecord) => handleEditSubmit(data),
      }
    case 'deleted':
      return {
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
