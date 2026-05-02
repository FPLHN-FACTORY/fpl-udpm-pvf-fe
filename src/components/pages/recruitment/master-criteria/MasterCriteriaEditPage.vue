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
      v-if="initialValue"
      title="Điều chỉnh Bộ tiêu chí gốc"
      submit-label="Cập nhật"
      :initial-value="initialValue"
      @cancel="goBack"
      @submit="handleSubmit"
    />

    <section
      v-else
      class="rounded-2xl border border-slate-200 bg-white px-5 py-14 text-center shadow-sm"
    >
      <p class="text-base font-semibold text-slate-700">
        Không tìm thấy bộ tiêu chí để chỉnh sửa.
      </p>
      <p class="mt-2 text-sm text-slate-400">
        Bản ghi có thể đã bị xóa hoặc đường dẫn không còn hợp lệ.
      </p>
      <button
        type="button"
        class="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#ff1f1f] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e31b1b]"
        @click="goBack"
      >
        Quay lại danh sách
      </button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import MasterCriteriaForm from "./MasterCriteriaForm.vue";
import {
  masterCriteriaService,
  type MasterCriteriaRecord,
  type SaveMasterCriteriaInput,
} from "../../../../services/recruitment/masterCriteria";

const moduleTitle = "Quản lý tuyển sinh";
const pageTitle = "Bộ tiêu chí gốc";

const route = useRoute();
const router = useRouter();

const record = ref<MasterCriteriaRecord>();

const recordId = computed(() => {
  const rawId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
  return Number(rawId);
});

const initialValue = computed(() => {
  if (!record.value) {
    return undefined;
  }

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
  if (!Number.isFinite(recordId.value)) {
    record.value = undefined;
    return;
  }

  const response = await masterCriteriaService.getById(recordId.value);
  record.value = response.data;
};

const goBack = () => {
  router.push({ name: "master-criteria" });
};

const handleSubmit = async (payload: SaveMasterCriteriaInput) => {
  if (!record.value) {
    return;
  }

  const response = await masterCriteriaService.update(record.value.id, payload);
  if (!response.data) {
    return;
  }

  router.push({
    name: "master-criteria-detail",
    params: { id: response.data.id },
  });
};

onMounted(async () => {
  await loadRecord();
});
</script>
