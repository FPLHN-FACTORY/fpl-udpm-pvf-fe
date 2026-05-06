<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <!-- Main Content Card -->
    <AdminCard title="Chi tiết Bộ tiêu chí gốc">
      <template #actions>
        <ButtonBack @click="goBack" />
        <ButtonEdit v-if="record" @click="goToEdit" />
      </template>

      <div v-if="record" class="space-y-8">
        <!-- Info Table -->
        <div class="border border-gray-100 rounded-lg overflow-hidden">
          <div v-for="field in detailFields" :key="field.label" class="flex border-b border-gray-100 last:border-0 min-h-[50px]">
            <div class="w-1/3 bg-[#fcfcfd] p-4 text-[13px] font-bold text-[#566a7f] border-r border-gray-100 flex items-center">
              {{ field.label }}
            </div>
            <div class="w-2/3 p-4 text-[13px] text-[#697a8d] flex items-center">
              <template v-if="field.type === 'status'">
                <BaseTag :type="record.status === 'ACTIVE' ? 'success' : 'default'">
                  {{ field.value }}
                </BaseTag>
              </template>
              <template v-else>
                {{ field.value }}
              </template>
            </div>
          </div>
        </div>

        <!-- Criteria Table -->
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-bold text-[#566a7f]">Các tiêu chí</h3>
          </div>
          <AppTable :columns="criteriaColumns" :data-source="record.criteria" :pagination="false">
            <template #bodyCell="{ column, record: criterion, index }">
              <template v-if="column.key === 'index'">
                <TableIndex :index="index + 1" />
              </template>
              <template v-else-if="column.key === 'weight'">
                {{ criterion.weight }}%
              </template>
            </template>
          </AppTable>
        </div>

        <!-- Usage Table -->
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-bold text-[#566a7f]">Các kỳ tuyển sinh đang sử dụng</h3>
          </div>
          <AppTable :columns="usageColumns" :data-source="record.usages" :pagination="false">
            <template #bodyCell="{ column, record: usage, index }">
              <template v-if="column.key === 'index'">
                <TableIndex :index="index + 1" />
              </template>
              <template v-else-if="column.key === 'status'">
                <BaseTag :type="usage.status === 'ACTIVE' ? 'success' : 'default'">
                  {{ getMasterCriteriaStatusLabel(usage.status) }}
                </BaseTag>
              </template>
            </template>
            <template #emptyText>
              <div class="py-10 text-center text-sm text-gray-400">
                Bộ tiêu chí này hiện chưa được áp dụng cho kỳ tuyển sinh nào.
              </div>
            </template>
          </AppTable>
        </div>
      </div>

      <div v-else class="px-5 py-14 text-center">
        <p class="text-base font-semibold text-gray-700">Không tìm thấy bộ tiêu chí cần xem.</p>
        <ButtonBack class="mt-6" @click="goBack" text="Về danh sách" />
      </div>
    </AdminCard>
  </AdminPage>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import AdminPage from '@/components/templates/AdminPage.vue'
import AdminCard from '@/components/molecules/AdminCard.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import ButtonEdit from '@/components/atoms/buttons/ButtonEdit.vue'
import BaseTag from '@/components/atoms/display/BaseTag.vue'
import TableIndex from '@/components/atoms/display/TableIndex.vue'
import AppTable from '@/components/organisms/AppTable.vue'
import {
  getMasterCriteriaStatusLabel,
  masterCriteriaService,
  type MasterCriteriaRecord,
} from "@/services/recruitment/masterCriteria";

const route = useRoute();
const router = useRouter();
const record = ref<MasterCriteriaRecord>();

const recordId = computed(() => Number(route.params.id));

const breadcrumbs = [
  { title: 'Quản lý tuyển sinh', path: '#' },
  { title: 'Bộ tiêu chí gốc', path: '/recruitment/evaluation-criteria/master-criteria' },
  { title: 'Chi tiết', path: '' }
]

const detailFields = computed(() => {
  if (!record.value) return [];
  return [
    { label: "Tên bộ tiêu chí", value: record.value.name, type: "text" },
    { label: "Trạng thái", value: getMasterCriteriaStatusLabel(record.value.status), type: "status" },
    { label: "Mô tả", value: record.value.description, type: "text" },
    { label: "Thời gian tạo", value: record.value.createdAt, type: "text" },
    { label: "Thời gian cập nhật", value: record.value.updatedAt, type: "text" },
  ];
});

const criteriaColumns = [
  { title: '#', key: 'index', width: '60px', align: 'center' },
  { title: 'TÊN TIÊU CHÍ', key: 'name', dataIndex: 'name' },
  { title: 'TRỌNG SỐ', key: 'weight', align: 'center' },
  { title: 'MÔ TẢ', key: 'description', dataIndex: 'description' },
]

const usageColumns = [
  { title: '#', key: 'index', width: '60px', align: 'center' },
  { title: 'CƠ SỞ ĐÀO TẠO', key: 'facilityName', dataIndex: 'facilityName' },
  { title: 'TÊN KỲ TUYỂN SINH', key: 'admissionName', dataIndex: 'admissionName' },
  { title: 'NGÀY TUYỂN', key: 'admissionDate', dataIndex: 'admissionDate', align: 'center' },
  { title: 'NGÀY KẾT THÚC', key: 'endDate', dataIndex: 'endDate', align: 'center' },
  { title: 'TRẠNG THÁI', key: 'status', align: 'center' },
]

const loadRecord = async () => {
  try {
    const response = await masterCriteriaService.getById(recordId.value);
    record.value = response.data;
  } catch (error) {
    record.value = undefined;
  }
};

const goBack = () => router.push({ name: "master-criteria" });
const goToEdit = () => record.value && router.push({ name: "master-criteria-edit", params: { id: record.value.id } });

onMounted(loadRecord);
</script>
