<template>
  <div class="space-y-6 pb-6">
    <div class="space-y-1">
      <p class="text-sm text-slate-400">
        {{ moduleTitle }}
        <span class="px-2 text-slate-300">/</span>
        <span class="font-medium text-slate-500">{{ pageTitle }}</span>
      </p>
    </div>

    <MasterCriteriaForm
      title="Thêm mới bộ tiêu chí gốc"
      submit-label="Thêm mới"
      @cancel="goBack"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import MasterCriteriaForm from "./MasterCriteriaForm.vue";
import {
  masterCriteriaService,
  type SaveMasterCriteriaInput,
} from "../../../../services/recruitment/masterCriteria";

const moduleTitle = "Quản lý tuyển sinh";
const pageTitle = "Bộ tiêu chí gốc";

const router = useRouter();

const goBack = () => {
  router.push({ name: "master-criteria" });
};

const handleSubmit = async (payload: SaveMasterCriteriaInput) => {
  const response = await masterCriteriaService.create(payload);
  router.push({
    name: "master-criteria-detail",
    params: { id: response.data.id },
  });
};
</script>
