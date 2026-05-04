<template>
  <AdminPage :breadcrumbs="breadcrumbs">
    <MasterCriteriaForm
      title="Thêm mới bộ tiêu chí gốc"
      submit-label="Thêm mới"
      @cancel="goBack"
      @submit="handleSubmit"
    />
  </AdminPage>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { message } from 'ant-design-vue'
import AdminPage from '@/components/templates/AdminPage.vue'
import MasterCriteriaForm from "./MasterCriteriaForm.vue";
import {
  masterCriteriaService,
  type SaveMasterCriteriaInput,
} from "@/services/recruitment/masterCriteria";

const router = useRouter();

const breadcrumbs = [
  { title: 'Quản lý tuyển sinh', path: '#' },
  { title: 'Bộ tiêu chí gốc', path: '/recruitment/evaluation-criteria/master-criteria' },
  { title: 'Thêm mới', path: '' }
]

const goBack = () => {
  router.push({ name: "master-criteria" });
};

const handleSubmit = async (payload: SaveMasterCriteriaInput) => {
  try {
    const response = await masterCriteriaService.create(payload);
    message.success('Thêm mới thành công')
    router.push({
      name: "master-criteria-detail",
      params: { id: response.data.id },
    });
  } catch (error) {
    message.error('Thêm mới thất bại')
  }
};
</script>
