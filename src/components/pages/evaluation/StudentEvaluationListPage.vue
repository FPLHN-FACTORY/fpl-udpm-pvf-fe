<template>
  <div class="space-y-6 pb-6">
    <section class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <article
        v-for="card in summaryCards"
        :key="card.label"
        class="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm"
      >
        <div class="min-w-0 flex-1">
          <p class="text-[13px] font-semibold leading-5 text-slate-400">
            {{ card.label }}
          </p>
          <div class="mt-2.5 inline-flex items-baseline gap-1.5 whitespace-nowrap">
            <p class="text-[22px] font-bold leading-none text-[#566a7f]">
              {{ card.value }}
            </p>
            <span
              v-if="card.hint"
              class="text-[14px] font-medium leading-none whitespace-nowrap"
              :class="card.hintClass"
            >
              {{ card.hint }}
            </span>
          </div>
        </div>

        <div
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
          :class="card.iconWrapperClass"
        >
          <EvaluationIcon :name="card.icon" class-name="h-5 w-5" />
        </div>
      </article>
    </section>

    <section
      class="overflow-hidden rounded border border-slate-200 bg-white shadow-sm"
    >
      <div
        class="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <h2 class="text-lg font-bold text-slate-800">
            {{ resolvedListTitle }}
          </h2>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-500 transition hover:border-slate-300 hover:bg-slate-200"
            @click="goToDeleted"
          >
            <EvaluationIcon name="BxTrash" class-name="h-4 w-4" />
            Danh sách đã xóa
          </button>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded bg-[#ff4d4f] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#f43f44]"
            @click="goToCreate"
          >
            <EvaluationIcon name="BxPlus" class-name="h-4 w-4" />
            Thêm mới
          </button>
        </div>
      </div>

      <div class="space-y-5 px-5 py-5">
        <div
          class="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between"
        >
          <div class="flex flex-col gap-3 md:flex-row md:items-center">
            <input
              v-model="draftFilters.keyword"
              type="text"
              placeholder="Tìm kiếm"
              class="h-11 w-full rounded-md border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#696cff] focus:ring-2 focus:ring-[#696cff]/10 md:w-[180px]"
            />

            <div class="relative w-full md:w-[176px]">
              <select
                v-model="draftFilters.stage"
                class="h-11 w-full appearance-none rounded-md border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-600 outline-none transition focus:border-[#696cff] focus:ring-2 focus:ring-[#696cff]/10"
              >
                <option value="all">Chọn giai đoạn</option>
                <option v-for="stage in stageOptions" :key="stage" :value="stage">
                  {{ stage }}
                </option>
              </select>
              <EvaluationIcon
                name="BxChevronRight"
                class-name="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-slate-400"
              />
            </div>

            <div class="relative w-full md:w-[176px]">
              <select
                v-model="draftFilters.status"
                class="h-11 w-full appearance-none rounded-md border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-600 outline-none transition focus:border-[#696cff] focus:ring-2 focus:ring-[#696cff]/10"
              >
                <option value="all">Chọn trạng thái</option>
                <option
                  v-for="status in statusOptions"
                  :key="status"
                  :value="status"
                >
                  {{ status }}
                </option>
              </select>
              <EvaluationIcon
                name="BxChevronRight"
                class-name="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-slate-400"
              />
            </div>
          </div>

          <div class="flex items-center gap-3 self-end xl:self-auto">
            <button
              type="button"
              class="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#696cff] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5f63f2]"
              @click="applyFilters"
            >
              <EvaluationIcon name="BxSearch" class-name="h-4 w-4" />
              Tìm Kiếm
            </button>

            <button
              type="button"
              class="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#8592a3] text-white shadow-sm transition hover:bg-[#748094]"
              @click="resetFilters"
            >
              <EvaluationIcon name="BxRefresh" class-name="h-4 w-4" />
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full border-separate border-spacing-0">
            <thead>
              <tr
                class="text-left text-xs font-semibold uppercase tracking-wide text-slate-400"
              >
                <th class="w-14 border-y border-slate-200 px-4 py-3">
                  <input
                    :checked="isAllVisibleSelected"
                    type="checkbox"
                    class="h-4 w-4 rounded border-slate-300 text-[#ff4d4f] focus:ring-[#ff4d4f]"
                    @change="toggleSelectVisible"
                  />
                </th>
                <th class="w-16 border-y border-slate-200 px-2 py-3">#</th>
                <th class="border-y border-slate-200 px-4 py-3">Học viên</th>
                <th class="border-y border-slate-200 px-4 py-3">Mã học viên</th>
                <th class="border-y border-slate-200 px-4 py-3">Giai đoạn</th>
                <th class="border-y border-slate-200 px-4 py-3">Người đánh giá</th>
                <th class="border-y border-slate-200 px-4 py-3 text-center">Tổng điểm</th>
                <th class="border-y border-slate-200 px-4 py-3 text-center">Trạng thái</th>
                <th class="border-y border-slate-200 px-4 py-3 text-center">Hành động</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="row in paginatedRows"
                :key="row.id"
                class="text-sm text-slate-600 transition hover:bg-slate-50/70"
              >
                <td class="border-b border-slate-100 px-4 py-4">
                  <input
                    :checked="selectedIds.includes(row.id)"
                    type="checkbox"
                    class="h-4 w-4 rounded border-slate-300 text-[#ff4d4f] focus:ring-[#ff4d4f]"
                    @change="toggleRowSelection(row.id)"
                  />
                </td>
                <td
                  class="border-b border-slate-100 px-2 py-4 font-semibold text-[#ff4d4f]"
                >
                  {{ row.order }}
                </td>
                <td
                  class="border-b border-slate-100 px-4 py-4 font-semibold text-slate-700"
                >
                  {{ row.studentName }}
                </td>
                <td class="border-b border-slate-100 px-4 py-4">
                  {{ row.studentCode }}
                </td>
                <td class="border-b border-slate-100 px-4 py-4">
                  {{ row.stage }}
                </td>
                <td class="border-b border-slate-100 px-4 py-4">
                  {{ row.reviewer }}
                </td>
                <td
                  class="border-b border-slate-100 px-4 py-4 text-center font-medium text-slate-700"
                >
                  {{ row.totalScore.toFixed(1) }}
                </td>
                <td class="border-b border-slate-100 px-4 py-4 text-center">
                  <span
                    class="inline-flex rounded-md px-3 py-1 text-xs font-semibold"
                    :class="statusClassMap[row.status]"
                  >
                    {{ row.status }}
                  </span>
                </td>
                <td class="border-b border-slate-100 px-4 py-4">
                  <div
                    class="flex items-center justify-center gap-3 text-slate-400"
                  >
                    <button
                      type="button"
                      class="transition hover:text-[#ff4d4f]"
                      title="Xem chi tiết"
                      aria-label="Xem chi tiết"
                      @click="goToDetail(row.id)"
                    >
                      <EvaluationIcon name="BxShow" class-name="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      class="transition hover:text-amber-500"
                      title="Chỉnh sửa"
                      aria-label="Chỉnh sửa"
                      @click="goToEdit(row.id)"
                    >
                      <EvaluationIcon name="BxEditAlt" class-name="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      class="transition hover:text-red-500"
                      title="Xoa"
                      aria-label="Xoa"
                      @click="deleteRow(row.id)"
                    >
                      <EvaluationIcon name="BxTrash" class-name="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="paginatedRows.length === 0">
                <td
                  colspan="9"
                  class="px-4 py-10 text-center text-sm text-slate-400"
                >
                  Không có dữ liệu phù hợp với bộ lọc hiện tại.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          class="flex justify-end border-t border-slate-100 pt-4"
        >
          <BasePagination
            :current="currentPage"
            :page-size="pageSize"
            :total="filteredRows.length"
            @change="changePage"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import BasePagination from "../../atoms/display/BasePagination.vue";
import EvaluationIcon from "./EvaluationIcon.vue";
import {
  evaluationRows,
  softDeleteEvaluationById,
  stageOptions,
  statusOptions,
  type EvaluationStatus,
} from "./evaluationData";

const pageSize = 5;
const defaultPage = 1;
const listTitle = "Danh sách đánh giá toàn khóa";

const route = useRoute();
const router = useRouter();

const resolvedListTitle = computed(() =>
  route.meta.evaluationKind === "course"
    ? "Danh sách đánh giá toàn khóa"
    : "Danh sách Đánh giá học viên",
);

void listTitle;

const draftFilters = reactive({
  keyword: "",
  stage: "all",
  status: "all",
});

const queryFilters = reactive({
  keyword: "",
  stage: "all",
  status: "all",
});

const currentPage = ref(defaultPage);
const selectedIds = ref<number[]>([]);

const filteredRows = computed(() => {
  const keyword = queryFilters.keyword.trim().toLowerCase();

  return evaluationRows.filter((row) => {
    const matchKeyword =
      keyword.length === 0 ||
      row.studentName.toLowerCase().includes(keyword) ||
      row.studentCode.toLowerCase().includes(keyword) ||
      row.reviewer.toLowerCase().includes(keyword) ||
      row.course.toLowerCase().includes(keyword);

    const matchStage =
      queryFilters.stage === "all" || row.stage === queryFilters.stage;
    const matchStatus =
      queryFilters.status === "all" || row.status === queryFilters.status;

    return matchKeyword && matchStage && matchStatus;
  });
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredRows.value.length / pageSize)),
);

