<template>
  <div class="flex flex-col gap-6">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">{{ moduleTitle }}</span>
      <span class="text-gray-400">/</span>
      <span class="text-gray-400 font-medium">{{ pageTitle }}</span>
    </div>

    <CulturalClassForm
      title="Thêm mới Lớp học văn hóa"
      submit-label="Thêm Mới"
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
    name: "cultural-class",
  });
};
</script>
