<template>
  <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div class="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 md:flex-row md:items-center md:justify-between">
      <h2 class="text-lg font-bold text-slate-800">
        {{ title }}
      </h2>

      <button
        type="button"
        class="inline-flex items-center gap-2 self-start rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-500 transition hover:border-slate-300 hover:bg-slate-200 md:self-auto"
        @click="goBack"
      >
        <CulturalClassIcon name="BxChevronLeft" class-name="h-4 w-4" />
        Quay lại
      </button>
    </div>

    <form class="space-y-5 px-5 py-5" @submit.prevent="handleSubmit">
      <div class="grid grid-cols-1 gap-4">
        <label class="space-y-2">
          <span class="text-sm font-medium text-slate-600">Tên lớp học</span>
          <input
            v-model="form.name"
            type="text"
            placeholder="Nhập tên lớp học"
            class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#696cff] focus:ring-2 focus:ring-[#696cff]/10"
          />
        </label>

        <label class="space-y-2">
          <span class="text-sm font-medium text-slate-600">Khối lớp</span>
          <select
            v-model="form.gradeName"
            class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#696cff] focus:ring-2 focus:ring-[#696cff]/10"
          >
            <option value="">Chọn khối lớp</option>
            <option v-for="grade in gradeOptions" :key="grade" :value="grade">
              {{ grade }}
            </option>
          </select>
        </label>

        <label class="space-y-2">
          <span class="text-sm font-medium text-slate-600">Năm học</span>
          <select
            v-model="form.schoolYear"
            class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#696cff] focus:ring-2 focus:ring-[#696cff]/10"
          >
            <option value="">Chọn năm học</option>
            <option v-for="year in schoolYearOptions" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </label>

        <label class="space-y-2">
          <span class="text-sm font-medium text-slate-600">Giáo viên chủ nhiệm</span>
          <select
            v-model="form.homeroomTeacher"
            class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#696cff] focus:ring-2 focus:ring-[#696cff]/10"
          >
            <option value="">Chọn giáo viên chủ nhiệm</option>
            <option
              v-for="teacher in teacherOptions"
              :key="teacher"
              :value="teacher"
            >
              {{ teacher }}
            </option>
          </select>
        </label>

        <label class="space-y-2">
          <span class="text-sm font-medium text-slate-600">Trạng thái</span>
          <select
            v-model="form.status"
            class="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#696cff] focus:ring-2 focus:ring-[#696cff]/10"
          >
            <option
              v-for="status in statusOptions"
              :key="status.value"
              :value="status.value"
            >
              {{ status.label }}
            </option>
          </select>
        </label>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          type="submit"
          class="inline-flex items-center justify-center rounded-lg bg-[#ff1f1f] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e31b1b] disabled:cursor-not-allowed disabled:opacity-60"
          :disabled="!canSubmit"
        >
          {{ submitLabel }}
        </button>
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-lg bg-amber-400 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-500"
          @click="resetForm"
        >
          Đặt lại
        </button>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import { useRouter } from "vue-router";
import CulturalClassIcon from "./CulturalClassIcon.vue";
import {
  culturalClassGradeOptions,
  culturalClassSchoolYearOptions,
  culturalClassStatusOptions,
  culturalClassTeacherOptions,
  type CulturalClassStatus,
  type SaveCulturalClassInput,
} from "../../../../services/cultural/culturalClass";

interface Props {
  title: string;
  submitLabel: string;
  initialValues?: Partial<SaveCulturalClassInput>;
}

const props = withDefaults(defineProps<Props>(), {
  initialValues: () => ({}),
});

const emit = defineEmits<{
  submit: [payload: SaveCulturalClassInput];
}>();

const router = useRouter();

const buildDefaultForm = (): SaveCulturalClassInput => ({
  name: props.initialValues.name ?? "",
  gradeName: props.initialValues.gradeName ?? "",
  schoolYear: props.initialValues.schoolYear ?? "",
  homeroomTeacher: props.initialValues.homeroomTeacher ?? "",
  status: props.initialValues.status ?? "ACTIVE",
});

const form = reactive<SaveCulturalClassInput>(buildDefaultForm());

watch(
  () => props.initialValues,
  () => {
    Object.assign(form, buildDefaultForm());
  },
  { deep: true },
);

const canSubmit = computed(
  () =>
    form.name.trim().length > 0 &&
    form.gradeName.length > 0 &&
    form.schoolYear.length > 0 &&
    form.homeroomTeacher.length > 0,
);

const gradeOptions = culturalClassGradeOptions;
const schoolYearOptions = culturalClassSchoolYearOptions;
const teacherOptions = culturalClassTeacherOptions;
const statusOptions = culturalClassStatusOptions as ReadonlyArray<{
  value: CulturalClassStatus;
  label: string;
}>;

const goBack = () => {
  router.back();
};

const resetForm = () => {
  Object.assign(form, buildDefaultForm());
};

const handleSubmit = () => {
  if (!canSubmit.value) {
    return;
  }

  emit("submit", {
    name: form.name.trim(),
    gradeName: form.gradeName,
    schoolYear: form.schoolYear,
    homeroomTeacher: form.homeroomTeacher,
    status: form.status,
  });
};
</script>
