<template>
  <div class="space-y-6 pb-6">
    <div class="space-y-1">
      <p class="text-sm text-slate-400">
        {{ moduleTitle }}
        <span class="px-2 text-slate-300">/</span>
        <span class="font-medium text-slate-500">{{ pageTitle }}</span>
      </p>
    </div>

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
              class="text-[12px] font-medium leading-none whitespace-nowrap"
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
          <MasterCriteriaIcon :name="card.icon" class-name="h-5 w-5" />
        </div>
      </article>
    </section>

    <section
      class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div
        class="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <h2 class="text-lg font-bold text-slate-800">
            Danh sách Bộ tiêu chí gốc
          </h2>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-500 transition hover:border-slate-300 hover:bg-slate-200"
            @click="goToDeleted"
          >
            <MasterCriteriaIcon name="BxTrash" class-name="h-4 w-4" />
            Danh sách bộ tiêu chí đã xóa
          </button>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-xl bg-[#ff1f1f] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e31b1b]"
            @click="goToCreate"
          >
            <MasterCriteriaIcon name="BxPlus" class-name="h-4 w-4" />
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
              class="h-11 w-full rounded-md border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#696cff] focus:ring-2 focus:ring-[#696cff]/10 md:w-[228px]"
            />

            <div class="relative w-full md:w-[184px]">
              <select
                v-model="draftFilters.status"
                class="h-11 w-full appearance-none rounded-md border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-600 outline-none transition focus:border-[#696cff] focus:ring-2 focus:ring-[#696cff]/10"
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
          </div>

          <div class="flex items-center gap-3 self-end xl:self-auto">
            <button
              type="button"
              class="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#696cff] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5f63f2]"
              @click="applyFilters"
            >
              <MasterCriteriaIcon name="BxSearch" class-name="h-4 w-4" />
              Tìm Kiếm
            </button>

            <button
              type="button"
              class="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#8592a3] text-white shadow-sm transition hover:bg-[#748094]"
              @click="resetFilters"
            >
              <MasterCriteriaIcon name="BxRefresh" class-name="h-4 w-4" />
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
                  Trạng thái
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
                  <span
                    class="inline-flex rounded-md px-3 py-1 text-xs font-semibold"
                    :class="statusClassMap[row.status]"
                  >
                    {{ row.statusLabel }}
                  </span>
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
                      class="transition hover:text-amber-500"
                      title="Chỉnh sửa"
                      aria-label="Chỉnh sửa"
                      @click="goToEdit(row.id)"
                    >
                      <MasterCriteriaIcon name="BxEditAlt" class-name="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      class="transition hover:text-sky-500"
                      title="Nhân bản"
                      aria-label="Nhân bản"
                      @click="duplicateRow(row.id)"
                    >
                      <MasterCriteriaIcon name="BxCopy" class-name="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      class="transition hover:text-red-500"
                      title="Xóa"
                      aria-label="Xóa"
                      @click="deleteRow(row.id)"
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
                  Không có bộ tiêu chí phù hợp với bộ lọc hiện tại.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          class="flex justify-end border-t border-slate-100 pt-4"
        >
          <BasePagination
            :current="pagination.currentPage"
            :page-size="pagination.itemsPerPage"
            :total="pagination.totalItems"
            @change="changePage"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import BasePagination from "../../../atoms/display/BasePagination.vue";
import MasterCriteriaIcon from "./MasterCriteriaIcon.vue";
import {
  masterCriteriaService,
  masterCriteriaStatusOptions,
  type MasterCriteriaListItem,
  type MasterCriteriaStatus,
  type PaginationMeta,
  type MasterCriteriaSummary,
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

const summary = reactive<MasterCriteriaSummary>({
  total: 0,
  inUse: 0,
  unused: 0,
  active: 0,
});

const activeStatusClass =
  "bg-[rgba(113,221,55,0.16)] text-[rgba(113,221,55,1)]";
const inactiveStatusClass =
  "bg-[rgba(255,171,0,0.16)] text-[rgba(255,171,0,1)]";
const statusClassMap: Record<MasterCriteriaStatus, string> = {
  ACTIVE: activeStatusClass,
  INACTIVE: inactiveStatusClass,
};

const summaryHintClass = "text-[rgba(113,221,55,1)]";

const summaryCards = computed(() => [
  {
    label: "Tổng số bộ tiêu chí",
    value: summary.total,
    hint: "",
    hintClass: "",
    icon: "BxPanelSplit",
    iconWrapperClass: "bg-[#e7e7ff] text-[#696cff]",
  },
  {
    label: "Số bộ đang sử dụng",
    value: summary.inUse,
    hint: summary.total ? `(${Math.round((summary.inUse / summary.total) * 100)}%)` : "",
    hintClass: summaryHintClass,
    icon: "BxCalendarCheck",
    iconWrapperClass: "bg-[#ffe0db] text-[#ff3e1d]",
  },
  {
    label: "Số bộ chưa sử dụng",
    value: summary.unused,
    hint: summary.total ? `(${Math.round((summary.unused / summary.total) * 100)}%)` : "",
    hintClass: summaryHintClass,
    icon: "BxLayersMinus",
    iconWrapperClass: "bg-[#fff2d6] text-[#ffab00]",
  },
  {
    label: "Số bộ đang active",
    value: summary.active,
    hint: summary.total ? `(${Math.round((summary.active / summary.total) * 100)}%)` : "",
    hintClass: summaryHintClass,
    icon: "BxLayersPlus",
    iconWrapperClass: "bg-[#fff2d6] text-[#ffab00]",
  },
]);

const isAllVisibleSelected = computed(
  () =>
    rows.value.length > 0 &&
    rows.value.every((row) => selectedIds.value.includes(row.id)),
);

const loadRows = async () => {
  const response = await masterCriteriaService.list({
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
  summary.total = response.summary.total;
  summary.inUse = response.summary.inUse;
  summary.unused = response.summary.unused;
  summary.active = response.summary.active;
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

const goToDeleted = () => {
  router.push({ name: "master-criteria-deleted" });
};

const goToCreate = () => {
  router.push({ name: "master-criteria-create" });
};

const goToDetail = (id: number) => {
  router.push({ name: "master-criteria-detail", params: { id } });
};

const goToEdit = (id: number) => {
  router.push({ name: "master-criteria-edit", params: { id } });
};

const duplicateRow = async (id: number) => {
  await masterCriteriaService.duplicate(id);
  pagination.currentPage = 1;
  await loadRows();
};

const deleteRow = async (id: number) => {
  await masterCriteriaService.softDelete(id);
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
