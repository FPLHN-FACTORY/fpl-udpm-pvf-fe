<template>
  <div class="space-y-6 pb-6">
    <div class="space-y-1">
      <p class="text-sm text-slate-400">
        {{ moduleTitle }}
        <span class="px-2 text-slate-300">/</span>
        <span class="font-medium text-slate-500">{{ pageTitle }}</span>
      </p>
    </div>

    <section
      class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div
        class="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between"
      >
        <h2 class="text-lg font-bold text-slate-800">
          Chi tiết Bộ tiêu chí gốc
        </h2>

        <div class="flex flex-wrap items-center gap-3">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-500 transition hover:border-slate-300 hover:bg-slate-200"
            @click="goBack"
          >
            <MasterCriteriaIcon name="BxChevronLeft" class-name="h-4 w-4" />
            Quay lại
          </button>
          <button
            v-if="record"
            type="button"
            class="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600"
            @click="goToEdit"
          >
            <MasterCriteriaIcon name="BxEditAlt" class-name="h-4 w-4" />
            Chỉnh sửa
          </button>
        </div>
      </div>

      <div v-if="record" class="space-y-6 px-5 py-5">
        <section class="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="border-b border-slate-200 px-5 py-4">
            <h3 class="text-lg font-bold text-slate-800">
              Thông tin bộ tiêu chí
            </h3>
          </div>

          <div class="overflow-hidden rounded-b-2xl">
            <div
              v-for="field in detailFields"
              :key="field.label"
              class="grid grid-cols-1 border-b border-slate-200 last:border-b-0 md:grid-cols-[220px_minmax(0,1fr)]"
            >
              <div class="bg-white px-4 py-3 text-sm font-semibold text-slate-700">
                {{ field.label }}
              </div>
              <div class="px-4 py-3 text-sm text-slate-600">
                <span
                  v-if="field.type === 'status'"
                  class="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                  :class="statusClassMap[record.status]"
                >
                  {{ field.value }}
                </span>
                <template v-else>
                  {{ field.value }}
                </template>
              </div>
            </div>
          </div>
        </section>

        <section class="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div
            class="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between"
          >
            <h3 class="text-lg font-bold text-slate-800">
              Các tiêu chí
            </h3>
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-lg bg-[#ff1f1f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#e31b1b]"
              @click="goToCreate"
            >
              <MasterCriteriaIcon name="BxPlus" class-name="h-4 w-4" />
              Thêm mới
            </button>
          </div>

          <div class="overflow-x-auto px-4 py-4 md:px-5">
            <table class="min-w-full border-separate border-spacing-0">
              <thead>
                <tr
                  class="text-left text-xs font-semibold uppercase tracking-wide text-slate-400"
                >
                  <th class="border-b border-slate-200 px-4 py-3">#</th>
                  <th class="border-b border-slate-200 px-4 py-3">Tên tiêu chí</th>
                  <th class="border-b border-slate-200 px-4 py-3 text-center">
                    Trọng số
                  </th>
                  <th class="border-b border-slate-200 px-4 py-3">Mô tả</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="criterion in record.criteria"
                  :key="criterion.id"
                  class="text-sm text-slate-600 transition hover:bg-slate-50/70"
                >
                  <td class="border-b border-slate-100 px-4 py-3 text-[#6c63ff]">
                    {{ criterion.id }}
                  </td>
                  <td class="border-b border-slate-100 px-4 py-3 font-medium text-slate-700">
                    {{ criterion.name }}
                  </td>
                  <td class="border-b border-slate-100 px-4 py-3 text-center">
                    {{ criterion.weight }}%
                  </td>
                  <td class="border-b border-slate-100 px-4 py-3">
                    {{ criterion.description }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="border-b border-slate-200 px-5 py-4">
            <h3 class="text-lg font-bold text-slate-800">
              Các kỳ tuyển sinh đang sử dụng bộ tiêu chí
            </h3>
          </div>

          <div class="overflow-x-auto px-4 py-4 md:px-5">
            <table class="min-w-full border-separate border-spacing-0">
              <thead>
                <tr
                  class="text-left text-xs font-semibold uppercase tracking-wide text-slate-400"
                >
                  <th class="border-b border-slate-200 px-4 py-3">#</th>
                  <th class="border-b border-slate-200 px-4 py-3">
                    Cơ sở đào tạo
                  </th>
                  <th class="border-b border-slate-200 px-4 py-3">
                    Tên kỳ tuyển sinh
                  </th>
                  <th class="border-b border-slate-200 px-4 py-3 text-center">
                    Ngày tuyển
                  </th>
                  <th class="border-b border-slate-200 px-4 py-3 text-center">
                    Ngày kết thúc
                  </th>
                  <th class="border-b border-slate-200 px-4 py-3 text-center">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="usage in record.usages"
                  :key="usage.id"
                  class="text-sm text-slate-600 transition hover:bg-slate-50/70"
                >
                  <td class="border-b border-slate-100 px-4 py-3 text-[#6c63ff]">
                    {{ usage.id }}
                  </td>
                  <td class="border-b border-slate-100 px-4 py-3">
                    {{ usage.facilityName }}
                  </td>
                  <td class="border-b border-slate-100 px-4 py-3">
                    {{ usage.admissionName }}
                  </td>
                  <td class="border-b border-slate-100 px-4 py-3 text-center">
                    {{ usage.admissionDate }}
                  </td>
                  <td class="border-b border-slate-100 px-4 py-3 text-center">
                    {{ usage.endDate }}
                  </td>
                  <td class="border-b border-slate-100 px-4 py-3 text-center">
                    <span
                      class="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                      :class="statusClassMap[usage.status]"
                    >
                      {{ getMasterCriteriaStatusLabel(usage.status) }}
                    </span>
                  </td>
                </tr>

                <tr v-if="record.usages.length === 0">
                  <td
                    colspan="6"
                    class="px-4 py-10 text-center text-sm text-slate-400"
                  >
                    Bộ tiêu chí này hiện chưa được áp dụng cho kỳ tuyển sinh nào.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <div v-else class="px-5 py-14 text-center">
        <p class="text-base font-semibold text-slate-700">
          Không tìm thấy bộ tiêu chí cần xem.
        </p>
        <p class="mt-2 text-sm text-slate-400">
          Bản ghi có thể đã bị xóa hoặc đường dẫn không còn hợp lệ.
        </p>
        <button
          type="button"
          class="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#ff1f1f] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e31b1b]"
          @click="goBack"
        >
          <MasterCriteriaIcon name="BxChevronLeft" class-name="h-4 w-4" />
          Về danh sách
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import MasterCriteriaIcon from "./MasterCriteriaIcon.vue";
import {
  getMasterCriteriaStatusLabel,
  masterCriteriaService,
  type MasterCriteriaRecord,
  type MasterCriteriaStatus,
} from "../../../../services/recruitment/masterCriteria";

const moduleTitle = "Quản lý tuyển sinh";
const pageTitle = "Bộ tiêu chí gốc";

const route = useRoute();
const router = useRouter();

const record = ref<MasterCriteriaRecord>();

const statusClassMap: Record<MasterCriteriaStatus, string> = {
  ACTIVE: "bg-emerald-100 text-emerald-600",
  INACTIVE: "bg-amber-100 text-amber-600",
};

const recordId = computed(() => {
  const rawId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
  return Number(rawId);
});

const detailFields = computed(() => {
  if (!record.value) {
    return [];
  }

  return [
    { label: "Tên bộ tiêu chí", value: record.value.name, type: "text" },
    {
      label: "Trạng thái",
      value: getMasterCriteriaStatusLabel(record.value.status),
      type: "status",
    },
    { label: "Mô tả", value: record.value.description, type: "text" },
    { label: "Thời gian tạo", value: record.value.createdAt, type: "text" },
    { label: "Thời gian cập nhật", value: record.value.updatedAt, type: "text" },
  ];
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

const goToEdit = () => {
  if (!record.value) {
    return;
  }

  router.push({ name: "master-criteria-edit", params: { id: record.value.id } });
};

const goToCreate = () => {
  router.push({ name: "master-criteria-create" });
};

onMounted(async () => {
  await loadRecord();
});
</script>
