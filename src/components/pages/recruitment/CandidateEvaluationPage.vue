<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm">
      <span class="text-gray-400">Quản lý tuyển sinh</span>
      <span class="text-gray-400">/</span>
      <span class="bg-[#fcf3d7] text-[#f6c23e] px-2 py-0.5 rounded font-medium">Đánh giá thí sinh</span>
    </div>

    <!-- Page Header Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-lg font-bold text-[#566a7f] bg-[#fcf3d7] px-2 py-1 rounded inline-block">Đánh giá thí sinh</h1>
        <ButtonBack @click="$router.back()" />
      </div>

      <!-- Candidate Info Table -->
      <div class="border border-gray-100 rounded-lg overflow-hidden">
        <div v-for="(item, index) in candidateInfo" :key="index" 
          class="flex border-b border-gray-100 last:border-0 min-h-[50px]"
        >
          <div class="w-1/3 bg-[#fcfcfd] p-4 text-[13px] font-bold text-[#566a7f] border-r border-gray-100 flex items-center">
            {{ item.label }}
          </div>
          <div class="w-2/3 p-4 text-[13px] text-[#697a8d] flex items-center">
            {{ item.value }}
          </div>
        </div>
      </div>
    </div>

    <!-- Rounds and Evaluation Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <!-- Tabs -->
      <div class="flex gap-4 mb-8">
        <button 
          v-for="round in rounds" 
          :key="round.id"
          class="px-6 py-2 rounded-lg text-sm font-medium transition-colors"
          :class="[
            activeRound === round.id 
              ? 'bg-[#696cff] text-white shadow-md' 
              : 'bg-[#e7e7ff] text-[#696cff] hover:bg-[#dadaff]'
          ]"
          @click="activeRound = round.id"
        >
          {{ round.name }}
        </button>
      </div>

      <h2 class="text-lg font-bold text-[#566a7f] mb-6">Bảng chấm điểm theo tiêu chí</h2>

      <!-- Evaluation Table -->
      <div class="overflow-hidden border border-gray-100 rounded-lg">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-[#fcfcfd] border-b border-gray-100">
              <th class="p-4 text-[12px] font-bold text-[#566a7f] uppercase w-16">#</th>
              <th class="p-4 text-[12px] font-bold text-[#566a7f] uppercase">TIÊU CHÍ</th>
              <th class="p-4 text-[12px] font-bold text-[#566a7f] uppercase w-40 text-center">TRỌNG SỐ</th>
              <th class="p-4 text-[12px] font-bold text-[#566a7f] uppercase w-64">ĐIỂM</th>
              <th class="p-4 text-[12px] font-bold text-[#566a7f] uppercase w-40">ĐIỂM QUY ĐỔI</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in evaluationCriteria" :key="item.id" class="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
              <td class="p-4 text-[13px] text-[#696cff]">{{ index + 1 }}</td>
              <td class="p-4 text-[13px] text-[#697a8d]">{{ item.name }}</td>
              <td class="p-4 text-[13px] text-[#697a8d] text-center">{{ item.weight }}%</td>
              <td class="p-4">
                <input 
                  v-model="item.score" 
                  type="number" 
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#696cff] text-[13px]"
                  placeholder="Nhập điểm"
                  min="0"
                  max="10"
                />
              </td>
              <td class="p-4 text-[13px] text-[#697a8d]">
                {{ item.score ? ((item.score * item.weight) / 100).toFixed(1) : '-' }}
              </td>
            </tr>
            <!-- Total Row -->
            <tr class="bg-[#fcfcfd] font-bold">
              <td colspan="2" class="p-4 text-[13px] text-[#566a7f] text-right">Tổng điểm</td>
              <td class="p-4 text-[13px] text-[#566a7f] text-center"></td>
              <td class="p-4"></td>
              <td class="p-4 text-[13px] text-[#566a7f]">{{ totalScore.toFixed(1) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Footer Credit -->
    <div class="flex justify-between items-center text-[12px] text-gray-400 mt-auto pt-6">
      <span>2025 © PVF VN</span>
      <span>Design & Develop by FPT POLYTECHNIC</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ButtonBack from '../../atoms/buttons/ButtonBack.vue'

const candidateInfo = ref([
  { label: 'ID hồ sơ', value: 'HS001' },
  { label: 'Thí sinh', value: 'HV001 - Nguyễn Xuân An' },
  { label: 'Kỳ tuyển sinh', value: 'Tuyển sinh PVF 2025' },
  { label: 'Thời gian tạo hồ sơ', value: '10/01/2025 09:00' }
])

const rounds = [
  { id: 1, name: 'Vòng Sơ Tuyển' },
  { id: 2, name: 'Vòng 2' },
  { id: 3, name: 'Vòng 3' }
]

const activeRound = ref(1)

const evaluationCriteria = ref([
  { id: 1, name: 'Thể lực', weight: 25, score: 9 },
  { id: 2, name: 'Kỹ thuật', weight: 30, score: 10 },
  { id: 3, name: 'Chiến thuật', weight: 15, score: null },
  { id: 4, name: 'Tâm lý', weight: 10, score: null },
  { id: 5, name: 'Thái độ', weight: 10, score: null },
  { id: 6, name: 'Tiềm năng', weight: 10, score: null }
])

const totalScore = computed(() => {
  return evaluationCriteria.value.reduce((acc, item) => {
    if (item.score === null) return acc
    return acc + (item.score * item.weight) / 100
  }, 0)
})
</script>

<style scoped>
/* Specific adjustments to match the design */
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
</style>
