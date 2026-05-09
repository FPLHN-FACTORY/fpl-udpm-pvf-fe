<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <div class="space-y-6">
      <template v-if="isMainPage">
        <!-- 2. Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a-card v-for="(stat, index) in stats" :key="index" :bordered="false" class="shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-all h-[110px]">
            <div class="flex justify-between h-full p-5">
              <div class="flex flex-col justify-between">
                <span class="text-[#566a7f] text-[13px] font-medium leading-tight opacity-80">{{ stat.title }}</span>
                <div class="flex items-baseline space-x-2">
                  <span class="text-[22px] font-bold text-[#566a7f] leading-none">{{ stat.value }}</span>
                  <span v-if="stat.percent" :class="stat.percentClass" class="text-[13px] font-medium">
                    ({{ stat.percent }})
                  </span>
                </div>
                <span class="text-[11px] text-[#a1acb8] uppercase font-bold tracking-wider mt-1">{{ stat.subtitle }}</span>
              </div>
              <div class="flex items-start">
                <div :class="stat.iconBg" class="w-10 h-10 rounded-lg flex items-center justify-center">
                  <NavIcon :name="stat.icon" :class-name="stat.iconColor" :size="22" />
                </div>
              </div>
            </div>
          </a-card>
        </div>

        <!-- 3. Main Content Card -->
        <a-card :bordered="false" class="shadow-sm rounded-xl overflow-hidden">
          <!-- Card Header: Title and Buttons -->
          <div class="flex items-center justify-between p-6 pb-4 bg-white">
            <h2 class="text-[18px] font-bold text-gray-700 m-0 uppercase tracking-tight">Danh sách Hợp đồng đã ký</h2>
            <div class="flex items-center gap-3">
              <ButtonDeleteList @click="goToDeleted" />
              <ButtonAdd label="Thêm Mới" @click="handleCreate" />
            </div>
          </div>

          <!-- Filter Bar -->
          <div class="flex flex-nowrap items-center gap-3 p-6 bg-[#fcfcfd] border-b border-gray-100">
            <div class="w-[300px]">
              <InputSearch v-model="filters.keyword" placeholder="Tìm kiếm" />
            </div>
            <div class="w-[220px]">
              <a-date-picker 
                v-model:value="filters.date" 
                placeholder="Chọn thời gian" 
                class="w-full !h-[38px] !rounded-lg !border-[#d9dee3]" 
              />
            </div>

            <div class="flex items-center gap-2 ml-auto">
              <ButtonSearch @click="handleSearch" />
              <ButtonReset @click="handleReset" />
            </div>
          </div>

          <!-- 4. Table -->
          <div class="px-0">
            <signed-contract-table 
              :data="dataSource" 
              @delete-item="handleDeleteContract" 
            />
          </div>
        </a-card>
      </template>

      <template v-else>
        <div class="flex-1">
          <router-view />
        </div>
      </template>
    </div>
  </AdminPage>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminPage from '@/components/templates/AdminPage.vue'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'
import ButtonAdd from '@/components/atoms/buttons/ButtonAdd.vue'
import ButtonDeleteList from '@/components/atoms/buttons/ButtonDeleteList.vue'
import ButtonSearch from '@/components/atoms/buttons/ButtonSearch.vue'
import ButtonReset from '@/components/atoms/buttons/ButtonReset.vue'
import InputSearch from '@/components/atoms/inputs/InputSearch.vue'
import SignedContractTable from "../../organisms/SignedContractTable.vue"

const route = useRoute()
const router = useRouter()

const breadcrumbs = [
  { title: 'Quản lý học viên', href: '#' },
  { title: 'Hợp đồng đã ký', href: '#' }
]

const stats = [
  { 
    title: 'Tổng số hợp đồng đã ký', 
    value: '21', 
    subtitle: 'Hợp đồng',
    icon: 'BxStatsTile', 
    iconBg: 'bg-[#e7e7ff]', 
    iconColor: 'text-[#696cff]' 
  },
  { 
    title: 'Số hợp đồng còn thời hạn', 
    value: '20', 
    percent: '95%', 
    percentClass: 'text-[#71dd37]',
    subtitle: 'Hợp đồng',
    icon: 'BxLayersPlus', 
    iconBg: 'bg-[#ffe5e5]', 
    iconColor: 'text-[#ff3e1d]' 
  },
  { 
    title: 'Số hợp đồng đã hết hạn', 
    value: '1', 
    percent: '5%', 
    percentClass: 'text-[#ffab00]',
    subtitle: 'Hợp đồng',
    icon: 'BxLayers', 
    iconBg: 'bg-[#fff2d6]', 
    iconColor: 'text-[#ffab00]' 
  }
]

const filters = reactive({ 
  keyword: '', 
  date: undefined 
})

const dataSource = ref([
  { key: '1', id: 'HD001', student: 'TH12345 - Nguyễn Văn An', startDate: '2025-02-01', endDate: '2025-02-10' },
  { key: '2', id: 'HD002', student: 'TH12345 - Nguyễn Văn An', startDate: '2025-02-01', endDate: '2025-02-10' },
  { key: '3', id: 'HD003', student: 'TH12345 - Nguyễn Văn An', startDate: '2025-02-01', endDate: '2025-02-10' },
  { key: '4', id: 'HD004', student: 'TH12345 - Nguyễn Văn An', startDate: '2025-02-01', endDate: '2025-02-10' },
  { key: '5', id: 'HD005', student: 'TH12345 - Nguyễn Văn An', startDate: '2025-02-01', endDate: '2025-02-10' }
])

const handleDeleteContract = (record: any) => {
  dataSource.value = dataSource.value.filter(item => item.id !== record.id)
  const deletedList = JSON.parse(localStorage.getItem('deletedContracts') || '[]')
  if (!deletedList.some((item: any) => item.id === record.id)) {
    deletedList.push(record)
    localStorage.setItem('deletedContracts', JSON.stringify(deletedList))
  }
}

const isMainPage = computed(() => route.name === 'SignedContractList' || route.path === '/student/signed-contract')
const handleCreate = () => router.push('/student/signed-contract/create')
const goToDeleted = () => router.push('/student/signed-contract/deleted')
const handleSearch = () => console.log('Searching...')
const handleReset = () => {
  filters.keyword = ''
  filters.date = undefined
}
</script>

<style scoped>
:deep(.ant-card-body) {
  padding: 0;
}

:deep(.ant-picker:hover) {
  border-color: #696cff !important;
}

:deep(.ant-picker-focused) {
  border-color: #d9dee3 !important;
  box-shadow: none !important;
}
</style>
