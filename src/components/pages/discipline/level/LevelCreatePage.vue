<template>
  <div class="flex flex-col gap-6">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Kỷ luật khen thưởng</span>
      <span class="text-gray-400">/</span>
      <span class="text-gray-500 font-medium">Mức độ khen thưởng/kỷ luật</span>
    </div>

    <!-- Main Content Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Header -->
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Thêm mới Mức độ khen thưởng/ kỷ luật</h2>
        <a-button 
          class="!bg-[#f5f5f9] hover:!bg-[#eaeaef] !border-none !text-[#566a7f] !text-[13px] !px-4 !h-[38px] flex items-center gap-2 rounded-md font-medium"
          @click="$router.push('/discipline/levels')"
        >
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </template>
          Quay Lại
        </a-button>
      </div>
      
      <div class="p-8">
        <div class="flex flex-col gap-6 max-w-full">
          
          <!-- Field: Tên mức -->
          <div class="relative border border-[#d9dee3] rounded-md px-3 py-1.5 focus-within:border-[#696cff] transition-colors bg-white">
            <label class="absolute -top-2.5 left-2 bg-white px-1 text-[12px] text-[#8592a3] z-10 pointer-events-none">Tên mức</label>
            <a-input v-model:value="form.name" :bordered="false" class="!px-0 !shadow-none text-[#566a7f] text-[14px] !bg-transparent" placeholder="Tên mức" />
          </div>

          <!-- Field: Cấp độ -->
          <div class="relative border border-[#d9dee3] rounded-md px-3 py-1.5 focus-within:border-[#696cff] transition-colors bg-white">
            <label class="absolute -top-2.5 left-2 bg-white px-1 text-[12px] text-[#8592a3] z-10 pointer-events-none">Cấp độ</label>
            <a-input v-model:value="form.level" :bordered="false" class="!px-0 !shadow-none text-[#566a7f] text-[14px] !bg-transparent" placeholder="Cấp độ" />
          </div>

          <!-- Field: Mô tả -->
          <div class="relative border border-[#d9dee3] rounded-md px-3 py-2 focus-within:border-[#696cff] transition-colors bg-white">
            <label class="absolute -top-2.5 left-2 bg-white px-1 text-[12px] text-[#8592a3] z-10 pointer-events-none">Mô tả</label>
            <a-textarea v-model:value="form.description" :bordered="false" :rows="4" class="!px-0 !shadow-none text-[#566a7f] text-[14px] !bg-transparent resize-none" placeholder="Mô tả" />
          </div>

          <!-- Field: Trạng thái -->
          <div class="relative border border-[#d9dee3] rounded-md px-3 py-1.5 focus-within:border-[#696cff] transition-colors bg-white">
            <label class="absolute -top-2.5 left-2 bg-white px-1 text-[12px] text-[#8592a3] z-10 pointer-events-none">Trạng thái</label>
            <a-select v-model:value="form.status" :bordered="false" placeholder="Chọn trạng thái" class="w-full custom-select">
              <a-select-option value="active">Đang hoạt động</a-select-option>
              <a-select-option value="inactive">Ngưng hoạt động</a-select-option>
            </a-select>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-center gap-3 mt-8">
          <a-button class="!bg-[#ff3e1d] hover:!bg-[#e33619] !border-none !text-white !h-[38px] !px-8 rounded-md font-medium" @click="save">Thêm Mới</a-button>
          <a-button class="!bg-[#fdac41] hover:!bg-[#e39a3a] !border-none !text-white !h-[38px] !px-8 rounded-md font-medium" @click="resetForm">Đặt Lại</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const form = ref({ name: '', level: '', description: '', status: undefined })
const save = () => { router.push('/discipline/levels') }
const resetForm = () => { form.value = { name: '', level: '', description: '', status: undefined } }
</script>

<style scoped>
.custom-select :deep(.ant-select-selector) { padding: 0 !important; box-shadow: none !important; background-color: transparent !important; }
.custom-select :deep(.ant-select-selection-item) { padding: 0 !important; color: #566a7f !important; font-size: 14px !important; }
.relative:focus-within label { color: #696cff; }
</style>