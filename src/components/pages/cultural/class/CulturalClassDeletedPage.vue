<template>
  <div class="space-y-6 pb-6">
    <div class="space-y-1">
      <p class="text-sm text-slate-400">
        {{ moduleTitle }}
        <span class="px-2 text-slate-300">/</span>
        <span class="font-medium text-slate-500">{{ pageTitle }}</span>
      </p>
    </div>

    <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div class="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 class="text-lg font-bold text-slate-800">
            Danh sách Lớp học văn hóa đã xóa
          </h2>
          <p class="mt-1 text-sm text-slate-400">
            Theo dõi các lớp đã xóa mềm và khôi phục khi cần.
          </p>
        </div>

        <button
          type="button"
          class="inline-flex items-center gap-2 self-start rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-500 transition hover:border-slate-300 hover:bg-slate-200 md:self-auto"
          @click="goBack"
        >
          <CulturalClassIcon name="BxChevronLeft" class-name="h-4 w-4" />
          Quay lại
        </button>
      </div>

      <div class="space-y-5 px-5 py-5">
        <div class="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1fr)_220px_220px_auto_auto]">
          <div class="relative">
            <CulturalClassIcon
              name="BxSearch"
              class-name="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            />
            <input
              v-model="draftFilters.keyword"
              type="text"
              placeholder="Tìm kiếm"
              class="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#6c63ff] focus:ring-2 focus:ring-[#6c63ff]/10"
            />
          </div>

          <select
            v-model="draftFilters.deletedDate"
            class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#6c63ff] focus:ring-2 focus:ring-[#6c63ff]/10"
          >
            <option value="all">Chọn thời gian</option>
            <option v-for="date in deletedDateOptions" :key="date" :value="date">
              {{ date }}
            </option>
          </select>

          <select
            v-model="draftFilters.status"
            class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#6c63ff] focus:ring-2 focus:ring-[#6c63ff]/10"
          >
            <option value="all">Chọn trạng thái</option>
            <option
              v-for="status in statusOptions"
              :key="status.value"
              :value="status.value"
            >
              {{ status.label }}
            </option>
          </select>

          <button
            type="button"
            class="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#6c63ff] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5b53e6]"
            @click="applyFilters"
          >
            <CulturalClassIcon name="BxSearch" class-name="h-4 w-4" />
            Tìm kiếm
          </button>

          <button
            type="button"
            class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-500 transition hover:border-slate-300 hover:bg-slate-200"
            @click="resetFilters"
          >
            <CulturalClassIcon name="BxRefresh" class-name="h-4 w-4" />
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full border-separate border-spacing-0">
            <thead>
              <tr class="text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                <th class="w-14 border-y border-slate-200 px-4 py-3">
                  <input
                    :checked="isAllVisibleSelected"
                    type="checkbox"
                    class="h-4 w-4 rounded border-slate-300 text-[#6c63ff] focus:ring-[#6c63ff]"
                    @change="toggleSelectVisible"
                  />
                </th>
                <th class="w-16 border-y border-slate-200 px-2 py-3">#</th>
                <th class="border-y border-slate-200 px-4 py-3">Tên lớp học</th>
                <th class="border-y border-slate-200 px-4 py-3">Khối lớp</th>
                <th class="border-y border-slate-200 px-4 py-3">Năm học</th>
                <th class="border-y border-slate-200 px-4 py-3">GV chủ nhiệm</th>
                <th class="border-y border-slate-200 px-4 py-3">Ngày xóa</th>
                <th class="border-y border-slate-200 px-4 py-3 text-center">Hành động</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="row in rows"
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
                <td class="border-b border-slate-100 px-2 py-4 font-semibold text-[#6c63ff]">
                  {{ row.order }}
                </td>
                <td class="border-b border-slate-100 px-4 py-4 font-semibold text-[#6c63ff] cursor-pointer hover:underline" @click="goToDetail(row.id)">
                  {{ row.code }}
                </td>
                <td class="border-b border-slate-100 px-4 py-4">
                  {{ row.gradeName }}
                </td>
                <td class="border-b border-slate-100 px-4 py-4">
                  {{ row.schoolYear }}
                </td>
                <td class="border-b border-slate-100 px-4 py-4">
                  {{ row.homeroomTeacher }}
                </td>
                <td class="border-b border-slate-100 px-4 py-4">
                  {{ row.deletedAt }}
                </td>
                <td class="border-b border-slate-100 px-4 py-4">
                  <div class="flex items-center justify-center gap-3 text-slate-400">
                    <button
                      type="button"
                      class="transition hover:text-[#6c63ff]"
                      title="Xem chi tiết"
                      aria-label="Xem chi tiết"
                      @click="goToDetail(row.id)"
                    >
                      <CulturalClassIcon name="BxShow" class-name="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      class="transition hover:text-emerald-500"
                      title="Khôi phục"
                      aria-label="Khôi phục"
                      @click="restoreRow(row.id)"
                    >
                      <CulturalClassIcon name="BxRevision" class-name="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      class="transition hover:text-red-500"
                      title="Xóa vĩnh viễn"
                      aria-label="Xóa vĩnh viễn"
                      @click="hardDeleteRow(row.id)"
                    >
                      <CulturalClassIcon name="BxTrash" class-name="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="rows.length === 0">
                <td colspan="8" class="px-4 py-10 text-center text-sm text-slate-400">
                  Không có lớp học đã xóa phù hợp với bộ lọc hiện tại.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-sm text-slate-400">
            Đã chọn {{ selectedIds.length }} lớp học.
          </p>

          <div class="flex items-center gap-1 self-end">
            <!-- First page -->
            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 text-xs font-bold transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="pagination.currentPage === 1"
              @click="changePage(1)"
            >
              «
            </button>
            <!-- Prev page -->
            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 text-xs font-bold transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="pagination.currentPage === 1"
              @click="changePage(pagination.currentPage - 1)"
            >
              ‹
            </button>

            <button
              v-for="page in visiblePages"
              :key="page"
              type="button"
              class="flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-sm font-semibold transition"
              :class="
                page === pagination.currentPage
                  ? 'bg-[#ff1f1f] text-white shadow-sm'
                  : 'border border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50'
              "
              @click="changePage(page)"
            >
              {{ page }}
            </button>

            <!-- Next page -->
            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 text-xs font-bold transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="pagination.currentPage === pagination.totalPages"
              @click="changePage(pagination.currentPage + 1)"
            >
              ›
            </button>
            <!-- Last page -->
            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 text-xs font-bold transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="pagination.currentPage === pagination.totalPages"
              @click="changePage(pagination.totalPages)"
            >
              »
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import CulturalClassIcon from "./CulturalClassIcon.vue";
import {
  culturalClassService,
  culturalClassStatusOptions,
  type CulturalClassListItem,
  type CulturalClassStatus,
  type PaginationMeta,
} from "../../../../services/cultural/culturalClass";