const paginatedRows = computed(() => {
  const safePage = Math.min(currentPage.value, totalPages.value);
  const start = (safePage - 1) * pageSize;
  return filteredRows.value.slice(start, start + pageSize);
});

const isAllVisibleSelected = computed(
  () =>
    paginatedRows.value.length > 0 &&
    paginatedRows.value.every((row) => selectedIds.value.includes(row.id)),
);

const activeStatusClass =
  "bg-[rgba(113,221,55,0.16)] text-[rgba(113,221,55,1)]";
const pendingStatusClass =
  "bg-[rgba(255,171,0,0.16)] text-[rgba(255,171,0,1)]";
const openingStatusClass =
  "bg-[rgba(3,195,236,0.16)] text-[rgba(3,195,236,1)]";
const summaryHintClass = "text-[rgba(113,221,55,1)]";

const legacySummaryCards = computed(() => {
  const total = evaluationRows.length;
  const evaluated = evaluationRows.filter(
    (row) => row.status !== "Chưa đánh giá",
  ).length;
  const pending = total - evaluated;
  const outstanding = evaluationRows.filter(
    (row) => row.classification === "Xuất sắc",
  ).length;

  return [
    {
      label: "Tổng học viên hoàn thành",
      value: total,
      hint: "",
      hintClass: "",
      icon: "BxPanelSplit",
      iconWrapperClass: "bg-[rgba(105,108,255,0.16)] text-[rgba(105,108,255,1)]",
    },
    {
      label: "Điểm trung bình toàn khóa",
      value: evaluated,
      hint: total ? `(${Math.round((evaluated / total) * 100)}%)` : "",
      hintClass: summaryHintClass,
      icon: "BxCalendarCheck",
      iconWrapperClass: "bg-[rgba(255,62,29,0.16)] text-[rgba(255,62,29,1)]",
    },
    {
      label: "Tỷ lệ đạt / không đạt",
      value: pending,
      hint: total ? `(${Math.round((pending / total) * 100)}%)` : "",
      hintClass: summaryHintClass,
      icon: "BxLayersMinus",
      iconWrapperClass: "bg-[rgba(255,171,0,0.16)] text-[rgba(255,171,0,1)]",
    },
    {
      label: "Số học viên xuất sắc",
      value: outstanding,
      hint: "",
      hintClass: "",
      icon: "BxAverageAngle",
      iconWrapperClass: "bg-[rgba(255,171,0,0.16)] text-[rgba(255,171,0,1)]",
    },
  ];
});

