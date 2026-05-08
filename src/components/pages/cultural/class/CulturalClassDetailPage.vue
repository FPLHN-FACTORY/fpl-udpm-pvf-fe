<template>
  <div class="flex flex-col gap-6">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">{{ moduleTitle }}</span>
      <span class="text-gray-400">/</span>
      <span class="bg-[#fcf3d7] text-[#f6c23e] px-2 py-0.5 rounded font-medium">{{ pageTitle }}</span>
    </div>

    <template v-if="record">
      <!-- Detail Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <!-- Header -->
        <div class="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 class="text-lg font-bold text-[#566a7f]">Chi tiết Lớp học văn hóa</h2>
          <div class="flex gap-3">
            <ButtonBack @click="goBack" />
            <ButtonEdit @click="goToEdit" />
          </div>
        </div>

        <!-- Detail Fields -->
        <div class="overflow-hidden">
          <div
            v-for="field in detailFields"
            :key="field.label"
            class="grid grid-cols-1 border-b border-gray-100 last:border-b-0 md:grid-cols-[220px_minmax(0,1fr)]"
          >
            <div class="bg-[#fcfcfd] px-6 py-3 text-sm font-semibold text-[#566a7f]">
              {{ field.label }}
            </div>
            <div class="px-6 py-3 text-sm text-[#697a8d]">
              <BaseTag v-if="field.type === 'status'" :type="getStatusType(record.status)">
                {{ field.value }}
              </BaseTag>
              <template v-else>{{ field.value }}</template>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div
          v-for="card in summaryCards"
          :key="card.label"
          class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start"
        >
          <div>
            <p class="text-sm text-gray-500 mb-1">{{ card.label }}</p>
            <div class="flex items-baseline gap-2">
              <h3 class="text-2xl font-bold text-[#566a7f]">{{ card.value }}</h3>
              <span v-if="card.hint" class="text-[#71dd37] text-sm">{{ card.hint }}</span>
            </div>
          </div>
          <div
            class="w-10 h-10 rounded-lg flex items-center justify-center"
            :class="card.iconWrapperClass"
          >
            <NavIcon :name="card.icon" class-name="w-6 h-6" />
          </div>
        </div>
      </div>

      <!-- Student Table Section -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <!-- Section Header -->
        <div class="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 class="text-lg font-bold text-[#566a7f]">Học viên tham gia lớp học</h3>
          <div class="flex gap-3">
            <ButtonAdd text="Thêm Mới" @click="addStudent" />
            <ButtonExport @click="() => {}" />
            <ButtonImport @click="() => {}" />
          </div>
        </div>

        <!-- Tabs -->
        <div class="px-6 pt-4 flex items-center gap-2 border-b border-gray-100">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            type="button"
            class="px-5 py-2 text-sm font-semibold rounded-t-lg transition-colors"
            :class="
              activeTab === tab.value
                ? 'bg-[#696cff] text-white'
                : 'text-[#697a8d] hover:text-[#566a7f] hover:bg-gray-50'
            "
            @click="activeTab = tab.value"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Attendance session selector -->
        <div v-if="activeTab === 'attendance'" class="px-6 py-3 border-b border-gray-100">
          <div class="w-[220px]">
            <a-select
              v-model:value="selectedSessionId"
              class="w-full !h-[38px]"
            >
              <a-select-option
                v-for="session in record.sessions"
                :key="session.id"
                :value="session.id"
              >
                {{ session.label }} - {{ session.date }}
              </a-select-option>
            </a-select>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <a-table
            :columns="activeColumns"
            :data-source="record.students"
            :pagination="false"
            row-key="id"
            class="detail-table"
          >
            <template #bodyCell="{ column, record: student, index }">
              <template v-if="column.key === 'stt'">
                <span class="text-[#6c63ff] font-medium">{{ index + 1 }}</span>
              </template>

              <template v-else-if="column.key === 'studentStatus'">
                <BaseTag :type="getStudentStatusType(student.status)">
                  {{ student.statusLabel }}
                </BaseTag>
              </template>

              <template v-else-if="column.key === 'attendanceStatus'">
                <BaseTag :type="getAttendanceForStudent(student).present ? 'success' : 'danger'">
                  {{ getAttendanceForStudent(student).present ? 'Có mặt' : 'Vắng' }}
                </BaseTag>
              </template>

              <template v-else-if="column.key === 'attendanceNote'">
                {{ getAttendanceForStudent(student).note }}
              </template>

              <template v-else-if="column.key === 'score1'">
                {{ student.scores.score1.toFixed(1) }}
              </template>
              <template v-else-if="column.key === 'score2'">
                {{ student.scores.score2.toFixed(1) }}
              </template>
              <template v-else-if="column.key === 'score3'">
                {{ student.scores.score3.toFixed(1) }}
              </template>
              <template v-else-if="column.key === 'average'">
                <span class="font-semibold text-[#566a7f]">{{ student.scores.average.toFixed(1) }}</span>
              </template>

              <template v-else-if="column.key === 'rosterActions'">
                <div class="flex items-center gap-2 justify-center">
                  <button class="p-1 text-[#a1acb8] hover:text-[#566a7f] transition-colors" title="Xem học viên">
                    <NavIcon name="BxShow" class-name="w-[18px] h-[18px]" />
                  </button>
                  <button
                    class="p-1 text-[#a1acb8] hover:text-[#ff3e1d] transition-colors"
                    title="Xóa khỏi lớp"
                    @click="removeStudent(student.id)"
                  >
                    <NavIcon name="BxTrash" class-name="w-[18px] h-[18px]" />
                  </button>
                </div>
              </template>
            </template>
          </a-table>
        </div>
      </div>
    </template>

    <!-- Not found -->
    <div
      v-else
      class="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-10 text-center text-sm text-gray-400"
    >
      Không tìm thấy lớp học văn hóa phù hợp.
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ButtonBack from '../../../atoms/buttons/ButtonBack.vue'
import ButtonEdit from '../../../atoms/buttons/ButtonEdit.vue'
import ButtonAdd from '../../../atoms/buttons/ButtonAdd.vue'
import ButtonExport from '../../../atoms/buttons/ButtonExport.vue'
import ButtonImport from '../../../atoms/buttons/ButtonImport.vue'
import BaseTag from '../../../atoms/display/BaseTag.vue'
import NavIcon from '../../../atoms/icons/NavIcon.vue'
import {
  culturalClassService,
  type CulturalClassRecord,
  type CulturalClassStatus,
  type CulturalClassStudentRecord,
  type CulturalStudentStatus,
} from '../../../../services/cultural/culturalClass'

type DetailTab = 'roster' | 'attendance' | 'scores'

const moduleTitle = 'Quản lý học tập văn hóa'
const pageTitle = 'Chi tiết lớp học văn hóa'

const route = useRoute()
const router = useRouter()

const record = ref<CulturalClassRecord>()
const activeTab = ref<DetailTab>('roster')
const selectedSessionId = ref<number>(0)

const tabs = [
  { value: 'roster', label: 'Danh sách' },
  { value: 'attendance', label: 'Điểm danh' },
  { value: 'scores', label: 'Bảng điểm' },
] as const

const getStatusType = (status: CulturalClassStatus) => {
  switch (status) {
    case 'ACTIVE': return 'success'
    case 'PAUSED': return 'warning'
    default: return 'default'
  }
}

const getStudentStatusType = (status: CulturalStudentStatus) => {
  switch (status) {
    case 'ACTIVE': return 'success'
    case 'BREAK': return 'warning'
    default: return 'default'
  }
}

const detailFields = computed(() => {
  if (!record.value) return []
  return [
    { label: 'Mã lớp học', value: record.value.code, type: 'text' },
    { label: 'Tên lớp học', value: record.value.name, type: 'text' },
    { label: 'Khối lớp', value: record.value.gradeName, type: 'text' },
    { label: 'Năm học', value: record.value.schoolYear, type: 'text' },
    { label: 'Giáo viên chủ nhiệm', value: record.value.homeroomTeacher, type: 'text' },
    { label: 'Thời gian tạo', value: record.value.createdAt, type: 'text' },
    { label: 'Thời gian cập nhật', value: record.value.updatedAt, type: 'text' },
    {
      label: 'Trạng thái',
      value: record.value.status === 'ACTIVE' ? 'Đang hoạt động' : 'Tạm ngưng',
      type: 'status',
    },
  ]
})

const summaryCards = computed(() => {
  if (!record.value) return []
  return [
    {
      label: 'Tổng học viên lớp',
      value: record.value.totalStudents,
      hint: '',
      icon: 'BxPanelStats',
      iconWrapperClass: 'bg-[#e7e7ff] text-[#696cff]',
    },
    {
      label: 'Điểm trung bình lớp',
      value: record.value.averageScore.toFixed(1),
      hint: record.value.averageScore >= 8 ? '(Tốt)' : '(Khá)',
      icon: 'BxCalendarCheck',
      iconWrapperClass: 'bg-[#ffe1e1] text-[#ff3e1d]',
    },
    {
      label: 'Tỷ lệ chuyên cần',
      value: `${record.value.attendanceRate}%`,
      hint: `(${record.value.completedSessions}/${record.value.totalSessions})`,
      icon: 'BxLayersStacked',
      iconWrapperClass: 'bg-[#fff2e2] text-[#fdac41]',
    },
    {
      label: 'Buổi đã học / Tổng buổi',
      value: `${record.value.completedSessions}/${record.value.totalSessions}`,
      hint: `${Math.round((record.value.completedSessions / record.value.totalSessions) * 100)}%`,
      icon: 'BxChevronStep',
      iconWrapperClass: 'bg-[#d7f5e4] text-[#71dd37]',
    },
  ]
})

const rosterColumns = [
  { title: '#', key: 'stt', width: 60, align: 'center' as const },
  { title: 'MÃ HỌC VIÊN', dataIndex: 'code', key: 'code' },
  { title: 'TÊN HỌC VIÊN', dataIndex: 'name', key: 'name' },
  { title: 'EMAIL', dataIndex: 'email', key: 'email' },
  { title: 'NGÀY VÀO LỚP', dataIndex: 'joinedAt', key: 'joinedAt' },
  { title: 'TRẠNG THÁI', key: 'studentStatus', width: 140 },
  { title: 'HÀNH ĐỘNG', key: 'rosterActions', width: 120, align: 'center' as const },
]

const attendanceColumns = [
  { title: '#', key: 'stt', width: 60, align: 'center' as const },
  { title: 'MÃ HỌC VIÊN', dataIndex: 'code', key: 'code' },
  { title: 'TÊN HỌC VIÊN', dataIndex: 'name', key: 'name' },
  { title: 'ĐIỂM DANH', key: 'attendanceStatus', width: 140, align: 'center' as const },
  { title: 'GHI CHÚ', key: 'attendanceNote' },
]

const scoresColumns = [
  { title: '#', key: 'stt', width: 60, align: 'center' as const },
  { title: 'MÃ HỌC VIÊN', dataIndex: 'code', key: 'code' },
  { title: 'TÊN HỌC VIÊN', dataIndex: 'name', key: 'name' },
  { title: 'ĐẦU ĐIỂM SỐ 1', key: 'score1', width: 140, align: 'center' as const },
  { title: 'ĐẦU ĐIỂM SỐ 2', key: 'score2', width: 140, align: 'center' as const },
  { title: 'ĐẦU ĐIỂM SỐ 3', key: 'score3', width: 140, align: 'center' as const },
  { title: 'TRUNG BÌNH', key: 'average', width: 120, align: 'center' as const },
]

const activeColumns = computed(() => {
  if (activeTab.value === 'attendance') return attendanceColumns
  if (activeTab.value === 'scores') return scoresColumns
  return rosterColumns
})

const getAttendanceForStudent = (student: CulturalClassStudentRecord) =>
  student.attendance.find((a) => a.sessionId === selectedSessionId.value) ?? {
    sessionId: selectedSessionId.value,
    present: false,
    note: 'Chưa có dữ liệu',
  }

const loadRecord = async () => {
  const id = Number(route.params.id)
  if (!Number.isFinite(id)) { record.value = undefined; return }
  const response = await culturalClassService.getById(id)
  record.value = response.data
  selectedSessionId.value = response.data?.sessions[0]?.id ?? 0
}

const goBack = () => router.push({ name: 'cultural-class' })
const goToEdit = () => {
  if (!record.value) return
  router.push({ name: 'cultural-class-edit', params: { id: record.value.id } })
}

const addStudent = async () => {
  if (!record.value) return
  const response = await culturalClassService.addMockStudent(record.value.id)
  if (response.data) record.value = response.data
}

const removeStudent = (studentId: number) => {
  if (!record.value) return
  record.value.students = record.value.students.filter((s) => s.id !== studentId)
  record.value.totalStudents = record.value.students.length
}

onMounted(async () => await loadRecord())
watch(() => route.params.id, async () => await loadRecord())
</script>

<style scoped>
:deep(.ant-table-thead > tr > th) {
  background-color: #fcfcfd;
  color: #566a7f;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  border-bottom: 1px solid #f0f2f5;
}

:deep(.ant-table-tbody > tr > td) {
  padding: 16px;
  color: #697a8d;
  font-size: 13px;
}

:deep(.ant-select-selector) {
  height: 38px !important;
  border-radius: 6px !important;
  border-color: #d9dee3 !important;
  display: flex;
  align-items: center;
}
</style>
