<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Quản lý học tập ngoại khoá</span>
      <span class="text-gray-400">/</span>
      <span class="text-[#566a7f] font-medium">Môn học ngoại khoá</span>
    </div>

    <!-- Stat Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p class="text-[15px] text-[#566a7f] mb-2 font-medium">Tổng số</p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-2xl font-bold text-[#566a7f]">{{ summary.total }}</h3>
          </div>
          <p class="text-[13px] text-gray-400 mt-1">Môn học ngoại khoá</p>
        </div>
        <div class="w-12 h-12 bg-[#e8f2ff] rounded-lg flex items-center justify-center text-[#696cff]">
          <NavIcon name="BxBook" size="24" />
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p class="text-[15px] text-[#566a7f] mb-2 font-medium">Tổng số đang sử dụng</p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-2xl font-bold text-[#566a7f]">{{ summary.active }}</h3>
            <span class="text-[13px] font-semibold text-[#71dd37]">(95%)</span>
          </div>
          <p class="text-[13px] text-gray-400 mt-1">Môn học ngoại khoá</p>
        </div>
        <div class="w-12 h-12 bg-[#ffe4e4] rounded-lg flex items-center justify-center text-[#ff3e1d]">
          <NavIcon name="BxLayer" size="24" />
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p class="text-[15px] text-[#566a7f] mb-2 font-medium">Tổng số tạm ngưng</p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-2xl font-bold text-[#566a7f]">{{ summary.paused }}</h3>
            <span class="text-[13px] font-semibold text-[#71dd37]">(5%)</span>
          </div>
          <p class="text-[13px] text-gray-400 mt-1">Môn học ngoại khoá</p>
        </div>
        <div class="w-12 h-12 bg-[#fff2e1] rounded-lg flex items-center justify-center text-[#ffab00]">
          <NavIcon name="BxLayer" size="24" />
        </div>
      </div>
    </div>

    <!-- Table Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header with Buttons -->
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Danh sách Môn học ngoại khoá</h2>
        <div class="flex items-center gap-2">
          <ButtonDeleteList @click="handleGoToDeleted" />
          <ButtonAdd @click="handleCreate" />
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="p-6 flex flex-wrap items-center gap-3 bg-[#fcfcfd] border-b border-gray-100">
        <div class="flex-1 min-w-[200px]">
          <InputSearch v-model="searchQuery" placeholder="Tìm kiếm" />
        </div>
        <div class="w-[200px]">
          <SelectFilter :value="statusFilter" @update:value="statusFilter = $event" placeholder="Chọn trạng thái" :options="statusOptions" />
        </div>
        <div class="flex items-center gap-2">
          <ButtonSearch @click="fetchData" />
          <ButtonReset @click="resetFilters" />
        </div>
      </div>

      <!-- Table Container -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-[#fcfcfd] border-b border-gray-100">
            <tr>
              <th class="px-6 py-4 text-left text-[11px] font-bold text-[#566a7f] uppercase tracking-wider">#</th>
              <th class="px-6 py-4 text-left text-[11px] font-bold text-[#566a7f] uppercase tracking-wider">MÃ MÔN</th>
              <th class="px-6 py-4 text-left text-[11px] font-bold text-[#566a7f] uppercase tracking-wider">TÊN MÔN</th>
              <th class="px-6 py-4 text-left text-[11px] font-bold text-[#566a7f] uppercase tracking-wider">MÔ TẢ MÔN</th>
              <th class="px-6 py-4 text-left text-[11px] font-bold text-[#566a7f] uppercase tracking-wider">TRẠNG THÁI</th>
              <th class="px-6 py-4 text-left text-[11px] font-bold text-[#566a7f] uppercase tracking-wider">HÀNH ĐỘNG</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-100">
            <tr v-for="(record, index) in tableData" :key="record.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 text-[13px] text-[#696cff] font-medium">{{ index + 1 }}</td>
              <td class="px-6 py-4 text-[13px] text-[#566a7f] font-bold">{{ record.code }}</td>
              <td class="px-6 py-4 text-[13px] text-[#566a7f]">{{ record.name }}</td>
              <td class="px-6 py-4 text-[13px] text-[#566a7f]">{{ record.description }}</td>
              <td class="px-6 py-4">
                <BaseTag :type="record.status === 'Đang hoạt động' ? 'success' : 'warning'">
                  {{ record.status }}
                </BaseTag>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <NavIcon 
                    name="BxShow" 
                    class-name="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#696cff] transition-colors" 
                    @click="handleView(record.id)"
                  />
                  <NavIcon 
                    name="BxEditAlt" 
                    class-name="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#71dd37] transition-colors" 
                    @click="handleEdit(record.id)"
                  />
                  <NavIcon 
                    name="BxTrash" 
                    class-name="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#ff3e1d] transition-colors" 
                    @click="handleDelete(record.id)"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="p-6 flex justify-end bg-white border-t border-gray-100">
        <BasePagination :current="currentPage" :total="60" :pageSize="10" @change="handlePageChange" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'
import BaseTag from '@/components/atoms/display/BaseTag.vue'
import BasePagination from '@/components/atoms/display/BasePagination.vue'
import ButtonAdd from '@/components/atoms/buttons/ButtonAdd.vue'
import ButtonDeleteList from '@/components/atoms/buttons/ButtonDeleteList.vue'
import ButtonSearch from '@/components/atoms/buttons/ButtonSearch.vue'
import ButtonReset from '@/components/atoms/buttons/ButtonReset.vue'
import InputSearch from '@/components/atoms/inputs/InputSearch.vue'
import SelectFilter from '@/components/atoms/inputs/SelectFilter.vue'
import { mhnkService } from '@/services/extracurricular/mhnkapi'

const router = useRouter()
const searchQuery = ref('')
const statusFilter = ref(undefined)
const tableData = ref<any[]>([])
const summary = ref({ total: 0, active: 0, paused: 0 })
const currentPage = ref(1)

const statusOptions = [
  { label: 'Đang hoạt động', value: 'Đang hoạt động' },
  { label: 'Tạm ngưng', value: 'Tạm ngưng' }
]

const fetchData = async () => {
  try {
    const res = await mhnkService.getList({
      keyword: searchQuery.value,
      status: statusFilter.value
    })
    tableData.value = res.data
    summary.value = res.summary
  } catch (error) {
    console.error(error)
  }
}

const resetFilters = () => {
  searchQuery.value = ''
  statusFilter.value = undefined
  fetchData()
}

const handleCreate = () => {
  router.push({ name: 'extracurricular-subjects-create' })
}

const handleGoToDeleted = () => {
  router.push({ name: 'extracurricular-subjects-deleted' })
}

const handleView = (id: string) => {
  router.push({ name: 'extracurricular-subjects-detail', params: { id } })
}

const handleEdit = (id: string) => {
  router.push({ name: 'extracurricular-subjects-edit', params: { id } })
}

const handleDelete = async (id: string) => {
  try {
    await mhnkService.softDelete(id)
    message.success('Đã xoá môn học')
    fetchData()
  } catch (error) {
    message.error('Lỗi khi xoá')
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchData()
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
/* No custom styles needed - using base components */
</style>
