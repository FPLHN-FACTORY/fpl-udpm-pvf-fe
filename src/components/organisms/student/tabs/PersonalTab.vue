<template>
  <div class="space-y-4">
    <!-- Section 1: Thông tin cá nhân -->
    <div class="bg-white rounded-[6px] border border-[#E4E6E7] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5">
      <div class="flex items-center justify-between mb-5">
        <h2 class="font-bold text-base text-[#394552] m-0">
          Thông tin cá nhân: {{ student.studentId }} - {{ student.fullName }}
        </h2>
        <div class="flex gap-2 items-center">
          <a-button @click="$emit('back')" class="rounded-[6px] bg-[#EEEDF0] !text-[#384551] hover:!text-[#384551] border-none hover:bg-[#dcdbdc] transition-colors flex items-center justify-center">← Quay Lại</a-button>
          <a-button
            class="rounded-[6px] bg-[#FFAB00] !text-white hover:!text-white border-none hover:opacity-80 transition-opacity flex items-center justify-center"
            style="box-shadow: -2px 4px 6px -1px rgba(0, 0, 0, 0.05), 2px 4px 6px -1px rgba(0, 0, 0, 0.05), 0 4px 6px -1px rgba(0, 0, 0, 0.1);"
          >
            Chỉnh Sửa
          </a-button>
        </div>
      </div>
      <div class="border border-[#E4E6E7] rounded-[6px] overflow-hidden">
        <table class="w-full">
          <tbody>
            <tr
              v-for="row in personalRows"
              :key="row.key"
              class="border-b border-[#E4E6E7] last:border-b-0"
            >
              <td class="w-[400px] px-5 py-3 font-bold text-[13px] text-[#394552] align-middle">
                {{ row.label }}
              </td>
              <td class="px-2 py-3 text-[13px] text-[#394552] align-middle">
                {{ row.value || '—' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Section 2: Thông tin CCCD / Hộ chiếu -->
    <div class="bg-white rounded-[6px] border border-[#E4E6E7] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5">
      <div class="flex items-center mb-5">
        <h3 class="font-bold text-base text-[#394552] m-0">Thông tin CCCD / Hộ chiếu</h3>
      </div>
      <div class="border border-[#E4E6E7] rounded-[6px] overflow-hidden">
        <table class="w-full">
          <tbody>
            <tr
              v-for="row in cccdRows"
              :key="row.key"
              class="border-b border-[#E4E6E7] last:border-b-0"
            >
              <td class="w-[400px] px-5 py-3 font-bold text-[13px] text-[#394552] align-middle">
                {{ row.label }}
              </td>
              <td class="px-2 py-3 text-[13px] text-[#394552] align-middle">
                {{ row.value || '—' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Student } from '../../../../types/student';

const props = defineProps<{ student: Student }>();
defineEmits<{
  back: [];
  edit: [student: Student];
}>();

const personalRows = computed(() => [
  { key: 'studentId',      label: 'Mã học viên',           value: props.student.studentId },
  { key: 'recruitmentCode',label: 'Mã hồ sơ tuyển sinh',  value: props.student.recruitmentCode },
  { key: 'fullName',       label: 'Họ và tên',             value: props.student.fullName },
  { key: 'dob',            label: 'Ngày sinh',             value: props.student.dob },
  { key: 'birthplace',     label: 'Nơi sinh',              value: props.student.birthplace },
  { key: 'email',          label: 'Email',                 value: props.student.email },
  { key: 'phoneStudent',   label: 'SĐT học viên',          value: props.student.phoneStudent },
  { key: 'phoneParent',    label: 'SĐT phụ huynh',         value: props.student.phoneParent },
  { key: 'guardian',       label: 'Người giám hộ',         value: props.student.guardian },
]);

const cccdRows = computed(() => [
  { key: 'cccdNumber',      label: 'Số CCCD',               value: props.student.cccdNumber },
  { key: 'cccdIssueDate',   label: 'Ngày cấp',              value: props.student.cccdIssueDate },
  { key: 'cccdExpiryDate',  label: 'Hạn CCCD',              value: props.student.cccdExpiryDate },
  { key: 'cccdIssuedBy',    label: 'Nơi cấp',               value: props.student.cccdIssuedBy },
  { key: 'divider',         label: '—',                     value: '' },
  { key: 'passportNumber',  label: 'Số hộ chiếu',           value: props.student.passportNumber },
  { key: 'passportIssueDate',label: 'Ngày cấp hộ chiếu',   value: props.student.passportIssueDate },
  { key: 'passportExpiry',  label: 'Hạn hộ chiếu',         value: props.student.passportExpiryDate },
  { key: 'passportIssuedBy',label: 'Nơi cấp hộ chiếu',     value: props.student.passportIssuedBy },
  { key: 'nationality',     label: 'Quốc tịch',             value: props.student.passportNationality },
]);
</script>