void legacySummaryCards;

const summaryCards = computed(() => {
  const total = evaluationRows.length;
  const evaluated = evaluationRows.filter(
    (row) => row.status !== "Chưa đánh giá",
  ).length;
  const pending = total - evaluated;
  const averageScore = total
    ? Math.round(
        evaluationRows.reduce((sum, row) => sum + row.totalScore, 0) / total,
      )
    : 0;

  return [
    {
      label: "Tổng số lượt đánh giá",
      value: total,
      hint: "",
      hintClass: "",
      icon: "BxPanelSplit",
      iconWrapperClass: "bg-[rgba(105,108,255,0.16)] text-[rgba(105,108,255,1)]",
    },
    {
      label: "Số học viên đã đánh giá",
      value: evaluated,
      hint: total ? `(${Math.round((evaluated / total) * 100)}%)` : "",
      hintClass: summaryHintClass,
      icon: "BxCalendarCheck",
      iconWrapperClass: "bg-[rgba(255,62,29,0.16)] text-[rgba(255,62,29,1)]",
    },
    {
      label: "Số chưa đánh giá",
      value: pending,
      hint: total ? `(${Math.round((pending / total) * 100)}%)` : "",
      hintClass: summaryHintClass,
      icon: "BxLayersMinus",
      iconWrapperClass: "bg-[rgba(255,171,0,0.16)] text-[rgba(255,171,0,1)]",
    },
    {
      label: "Điểm trung bình",
      value: averageScore,
      hint: "",
      hintClass: "",
      icon: "BxAverageAngle",
      iconWrapperClass: "bg-[rgba(255,171,0,0.16)] text-[rgba(255,171,0,1)]",
    },
  ];
});

