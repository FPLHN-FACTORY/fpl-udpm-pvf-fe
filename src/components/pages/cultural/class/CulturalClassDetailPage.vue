<template>
  <div class="space-y-6 pb-6">
    <div class="space-y-1">
      <p class="text-sm text-slate-400">
        {{ moduleTitle }}
        <span class="px-2 text-slate-300">/</span>
        <span class="font-medium text-slate-500">{{ pageTitle }}</span>
      </p>
    </div>

    <template v-if="record">
      <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 md:flex-row md:items-center md:justify-between">
          <h2 class="text-lg font-bold text-slate-800">
            Chi tiết Lớp học văn hóa
          </h2>

          <div class="flex flex-wrap items-center gap-3">
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-500 transition hover:border-slate-300 hover:bg-slate-200"
              @click="goBack"
            >
              <CulturalClassIcon name="BxChevronLeft" class-name="h-4 w-4" />
              Quay lại
            </button>
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-500"
              @click="goToEdit"
            >
              Chỉnh sửa
            </button>
          </div>
        </div>

        <div class="px-5 py-5">
          <div class="overflow-hidden rounded-2xl border border-slate-200">
            <div
              v-for="field in detailFields"
              :key="field.label"
              class="grid grid-cols-1 border-b border-slate-200 last:border-b-0 md:grid-cols-[220px_minmax(0,1fr)]"
            >
              <div class="bg-white px-4 py-3 text-sm font-semibold text-slate-700">
                {{ field.label }}
              </div>
              <div class="px-4 py-3 text-sm text-slate-600">
                <span
                  v-if="field.type === 'status'"
                  class="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                  :class="statusClassMap[record.status]"
                >
                  {{ field.value }}
                </span>
                <template v-else>
                  {{ field.value }}
                </template>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="card in summaryCards"
          :key="card.label"
          class="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div class="min-w-0 flex-1">
            <p class="text-[13px] font-semibold leading-5 text-slate-500">
              {{ card.label }}
            </p>
            <div class="mt-3 inline-flex items-center gap-2 whitespace-nowrap">
              <p class="text-3xl font-bold leading-none text-slate-800">
                {{ card.value }}
              </p>
              <span
                v-if="card.hint"
                class="pb-0.5 text-xs font-semibold leading-none whitespace-nowrap"
                :class="card.hintClass"
              >
                {{ card.hint }}
              </span>
            </div>
          </div>

          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
            :class="card.iconWrapperClass"
          >
            <CulturalClassIcon :name="card.icon" class-name="h-6 w-6" />
          </div>
        </article>
      </section>

      <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
          <h3 class="text-lg font-bold text-slate-800">
            Học viên tham gia lớp học
          </h3>

          <div class="flex flex-wrap items-center gap-2">
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-lg bg-[#ff1f1f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#e31b1b]"
              @click="addStudent"
            >
              <CulturalClassIcon name="BxPlus" class-name="h-4 w-4" />
              Thêm mới
            </button>
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-lg bg-lime-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-lime-600"
            >
              <CulturalClassIcon name="BxDownload" class-name="h-4 w-4" />
              Xuất Danh Sách
            </button>
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600"
            >
              <CulturalClassIcon name="BxUpload" class-name="h-4 w-4" />
              Nhập Danh Sách
            </button>
          </div>
        </div>

        <div class="space-y-4 px-5 py-5">
          <div class="flex flex-wrap items-center gap-3">
            <button
              v-for="tab in tabs"
              :key="tab.value"
              type="button"
              class="rounded-lg px-5 py-2 text-sm font-semibold transition"
              :class="
                activeTab === tab.value
                  ? 'bg-[#6c63ff] text-white shadow-sm'
                  : 'border border-slate-200 bg-slate-100 text-slate-500 hover:border-slate-300 hover:bg-slate-200'
              "
              @click="activeTab = tab.value"
            >
              {{ tab.label }}
            </button>
          </div>

          <div v-if="activeTab === 'attendance'" class="max-w-[220px]">
            <select
              v-model="selectedSessionId"
              class="h-10 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-[#6c63ff] focus:ring-2 focus:ring-[#6c63ff]/10"
            >
              <option
                v-for="session in record.sessions"
                :key="session.id"
                :value="session.id"
              >
                {{ session.label }} - {{ session.date }}
              </option>
            </select>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full border-separate border-spacing-0">
              <thead>
                <tr class="text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <th class="w-16 border-y border-slate-200 px-4 py-3">#</th>
                  <th class="border-y border-slate-200 px-4 py-3">Mã học viên</th>
                  <th class="border-y border-slate-200 px-4 py-3">Tên học viên</th>
                  <th
                    v-if="activeTab === 'roster'"
                    class="border-y border-slate-200 px-4 py-3"
                  >
                    Email
                  </th>
                  <th
                    v-if="activeTab === 'roster'"
                    class="border-y border-slate-200 px-4 py-3"
                  >
                    Ngày vào lớp
                  </th>
                  <th
                    v-if="activeTab === 'roster'"
                    class="border-y border-slate-200 px-4 py-3 text-center"
                  >
                    Trạng thái
                  </th>
                  <th
                    v-if="activeTab === 'roster'"
                    class="border-y border-slate-200 px-4 py-3 text-center"
                  >
                    Hành động
                  </th>

                  <th
                    v-if="activeTab === 'attendance'"
                    class="border-y border-slate-200 px-4 py-3 text-center"
                  >
                    Điểm danh
                  </th>
                  <th
                    v-if="activeTab === 'attendance'"
                    class="border-y border-slate-200 px-4 py-3"
                  >
                    Ghi chú
                  </th>

                  <th
                    v-if="activeTab === 'scores'"
                    class="border-y border-slate-200 px-4 py-3 text-center"
                  >
                    Đầu điểm số 1
                  </th>
                  <th
                    v-if="activeTab === 'scores'"
                    class="border-y border-slate-200 px-4 py-3 text-center"
                  >
                    Đầu điểm số 2
                  </th>
                  <th
                    v-if="activeTab === 'scores'"
                    class="border-y border-slate-200 px-4 py-3 text-center"
                  >
                    Đầu điểm số 3
                  </th>
                  <th
                    v-if="activeTab === 'scores'"
                    class="border-y border-slate-200 px-4 py-3 text-center"
                  >
                    Trung bình
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="(student, index) in record.students"
                  :key="student.id"
                  class="text-sm text-slate-600 transition hover:bg-slate-50/70"
                >
                  <td class="border-b border-slate-100 px-4 py-3 text-[#6c63ff]">
                    {{ index + 1 }}
                  </td>
                  <td class="border-b border-slate-100 px-4 py-3">
                    {{ student.code }}
                  </td>
                  <td class="border-b border-slate-100 px-4 py-3 font-medium text-slate-700">
                    {{ student.name }}
                  </td>

                  <template v-if="activeTab === 'roster'">
                    <td class="border-b border-slate-100 px-4 py-3">
                      {{ student.email }}
                    </td>
                    <td class="border-b border-slate-100 px-4 py-3">
                      {{ student.joinedAt }}
                    </td>
                    <td class="border-b border-slate-100 px-4 py-3 text-center">
                      <span
                        class="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                        :class="studentStatusClassMap[student.status]"
                      >
                        {{ student.statusLabel }}
                      </span>
                    </td>
                    <td class="border-b border-slate-100 px-4 py-3">
                      <div class="flex items-center justify-center gap-3 text-slate-400">
                        <button
                          type="button"
                          class="transition hover:text-[#6c63ff]"
                          title="Xem học viên"
                          aria-label="Xem học viên"
                        >
                          <CulturalClassIcon name="BxShow" class-name="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          class="transition hover:text-red-500"
                          title="Xóa khỏi lớp"
                          aria-label="Xóa khỏi lớp"
                          @click="removeStudent(student.id)"
                        >
                          <CulturalClassIcon name="BxTrash" class-name="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </template>

                  <template v-if="activeTab === 'attendance'">
                    <td class="border-b border-slate-100 px-4 py-3 text-center">
                      <span
                        class="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                        :class="
                          getAttendanceForStudent(student).present
                            ? 'bg-emerald-100 text-emerald-600'
                            : 'bg-rose-100 text-rose-600'
                        "
                      >
                        {{ getAttendanceForStudent(student).present ? "Có mặt" : "Vắng" }}
                      </span>
                    </td>
                    <td class="border-b border-slate-100 px-4 py-3">
                      {{ getAttendanceForStudent(student).note }}
                    </td>
                  </template>

                  <template v-if="activeTab === 'scores'">
                    <td class="border-b border-slate-100 px-4 py-3 text-center">
                      {{ student.scores.score1.toFixed(1) }}
                    </td>
                    <td class="border-b border-slate-100 px-4 py-3 text-center">
                      {{ student.scores.score2.toFixed(1) }}
                    </td>
                    <td class="border-b border-slate-100 px-4 py-3 text-center">
                      {{ student.scores.score3.toFixed(1) }}
                    </td>
                    <td class="border-b border-slate-100 px-4 py-3 text-center font-semibold text-slate-700">
                      {{ student.scores.average.toFixed(1) }}
                    </td>
                  </template>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </template>

    <section
      v-else
      class="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center text-sm text-slate-400 shadow-sm"
    >
      Không tìm thấy lớp học văn hóa phù hợp.
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import CulturalClassIcon from "./CulturalClassIcon.vue";
import {
  culturalClassService,
  type CulturalClassRecord,
  type CulturalClassStatus,
  type CulturalClassStudentRecord,
  type CulturalStudentStatus,
} from "../../../../services/cultural/culturalClass";

type DetailTab = "roster" | "attendance" | "scores";

const moduleTitle = "Quản lý học tập văn hóa";
const pageTitle = "Lớp học văn hóa";

const route = useRoute();
const router = useRouter();

const record = ref<CulturalClassRecord>();
const activeTab = ref<DetailTab>("roster");
const selectedSessionId = ref<number>(0);

const tabs = [
  { value: "roster", label: "Danh sách" },
  { value: "attendance", label: "Điểm danh" },
  { value: "scores", label: "Bảng điểm" },
] as const;

const statusClassMap: Record<CulturalClassStatus, string> = {
  ACTIVE: "bg-emerald-100 text-emerald-600",
  PAUSED: "bg-amber-100 text-amber-600",
};

const studentStatusClassMap: Record<CulturalStudentStatus, string> = {
  ACTIVE: "bg-emerald-100 text-emerald-600",
  BREAK: "bg-amber-100 text-amber-600",
};

const detailFields = computed(() => {
  if (!record.value) {
    return [];
  }

  return [
    { label: "Mã lớp học", value: record.value.code, type: "text" },
    { label: "Tên lớp học", value: record.value.name, type: "text" },
    { label: "Khối lớp", value: record.value.gradeName, type: "text" },
    { label: "Năm học", value: record.value.schoolYear, type: "text" },
    { label: "Giáo viên chủ nhiệm", value: record.value.homeroomTeacher, type: "text" },
    { label: "Thời gian tạo", value: record.value.createdAt, type: "text" },
    { label: "Thời gian cập nhật", value: record.value.updatedAt, type: "text" },
    { label: "Trạng thái", value: record.value.status === "ACTIVE" ? "Đang hoạt động" : "Tạm ngưng", type: "status" },
  ];
});

const summaryCards = computed(() => {
  if (!record.value) {
    return [];
  }

  return [
    {
      label: "Tổng học viên lớp",
      value: record.value.totalStudents,
      hint: "",
      hintClass: "",
      icon: "BxPanelStats",
      iconWrapperClass: "bg-indigo-50 text-indigo-500",
    },
    {
      label: "Điểm trung bình lớp",
      value: record.value.averageScore.toFixed(1),
      hint: record.value.averageScore >= 8 ? "(Tốt)" : "(Khá)",
      hintClass: "text-emerald-500",
      icon: "BxCalendarCheck",
      iconWrapperClass: "bg-rose-50 text-rose-500",
    },
    {
      label: "Tỷ lệ chuyên cần",
      value: `${record.value.attendanceRate}%`,
      hint: `(${record.value.completedSessions}/${record.value.totalSessions})`,
      hintClass: "text-lime-500",
      icon: "BxLayersStacked",
      iconWrapperClass: "bg-amber-50 text-amber-500",
    },
    {
      label: "Số buổi đã học / tổng buổi",
      value: `${record.value.completedSessions}/${record.value.totalSessions}`,
      hint: `${Math.round((record.value.completedSessions / record.value.totalSessions) * 100)}%`,
      hintClass: "text-lime-500",
      icon: "BxChevronStep",
      iconWrapperClass: "bg-yellow-50 text-yellow-500",
    },
  ];
});

const loadRecord = async () => {
  const id = Number(route.params.id);
  if (!Number.isFinite(id)) {
    record.value = undefined;
    return;
  }

  const response = await culturalClassService.getById(id);
  record.value = response.data;
  selectedSessionId.value = response.data?.sessions[0]?.id ?? 0;
};

const getAttendanceForStudent = (student: CulturalClassStudentRecord) =>
  student.attendance.find((attendance) => attendance.sessionId === selectedSessionId.value) ?? {
    sessionId: selectedSessionId.value,
    present: false,
    note: "Chưa có dữ liệu",
  };

const goBack = () => {
  router.push({ name: "cultural-class" });
};

const goToEdit = () => {
  if (!record.value) {
    return;
  }

  router.push({ name: "cultural-class-edit", params: { id: record.value.id } });
};

const addStudent = async () => {
  if (!record.value) {
    return;
  }

  const response = await culturalClassService.addMockStudent(record.value.id);
  if (response.data) {
    record.value = response.data;
  }
};

const removeStudent = (studentId: number) => {
  if (!record.value) {
    return;
  }

  record.value.students = record.value.students.filter((student) => student.id !== studentId);
  record.value.totalStudents = record.value.students.length;
};

onMounted(async () => {
  await loadRecord();
});

watch(
  () => route.params.id,
  async () => {
    await loadRecord();
  },
);
</script>
