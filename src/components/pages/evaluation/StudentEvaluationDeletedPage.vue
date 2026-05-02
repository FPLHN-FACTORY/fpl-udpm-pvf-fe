<template>
  <div class="space-y-3 pb-6">
    <div class="space-y-1">
      <p class="text-sm text-slate-400">
        Đánh giá học viên
        <span class="px-2 text-slate-300">/</span>
        <span class="font-medium text-slate-500">Đánh giá học viên</span>
      </p>
    </div>

    <section
      class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div
        class="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between"
      >
        <h2 class="text-lg font-bold text-slate-800">
          Danh sách Đánh giá học viên đã xóa
        </h2>

        <button
          type="button"
          class="inline-flex items-center gap-2 self-start rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-500 transition hover:border-slate-300 hover:bg-slate-200 lg:self-auto"
          @click="goBack"
        >
          <EvaluationIcon name="BxChevronLeft" class-name="h-4 w-4" />
          Quay lại
        </button>
      </div>

      <div class="space-y-5 px-4 py-4 md:px-5">
        <div
          class="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1.2fr)_220px_220px_auto_auto]"
        >
          <div class="relative">
            <EvaluationIcon
              name="BxSearch"
              class-name="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            />
            <input
              v-model="filters.keyword"
              type="text"
              placeholder="Tìm kiếm"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#6c63ff] focus:ring-2 focus:ring-[#6c63ff]/10"
            />
          </div>

          <div class="relative">
            <select
              v-model="filters.stage"
              class="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-600 outline-none transition focus:border-[#6c63ff] focus:ring-2 focus:ring-[#6c63ff]/10"
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

          <div class="relative">
            <select
              v-model="filters.status"
              class="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-600 outline-none transition focus:border-[#6c63ff] focus:ring-2 focus:ring-[#6c63ff]/10"
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

          <button
            type="button"
            class="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#6c63ff] px-5 text-sm font-semibold text-white opacity-70 transition"
          >
            <EvaluationIcon name="BxSearch" class-name="h-4 w-4" />
            Tìm Kiếm
          </button>

          <button
            type="button"
            class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:bg-slate-50"
            @click="resetFilters"
          >
            <EvaluationIcon name="BxRefresh" class-name="h-4 w-4" />
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full border-separate border-spacing-0">
            <thead>
              <tr
                class="text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400"
              >
                <th class="w-14 border-y border-slate-200 px-4 py-3">
                  <input
                    :checked="isAllVisibleSelected"
                    type="checkbox"
                    class="h-4 w-4 rounded border-slate-300 text-[#6c63ff] focus:ring-[#6c63ff]"
                    @change="toggleSelectVisible"
                  />
                </th>
                <th class="w-16 border-y border-slate-200 px-2 py-3">#</th>
                <th class="border-y border-slate-200 px-4 py-3">Học viên</th>
                <th class="border-y border-slate-200 px-4 py-3">Mã học viên</th>
                <th class="border-y border-slate-200 px-4 py-3">Giai đoạn</th>
                <th class="border-y border-slate-200 px-4 py-3">Người đánh giá</th>
                <th class="border-y border-slate-200 px-4 py-3 text-center">
                  Tổng điểm
                </th>
                <th class="border-y border-slate-200 px-4 py-3 text-center">
                  Ngày xóa
                </th>
                <th class="border-y border-slate-200 px-4 py-3 text-center">
                  Hành động
                </th>
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
                    class="h-4 w-4 rounded border-slate-300 text-[#6c63ff] focus:ring-[#6c63ff]"
                    @change="toggleRowSelection(row.id)"
                  />
                </td>
                <td class="border-b border-slate-100 px-2 py-4 text-[#6366f1]">
                  {{ row.order }}
                </td>
                <td class="border-b border-slate-100 px-4 py-4 font-medium text-slate-700">
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
                <td class="border-b border-slate-100 px-4 py-4 text-center">
                  {{ row.totalScore.toFixed(1) }}
                </td>
                <td class="border-b border-slate-100 px-4 py-4 text-center">
                  {{ row.deletedAt }}
                </td>
                <td class="border-b border-slate-100 px-4 py-4">
                  <div class="flex items-center justify-center gap-3 text-slate-400">
                    <button
                      type="button"
                      class="transition hover:text-[#6c63ff]"
                      title="Xem chi tiết"
                      aria-label="Xem chi tiết"
                      @click="goToDetail(row.sourceId)"
                    >
                      <EvaluationIcon name="BxShow" class-name="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      class="transition hover:text-sky-500"
                      @click="restoreRow(row.id)"
                    >
                      <EvaluationIcon name="BxRefresh" class-name="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      class="transition hover:text-red-500"
                      @click="permanentlyDeleteRow(row.id)"
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
                  Không có bản ghi nào trong danh sách đã xóa.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex items-center justify-end gap-2">
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="currentPage === 1"
            @click="changePage(1)"
          >
            «
          </button>

          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
          >
            <EvaluationIcon name="BxChevronLeft" class-name="h-4 w-4" />
          </button>

          <button
            v-for="page in visiblePages"
            :key="page"
            type="button"
            class="flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-sm font-semibold transition"
            :class="
              page === currentPage
                ? 'bg-[#ff4d4f] text-white shadow-sm'
                : 'border border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50'
            "
            @click="changePage(page)"
          >
            {{ page }}
          </button>

          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
          >
            <EvaluationIcon name="BxChevronRight" class-name="h-4 w-4" />
          </button>

          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="currentPage === totalPages"
            @click="changePage(totalPages)"
          >
            »
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import EvaluationIcon from "./EvaluationIcon.vue";
import {
  deletedEvaluationRows,
  permanentlyDeleteEvaluationById,
  restoreDeletedEvaluationById,
  stageOptions,
  statusOptions,
} from "./evaluationData";

