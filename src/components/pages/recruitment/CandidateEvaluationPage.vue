<template>
  <div class="flex flex-col gap-6 p-6 min-h-screen bg-[#f5f5f9]">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-[13px]">
      <span class="text-[#8592a3]">Quản lý tuyển sinh</span>
      <span class="text-[#8592a3]">/</span>
      <span class="bg-[#fcf3d7] text-[#f6c23e] px-2 py-0.5 rounded font-medium">Đánh giá thí sinh</span>
    </div>

    <!-- Candidate Evaluation Header Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-[18px] font-bold text-[#566a7f] bg-[#fcf3d7] px-3 py-1 rounded inline-block">Đánh giá thí sinh</h1>
        <ButtonBack @click="$router.back()" />
      </div>

      <!-- Candidate Info Table -->
      <div class="border border-[#d9dee3] rounded-lg overflow-hidden">
        <div v-for="(item, index) in candidateInfo" :key="index" 
          class="flex border-b border-[#d9dee3] last:border-0 min-h-[48px]"
        >
          <div class="w-1/3 bg-[#fcfcfd] px-6 py-3 text-[13px] font-bold text-[#566a7f] border-r border-[#d9dee3] flex items-center">
            {{ item.label }}
          </div>
          <div class="w-2/3 px-6 py-3 text-[13px] text-[#697a8d] flex items-center">
            {{ item.value }}
          </div>
        </div>
      </div>
    </div>

    <!-- Rounds and Evaluation Section -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <!-- Tabs -->
      <div class="flex gap-3 mb-8">
        <button 
          v-for="round in rounds" 
          :key="round.id"
          class="px-5 py-2.5 rounded-lg text-[14px] font-medium transition-all duration-200"
          :class="[
            activeRound === round.id 
              ? 'bg-[#696cff] text-white shadow-[0_2px_4px_0_rgba(105,108,255,0.4)]' 
              : 'bg-[#e7e7ff] text-[#696cff] hover:bg-[#dadaff]'
          ]"
          @click="activeRound = round.id"
        >
          {{ round.name }}
        </button>
      </div>

      <h2 class="text-[16px] font-bold text-[#566a7f] mb-6">Bảng chấm điểm theo tiêu chí</h2>

      <!-- Evaluation Table -->
      <div class="overflow-hidden border border-[#e6e9ed] rounded-lg">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-[#fcfcfd] border-b border-[#e6e9ed]">
              <th class="px-4 py-4 text-[12px] font-bold text-[#566a7f] uppercase w-16 text-center">#</th>
              <th class="px-4 py-4 text-[12px] font-bold text-[#566a7f] uppercase border-l border-[#e6e9ed]">TIÊU CHÍ</th>
              <th class="px-4 py-4 text-[12px] font-bold text-[#566a7f] uppercase w-48 text-center border-l border-[#e6e9ed]">TRỌNG SỐ</th>
              <th class="px-4 py-4 text-[12px] font-bold text-[#566a7f] uppercase w-80 text-center border-l border-[#e6e9ed]">ĐIỂM</th>
              <th class="px-4 py-4 text-[12px] font-bold text-[#566a7f] uppercase w-48 text-center border-l border-[#e6e9ed]">ĐIỂM QUY ĐỔI</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in currentCriteria" :key="item.id" 
              class="border-b border-[#e6e9ed] last:border-0 hover:bg-[#f9f9f9] transition-colors h-[60px]"
            >
              <td class="px-4 py-4 text-[13px] text-[#696cff] text-center font-medium">{{ index + 1 }}</td>
              <td class="px-4 py-4 text-[13px] text-[#697a8d] border-l border-[#e6e9ed]">{{ item.name }}</td>
              <td class="px-4 py-4 text-[13px] text-[#697a8d] text-center border-l border-[#e6e9ed]">{{ item.weight }}%</td>
              <td class="px-4 py-4 border-l border-[#e6e9ed]">
                <div class="px-2">
                  <input 
                    v-model="item.score" 
                    type="number" 
                    class="w-full h-[38px] px-4 py-2 border border-[#d9dee3] rounded-md focus:outline-none focus:border-[#696cff] transition-all text-[13px] text-[#697a8d]"
                    min="0"
                    max="10"
                  />
                </div>
              </td>
              <td class="px-4 py-4 text-[13px] text-[#697a8d] text-center border-l border-[#e6e9ed]">
                {{ item.score !== null && item.score !== '' ? ((Number(item.score) * item.weight) / 100).toFixed(2) : '-' }}
              </td>
            </tr>
            <!-- Total Row -->
            <tr class="bg-[#fcfcfd] font-bold h-[55px]">
              <td colspan="2" class="px-4 py-4 text-[13px] text-[#566a7f] text-center">Tổng điểm</td>
              <td class="border-l border-[#e6e9ed]"></td>
              <td class="border-l border-[#e6e9ed]"></td>
              <td class="px-4 py-4 text-[13px] text-[#697a8d] text-center border-l border-[#e6e9ed]">
                {{ totalScore > 0 ? totalScore.toFixed(2) : '-' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import ButtonBack from '../../atoms/buttons/ButtonBack.vue'

interface Criterion {
  id: number
  name: string
  weight: number
  score: number | string | null
}

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

const roundCriteria = reactive<Record<number, Criterion[]>>({
  1: [
    { id: 1, name: 'Thể lực', weight: 25, score: 9 },
    { id: 2, name: 'Kỹ thuật', weight: 30, score: 10 },
    { id: 3, name: 'Chiến thuật', weight: 15, score: null },
    { id: 4, name: 'Tâm lý', weight: 10, score: null },
    { id: 5, name: 'Thái độ', weight: 10, score: null },
    { id: 6, name: 'Tiềm năng', weight: 10, score: null }
  ],
  2: [
    { id: 7, name: 'Thể lực', weight: 25, score: null },
    { id: 8, name: 'Kỹ thuật', weight: 30, score: null },
    { id: 9, name: 'Chiến thuật', weight: 15, score: null },
    { id: 10, name: 'Tâm lý', weight: 10, score: null },
    { id: 11, name: 'Thái độ', weight: 10, score: null },
    { id: 12, name: 'Tiềm năng', weight: 10, score: null }
  ],
  3: [
    { id: 13, name: 'Thể lực', weight: 25, score: null },
    { id: 14, name: 'Kỹ thuật', weight: 30, score: null },
    { id: 15, name: 'Chiến thuật', weight: 15, score: null },
    { id: 16, name: 'Tâm lý', weight: 10, score: null },
    { id: 17, name: 'Thái độ', weight: 10, score: null },
    { id: 18, name: 'Tiềm năng', weight: 10, score: null }
  ]
})

const currentCriteria = computed(() => roundCriteria[activeRound.value])

const totalScore = computed(() => {
  return currentCriteria.value.reduce((acc, item) => {
    if (item.score === null || item.score === '') return acc
    return acc + (Number(item.score) * item.weight) / 100
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

/* Custom shadow for buttons to match the premium feel */
button {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

/* Custom scrollbar for better aesthetics */
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>
