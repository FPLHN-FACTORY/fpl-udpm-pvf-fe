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
          Chỉnh sửa giai đoạn đánh giá
        </h2>

        <div class="flex flex-wrap items-center gap-3">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-500 transition hover:border-slate-300 hover:bg-slate-200"
            @click="goBack"
          >
            <EvaluationIcon name="BxChevronLeft" class-name="h-4 w-4" />
            Quay Lại
          </button>

          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="!canSubmit"
            @click="handleSubmit"
          >
            <EvaluationIcon name="BxEditAlt" class-name="h-4 w-4" />
            Chỉnh Sửa
          </button>
        </div>
      </div>

      <div v-if="record" class="space-y-5 px-4 py-4 md:px-5">
        <div class="space-y-4">
          <div
            ref="studentSearchRef"
            class="relative rounded-md border border-slate-200 px-3 py-2 transition focus-within:border-[#696cff] focus-within:ring-2 focus-within:ring-[#696cff]/10"
          >
            <p class="text-[11px] text-slate-400">Học viên</p>
            <input
              v-model="form.studentKeyword"
              type="text"
              class="mt-1 w-full border-none bg-transparent p-0 text-sm text-slate-700 outline-none placeholder:text-slate-300"
              @focus="showStudentDropdown = true"
              @input="handleStudentInput"
            />

            <div
              v-if="showStudentDropdown"
              class="absolute left-0 right-0 top-[calc(100%+6px)] z-20 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg"
            >
              <div
                v-if="filteredStudentOptions.length === 0"
                class="px-4 py-3 text-sm text-slate-400"
              >
                Không tìm thấy học viên phù hợp.
              </div>

              <button
                v-for="student in filteredStudentOptions"
                :key="student.code"
                type="button"
                class="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-slate-600 transition hover:bg-slate-50"
                @mousedown.prevent="selectStudent(student.code)"
              >
                <span class="font-medium text-slate-700">{{ student.name }}</span>
                <span class="text-slate-400">{{ student.code }}</span>
              </button>
            </div>
          </div>

          <div class="relative rounded-md border border-slate-200 px-3 py-2 transition focus-within:border-[#696cff] focus-within:ring-2 focus-within:ring-[#696cff]/10">
            <p class="text-[11px] text-slate-400">Giai đoạn</p>
            <select
              v-model="form.stage"
              class="mt-1 w-full appearance-none border-none bg-transparent p-0 pr-8 text-sm text-slate-700 outline-none"
            >
              <option value="">Chọn giai đoạn</option>
              <option
                v-for="stage in availableStageOptions"
                :key="stage"
                :value="stage"
              >
                {{ stage }}
              </option>
            </select>
            <EvaluationIcon
              name="BxChevronRight"
              class-name="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-slate-400"
            />
          </div>

          <div class="relative rounded-md border border-slate-200 px-3 py-2 transition focus-within:border-[#696cff] focus-within:ring-2 focus-within:ring-[#696cff]/10">
            <p class="text-[11px] text-slate-400">Form áp dụng</p>
            <select
              v-model="form.formName"
              class="mt-1 w-full appearance-none border-none bg-transparent p-0 pr-8 text-sm text-slate-700 outline-none"
            >
              <option value="">Chọn form</option>
              <option
                v-for="option in availableFormOptions"
                :key="option"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
            <EvaluationIcon
              name="BxChevronRight"
              class-name="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-slate-400"
            />
          </div>

          <div class="relative rounded-md border border-slate-200 px-3 py-2 transition focus-within:border-[#696cff] focus-within:ring-2 focus-within:ring-[#696cff]/10">
            <p class="text-[11px] text-slate-400">Người đánh giá</p>
            <select
              v-model="form.reviewer"
              class="mt-1 w-full appearance-none border-none bg-transparent p-0 pr-8 text-sm text-slate-700 outline-none"
            >
              <option value="">Chọn người đánh giá</option>
              <option
                v-for="reviewer in availableReviewerOptions"
                :key="reviewer"
                :value="reviewer"
              >
                {{ reviewer }}
              </option>
            </select>
            <EvaluationIcon
              name="BxChevronRight"
              class-name="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-slate-400"
            />
          </div>

          <div class="rounded-md border border-slate-200 px-3 py-2 transition focus-within:border-[#696cff] focus-within:ring-2 focus-within:ring-[#696cff]/10">
            <p class="text-[11px] text-slate-400">Tổng điểm (nếu có)</p>
            <input
              v-model="form.totalScore"
              type="text"
              class="mt-1 w-full border-none bg-transparent p-0 text-sm text-slate-700 outline-none placeholder:text-slate-300"
              placeholder="Nếu để trống sẽ tính theo bảng tiêu chí"
            />
          </div>

          <div class="rounded-md border border-slate-200 px-3 py-2 transition focus-within:border-[#696cff] focus-within:ring-2 focus-within:ring-[#696cff]/10">
            <p class="text-[11px] text-slate-400">Nhận xét tổng quan</p>
            <textarea
              v-model="form.overview"
              rows="3"
              class="mt-1 w-full resize-none border-none bg-transparent p-0 text-sm text-slate-700 outline-none placeholder:text-slate-300"
            />
          </div>

          <div class="relative rounded-md border border-slate-200 px-3 py-2 transition focus-within:border-[#696cff] focus-within:ring-2 focus-within:ring-[#696cff]/10">
            <p class="text-[11px] text-slate-400">Trạng thái</p>
            <select
              v-model="form.status"
              class="mt-1 w-full appearance-none border-none bg-transparent p-0 pr-8 text-sm text-slate-700 outline-none"
            >
              <option value="">Chọn trạng thái</option>
              <option v-for="status in statusOptions" :key="status" :value="status">
                {{ status }}
              </option>
            </select>
            <EvaluationIcon
              name="BxChevronRight"
              class-name="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-slate-400"
            />
          </div>

          <div class="relative rounded-md border border-slate-200 px-3 py-2 transition focus-within:border-[#696cff] focus-within:ring-2 focus-within:ring-[#696cff]/10">
            <p class="text-[11px] text-slate-400">Thời điểm khóa đánh giá</p>
            <input
              v-model="form.lockedAt"
              type="text"
              class="mt-1 w-full border-none bg-transparent p-0 pr-8 text-sm text-slate-700 outline-none placeholder:text-slate-300"
            />
            <span
              class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                class="h-4 w-4"
              >
                <rect x="3.75" y="5.75" width="16.5" height="14.5" rx="2" />
                <path d="M7.5 3.75v4M16.5 3.75v4M3.75 9.5h16.5" />
              </svg>
            </span>
          </div>
        </div>

        <div class="overflow-hidden rounded-xl border border-slate-200">
          <div class="border-b border-slate-200 px-4 py-4">
            <h3 class="text-lg font-bold text-slate-800">
              Bảng chấm điểm theo tiêu chí
            </h3>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full border-separate border-spacing-0">
              <thead>
                <tr
                  class="text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400"
                >
                  <th class="w-16 border-b border-slate-200 px-4 py-3">#</th>
                  <th class="border-b border-slate-200 px-4 py-3">Tiêu chí</th>
                  <th class="w-36 border-b border-slate-200 px-4 py-3 text-center">
                    Trọng số
                  </th>
                  <th
                    class="w-[280px] border-b border-slate-200 px-4 py-3 text-center"
                  >
                    Điểm
                  </th>
                  <th class="w-40 border-b border-slate-200 px-4 py-3 text-center">
                    Điểm quy đổi
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="criterion in criteriaRows"
                  :key="criterion.id"
                  class="text-sm text-slate-600"
                >
                  <td class="border-b border-slate-100 px-4 py-3 text-[#6366f1]">
                    {{ criterion.id }}
                  </td>
                  <td class="border-b border-slate-100 px-4 py-3">
                    {{ criterion.name }}
                  </td>
                  <td class="border-b border-slate-100 px-4 py-3 text-center">
                    {{ criterion.weight }}%
                  </td>
                  <td class="border-b border-slate-100 px-4 py-3">
                    <input
                      v-model="criterion.scoreInput"
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      class="h-9 w-full rounded-md border border-slate-200 px-3 text-sm text-slate-700 outline-none transition focus:border-[#696cff] focus:ring-2 focus:ring-[#696cff]/10"
                    />
                  </td>
                  <td class="border-b border-slate-100 px-4 py-3 text-center">
                    {{ getConvertedDisplay(criterion.weight, criterion.scoreInput) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p
          v-if="submitError"
          class="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-500"
        >
          {{ submitError }}
        </p>
      </div>

      <div v-else class="px-5 py-14 text-center">
        <p class="text-base font-semibold text-slate-700">
          Không tìm thấy bản đánh giá cần chỉnh sửa.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import EvaluationIcon from "./EvaluationIcon.vue";
import {
  type EvaluationCriterion,
  type EvaluationStatus,
  evaluationRows,
  getEvaluationById,
  statusOptions,
  studentOptions,
  updateEvaluationById,
} from "./evaluationData";

const route = useRoute();
const router = useRouter();

const rawId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
const recordId = Number(rawId);
const record = getEvaluationById(recordId);

const studentSearchRef = ref<HTMLElement | null>(null);
const showStudentDropdown = ref(false);
const submitError = ref("");

const form = reactive({
  studentKeyword: record ? `${record.studentName} - ${record.studentCode}` : "",
  selectedStudentCode: record?.studentCode ?? "",
  stage: record?.stage ?? "",
  formName: record?.formName ?? "",
  reviewer: record?.reviewer ?? "",
  totalScore: record?.totalScore.toFixed(1) ?? "",
  overview: record?.overview ?? "",
  status: record?.status ?? "",
  lockedAt: record?.lockedAt ?? "",
});

const criteriaRows = reactive(
  (record?.criteria ?? []).map((criterion) => ({
    id: criterion.id,
    name: criterion.name,
    weight: criterion.weight,
    scoreInput: criterion.score?.toString() ?? "",
  })),
);

const normalizedKeyword = computed(() => form.studentKeyword.trim().toLowerCase());

const filteredStudentOptions = computed(() => {
  if (normalizedKeyword.value.length === 0) {
    return studentOptions.slice(0, 8);
  }

  return studentOptions.filter((student) => {
    const searchableText = `${student.name} ${student.code}`.toLowerCase();
    return searchableText.includes(normalizedKeyword.value);
  });
});

const selectedStudentRows = computed(() =>
  evaluationRows.filter((row) => row.studentCode === form.selectedStudentCode),
);

const rowsForStageFilter = computed(() => {
  if (!form.selectedStudentCode) {
    return evaluationRows;
  }

  return selectedStudentRows.value;
});

const rowsForFormFilter = computed(() => {
  const sourceRows = rowsForStageFilter.value;

  if (!form.stage) {
    return sourceRows;
  }

  return sourceRows.filter((row) => row.stage === form.stage);
});

const rowsForReviewerFilter = computed(() => {
  const sourceRows = rowsForFormFilter.value;

  if (!form.formName) {
    return sourceRows;
  }

  return sourceRows.filter((row) => row.formName === form.formName);
});

const availableStageOptions = computed(() =>
  Array.from(new Set(rowsForStageFilter.value.map((row) => row.stage))),
);

const availableFormOptions = computed(() =>
  Array.from(new Set(rowsForFormFilter.value.map((row) => row.formName))),
);

const availableReviewerOptions = computed(() =>
  Array.from(new Set(rowsForReviewerFilter.value.map((row) => row.reviewer))),
);

const calculatedTotalScore = computed(() => {
  const total = criteriaRows.reduce((sum, criterion) => {
    const numericScore = Number(criterion.scoreInput);
    const hasScore =
      criterion.scoreInput.trim().length > 0 && Number.isFinite(numericScore);

    if (!hasScore) {
      return sum;
    }

    const normalizedScore = Math.min(10, Math.max(0, numericScore));
    return sum + (normalizedScore * criterion.weight) / 100;
  }, 0);

  return Number(total.toFixed(1));
});

const resolvedTotalScore = computed(() => {
  const rawScore = form.totalScore.trim();

  if (rawScore.length === 0) {
    return calculatedTotalScore.value;
  }

  const numericScore = Number(rawScore);

  if (!Number.isFinite(numericScore)) {
    return Number.NaN;
  }

  return Math.min(10, Math.max(0, numericScore));
});

const isEvaluationStatus = (value: string): value is EvaluationStatus =>
  statusOptions.includes(value as EvaluationStatus);

const canSubmit = computed(
  () =>
    Boolean(record) &&
    form.selectedStudentCode.trim().length > 0 &&
    form.stage.trim().length > 0 &&
    form.formName.trim().length > 0 &&
    form.reviewer.trim().length > 0 &&
    isEvaluationStatus(form.status) &&
    Number.isFinite(resolvedTotalScore.value),
);

const goBack = () => {
  if (!record) {
    router.push({ name: "evaluation-student" });
    return;
  }

  router.push({
    name: "evaluation-student-detail",
    params: { id: record.id },
  });
};

const getConvertedDisplay = (weight: number, scoreInput: string) => {
  const numericScore = Number(scoreInput);
  const isValidScore =
    scoreInput.trim().length > 0 && Number.isFinite(numericScore);

  if (!isValidScore) {
    return "-";
  }

  const normalizedScore = Math.min(10, Math.max(0, numericScore));
  const convertedScore = (normalizedScore * weight) / 100;
  return convertedScore.toFixed(2);
};

const buildCriteriaPayload = (): EvaluationCriterion[] =>
  criteriaRows.map((criterion) => {
    const numericScore = Number(criterion.scoreInput);
    const hasScore =
      criterion.scoreInput.trim().length > 0 && Number.isFinite(numericScore);
    const normalizedScore = hasScore
      ? Math.min(10, Math.max(0, numericScore))
      : null;

    return {
      id: criterion.id,
      name: criterion.name,
      weight: criterion.weight,
      score:
        normalizedScore === null ? null : Number(normalizedScore.toFixed(1)),
      convertedScore:
        normalizedScore === null
          ? 0
          : Number(((normalizedScore * criterion.weight) / 100).toFixed(2)),
    };
  });

const handleSubmit = () => {
  submitError.value = "";

  if (!record) {
    submitError.value = "Không tìm thấy bản đánh giá để cập nhật.";
    return;
  }

  if (!form.selectedStudentCode.trim()) {
    submitError.value = "Vui lòng chọn học viên.";
    return;
  }

  if (!form.stage.trim() || !form.formName.trim() || !form.reviewer.trim()) {
    submitError.value = "Vui lòng điền đầy đủ giai đoạn, form và người đánh giá.";
    return;
  }

  if (!isEvaluationStatus(form.status)) {
    submitError.value = "Vui lòng chọn trạng thái hợp lệ.";
    return;
  }

  if (!Number.isFinite(resolvedTotalScore.value)) {
    submitError.value = "Tổng điểm không hợp lệ.";
    return;
  }

  const totalScore = Number(resolvedTotalScore.value.toFixed(1));

  updateEvaluationById(record.id, {
    studentCode: form.selectedStudentCode,
    stage: form.stage,
    formName: form.formName,
    reviewer: form.reviewer,
    totalScore,
    overview: form.overview,
    lockedAt: form.lockedAt,
    status: form.status,
    criteria: buildCriteriaPayload(),
  });

  form.totalScore = totalScore.toFixed(1);
  showStudentDropdown.value = false;

  router.push({
    name: "evaluation-student-detail",
    params: { id: record.id },
  });
};

const selectStudent = (studentCode: string) => {
  const student = studentOptions.find((option) => option.code === studentCode);

  if (!student) {
    return;
  }

  form.selectedStudentCode = student.code;
  form.studentKeyword = `${student.name} - ${student.code}`;
  showStudentDropdown.value = false;
};

const handleStudentInput = () => {
  showStudentDropdown.value = true;

  const matchedStudent = studentOptions.find(
    (student) => `${student.name} - ${student.code}` === form.studentKeyword,
  );

  form.selectedStudentCode = matchedStudent?.code ?? "";
};

const handleClickOutside = (event: MouseEvent) => {
  if (!studentSearchRef.value) {
    return;
  }

  const target = event.target;
  if (target instanceof Node && !studentSearchRef.value.contains(target)) {
    showStudentDropdown.value = false;
  }
};

watch(availableStageOptions, (options) => {
  if (form.stage && !options.includes(form.stage)) {
    form.stage = "";
  }
});

watch(availableFormOptions, (options) => {
  if (form.formName && !options.includes(form.formName)) {
    form.formName = "";
  }
});

watch(availableReviewerOptions, (options) => {
  if (form.reviewer && !options.includes(form.reviewer)) {
    form.reviewer = "";
  }
});

watch(
  () => [
    form.studentKeyword,
    form.stage,
    form.formName,
    form.reviewer,
    form.totalScore,
    form.overview,
    form.status,
    form.lockedAt,
    criteriaRows.map((criterion) => criterion.scoreInput).join("|"),
  ],
  () => {
    submitError.value = "";
  },
);

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});
</script>
