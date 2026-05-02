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
        <div>
          <h2 class="text-lg font-bold text-slate-800">
            Danh sách Bộ tiêu chí gốc đã xóa
          </h2>
          <p class="mt-1 text-sm text-slate-400">
            Theo dõi các bộ tiêu chí đã bị xóa mềm và khôi phục khi cần.
          </p>
        </div>

        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-500 transition hover:border-slate-300 hover:bg-slate-200"
          @click="goBack"
        >
          <MasterCriteriaIcon name="BxChevronLeft" class-name="h-4 w-4" />
          Quay lại
        </button>
      </div>

      <div class="space-y-5 px-5 py-5">
        <div
          class="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1fr)_220px_auto_auto]"
        >
          <input
            v-model="draftFilters.keyword"
            type="text"
            placeholder="Tìm kiếm"
            class="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#6c63ff] focus:ring-2 focus:ring-[#6c63ff]/10"
          />

          <div class="relative">
            <select
              v-model="draftFilters.status"
              class="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-600 outline-none transition focus:border-[#6c63ff] focus:ring-2 focus:ring-[#6c63ff]/10"
            >
              <option value="all">Chọn trạng thái</option>
              <option
                v-for="option in masterCriteriaStatusOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
            <MasterCriteriaIcon
              name="BxChevronRight"
              class-name="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-slate-400"
            />
          </div>

          <button
            type="button"
            class="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#6c63ff] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5b53e6]"
            @click="applyFilters"
          >
            <MasterCriteriaIcon name="BxSearch" class-name="h-4 w-4" />
            Tìm kiếm
          </button>

          <button
            type="button"
            class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-500 transition hover:border-slate-300 hover:bg-slate-200"
            @click="resetFilters"
          >
            <MasterCriteriaIcon name="BxRefresh" class-name="h-4 w-4" />
          </button>
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
                    class="h-4 w-4 rounded border-slate-300 text-[#6c63ff] focus:ring-[#6c63ff]"
                    @change="toggleSelectVisible"
                  />
                </th>
                <th class="w-16 border-y border-slate-200 px-2 py-3">#</th>
                <th class="border-y border-slate-200 px-4 py-3">
                  Tên bộ tiêu chí
                </th>
                <th class="border-y border-slate-200 px-4 py-3">
                  Mô tả bộ tiêu chí
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
                <td
                  class="border-b border-slate-100 px-2 py-4 font-semibold text-[#6c63ff]"
                >
                  {{ row.order }}
                </td>
                <td
                  class="border-b border-slate-100 px-4 py-4 font-semibold text-slate-700"
                >
                  {{ row.name }}
                </td>
                <td class="border-b border-slate-100 px-4 py-4">
                  {{ row.description }}
                </td>
                <td class="border-b border-slate-100 px-4 py-4 text-center">
                  {{ row.deletedAt }}
                </td>
                <td class="border-b border-slate-100 px-4 py-4">
                  <div
                    class="flex items-center justify-center gap-3 text-slate-400"
                  >
                    <button
                      type="button"
                      class="transition hover:text-[#6c63ff]"
                      title="Xem chi tiết"
                      aria-label="Xem chi tiết"
                      @click="goToDetail(row.id)"
                    >
                      <MasterCriteriaIcon name="BxShow" class-name="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      class="transition hover:text-emerald-500"
                      title="Khôi phục"
                      aria-label="Khôi phục"
                      @click="restoreRow(row.id)"
                    >
                      <MasterCriteriaIcon name="BxRevision" class-name="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      class="transition hover:text-red-500"
                      title="Xóa vĩnh viễn"
                      aria-label="Xóa vĩnh viễn"
                      @click="hardDeleteRow(row.id)"
                    >
                      <MasterCriteriaIcon name="BxTrash" class-name="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="rows.length === 0">
                <td
                  colspan="6"
                  class="px-4 py-10 text-center text-sm text-slate-400"
                >
                  Không có bộ tiêu chí đã xóa phù hợp với bộ lọc hiện tại.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          class="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <p class="text-sm text-slate-400">
            Đã chọn {{ selectedIds.length }} bộ tiêu chí.
          </p>

          <div class="flex items-center gap-2 self-end">
            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="pagination.currentPage === 1"
              @click="changePage(pagination.currentPage - 1)"
            >
              <MasterCriteriaIcon name="BxChevronLeft" class-name="h-4 w-4" />
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

            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="pagination.currentPage === pagination.totalPages"
              @click="changePage(pagination.currentPage + 1)"
            >
              <MasterCriteriaIcon name="BxChevronRight" class-name="h-4 w-4" />
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
import MasterCriteriaIcon from "./MasterCriteriaIcon.vue";
import {
  masterCriteriaService,
  masterCriteriaStatusOptions,
  type MasterCriteriaListItem,
  type MasterCriteriaStatus,
  type PaginationMeta,
} from "../../../../services/recruitment/masterCriteria";

const moduleTitle = "Quản lý tuyển sinh";
const pageTitle = "Bộ tiêu chí gốc";

const router = useRouter();

const rows = ref<MasterCriteriaListItem[]>([]);
const selectedIds = ref<number[]>([]);

const draftFilters = reactive({
  keyword: "",
  status: "all" as "all" | MasterCriteriaStatus,
});

const queryFilters = reactive({
  keyword: "",
  status: "all" as "all" | MasterCriteriaStatus,
});

const pagination = reactive<PaginationMeta>({
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 9,
});

let filterSyncTimer: ReturnType<typeof setTimeout> | undefined;

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
  const response = await masterCriteriaService.listDeleted({
    keyword: queryFilters.keyword,
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
  router.push({ name: "master-criteria" });
};

const goToDetail = (id: number) => {
  router.push({ name: "master-criteria-detail", params: { id } });
};

const restoreRow = async (id: number) => {
  await masterCriteriaService.restore(id);
  if (rows.value.length === 1 && pagination.currentPage > 1) {
    pagination.currentPage -= 1;
  }
  await loadRows();
};

const hardDeleteRow = async (id: number) => {
  await masterCriteriaService.hardDelete(id);
  if (rows.value.length === 1 && pagination.currentPage > 1) {
    pagination.currentPage -= 1;
  }
  await loadRows();
};

onMounted(async () => {
  await loadRows();
});

watch(
  () => [draftFilters.keyword, draftFilters.status],
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