const pageSize = 5;
const defaultPage = 1;

const router = useRouter();

const filters = reactive({
  keyword: "",
  stage: "all",
  status: "all",
});

const currentPage = ref(defaultPage);
const selectedIds = ref<number[]>([]);

const filteredRows = computed(() => {
  const keyword = filters.keyword.trim().toLowerCase();

  return deletedEvaluationRows.filter((row) => {
    const matchKeyword =
      keyword.length === 0 ||
      row.studentName.toLowerCase().includes(keyword) ||
      row.studentCode.toLowerCase().includes(keyword) ||
      row.reviewer.toLowerCase().includes(keyword);

    const matchStage = filters.stage === "all" || row.stage === filters.stage;
    const matchStatus =
      filters.status === "all" || row.status === filters.status;

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

const visiblePages = computed(() => {
  const total = totalPages.value;
  const page = currentPage.value;

  if (total <= 5) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  if (page <= 3) {
    return [1, 2, 3, 4, 5];
  }

  if (page >= total - 2) {
    return [total - 4, total - 3, total - 2, total - 1, total];
  }

  return [page - 2, page - 1, page, page + 1, page + 2];
});

const resetFilters = () => {
  filters.keyword = "";
  filters.stage = "all";
  filters.status = "all";
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

const restoreRow = (id: number) => {
  const record = deletedEvaluationRows.find((row) => row.id === id);

  if (!record) {
    return;
  }

  const shouldRestore = window.confirm(
    `Ban co chac muon khoi phuc ban danh gia cua ${record.studentName}?`,
  );

  if (!shouldRestore) {
    return;
  }

  if (!restoreDeletedEvaluationById(id)) {
    return;
  }

  selectedIds.value = selectedIds.value.filter((selectedId) => selectedId !== id);
};

const permanentlyDeleteRow = (id: number) => {
  const record = deletedEvaluationRows.find((row) => row.id === id);

  if (!record) {
    return;
  }

  const shouldDelete = window.confirm(
    `Ban co chac muon xoa vinh vien ban danh gia cua ${record.studentName}?`,
  );

  if (!shouldDelete) {
    return;
  }

  if (!permanentlyDeleteEvaluationById(id)) {
    return;
  }

  selectedIds.value = selectedIds.value.filter((selectedId) => selectedId !== id);
};

const goToDetail = (sourceId: number) => {
  router.push({
    name: "evaluation-student-detail",
    params: { id: sourceId },
  });
};

const goBack = () => {
  router.push({ name: "evaluation-student" });
};

watch(filteredRows, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value;
  }
});

watch(
  () => [filters.keyword, filters.stage, filters.status],
  () => {
    selectedIds.value = [];
    currentPage.value = 1;
  },
);
</script>
