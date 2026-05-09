<template>
  <div class="flex flex-col gap-4">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-1.5 text-[12px] mb-[-12px]">
      <span class="text-[#b4bdc6]">Đánh giá học viên</span>
      <span class="text-[#b4bdc6]">/</span>
      <span class="text-[#566a7f]">Đánh giá toàn khóa</span>
    </div>

    <!-- Detail Info Card -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="flex justify-between items-center px-6 py-4">
        <h2 class="text-[18px] font-bold text-[#566a7f] m-0">Chi tiết Đánh giá toàn khóa</h2>
        <div class="flex gap-2">
          <button @click="goBack" class="flex items-center gap-2 px-4 py-2 rounded-md bg-[#f0f2f4] text-[#8592a3] text-[13px] font-medium hover:bg-[#e1e4e8] transition-colors shadow-sm">
            <NavIcon name="BxArrowBack" class-name="w-4 h-4" />
            Quay Lại
          </button>
          <button @click="goToEdit" class="flex items-center gap-2 px-4 py-2 rounded-md bg-[#E69A00] text-white text-[13px] font-medium hover:bg-[#d18b00] transition-colors shadow-sm">
            Chỉnh Sửa
          </button>
        </div>
      </div>
      
      <div class="px-6 pb-6">
        <div class="border border-[#d9dee3] rounded-lg overflow-hidden">
          <table class="w-full text-[14px]">
            <tbody class="divide-y divide-[#d9dee3]">
              <tr class="flex">
                <td class="w-1/3 px-6 py-3 font-bold text-[#566a7f]">ID</td>
                <td class="w-2/3 px-6 py-3 text-[#566a7f]">{{ evaluation.id }}</td>
              </tr>
              <tr class="flex">
                <td class="w-1/3 px-6 py-3 font-bold text-[#566a7f]">Học viên</td>
                <td class="w-2/3 px-6 py-3 text-[#566a7f]">{{ evaluation.studentName }}</td>
              </tr>
              <tr class="flex">
                <td class="w-1/3 px-6 py-3 font-bold text-[#566a7f]">Mã học viên</td>
                <td class="w-2/3 px-6 py-3 text-[#566a7f]">{{ evaluation.studentCode }}</td>
              </tr>
              <tr class="flex">
                <td class="w-1/3 px-6 py-3 font-bold text-[#566a7f]">Khóa</td>
                <td class="w-2/3 px-6 py-3 text-[#566a7f]">{{ evaluation.course }}</td>
              </tr>
              <tr class="flex">
                <td class="w-1/3 px-6 py-3 font-bold text-[#566a7f]">Tổng điểm</td>
                <td class="w-2/3 px-6 py-3 text-[#566a7f]">{{ evaluation.totalScore }}</td>
              </tr>
              <tr class="flex">
                <td class="w-1/3 px-6 py-3 font-bold text-[#566a7f]">Điểm TB</td>
                <td class="w-2/3 px-6 py-3 text-[#566a7f]">{{ evaluation.averageScore }}</td>
              </tr>
              <tr class="flex">
                <td class="w-1/3 px-6 py-3 font-bold text-[#566a7f]">Xếp hạng</td>
                <td class="w-2/3 px-6 py-3 text-[#566a7f]">{{ evaluation.rank }}</td>
              </tr>
              <tr class="flex">
                <td class="w-1/3 px-6 py-3 font-bold text-[#566a7f]">Xếp loại</td>
                <td class="w-2/3 px-6 py-3 text-[#566a7f]">{{ evaluation.classification }}</td>
              </tr>
              <tr class="flex">
                <td class="w-1/3 px-6 py-3 font-bold text-[#566a7f]">Nhận xét tổng quan</td>
                <td class="w-2/3 px-6 py-3 text-[#566a7f]">{{ evaluation.overallComment }}</td>
              </tr>
              <tr class="flex">
                <td class="w-1/3 px-6 py-3 font-bold text-[#566a7f]">Thời điểm khóa đánh giá</td>
                <td class="w-2/3 px-6 py-3 text-[#566a7f]">{{ evaluation.lockedAt }}</td>
              </tr>
              <tr class="flex">
                <td class="w-1/3 px-6 py-3 font-bold text-[#566a7f]">Thời gian tạo</td>
                <td class="w-2/3 px-6 py-3 text-[#566a7f]">{{ evaluation.createdAt }}</td>
              </tr>
              <tr class="flex">
                <td class="w-1/3 px-6 py-3 font-bold text-[#566a7f]">Thời gian cập nhật</td>
                <td class="w-2/3 px-6 py-3 text-[#566a7f]">{{ evaluation.updatedAt }}</td>
              </tr>
              <tr class="flex">
                <td class="w-1/3 px-6 py-3 font-bold text-[#566a7f]">Trạng thái</td>
                <td class="w-2/3 px-6 py-3 text-[#566a7f]">{{ evaluation.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'

const router = useRouter()

// Mock data for detail based on the image
const evaluation = computed(() => ({
  id: 'UT1301',
  studentName: 'Nguyễn Văn An',
  studentCode: 'HV123',
  course: 'U13',
  totalScore: '7.8',
  averageScore: 'Form U13 v1.0',
  rank: '1',
  classification: '1',
  overallComment: 'Nhận xét tổng quan',
  lockedAt: '15/03/2025 17:00',
  createdAt: '2025-01-05 08:30:00',
  updatedAt: '2026-01-20 10:15:45',
  status: 'Đã khóa'
}))

const goBack = () => {
  router.back()
}

const goToEdit = () => {
  router.push({ name: 'evaluation-full-course-edit', params: { id: evaluation.value.id } })
}
</script>

<style scoped>
/* Custom styles if needed */
</style>
