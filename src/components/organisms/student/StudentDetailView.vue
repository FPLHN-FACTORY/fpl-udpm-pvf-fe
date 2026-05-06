<template>
  <div class="space-y-4">
    <!-- Tab Navigation -->
    <div class="flex gap-2 overflow-x-auto whitespace-nowrap hide-scrollbar pb-2">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="activeTab = tab.key"
        :class="[
          'flex-shrink-0 px-4 py-2 rounded-[6px] text-sm font-medium transition-all border-none',
          activeTab === tab.key
            ? 'bg-[#696CFF] text-white hover:opacity-80 hover:text-white'
            : 'bg-[#EEEDF0] text-[#384551] hover:bg-[#dcdbdc] hover:text-[#384551]'
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <template v-if="activeTab === 'personal'">
      <PersonalTab :student="student" @back="$emit('back')" @edit="$emit('edit', $event)" />
    </template>
    <template v-else-if="activeTab === 'contract'">
      <ContractTab :student="student" @back="$emit('back')" @edit="$emit('edit', $event)" />
    </template>
    <template v-else-if="activeTab === 'academic'">
      <AcademicTab :student="student" @back="$emit('back')" @edit="$emit('edit', $event)" />
    </template>
    <template v-else-if="activeTab === 'extracurricular'">
      <ExtracurricularTab :student="student" @back="$emit('back')" @edit="$emit('edit', $event)" />
    </template>
    <template v-else-if="activeTab === 'fees'">
      <LivingFeeTab :student="student" @back="$emit('back')" @edit="$emit('edit', $event)" />
    </template>

    <template v-else-if="activeTab === 'activities'">
      <!-- Placeholder for activities -->
      <div class="bg-white rounded-[6px] border border-[#E4E6E7] p-12 text-center text-[#394552] text-sm shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        Nội dung đang được phát triển...
      </div>
    </template>
    <template v-else-if="activeTab === 'equipment'">
      <EquipmentTab :student="student" @back="$emit('back')" @edit="$emit('edit', $event)" />
    </template>
    <template v-else-if="activeTab === 'discipline'">
      <DisciplineTab :student="student" @back="$emit('back')" @edit="$emit('edit', $event)" />
    </template>
    <template v-else-if="activeTab === 'evaluation'">
      <EvaluationTab :student="student" @back="$emit('back')" @edit="$emit('edit', $event)" />
    </template>
    
    <!-- Placeholder cho các tab khác -->
    <div
      v-else
      class="bg-white rounded-[6px] border border-[#E4E6E7] p-12 text-center text-[#394552] text-sm shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
    >
      Nội dung đang được phát triển...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Student } from '../../../types/student';

const props = defineProps<{ student: Student }>();
defineEmits<{
  back: [];
  edit: [student: Student];
}>();

const activeTab = ref('personal');

const tabs = [
  { key: 'personal',       label: 'Thông Tin Cá Nhân' },
  { key: 'contract',       label: 'Thông Tin Hợp Đồng' },
  { key: 'academic',       label: 'Hồ Sơ Học Tập Văn Hóa' },
  { key: 'extracurricular',label: 'Học Tập Ngoại Khóa' },
  { key: 'fees',           label: 'Sinh Hoạt Phí' },
  { key: 'activities',     label: 'Hoạt Động Ngoại Khóa' },
  { key: 'equipment',      label: 'Dụng cụ' },
  { key: 'medical',        label: 'Y tế' },
  { key: 'discipline',     label: 'Kỷ luật Khen thưởng' },
  { key: 'evaluation',     label: 'Đánh giá' },
];

import PersonalTab from './tabs/PersonalTab.vue';
import ContractTab from './tabs/ContractTab.vue';
import AcademicTab from './tabs/AcademicTab.vue';
import ExtracurricularTab from './tabs/ExtracurricularTab.vue';
import LivingFeeTab from './tabs/LivingFeeTab.vue';
import EquipmentTab from './tabs/EquipmentTab.vue';
import DisciplineTab from './tabs/DisciplineTab.vue';
import EvaluationTab from './tabs/EvaluationTab.vue';
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
