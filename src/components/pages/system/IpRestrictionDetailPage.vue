<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">Bảo mật & Phân quyền</span>
      <span class="text-gray-400">/</span>
      <span class="text-[#566a7f] font-medium">Giới hạn địa chỉ IP</span>
    </div>

    <!-- Detail Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-[#566a7f]">Thông tin chi tiết địa chỉ IP</h2>
        <div class="flex gap-3">
          <BaseButton 
            class="!bg-[#8592a3] hover:!bg-[#717d8c] !text-white !border-none !h-9"
            icon="BxChevronLeft"
            @click="$router.back()"
          >
            Quay Lại
          </BaseButton>
          <BaseButton 
            class="!bg-[#ffab00] hover:!bg-[#e69a00] !text-white !border-none !h-9"
          >
            Chỉnh Sửa
          </BaseButton>
        </div>
      </div>

      <div class="p-6">
        <table class="w-full border-collapse border border-gray-100">
          <tbody>
            <tr class="border-b border-gray-100">
              <td class="w-1/4 p-4 font-bold text-[#566a7f] bg-[#fcfcfd]">Địa chỉ IP</td>
              <td class="p-4 text-[#697a8d]">192.168.1.10</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="w-1/4 p-4 font-bold text-[#566a7f] bg-[#fcfcfd]">Mô tả</td>
              <td class="p-4 text-[#697a8d]">IP nội bộ văn phòng Hà Nội</td>
            </tr>
            <tr>
              <td class="w-1/4 p-4 font-bold text-[#566a7f] bg-[#fcfcfd]">Trạng thái</td>
              <td class="p-4">
                <BaseTag color="success">Cho phép</BaseTag>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '../../atoms/BaseButton.vue'
import BaseTag from '../../atoms/BaseTag.vue'
</script>

<style scoped>
</style>
