<template>
  <div class="flex flex-col h-full bg-white rounded-b-xl">
    <a-table 
      :columns="columns" 
      :data-source="data" 
      :pagination="false"
      :row-selection="{ type: 'checkbox' }"
      class="custom-table"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'id'">
          <span class="text-[#696cff] font-medium hover:underline cursor-pointer transition-all">{{ record.id }}</span>
        </template>

        <template v-if="column.key === 'actions'">
          <div class="flex items-center justify-end gap-3">
            <i class='bx bx-show text-xl text-[#a1acb8] cursor-pointer hover:text-[#696cff]' 
               @click="router.push(`/student/signed-contract/detail/${record.key}`)"></i>
            <i class='bx bx-edit text-xl text-[#a1acb8] cursor-pointer hover:text-[#ffab00]' 
               @click="router.push(`/student/signed-contract/edit/${record.key}`)"></i>
            <i class='bx bx-trash text-xl text-[#a1acb8] cursor-pointer hover:text-[#ff3e1d]'
               @click="confirmDelete(record)"></i>
          </div>
        </template>
      </template>
    </a-table>

    <div class="p-6 flex justify-end items-center border-t border-[#f0f2f4]">
      <div class="flex gap-1.5">
        <button class="p-nav-btn" @click="currentPage = 1"><i class='bx bx-chevrons-left'></i></button>
        <button class="p-nav-btn" @click="currentPage > 1 ? currentPage-- : null"><i class='bx bx-chevron-left'></i></button>
        
        <button 
          v-for="p in [1, 2, 3, 4, 5, 6]" 
          :key="p" 
          :class="['p-num-btn', { active: p === currentPage }]"
          @click="currentPage = p"
        >
          {{ p }}
        </button>
        
        <button class="p-nav-btn" @click="currentPage < 6 ? currentPage++ : null"><i class='bx bx-chevron-right'></i></button>
        <button class="p-nav-btn" @click="currentPage = 6"><i class='bx bx-chevrons-right'></i></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed} from 'vue'
import { useRouter } from 'vue-router'
import { Modal, message } from 'ant-design-vue'

const router = useRouter()
const currentPage = ref(1)

// Nhận dữ liệu từ component cha[cite: 6]
const props = defineProps({
  data: { type: Array, default: () => [] }
})
const emit = defineEmits(['update-data'])

const columns = computed(() => [
  { title: 'ID HỢP ĐỒNG', key: 'id', dataIndex: 'id', width: '15%' },
  { title: 'HỌC VIÊN', key: 'student', dataIndex: 'student', width: '30%' },
  { title: 'NGÀY ÁP DỤNG', key: 'startDate', dataIndex: 'startDate', width: '18%' },
  { title: 'NGÀY KẾT THÚC', key: 'endDate', dataIndex: 'endDate', width: '18%' },
  { title: 'HÀNH ĐỘNG', key: 'actions', align: 'right', width: '15%' }
])

const confirmDelete = (record: any) => {
  Modal.confirm({
    title: 'Xác nhận xóa?',
    content: `Hợp đồng ${record.id} sẽ được chuyển vào danh sách đã xóa.`,
    okText: 'Xóa',
    okType: 'danger',
    onOk() {
      // Lưu vào localStorage[cite: 6]
      const deletedList = JSON.parse(localStorage.getItem('deletedContracts') || '[]')
      const newDeletedItem = { 
        ...record, 
        key: Date.now().toString() + Math.random().toString(36).substr(2, 5), 
        balance: new Date().toLocaleString() 
      }
      deletedList.push(newDeletedItem)
      localStorage.setItem('deletedContracts', JSON.stringify(deletedList))
      
      // Phát tín hiệu báo cho file Page xóa dữ liệu để cập nhật Card[cite: 6, 7]
      const newData = props.data.filter((item: any) => item.key !== record.key)
      emit('update-data', newData)
      
      message.success('Đã chuyển vào danh sách đã xóa')
    }
  })
}
</script>

<style scoped>
:deep(.ant-table-thead > tr > th) {
  background-color: #f5f5f9 !important;
  color: #a1acb8 !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  text-transform: uppercase;
  border-bottom: 1px solid #d9dee3 !important;
}

:deep(.ant-table-tbody > tr > td) {
  font-size: 14px;
  color: #566a7f !important;
  padding: 12px 16px !important;
}

.p-nav-btn {
  @apply w-8 h-8 flex items-center justify-center rounded bg-[#f0f2f4] text-[#8592a3] hover:bg-[#e1e4e8] border-none cursor-pointer;
}

.p-num-btn {
  @apply w-8 h-8 flex items-center justify-center rounded bg-[#f0f2f4] text-[#566a7f] text-xs font-medium hover:bg-[#e1e4e8] border-none cursor-pointer;
}

.p-num-btn.active {
  @apply bg-[#ff3e1d] text-white shadow-[0_2px_4px_0_rgba(255,62,29,0.4)];
}
</style>
