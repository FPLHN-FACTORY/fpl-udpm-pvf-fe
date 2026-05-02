<template>
  <div class="space-y-3 pb-6">
    <div class="space-y-1">
      <p class="text-sm text-slate-400">
        {{ moduleTitle }}
        <span class="px-2 text-slate-300">/</span>
        <span class="font-medium text-slate-500">{{ breadcrumbTitle }}</span>
      </p>
    </div>

    <section
      class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div
        class="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between"
      >
        <h2 class="text-lg font-bold text-slate-800">
          {{ detailCardTitle }}
        </h2>

        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-500 transition hover:border-slate-300 hover:bg-slate-200"
          @click="goBack"
        >
          <NavIcon name="BxChevronLeft" class-name="h-4 w-4" />
          Quay lại
        </button>
      </div>

      <div v-if="record" class="px-4 py-4 md:px-5">
        <div class="overflow-hidden rounded-xl border border-slate-200">
          <div
            v-for="field in detailFields"
            :key="field.label"
            class="grid grid-cols-1 border-b border-slate-200 last:border-b-0 md:grid-cols-[240px_minmax(0,1fr)]"
          >
            <div class="bg-white px-4 py-3 text-sm font-semibold text-slate-700">
              {{ field.label }}
            </div>
            <div class="px-4 py-3 text-sm text-slate-600">
              {{ field.value }}
            </div>
          </div>
        </div>
      </div>

      <div v-else class="px-5 py-14 text-center">
        <p class="text-base font-semibold text-slate-700">
          Không tìm thấy bản đánh giá cần xem.
        </p>
        <p class="mt-2 text-sm text-slate-400">
          Bản ghi có thể đã bị xóa hoặc đường dẫn không còn hợp lệ.
        </p>
        <button
          type="button"
          class="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#ff4d4f] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#f43f44]"
          @click="goBack"
        >
          <NavIcon name="BxChevronLeft" class-name="h-4 w-4" />
          Về danh sách
        </button>
      </div>
    </section>

    <section
      v-if="record"
      class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div class="border-b border-slate-200 px-5 py-4">
        <h3 class="text-lg font-bold text-slate-800">
          Bảng chấm điểm theo tiêu chí
        </h3>
      </div>

      <div class="overflow-x-auto px-4 py-4 md:px-5">
        <table class="min-w-full border-separate border-spacing-0">
          <thead>
            <tr
              class="text-left text-xs font-semibold uppercase tracking-wide text-slate-400"
            >
              <th class="border-b border-slate-200 px-4 py-3">#</th>
              <th class="border-b border-slate-200 px-4 py-3">Tiêu chí</th>
              <th class="border-b border-slate-200 px-4 py-3 text-center">
                Trọng số
              </th>
              <th class="border-b border-slate-200 px-4 py-3 text-center">
                Điểm
              </th>
              <th class="border-b border-slate-200 px-4 py-3 text-center">
                Điểm quy đổi
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="criterion in record.criteria"
              :key="criterion.id"
              class="text-sm text-slate-600 transition hover:bg-slate-50/70"
            >
              <td class="border-b border-slate-100 px-4 py-3">
                {{ criterion.id }}
              </td>
              <td class="border-b border-slate-100 px-4 py-3 font-medium text-slate-700">
                {{ criterion.name }}
              </td>
              <td class="border-b border-slate-100 px-4 py-3 text-center">
                {{ criterion.weight }}%
              </td>
              <td class="border-b border-slate-100 px-4 py-3 text-center">
                {{ criterion.score ?? "--" }}
              </td>
              <td class="border-b border-slate-100 px-4 py-3 text-center">
                {{ criterion.convertedScore.toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavIcon from "../../atoms/NavIcon.vue";
import { getEvaluationById, type EvaluationKind } from "./evaluationData";

const moduleTitle = "Đánh giá học viên";

const route = useRoute();
const router = useRouter();

const resolveKind = (value: unknown): EvaluationKind =>
  value === "course" ? "course" : "student";

const evaluationKind = computed(() => resolveKind(route.meta.evaluationKind));

const breadcrumbTitle = computed(() =>
  evaluationKind.value === "course"
    ? "Đánh giá toàn khóa"
    : "Đánh giá học viên",
);

const detailCardTitle = computed(() =>
  evaluationKind.value === "course"
    ? "Chi tiết đánh giá toàn khóa"
    : "Chi tiết giai đoạn đánh giá",
);

const listRouteName = computed(() =>
  evaluationKind.value === "course"
    ? "evaluation-full-course"
    : "evaluation-student",
);

const recordId = computed(() => {
  const rawId = Array.isArray(route.params.id)
    ? route.params.id[0]
    : route.params.id;

  return Number(rawId);
});

const record = computed(() => {
  if (!Number.isFinite(recordId.value)) {
    return undefined;
  }

  return getEvaluationById(recordId.value);
});

const detailFields = computed(() => {
  if (!record.value) {
    return [];
  }

  if (evaluationKind.value === "course") {
    return [
      { label: "ID", value: record.value.evaluationCode },
      { label: "Học viên", value: record.value.studentName },
      { label: "Mã học viên", value: record.value.studentCode },
      { label: "Khóa", value: record.value.course },
      { label: "Form", value: record.value.formName },
      { label: "Người đánh giá", value: record.value.reviewer },
      {
        label: "Tổng điểm (nếu có)",
        value:
          record.value.totalScore > 0
            ? record.value.totalScore.toFixed(1)
            : "--",
      },
      { label: "Xếp loại", value: record.value.classification },
      { label: "Nhận xét tổng quan", value: record.value.overview },
      { label: "Thời điểm khóa đánh giá", value: record.value.lockedAt },
      { label: "Thời gian tạo", value: record.value.createdAt },
      { label: "Thời gian cập nhật", value: record.value.updatedAt },
      { label: "Trạng thái", value: record.value.status },
    ];
  }

  return [
    { label: "ID", value: record.value.evaluationCode },
    { label: "Học viên", value: record.value.studentName },
    { label: "Mã học viên", value: record.value.studentCode },
    { label: "Giai đoạn", value: record.value.stage },
    { label: "Form", value: record.value.formName },
    { label: "Người đánh giá", value: record.value.reviewer },
    {
      label: "Tổng điểm (nếu có)",
      value:
        record.value.totalScore > 0 ? record.value.totalScore.toFixed(1) : "--",
    },
    { label: "Nhận xét tổng quan", value: record.value.overview },
    { label: "Thời điểm khóa đánh giá", value: record.value.lockedAt },
    { label: "Thời gian tạo", value: record.value.createdAt },
    { label: "Thời gian cập nhật", value: record.value.updatedAt },
    { label: "Trạng thái", value: record.value.status },
  ];
});

const goBack = () => {
  router.push({ name: listRouteName.value });
};
</script>
