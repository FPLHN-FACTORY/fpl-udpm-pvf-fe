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
          Thêm mới Đánh giá học viên
        </h2>

        <button
          type="button"
          class="inline-flex items-center gap-2 self-start rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-500 transition hover:border-slate-300 hover:bg-slate-200 lg:self-auto"
          @click="goBack"
        >
          <NavIcon name="BxChevronLeft" class-name="h-4 w-4" />
          Quay lại
        </button>
      </div>

      <div class="space-y-5 px-4 py-4 md:px-5">
        <div class="space-y-4">
          <div ref="studentSearchRef" class="relative">
            <input
              v-model="form.studentKeyword"
              type="text"
              placeholder="Học viên"
              class="h-10 w-full rounded-md border border-slate-200 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#696cff] focus:ring-2 focus:ring-[#696cff]/10"
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

          <div class="relative">
            <select
              v-model="form.stage"
              class="h-10 w-full appearance-none rounded-md border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-700 outline-none transition focus:border-[#696cff] focus:ring-2 focus:ring-[#696cff]/10"
            >
              <option value="">Giai đoạn</option>
              <option
                v-for="stage in availableStageOptions"
                :key="stage"
                :value="stage"
              >
                {{ stage }}
              </option>
            </select>
            <NavIcon
              name="BxChevronRight"
              class-name="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-slate-400"
            />
          </div>

          <div class="relative">
            <select
              v-model="form.formName"
              class="h-10 w-full appearance-none rounded-md border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-700 outline-none transition focus:border-[#696cff] focus:ring-2 focus:ring-[#696cff]/10"
            >
              <option value="">Form áp dụng</option>
              <option
                v-for="option in availableFormOptions"
                :key="option"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
            <NavIcon
              name="BxChevronRight"
              class-name="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-slate-400"
            />
          </div>

          <div class="relative">
            <select
              v-model="form.reviewer"
              class="h-10 w-full appearance-none rounded-md border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-700 outline-none transition focus:border-[#696cff] focus:ring-2 focus:ring-[#696cff]/10"
            >
              <option value="">Người đánh giá</option>
              <option
                v-for="reviewer in availableReviewerOptions"
                :key="reviewer"
                :value="reviewer"
              >
                {{ reviewer }}
              </option>
            </select>
            <NavIcon
              name="BxChevronRight"
              class-name="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-slate-400"
            />
          </div>

          <div class="relative">
            <select
              v-model="form.status"
              class="h-10 w-full appearance-none rounded-md border border-slate-200 bg-white px-4 pr-10 text-sm text-slate-700 outline-none transition focus:border-[#696cff] focus:ring-2 focus:ring-[#696cff]/10"
            >
              <option value="">Trạng thái</option>
              <option v-for="status in statusOptions" :key="status" :value="status">
                {{ status }}
              </option>
            </select>
            <NavIcon
              name="BxChevronRight"
              class-name="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-slate-400"
            />
          </div>

          <div class="relative">
            <input
              v-model="form.lockedAt"
              type="text"
              placeholder="Thời điểm khóa đánh giá"
              class="h-10 w-full rounded-md border border-slate-200 px-4 pr-11 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#696cff] focus:ring-2 focus:ring-[#696cff]/10"
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
                  <th class="w-[280px] border-b border-slate-200 px-4 py-3 text-center">
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
import { useRouter } from "vue-router";
import NavIcon from "../../atoms/icons/NavIcon.vue";
import {
  createCriteriaTemplate,
  evaluationRows,
  statusOptions,
  studentOptions,
} from "./evaluationData";

const router = useRouter();

const studentSearchRef = ref<HTMLElement | null>(null);
const showStudentDropdown = ref(false);

const form = reactive({
  studentKeyword: "",
  selectedStudentCode: "",
  stage: "",
  formName: "",
  reviewer: "",
  status: "",
  lockedAt: "",
});

const criteriaRows = reactive(
  createCriteriaTemplate.map((criterion) => ({
    ...criterion,
    scoreInput: "",
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

const goBack = () => {
  router.push({ name: "evaluation-student" });
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

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});
</script>
