<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <MasterCriteriaForm
      v-if="initialValue"
      title="Điều chỉnh Bộ tiêu chí gốc"
      submit-label="Cập nhật"
      :initial-value="initialValue"
      @cancel="goBack"
      @submit="handleSubmit"
    />

    <div v-else-if="!loading" class="bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-14 text-center">
      <p class="text-base font-semibold text-gray-700">Không tìm thấy bộ tiêu chí để chỉnh sửa.</p>
      <p class="mt-2 text-sm text-gray-400">Bản ghi có thể đã bị xóa hoặc đường dẫn không còn hợp lệ.</p>
      <ButtonBack class="mt-6" @click="goBack" text="Quay lại danh sách" />
    </div>
  </AdminPage>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { message } from 'ant-design-vue'
import AdminPage from '@/components/templates/AdminPage.vue'
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import MasterCriteriaForm from "./MasterCriteriaForm.vue";
import {
  masterCriteriaService,
  type MasterCriteriaRecord,
  type SaveMasterCriteriaInput,
} from "@/services/recruitment/masterCriteria";

const route = useRoute();
const router = useRouter();

const loading = ref(true)
const record = ref<MasterCriteriaRecord>();

const recordId = computed(() => Number(route.params.id));

const breadcrumbs = [
  { title: 'Quản lý tuyển sinh', path: '#' },
  { title: 'Bộ tiêu chí gốc', path: '/recruitment/evaluation-criteria/master-criteria' },
  { title: 'Chỉnh sửa', path: '' }
]

const initialValue = computed(() => {
  if (!record.value) return undefined;
  return {
    name: record.value.name,
    description: record.value.description,
    status: record.value.status,
    criteria: record.value.criteria.map((criterion) => ({
      name: criterion.name,
      description: criterion.description,
      weight: criterion.weight,
    })),
  };
});

const loadRecord = async () => {
  loading.value = true
  try {
    const response = await masterCriteriaService.getById(recordId.value);
    record.value = response.data;
  } catch (error) {
    record.value = undefined;
  } finally {
    loading.value = false
  }
};

const goBack = () => router.push({ name: "master-criteria" });

const handleSubmit = async (payload: SaveMasterCriteriaInput) => {
  if (!record.value) return;
  try {
    const response = await masterCriteriaService.update(record.value.id, payload);
    message.success('Cập nhật thành công')
    router.push({
      name: "master-criteria-detail",
      params: { id: response.data.id },
    });
  } catch (error) {
    message.error('Cập nhật thất bại')
  }
};

onMounted(loadRecord);
</script>
