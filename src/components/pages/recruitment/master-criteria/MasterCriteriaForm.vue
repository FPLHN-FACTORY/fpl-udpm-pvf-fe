<template>
  <section class="rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div
      class="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between"
    >
      <h2 class="text-xl font-bold text-slate-800">
        {{ title }}
      </h2>

      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-500 transition hover:border-slate-300 hover:bg-slate-200"
        @click="$emit('cancel')"
      >
        <MasterCriteriaIcon name="BxChevronLeft" class-name="h-4 w-4" />
        Quay lại
      </button>
    </div>

    <div class="space-y-8 px-5 py-5">
      <div class="space-y-4">
        <input
          v-model="form.name"
          type="text"
          placeholder="Tên bộ tiêu chí"
          class="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#696cff] focus:ring-2 focus:ring-[#696cff]/10"
        />

        <select
          v-model="form.status"
          class="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#696cff] focus:ring-2 focus:ring-[#696cff]/10"
        >
          <option
            v-for="option in masterCriteriaStatusOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>

        <textarea
          v-model="form.description"
          rows="4"
          placeholder="Mô tả bộ tiêu chí"
          class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#696cff] focus:ring-2 focus:ring-[#696cff]/10"
        />
      </div>

      <div class="space-y-4">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 class="text-lg font-bold text-slate-800">
            Các tiêu chí
          </h3>

          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-lg bg-lime-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-lime-600"
            @click="addCriterionRow"
          >
            <MasterCriteriaIcon name="BxPlus" class-name="h-4 w-4" />
            Thêm tiêu chí
          </button>
        </div>

        <div class="space-y-3">
          <div
            v-for="(criterion, index) in criteriaRows"
            :key="criterion.rowId"
            class="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.2fr)_220px_auto]"
          >
            <input
              v-model="criterion.name"
              type="text"
              :placeholder="`Tên tiêu chí ${index + 1}`"
              class="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#696cff] focus:ring-2 focus:ring-[#696cff]/10"
            />

            <input
              v-model="criterion.description"
              type="text"
              :placeholder="`Mô tả tiêu chí ${index + 1}`"
              class="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#696cff] focus:ring-2 focus:ring-[#696cff]/10"
            />

            <input
              v-model="criterion.weightInput"
              type="number"
              min="0"
              max="100"
              placeholder="Trọng số %"
              class="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#696cff] focus:ring-2 focus:ring-[#696cff]/10"
            />

            <button
              type="button"
              class="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 transition hover:border-red-200 hover:text-red-500"
              :disabled="criteriaRows.length === 1"
              @click="removeCriterionRow(criterion.rowId)"
            >
              <MasterCriteriaIcon name="BxTrash" class-name="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <p v-if="errorMessage" class="text-sm font-medium text-red-500">
        {{ errorMessage }}
      </p>

      <div class="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          class="inline-flex min-w-28 items-center justify-center rounded-xl bg-[#ff1f1f] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e31b1b]"
          @click="submitForm"
        >
          {{ submitLabel }}
        </button>
        <button
          type="button"
          class="inline-flex min-w-28 items-center justify-center rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600"
          @click="resetForm"
        >
          Đặt lại
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import MasterCriteriaIcon from "./MasterCriteriaIcon.vue";
import {
  masterCriteriaStatusOptions,
  type MasterCriteriaStatus,
  type SaveMasterCriteriaInput,
} from "../../../../services/recruitment/masterCriteria";

interface FormCriterionRow {
  rowId: number;
  name: string;
  description: string;
  weightInput: string;
}

interface MasterCriteriaFormModel {
  name: string;
  description: string;
  status: MasterCriteriaStatus;
  criteria: Array<{
    name: string;
    description: string;
    weight: number;
  }>;
}

const props = defineProps<{
  title: string;
  submitLabel: string;
  initialValue?: MasterCriteriaFormModel;
}>();

const emit = defineEmits<{
  cancel: [];
  submit: [payload: SaveMasterCriteriaInput];
}>();

const form = reactive({
  name: "",
  description: "",
  status: "ACTIVE" as MasterCriteriaStatus,
});

const criteriaRows = ref<FormCriterionRow[]>([]);
const errorMessage = ref("");
let nextRowId = 1;

const buildBlankRow = (): FormCriterionRow => ({
  rowId: nextRowId++,
  name: "",
  description: "",
  weightInput: "",
});

const buildRowsFromModel = (
  model?: MasterCriteriaFormModel,
): FormCriterionRow[] => {
  if (!model || model.criteria.length === 0) {
    return [buildBlankRow()];
  }

  return model.criteria.map((criterion) => ({
    rowId: nextRowId++,
    name: criterion.name,
    description: criterion.description,
    weightInput: String(criterion.weight),
  }));
};

const resetForm = () => {
  form.name = props.initialValue?.name ?? "";
  form.description = props.initialValue?.description ?? "";
  form.status = props.initialValue?.status ?? "ACTIVE";
  criteriaRows.value = buildRowsFromModel(props.initialValue);
  errorMessage.value = "";
};

const addCriterionRow = () => {
  criteriaRows.value = [...criteriaRows.value, buildBlankRow()];
};

const removeCriterionRow = (rowId: number) => {
  if (criteriaRows.value.length === 1) {
    return;
  }

  criteriaRows.value = criteriaRows.value.filter((row) => row.rowId !== rowId);
};

const buildPayload = (): SaveMasterCriteriaInput | null => {
  const name = form.name.trim();
  const description = form.description.trim();
  const criteria = criteriaRows.value
    .map((row) => ({
      name: row.name.trim(),
      description: row.description.trim(),
      weight: Number(row.weightInput),
      hasValue:
        row.name.trim().length > 0 ||
        row.description.trim().length > 0 ||
        row.weightInput.trim().length > 0,
    }))
    .filter((row) => row.hasValue)
    .map(({ hasValue: _hasValue, ...row }) => row);

  if (!name) {
    errorMessage.value = "Tên bộ tiêu chí không được để trống.";
    return null;
  }

  if (criteria.length === 0) {
    errorMessage.value = "Cần ít nhất một tiêu chí để lưu bộ tiêu chí.";
    return null;
  }

  if (
    criteria.some(
      (row) =>
        !row.name ||
        !row.description ||
        !Number.isFinite(row.weight) ||
        row.weight <= 0,
    )
  ) {
    errorMessage.value =
      "Mỗi tiêu chí cần có tên, mô tả và trọng số hợp lệ lớn hơn 0.";
    return null;
  }

  return {
    name,
    description,
    status: form.status,
    criteria,
  };
};

const submitForm = () => {
  const payload = buildPayload();
  if (!payload) {
    return;
  }

  errorMessage.value = "";
  emit("submit", payload);
};

watch(
  () => props.initialValue,
  () => {
    resetForm();
  },
  { immediate: true },
);
</script>