const moduleTitle = "Quản lý học tập văn hóa";
const pageTitle = "Lớp học văn hóa";

const router = useRouter();

const rows = ref<CulturalClassListItem[]>([]);
const selectedIds = ref<number[]>([]);

const draftFilters = reactive({
  keyword: "",
  deletedDate: "all",
  status: "all" as "all" | CulturalClassStatus,
});

const queryFilters = reactive({
  keyword: "",
  deletedDate: "all",
  status: "all" as "all" | CulturalClassStatus,
});

const pagination = reactive<PaginationMeta>({
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 5,
});

let filterSyncTimer: ReturnType<typeof setTimeout> | undefined;

const statusOptions = culturalClassStatusOptions;
const deletedDateOptions = ["2025-02-01"];

const isAllVisibleSelected = computed(
  () =>
    rows.value.length > 0 &&
    rows.value.every((row) => selectedIds.value.includes(row.id)),
);

const visiblePages = computed(() => {
  const total = pagination.totalPages;
  const page = pagination.currentPage;

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

const loadRows = async () => {
  const response = await culturalClassService.listDeleted({
    keyword: queryFilters.keyword,
    deletedDate: queryFilters.deletedDate,
    status: queryFilters.status,
    page: pagination.currentPage,
    pageSize: pagination.itemsPerPage,
  });

  rows.value = response.data;
  pagination.currentPage = response.meta.currentPage;
  pagination.totalPages = response.meta.totalPages;
  pagination.totalItems = response.meta.totalItems;
  pagination.itemsPerPage = response.meta.itemsPerPage;
  selectedIds.value = [];
};

const syncFiltersAndReload = async () => {
  queryFilters.keyword = draftFilters.keyword;
  queryFilters.deletedDate = draftFilters.deletedDate;
  queryFilters.status = draftFilters.status;
  pagination.currentPage = 1;
  await loadRows();
};

const applyFilters = async () => {
  if (filterSyncTimer) {
    clearTimeout(filterSyncTimer);
  }

  await syncFiltersAndReload();
};

const resetFilters = () => {
  draftFilters.keyword = "";
  draftFilters.deletedDate = "all";
  draftFilters.status = "all";
};

const changePage = async (page: number) => {
  if (page < 1 || page > pagination.totalPages) {
    return;
  }

  pagination.currentPage = page;
  await loadRows();
};

const toggleRowSelection = (id: number) => {
  if (selectedIds.value.includes(id)) {
    selectedIds.value = selectedIds.value.filter((selectedId) => selectedId !== id);
    return;
  }

  selectedIds.value = [...selectedIds.value, id];
};

const toggleSelectVisible = () => {
  if (isAllVisibleSelected.value) {
    selectedIds.value = selectedIds.value.filter(
      (selectedId) => !rows.value.some((row) => row.id === selectedId),
    );
    return;
  }

  const nextSelected = new Set(selectedIds.value);
  rows.value.forEach((row) => nextSelected.add(row.id));
  selectedIds.value = Array.from(nextSelected);
};

const goBack = () => {
  router.push({ name: "cultural-class" });
};

const goToDetail = (id: number) => {
  router.push({ name: "cultural-class-detail", params: { id } });
};

const restoreRow = async (id: number) => {
  await culturalClassService.restore(id);
  await loadRows();
};

const hardDeleteRow = async (id: number) => {
  await culturalClassService.hardDelete(id);
  if (rows.value.length === 1 && pagination.currentPage > 1) {
    pagination.currentPage -= 1;
  }
  await loadRows();
};

onMounted(async () => {
  await loadRows();
});

watch(
  () => [draftFilters.keyword, draftFilters.deletedDate, draftFilters.status],
  () => {
    if (filterSyncTimer) {
      clearTimeout(filterSyncTimer);
    }

    filterSyncTimer = setTimeout(() => {
      void syncFiltersAndReload();
    }, 250);
  },
);
</script>
