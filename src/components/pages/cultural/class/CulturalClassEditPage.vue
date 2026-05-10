<template>
  <div class="flex flex-col gap-6">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-sm mb-2">
      <span class="text-gray-400">{{ moduleTitle }}</span>
      <span class="text-gray-400">/</span>
      <span class="text-gray-400 font-medium">{{ pageTitle }}</span>
    </div>

    <template v-if="initialValues">
      <CulturalClassForm
        title="Điều chỉnh Lớp học văn hóa"
        submit-label="Cập Nhật"
        :initial-values="initialValues"
        @submit="handleSubmit"
      />
    </template>

    <div
      v-else
      class="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-10 text-center text-sm text-gray-400"
    >
      Không tìm thấy lớp học văn hóa phù hợp.
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import CulturalClassForm from "./CulturalClassForm.vue";
import {
  culturalClassService,
  type CulturalClassRecord,
  type SaveCulturalClassInput,
} from "../../../../services/cultural/culturalClass";

const moduleTitle = "Quản lý học tập văn hóa";
const pageTitle = "Lớp học văn hóa";

const route = useRoute();
const router = useRouter();

const record = ref<CulturalClassRecord>();

const initialValues = computed(() =>
  record.value
    ? {
        name: record.value.name,
        gradeName: record.value.gradeName,
        schoolYear: record.value.schoolYear,
        homeroomTeacher: record.value.homeroomTeacher,
        status: record.value.status,
      }
    : undefined,
);

const loadRecord = async () => {
  const id = Number(route.params.id);
  if (!Number.isFinite(id)) {
    return;
  }

  const response = await culturalClassService.getById(id);
  record.value = response.data;
};

const handleSubmit = async (payload: SaveCulturalClassInput) => {
  if (!record.value) {
    return;
  }

  await culturalClassService.update(record.value.id, payload);
  router.push({
    name: "cultural-class-detail",
    params: { id: record.value.id },
  });
};

onMounted(async () => {
  await loadRecord();
});

watch(
  () => route.params.id,
  async () => {
    await loadRecord();
  },
);
</script>
