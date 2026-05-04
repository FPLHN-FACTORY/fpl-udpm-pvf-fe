<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Quản lý tuyển sinh</span>
      <span class="text-gray-400">/</span>
      <span class="text-gray-400">Kỳ tuyển sinh</span>
    </div>

    <!-- Detail Card -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Chi tiết Kỳ tuyển sinh</h2>
        <div class="flex gap-2">
          <a-button 
            class="!bg-[#f5f5f9] hover:!bg-[#eaeaef] !border-none !text-[#566a7f] !text-[13px] !px-4 !h-[38px] flex items-center gap-2"
            @click="$router.push('/recruitment/admission-periods')"
          >
            <template #icon>←</template>
            Quay Lại
          </a-button>
          <a-button 
            class="!bg-[#ffab00] hover:!bg-[#e69a00] !border-none !text-white !text-[13px] !px-6 !h-[38px] font-medium rounded-md"
            @click="$router.push('/recruitment/admission-periods/edit/1')"
          >
            Chỉnh Sửa
          </a-button>
        </div>
      </div>
      
      <div class="p-6">
        <div class="flex flex-col border border-gray-100 rounded-lg overflow-hidden">
          <div class="flex border-b border-gray-100">
            <div class="w-1/3 bg-[#fcfcfd] p-4 text-[#566a7f] font-semibold text-sm">Cơ sở đào tạo</div>
            <div class="w-2/3 p-4 text-[#697a8d] text-sm">Cơ sở đào tạo FPT Hà Nội</div>
          </div>
          <div class="flex border-b border-gray-100">
            <div class="w-1/3 bg-[#fcfcfd] p-4 text-[#566a7f] font-semibold text-sm">Tên kỳ tuyển sinh</div>
            <div class="w-2/3 p-4 text-[#697a8d] text-sm">Kỳ tuyển sinh Xuân 2025</div>
          </div>
          <div class="flex border-b border-gray-100">
            <div class="w-1/3 bg-[#fcfcfd] p-4 text-[#566a7f] font-semibold text-sm">Ngày bắt đầu kỳ tuyển sinh</div>
            <div class="w-2/3 p-4 text-[#697a8d] text-sm">2025-01-15</div>
          </div>
          <div class="flex border-b border-gray-100">
            <div class="w-1/3 bg-[#fcfcfd] p-4 text-[#566a7f] font-semibold text-sm">Ngày kết thúc kỳ tuyển sinh</div>
            <div class="w-2/3 p-4 text-[#697a8d] text-sm">2025-03-31</div>
          </div>
          <div class="flex border-b border-gray-100">
            <div class="w-1/3 bg-[#fcfcfd] p-4 text-[#566a7f] font-semibold text-sm">Thời gian tạo kỳ tuyển sinh</div>
            <div class="w-2/3 p-4 text-[#697a8d] text-sm">2025-01-20 10:15:45</div>
          </div>
          <div class="flex border-b border-gray-100">
            <div class="w-1/3 bg-[#fcfcfd] p-4 text-[#566a7f] font-semibold text-sm">Thời gian cập nhật kỳ tuyển sinh</div>
            <div class="w-2/3 p-4 text-[#697a8d] text-sm">2025-01-20 10:15:45</div>
          </div>
          <div class="flex">
            <div class="w-1/3 bg-[#fcfcfd] p-4 text-[#566a7f] font-semibold text-sm">Trạng thái</div>
            <div class="w-2/3 p-4">
              <BaseTag type="success">Đang hoạt động</BaseTag>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats & Chart -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="flex flex-col gap-6">
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
          <div>
            <p class="text-sm text-gray-500 mb-1">Tổng hồ sơ đăng ký</p>
            <div class="flex items-baseline gap-2">
              <h3 class="text-2xl font-bold text-[#566a7f]">20</h3>
              <span class="text-[#71dd37] text-sm">(95%)</span>
            </div>
          </div>
          <div class="w-10 h-10 bg-[#ffe1e1] rounded-lg flex items-center justify-center text-[#ff3e1d]">
            <NavIcon name="BxCalendarCheck" class-name="w-6 h-6" />
          </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
          <div>
            <p class="text-sm text-gray-500 mb-1">Số học viên trúng tuyển</p>
            <div class="flex items-baseline gap-2">
              <h3 class="text-2xl font-bold text-[#566a7f]">1</h3>
              <span class="text-[#71dd37] text-sm">(5%)</span>
            </div>
          </div>
          <div class="w-10 h-10 bg-[#fff2e2] rounded-lg flex items-center justify-center text-[#fdac41]">
            <NavIcon name="BxLayer" class-name="w-6 h-6" />
          </div>
        </div>
      </div>
      
      <div class="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-[17px] font-bold text-[#111827]">Thống kê hồ sơ</h3>
          <!-- Combobox Quý -->
          <a-select 
            v-model:value="selectedQuarter" 
            :bordered="false" 
            class="custom-borderless-select !w-[80px]"
            :dropdownMatchSelectWidth="false"
          >
            <template #suffixIcon>
              <NavIcon name="BxChevronDown" class-name="w-4 h-4 text-gray-800" />
            </template>
            <a-select-option value="all">Quý</a-select-option>
            <a-select-option value="1">Quý 1</a-select-option>
            <a-select-option value="2">Quý 2</a-select-option>
            <a-select-option value="3">Quý 3</a-select-option>
            <a-select-option value="4">Quý 4</a-select-option>
          </a-select>
        </div>

        <!-- Chart Area -->
        <div class="flex mt-2">
          <!-- Y-axis -->
          <div class="flex flex-col justify-between h-40 pb-6 text-[12px] text-gray-500 pr-4">
            <span>60</span>
            <span>40</span>
            <span>20</span>
            <span>0</span>
          </div>
          
          <div class="flex-1 relative h-40">
            <!-- Lưới ngang (Grid Lines) -->
            <div class="absolute inset-0 flex flex-col justify-between pb-6 pointer-events-none">
              <div class="w-full border-b border-dashed border-gray-100 h-0"></div>
              <div class="w-full border-b border-dashed border-gray-100 h-0"></div>
              <div class="w-full border-b border-dashed border-gray-100 h-0"></div>
              <div class="w-full border-b border-gray-200 h-0"></div>
            </div>

            <!-- Lưới dọc mờ nhạt -->
            <div class="absolute inset-0 pb-6 flex pointer-events-none">
              <div class="flex-1 border-r border-dashed border-gray-50"></div>
              <div class="flex-1 border-r border-dashed border-gray-50"></div>
              <div class="flex-1 border-r border-dashed border-gray-50"></div>
              <div class="flex-1"></div>
            </div>

            <!-- Các cột biểu đồ -->
            <div class="absolute inset-0 pb-6 flex z-10">
              <div v-for="q in chartData" :key="q.label" class="flex-1 flex flex-col">
                <!-- ĐIỂM CHỈNH SỬA 1: Dùng gap-[1px] để các cột sát rịt vào nhau, tăng px lên px-4 hoặc px-6 để giãn cách giữa các Quý -->
                <div class="flex-1 flex items-end justify-center gap-[1px] px-4 sm:px-6 pt-2">
                  <!-- ĐIỂM CHỈNH SỬA 2: Đã XÓA max-w-[28px] để cột được tự do phình to hết cỡ lấp đầy khoảng trống -->
                  <div v-for="(bar, bIdx) in q.bars" :key="bIdx" class="flex-1 flex flex-col justify-end h-full">
                    <!-- Màu hồng (Hồ sơ bị loại) -->
                    <div class="w-full bg-[#E0AAFF]" :style="{height: bar.rejected + '%'}"></div>
                    <!-- Màu xanh (Hồ sơ hợp lệ) -->
                    <div class="w-full bg-[#709BFF]" :style="{height: bar.valid + '%'}"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- X-axis Labels -->
        <div class="flex ml-[28px] mt-1">
          <div v-for="q in chartData" :key="q.label" class="flex-1 text-center text-[12px] text-gray-500">
            {{ q.label }}
          </div>
        </div>

        <!-- Legend -->
        <div class="flex items-center gap-6 mt-6 ml-[28px]">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-[#709BFF]"></div>
            <span class="text-[13px] font-medium text-[#111827]">Hồ sơ hợp lệ</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-[#E0AAFF]"></div>
            <span class="text-[13px] font-medium text-[#111827]">Hồ sơ bị loại</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Rounds List -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Danh sách Vòng Tuyển sinh</h2>
        <div class="flex gap-3">
          <ButtonDeleteList @click="() => {}" />
          <ButtonAdd text="Thêm Mới" />
        </div>
      </div>
      <div class="p-6 flex flex-wrap items-center justify-between gap-3 bg-[#fcfcfd] border-b border-gray-100">
        <div class="flex items-center gap-3">
          <div class="w-[250px]">
            <InputSearch v-model="searchQuery" placeholder="Tìm kiếm" />
          </div>
          <div class="w-[200px]">
            <a-date-picker placeholder="Chọn thời gian" class="w-full !h-[38px]" />
          </div>
          <div class="w-[200px]">
            <a-select placeholder="Chọn trạng thái" class="w-full !h-[38px]">
              <a-select-option value="all">Tất cả</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <ButtonSearch @click="() => {}" />
          <ButtonReset @click="() => {}" />
        </div>
      </div>
      
      <!-- Subtable mockup -->
      <div class="p-10 text-center text-gray-400">
        Chưa có dữ liệu vòng tuyển sinh
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseTag from '../../../atoms/display/BaseTag.vue'
import NavIcon from '../../../atoms/icons/NavIcon.vue'
import ButtonDeleteList from '../../../atoms/buttons/ButtonDeleteList.vue'
import ButtonAdd from '../../../atoms/buttons/ButtonAdd.vue'
import InputSearch from '../../../atoms/inputs/InputSearch.vue'
import ButtonSearch from '../../../atoms/buttons/ButtonSearch.vue'
import ButtonReset from '../../../atoms/buttons/ButtonReset.vue'

const searchQuery = ref('')
const selectedQuarter = ref('all')

const chartData = [
  { 
    label: 'q1', 
    bars: [
      { valid: 25, rejected: 15 },
      { valid: 35, rejected: 25 },
      { valid: 45, rejected: 35 },
      { valid: 60, rejected: 40 },
      { valid: 40, rejected: 30 }
    ] 
  },
  { 
    label: 'q2', 
    bars: [
      { valid: 25, rejected: 15 },
      { valid: 35, rejected: 25 },
      { valid: 45, rejected: 35 },
      { valid: 60, rejected: 40 },
      { valid: 40, rejected: 30 }
    ] 
  },
  { 
    label: 'q3', 
    bars: [
      { valid: 25, rejected: 15 },
      { valid: 35, rejected: 25 },
      { valid: 45, rejected: 35 },
      { valid: 60, rejected: 40 },
      { valid: 40, rejected: 30 }
    ] 
  },
  { 
    label: 'q4', 
    bars: [
      { valid: 25, rejected: 15 },
      { valid: 35, rejected: 25 },
      { valid: 45, rejected: 35 },
      { valid: 60, rejected: 40 },
      { valid: 40, rejected: 30 }
    ] 
  }
]
</script>

<style scoped>
:deep(.custom-borderless-select .ant-select-selector) {
  background-color: transparent !important;
  font-weight: 500 !important;
  color: #111827 !important;
  padding: 0 !important;
}

:deep(.custom-borderless-select .ant-select-selection-item) {
  padding-right: 18px !important;
  font-size: 13px !important;
}

:deep(.custom-borderless-select .ant-select-arrow) {
  right: 0 !important;
}
</style>