// fpl-udpm-pvf-fe/src/components/pages/extracurricular/ActivityDetailPage.vue
<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    
    <!-- THẺ CHI TIẾT HOẠT ĐỘNG -->
    <AdminCard title="Chi tiết Hoạt động ngoại khoá" padded>
      <template #actions>
        <ButtonBack @click="$router.back()" />
        <ButtonEditNoIcon text="Chỉnh Sửa" @click="handleEdit" />
      </template>

      <div v-if="loading" class="py-6 text-center text-gray-400">Đang tải dữ liệu...</div>
      <DetailList v-else :items="detailItems" />
    </AdminCard>

    <div class="mt-6"></div>

    <!-- THẺ DANH SÁCH HỌC VIÊN -->
    <AdminCard title="Danh sách học viên tham gia lớp học" padded>
      <template #actions>
        <ButtonAdd text="Thêm Mới" @click="handleAddStudent" />
        
        <!-- Nút Xuất Danh Sách sử dụng NavIcon -->
        <button type="button" class="inline-flex items-center gap-2 rounded-md bg-lime-500 px-4 py-[9px] text-[13px] font-bold text-white transition hover:bg-lime-600 shadow-sm">
          <NavIcon name="BxDownload" class-name="w-4 h-4 text-white" /> 
          Xuất Danh Sách
        </button>

        <!-- Nút Nhập Danh Sách sử dụng NavIcon -->
        <button type="button" class="inline-flex items-center gap-2 rounded-md bg-cyan-500 px-4 py-[9px] text-[13px] font-bold text-white transition hover:bg-cyan-600 shadow-sm">
          <NavIcon name="BxUpload" class-name="w-4 h-4 text-white" /> 
          Nhập Danh Sách
        </button>
      </template>

      <!-- Tabs -->
      <div class="flex flex-wrap items-center gap-3 mb-6">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          type="button"
          class="rounded-lg px-6 py-2 text-[13px] font-bold transition"
          :class="activeTab === tab.value ? 'bg-[#696cff] text-white shadow-sm' : 'border border-gray-200 bg-[#f5f5f9] text-[#566a7f] hover:bg-[#eceef1]'"
          @click="activeTab = tab.value"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Bảng danh sách học viên -->
      <div class="overflow-x-auto border border-gray-100 rounded-lg">
        <AppTable :columns="columns" :data-source="students" :pagination="false" :loading="loading" :row-selection="{ onChange: () => {} }">
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'index'">
              <span class="text-[#696cff] font-medium">{{ index + 1 }}</span>
            </template>
            <template v-else-if="column.key === 'status'">
              <BaseTag :type="record.status === 'Đang học' ? 'success' : 'default'">
                {{ record.status }}
              </BaseTag>
            </template>
            <template v-else-if="column.key === 'actions'">
              <div class="flex items-center gap-2">
                <button class="text-gray-400 hover:text-[#696cff] transition-colors p-1"><NavIcon name="BxShow" size="18" /></button>
                <button class="text-gray-400 hover:text-red-500 transition-colors p-1"><NavIcon name="BxTrash" size="18" /></button>
              </div>
            </template>
          </template>
        </AppTable>
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { message } from 'ant-design-vue'

// Import Templates & Organisms
import AdminPage from '@/components/templates/AdminPage.vue'
import AppTable from '@/components/organisms/AppTable.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import DetailList from '@/components/molecules/DetailList.vue'

// Import Atoms
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import ButtonEditNoIcon from '@/components/atoms/buttons/ButtonEditNoIcon.vue'
import ButtonAdd from '@/components/atoms/buttons/ButtonAdd.vue'
import BaseTag from '@/components/atoms/display/BaseTag.vue'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'

// Import Service
import { activityService, type ActivityRecord, type StudentActivity } from '@/services/extracurricular/activity'

const router = useRouter()
const route = useRoute()

const loading = ref(true)
const activityData = ref<ActivityRecord | null>(null)
const students = ref<StudentActivity[]>([])

const breadcrumbs = [
  { title: 'Quản lý hoạt động ngoại khoá', path: '#' },
  { title: 'Hoạt động ngoại khoá', path: '/extracurricular/activities/list' },
  { title: 'Chi tiết', path: '#' }
]

const detailItems = computed(() => {
  if (!activityData.value) return []
  return [
    { label: 'ID hoạt động', value: activityData.value.id },
    { label: 'Tên hoạt động', value: activityData.value.name },
    { label: 'Mô tả hoạt động', value: activityData.value.description || 'Không có mô tả' },
    { label: 'Địa điểm', value: activityData.value.location },
    { label: 'Giáo viên phụ trách', value: activityData.value.teacher },
    { label: 'Thời gian bắt đầu', value: activityData.value.start },
    { label: 'Thời gian kết thúc', value: activityData.value.end },
    { label: 'Ghi chú thêm', value: activityData.value.note || 'Không có ghi chú' },
    { label: 'Thời gian tạo', value: activityData.value.createdAt || '-' },
    { label: 'Thời gian cập nhật', value: activityData.value.updatedAt || '-' },
    { label: 'Trạng thái', value: activityData.value.status }
  ]
})

const activeTab = ref('roster')
const tabs = [
  { value: 'roster', label: 'Danh Sách' },
  { value: 'attendance', label: 'Điểm Danh' }
]

const columns = [
  { title: '#', key: 'index', width: '60px', align: 'center' },
  { title: 'MÃ HỌC VIÊN', dataIndex: 'code', key: 'code' },
  { title: 'TÊN HỌC VIÊN', dataIndex: 'name', key: 'name' },
  { title: 'EMAIL', dataIndex: 'email', key: 'email' },
  { title: 'NGÀY VÀO LỚP', dataIndex: 'joinedDate', key: 'joinedDate' },
  { title: 'TRẠNG THÁI', key: 'status', align: 'center' },
  { title: 'HÀNH ĐỘNG', key: 'actions', align: 'center' }
]

const fetchDetail = async () => {
  try {
    const id = route.params.id as string
    const res = await activityService.getById(id)
    activityData.value = res.data
    students.value = res.students
  } catch (error) {
    message.error('Lỗi khi tải chi tiết hoạt động!')
  } finally {
    loading.value = false
  }
}

const handleEdit = () => {
  if(activityData.value) {
    router.push(`/extracurricular/activities/edit/${activityData.value.id}`)
  }
}

const handleAddStudent = () => {
  message.info('Chức năng đang phát triển')
}

onMounted(() => {
  fetchDetail()
})
</script>