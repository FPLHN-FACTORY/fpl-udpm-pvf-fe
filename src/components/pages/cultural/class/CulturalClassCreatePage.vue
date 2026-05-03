<template>
  <div class="space-y-6 pb-6">
    <div class="space-y-1">
      <p class="text-sm text-slate-400">
        {{ moduleTitle }}
        <span class="px-2 text-slate-300">/</span>
        <span class="font-medium text-slate-500">{{ pageTitle }}</span>
      </p>
    </div>

    <CulturalClassForm
      title="Thêm mới Lớp học văn hóa"
      submit-label="Thêm mới"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import CulturalClassForm from "./CulturalClassForm.vue";
import {
  culturalClassService,
  type SaveCulturalClassInput,
} from "../../../../services/cultural/culturalClass";

const moduleTitle = "Quản lý học tập văn hóa";
const pageTitle = "Lớp học văn hóa";

const router = useRouter();

const handleSubmit = async (payload: SaveCulturalClassInput) => {
  const response = await culturalClassService.create(payload);
  router.push({
    name: "cultural-class-detail",
    params: { id: response.data.id },
  });
};
</script>
