<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Quản lý học tập ngoại khoá</span>
      <span class="text-gray-400">/</span>
      <span class="text-gray-400 cursor-pointer" @click="$router.push('/extracurricular/subjects')">Môn học ngoại khoá</span>
      <span class="text-gray-400">/</span>
      <span class="text-[#566a7f] font-medium">Chi tiết</span>
    </div>

    <!-- Detail Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header with Buttons -->
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Chi tiết Môn học ngoại khoá</h2>
        <div class="flex items-center gap-2">
          <a-button 
            @click="$router.push('/extracurricular/subjects')"
            class="!bg-[#f1f1f2] hover:!bg-[#e1e1e2] !text-[#566a7f] !border-none flex items-center gap-2 h-9 px-4 rounded-md text-xs font-medium"
          >
            <NavIcon name="BxArrowBack" size="14" />
            Quay Lại
          </a-button>
          <a-button 
            type="primary" 
            class="!bg-[#ffab00] hover:!bg-[#e59900] !border-none flex items-center gap-2 h-9 px-4 rounded-md text-xs font-medium"
            @click="$router.push(`/extracurricular/subjects/${subject?.id || subject?.code}/edit`)"
          >
            Chỉnh Sửa
          </a-button>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6">
        <div class="border border-gray-200 rounded-md overflow-hidden">
          <div class="flex border-b border-gray-200 last:border-0" v-for="(item, index) in detailItems" :key="index">
            <div class="w-1/4 bg-[#fcfcfd] p-4 text-[#566a7f] font-bold text-[13px] border-r border-gray-200 flex items-center">
              {{ item.label }}
            </div>
            <div class="w-3/4 p-4 text-[#566a7f] text-[13px] flex items-center">
              {{ item.value }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stat Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p class="text-[13px] text-[#566a7f] mb-2 font-medium">Tổng lớp học môn</p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-2xl font-bold text-[#566a7f]">{{ subject?.totalClasses || 0 }}</h3>
          </div>
        </div>
        <div class="w-10 h-10 bg-[#e8f2ff] rounded-lg flex items-center justify-center text-[#696cff]">
          <NavIcon name="BxBook" size="20" />
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p class="text-[13px] text-[#566a7f] mb-2 font-medium">Tổng học viên</p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-2xl font-bold text-[#566a7f]">{{ subject?.totalStudents || 0 }}</h3>
            <span class="text-[13px] font-semibold text-[#71dd37]">(95%)</span>
          </div>
        </div>
        <div class="w-10 h-10 bg-[#ffe4e4] rounded-lg flex items-center justify-center text-[#ff3e1d]">
          <NavIcon name="BxCalendarCheck" size="20" />
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p class="text-[13px] text-[#566a7f] mb-2 font-medium">Điểm trung bình môn</p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-2xl font-bold text-[#566a7f]">{{ subject?.averageScore || 0 }}</h3>
            <span class="text-[13px] font-semibold text-[#71dd37]">(5%)</span>
          </div>
        </div>
        <div class="w-10 h-10 bg-[#fff2e1] rounded-lg flex items-center justify-center text-[#ffab00]">
          <NavIcon name="BxError" size="20" />
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p class="text-[13px] text-[#566a7f] mb-2 font-medium">Tỷ lệ đạt / không đạt</p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-2xl font-bold text-[#566a7f]">{{ subject?.passRate || 0 }}</h3>
            <span class="text-[13px] font-semibold text-[#71dd37]">(5%)</span>
          </div>
        </div>
        <div class="w-10 h-10 bg-[#f4f4f4] rounded-lg flex items-center justify-center text-[#8592a3]">
          <NavIcon name="BxWater" size="20" />
        </div>
      </div>
    </div>

    <!-- Scores Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header with Buttons -->
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Các đầu điểm của môn</h2>
        <div class="flex items-center gap-2">
          <a-button 
            type="primary" 
            class="!bg-[#e31a1a] hover:!bg-[#c41616] !border-none flex items-center gap-2 h-9 px-4 rounded-md text-xs font-medium"
          >
            <NavIcon name="BxPlus" size="14" />
            Thêm Mới
          </a-button>
        </div>
      </div>

      <!-- Table Container -->
      <div class="overflow-x-auto">
        <a-table 
          :columns="scoreColumns" 
          :data-source="subject?.scores || []" 
          :pagination="false"
          :row-selection="{}"
          class="pvf-table"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'stt'">
              <span class="text-[#696cff]">{{ index + 1 }}</span>
            </template>
            <template v-if="column.key === 'name'">
              <span class="text-[#566a7f]">{{ record.name }}</span>
            </template>
            <template v-if="column.key === 'weight'">
              <span class="text-[#566a7f]">{{ record.weight }}</span>
            </template>
            <template v-if="column.key === 'status'">
              <div class="flex items-center">
                <span :class="record.status === 'Đang áp dụng' ? 'bg-[#e7f5e9] text-[#71dd37]' : 'bg-[#fff2e1] text-[#ffab00]'" class="px-3 py-1 rounded-md text-[11px] font-bold uppercase whitespace-nowrap">
                  {{ record.status }}
                </span>
              </div>
            </template>
            <template v-if="column.key === 'action'">
              <div class="flex items-center gap-3">
                <NavIcon 
                  name="BxShow" 
                  class-name="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#696cff]" 
                />
                <NavIcon 
                  name="BxEditAlt" 
                  class-name="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#ffab00]" 
                />
                <NavIcon 
                  name="BxTrash" 
                  class-name="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#ff3e1d]" 
                />
              </div>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'
import { mhnkService } from '@/services/extracurricular/mhnkapi'

const route = useRoute()
const subject = ref<any>(null)

const scoreColumns = [
  { title: 'STT', key: 'stt', width: 60 },
  { title: 'TÊN LOẠI ĐIỂM', dataIndex: 'name', key: 'name', width: 250 },
  { title: 'TRỌNG SỐ TÍNH ĐIỂM (%)', dataIndex: 'weight', key: 'weight' },
  { title: 'TRẠNG THÁI', dataIndex: 'status', key: 'status', width: 150 },
  { title: 'HÀNH ĐỘNG', key: 'action', width: 130 }
]

const detailItems = computed(() => {
  if (!subject.value) return []
  return [
    { label: 'Mã môn', value: subject.value.code },
    { label: 'Tên môn', value: subject.value.name },
    { label: 'Mô tả môn', value: subject.value.description },
    { label: 'Thời gian tạo', value: subject.value.createdAt || '-' },
    { label: 'Thời gian cập nhật', value: subject.value.updatedAt || '-' },
    { label: 'Trạng thái', value: subject.value.status === 'Đang hoạt động' ? 'Đang sử dụng' : subject.value.status }
  ]
})

const fetchDetail = async () => {
  try {
    const id = route.params.id as string
    if (id) {
      const res = await mhnkService.getById(id)
      subject.value = res.data
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchDetail()
})
</script>

<style scoped>
:deep(.pvf-table .ant-table-thead > tr > th) {
  background-color: #fcfcfd;
  color: #566a7f;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 11px;
  border-bottom: 1px solid #d9dee3;
}
:deep(.pvf-table .ant-table-tbody > tr > td) {
  color: #566a7f;
  font-size: 13px;
  padding: 12px 16px;
}
</style>
