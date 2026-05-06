<template>
  <div class="space-y-6">
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div class="flex justify-between items-center mb-10">
        <h2 class="text-[17px] font-bold text-gray-700 m-0">{{ title }}</h2>
        <ButtonBack @click="$emit('cancel')" />
      </div>

      <div class="space-y-7 pb-10">
        <InputForm v-model="form.name" label="Tên bộ tiêu chí" placeholder="Nhập tên bộ tiêu chí" />
        
        <SelectForm v-model:value="form.status" label="Trạng thái">
          <a-select-option v-for="option in masterCriteriaStatusOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </a-select-option>
        </SelectForm>

        <TextareaForm v-model="form.description" label="Mô tả bộ tiêu chí" placeholder="Nhập mô tả" />
        
        <!-- Criteria Section -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-[15px] font-bold text-gray-700">Các tiêu chí</h3>
            <ButtonAdd text="Thêm tiêu chí" @click="addCriterionRow" />
          </div>

          <div class="space-y-4">
            <div v-for="(criterion, index) in criteriaRows" :key="criterion.rowId" 
              class="grid grid-cols-1 md:grid-cols-[1fr_1.5fr_150px_auto] gap-4 items-end bg-[#fcfcfd] p-4 rounded-lg border border-gray-100"
            >
              <InputForm v-model="criterion.name" :label="`Tên tiêu chí ${index + 1}`" placeholder="Nhập tên" class="!mb-0" />
              <InputForm v-model="criterion.description" :label="`Mô tả tiêu chí ${index + 1}`" placeholder="Nhập mô tả" class="!mb-0" />
              <InputForm v-model="criterion.weightInput" :label="`Trọng số %`" type="number" placeholder="0" class="!mb-0" />
              
              <button
                type="button"
                class="flex h-[38px] w-[38px] items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition hover:border-red-200 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed mb-[1px]"
                :disabled="criteriaRows.length === 1"
                @click="removeCriterionRow(criterion.rowId)"
              >
                <NavIcon name="BxTrash" size="18" />
              </button>
            </div>
          </div>
        </div>

        <p v-if="errorMessage" class="text-sm font-medium text-red-500 text-center">
          {{ errorMessage }}
        </p>

        <!-- Action Buttons -->
        <div class="flex items-center justify-center gap-4 pt-4">
          <ButtonSave :text="submitLabel" @click="submitForm" />
          <ButtonResetYellow @click="resetForm" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import ButtonBack from '@/components/atoms/buttons/ButtonBack.vue'
import ButtonAdd from '@/components/atoms/buttons/ButtonAdd.vue'
import ButtonSave from '@/components/atoms/buttons/ButtonSave.vue'
import ButtonResetYellow from '@/components/atoms/buttons/ButtonResetYellow.vue'
import InputForm from '@/components/atoms/inputs/InputForm.vue'
import SelectForm from '@/components/atoms/inputs/SelectForm.vue'
import TextareaForm from '@/components/atoms/inputs/TextareaForm.vue'
import NavIcon from '@/components/atoms/icons/NavIcon.vue'
import {
  masterCriteriaStatusOptions,
  type MasterCriteriaStatus,
  type SaveMasterCriteriaInput,
} from "@/services/recruitment/masterCriteria";

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

const buildRowsFromModel = (model?: MasterCriteriaFormModel): FormCriterionRow[] => {
  if (!model || !model.criteria || model.criteria.length === 0) {
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
  if (criteriaRows.value.length === 1) return;
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
      hasValue: row.name.trim().length > 0 || row.description.trim().length > 0 || row.weightInput.trim().length > 0,
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

  if (criteria.some((row) => !row.name || !row.description || !Number.isFinite(row.weight) || row.weight <= 0)) {
    errorMessage.value = "Mỗi tiêu chí cần có tên, mô tả và trọng số hợp lệ lớn hơn 0.";
    return null;
  }

  return { name, description, status: form.status, criteria };
};

const submitForm = () => {
  const payload = buildPayload();
  if (!payload) return;
  errorMessage.value = "";
  emit("submit", payload);
};

watch(() => props.initialValue, resetForm, { immediate: true });
</script>