const statusClassMap: Record<EvaluationStatus, string> = {
  "Đã khóa": activeStatusClass,
  "Đang mở": openingStatusClass,
  "Chưa đánh giá": pendingStatusClass,
};

const applyFilters = () => {
  queryFilters.keyword = draftFilters.keyword;
  queryFilters.stage = draftFilters.stage;
  queryFilters.status = draftFilters.status;
  selectedIds.value = [];
  currentPage.value = 1;
};

const resetFilters = () => {
  draftFilters.keyword = "";
  draftFilters.stage = "all";
  draftFilters.status = "all";
  queryFilters.keyword = "";
  queryFilters.stage = "all";
  queryFilters.status = "all";
  selectedIds.value = [];
  currentPage.value = 1;
};

const changePage = (page: number) => {
  if (page < 1 || page > totalPages.value) {
    return;
  }

  currentPage.value = page;
};

const toggleRowSelection = (id: number) => {
  if (selectedIds.value.includes(id)) {
    selectedIds.value = selectedIds.value.filter(
      (selectedId) => selectedId !== id,
    );
    return;
  }

  selectedIds.value = [...selectedIds.value, id];
};

const toggleSelectVisible = () => {
  if (isAllVisibleSelected.value) {
    selectedIds.value = selectedIds.value.filter(
      (selectedId) => !paginatedRows.value.some((row) => row.id === selectedId),
    );
    return;
  }

  const nextSelected = new Set(selectedIds.value);
  paginatedRows.value.forEach((row) => nextSelected.add(row.id));
  selectedIds.value = Array.from(nextSelected);
};

const goToDetail = (id: number) => {
  router.push({
    name: "evaluation-student-detail",
    params: { id },
  });
};

const goToCreate = () => {
  router.push({ name: "evaluation-student-create" });
};

const goToDeleted = () => {
  router.push({ name: "evaluation-student-deleted" });
};

const goToEdit = (id: number) => {
  router.push({
    name: "evaluation-student-edit",
    params: { id },
  });
};

const deleteRow = (id: number) => {
  const record = evaluationRows.find((row) => row.id === id);

  if (!record) {
    return;
  }

  const shouldDelete = window.confirm(
    `Ban co chac muon xoa ban danh gia cua ${record.studentName}?`,
  );

  if (!shouldDelete) {
    return;
  }

  if (!softDeleteEvaluationById(id)) {
    return;
  }

  selectedIds.value = selectedIds.value.filter((selectedId) => selectedId !== id);
};

watch(filteredRows, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value;
  }
});

</script>
