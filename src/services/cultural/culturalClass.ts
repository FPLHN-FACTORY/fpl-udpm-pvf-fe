export type CulturalClassStatus = "ACTIVE" | "PAUSED";
export type CulturalStudentStatus = "ACTIVE" | "BREAK";

export interface CulturalClassSessionRecord {
  id: number;
  label: string;
  date: string;
  topic: string;
}

export interface CulturalStudentAttendanceRecord {
  sessionId: number;
  present: boolean;
  note: string;
}

export interface CulturalStudentScoreRecord {
  score1: number;
  score2: number;
  score3: number;
  average: number;
}

export interface CulturalClassStudentRecord {
  id: number;
  code: string;
  name: string;
  email: string;
  joinedAt: string;
  status: CulturalStudentStatus;
  statusLabel: string;
  attendance: CulturalStudentAttendanceRecord[];
  scores: CulturalStudentScoreRecord;
}

export interface CulturalClassRecord {
  id: number;
  code: string;
  name: string;
  gradeName: string;
  schoolYear: string;
  homeroomTeacher: string;
  status: CulturalClassStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  totalStudents: number;
  averageScore: number;
  attendanceRate: number;
  completedSessions: number;
  totalSessions: number;
  students: CulturalClassStudentRecord[];
  sessions: CulturalClassSessionRecord[];
}

export interface CulturalClassListItem {
  id: number;
  order: number;
  code: string;
  name: string;
  gradeName: string;
  schoolYear: string;
  homeroomTeacher: string;
  status: CulturalClassStatus;
  statusLabel: string;
  deletedAt: string | null;
}

export interface CulturalClassSummary {
  total: number;
  active: number;
  paused: number;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface CulturalClassListFilters {
  keyword?: string;
  schoolYear?: string;
  status?: "all" | CulturalClassStatus;
  page?: number;
  pageSize?: number;
  deletedDate?: string;
}

export interface CulturalClassListResponse {
  data: CulturalClassListItem[];
  meta: PaginationMeta;
  summary: CulturalClassSummary;
}

export interface SaveCulturalClassInput {
  name: string;
  gradeName: string;
  schoolYear: string;
  homeroomTeacher: string;
  status: CulturalClassStatus;
}

const DELAY = 180;
const DEFAULT_PAGE_SIZE = 5;

const gradeOptions = ["Khối 10", "Khối 11", "Khối 12"] as const;
const schoolYearOptions = ["2024-2025", "2025-2026", "2026-2027"] as const;
const teacherOptions = [
  "Nguyễn Đức Anh",
  "Trần Minh Khôi",
  "Lê Hoàng Nam",
  "Phạm Gia Hưng",
  "Đỗ Quang Huy",
] as const;

const classTitleSeeds = [
  "Kỹ thuật bóng đá cơ bản",
  "Nền tảng chiến thuật thi đấu",
  "Phát triển thể chất tổng hợp",
  "Hoàn thiện kỹ năng phối hợp",
  "Rèn luyện phản xạ và xử lý bóng",
] as const;

const studentNameSeeds = [
  "Nguyễn Văn An",
  "Trần Minh Khôi",
  "Phạm Gia Hưng",
  "Lê Hoàng Nam",
  "Đỗ Quang Huy",
  "Nguyễn Đức Anh",
  "Hoàng Gia Bảo",
  "Phan Tuấn Kiệt",
  "Võ Đức Tài",
  "Lương Nhật Minh",
  "Đoàn Thành Vinh",
  "Bùi Khánh Nam",
  "Trịnh Quang Huy",
  "Lê Ngọc Anh",
  "Trần Gia Hân",
  "Nguyễn Mạnh Dũng",
  "Phạm Quốc Bảo",
  "Huỳnh Minh Quân",
  "Đặng Thiên Phúc",
  "Trương Thanh Tùng",
  "Đinh Hải Đăng",
] as const;

const statusLabelMap: Record<CulturalClassStatus, string> = {
  ACTIVE: "Đang hoạt động",
  PAUSED: "Tạm ngưng",
};

const studentStatusLabelMap: Record<CulturalStudentStatus, string> = {
  ACTIVE: "Đang học",
  BREAK: "Tạm nghỉ",
};

export const culturalClassStatusOptions = [
  { value: "ACTIVE", label: "Đang hoạt động" },
  { value: "PAUSED", label: "Tạm ngưng" },
] as const;

export const culturalClassStudentStatusOptions = [
  { value: "ACTIVE", label: "Đang học" },
  { value: "BREAK", label: "Tạm nghỉ" },
] as const;

export const culturalClassGradeOptions = [...gradeOptions];
export const culturalClassSchoolYearOptions = [...schoolYearOptions];
export const culturalClassTeacherOptions = [...teacherOptions];

const delay = (ms = DELAY) => new Promise((resolve) => setTimeout(resolve, ms));

const padNumber = (value: number) => String(value).padStart(2, "0");

const normalizeText = (value: string) => value.trim().toLowerCase();

const buildTimestamp = () => {
  const now = new Date();
  return `${now.getFullYear()}-${padNumber(now.getMonth() + 1)}-${padNumber(now.getDate())} ${padNumber(now.getHours())}:${padNumber(now.getMinutes())}:${padNumber(now.getSeconds())}`;
};

const buildDate = (year: number, month: number, day: number, hour = 8, minute = 0) =>
  `${year}-${padNumber(month)}-${padNumber(day)} ${padNumber(hour)}:${padNumber(minute)}:00`;

const buildClassCode = (gradeName: string, id: number) => {
  const gradeMap: Record<string, string> = {
    "Khối 10": "U10",
    "Khối 11": "U11",
    "Khối 12": "U12",
  };

  const gradeCode = gradeMap[gradeName] ?? "VH";
  const suffix = String.fromCharCode(65 + ((id - 1) % 4));
  return `Lớp ${gradeCode}-${suffix}`;
};

const buildSessions = (classId: number): CulturalClassSessionRecord[] =>
  Array.from({ length: 22 }, (_, index) => ({
    id: classId * 100 + index + 1,
    label: `Buổi ${padNumber(index + 1)}`,
    date: `2025-0${((index % 5) + 1)}-${padNumber((index % 26) + 1)}`,
    topic: `Chuyên đề ${index + 1}`,
  }));

const buildScores = (classId: number, studentIndex: number): CulturalStudentScoreRecord => {
  const score1 = Number((7 + ((classId + studentIndex) % 4) * 0.5).toFixed(1));
  const score2 = Number((7.5 + ((classId + studentIndex + 1) % 4) * 0.4).toFixed(1));
  const score3 = Number((8 + ((classId + studentIndex + 2) % 4) * 0.3).toFixed(1));
  const average = Number(((score1 + score2 + score3) / 3).toFixed(1));

  return {
    score1,
    score2,
    score3,
    average,
  };
};

const buildAttendance = (
  classId: number,
  studentIndex: number,
  sessions: CulturalClassSessionRecord[],
): CulturalStudentAttendanceRecord[] =>
  sessions.map((session, sessionIndex) => {
    const present = (classId + studentIndex + sessionIndex) % 17 !== 0;

    return {
      sessionId: session.id,
      present,
      note: present ? "Đúng giờ" : "Vắng có phép",
    };
  });

const buildStudents = (classId: number, count: number, sessions: CulturalClassSessionRecord[]) =>
  Array.from({ length: count }, (_, index) => {
    const scores = buildScores(classId, index);
    const attendance = buildAttendance(classId, index, sessions);
    const status: CulturalStudentStatus = index === count - 1 && classId % 5 === 0 ? "BREAK" : "ACTIVE";

    return {
      id: classId * 1000 + index + 1,
      code: `HV${padNumber(classId)}${padNumber(index + 1)}`,
      name: studentNameSeeds[index % studentNameSeeds.length],
      email: `${normalizeText(studentNameSeeds[index % studentNameSeeds.length]).replace(/\s+/g, ".")}@pvf.vn`,
      joinedAt: `2025-${padNumber(((index % 6) + 1))}-10`,
      status,
      statusLabel: studentStatusLabelMap[status],
      attendance,
      scores,
    };
  });

const computeAverageScore = (students: CulturalClassStudentRecord[]) =>
  Number(
    (
      students.reduce((sum, student) => sum + student.scores.average, 0) /
      (students.length || 1)
    ).toFixed(1),
  );

const computeAttendanceRate = (
  students: CulturalClassStudentRecord[],
  sessions: CulturalClassSessionRecord[],
) => {
  const totalEntries = students.length * sessions.length;
  const presentEntries = students.reduce(
    (sum, student) =>
      sum + student.attendance.filter((attendance) => attendance.present).length,
    0,
  );

  return Math.round((presentEntries / (totalEntries || 1)) * 100);
};

const buildRecord = (
  id: number,
  overrides: Partial<CulturalClassRecord> = {},
): CulturalClassRecord => {
  const gradeName = overrides.gradeName ?? gradeOptions[id % gradeOptions.length];
  const schoolYear = overrides.schoolYear ?? schoolYearOptions[id % schoolYearOptions.length];
  const homeroomTeacher =
    overrides.homeroomTeacher ?? teacherOptions[id % teacherOptions.length];
  const sessions = overrides.sessions ?? buildSessions(id);
  const students = overrides.students ?? buildStudents(id, 21, sessions);
  const averageScore = overrides.averageScore ?? computeAverageScore(students);
  const attendanceRate = overrides.attendanceRate ?? computeAttendanceRate(students, sessions);

  return {
    id,
    code: overrides.code ?? buildClassCode(gradeName, id),
    name: overrides.name ?? classTitleSeeds[id % classTitleSeeds.length],
    gradeName,
    schoolYear,
    homeroomTeacher,
    status: overrides.status ?? "ACTIVE",
    createdAt: overrides.createdAt ?? buildDate(2025, 1, (id % 24) + 1, 8, 30),
    updatedAt: overrides.updatedAt ?? buildDate(2026, 1, (id % 24) + 1, 10, 15),
    deletedAt: overrides.deletedAt ?? null,
    totalStudents: overrides.totalStudents ?? students.length,
    averageScore,
    attendanceRate,
    completedSessions: overrides.completedSessions ?? 21,
    totalSessions: overrides.totalSessions ?? 22,
    students,
    sessions,
  };
};

const activeSeedRecords: CulturalClassRecord[] = Array.from({ length: 21 }, (_, index) => {
  const id = index + 1;

  return buildRecord(id, {
    code: id === 1 ? "Lớp U12-A" : undefined,
    name: id === 1 ? "Kỹ thuật bóng đá cơ bản" : undefined,
    gradeName: id <= 8 ? "Khối 10" : id <= 15 ? "Khối 11" : "Khối 12",
    schoolYear: id <= 12 ? "2024-2025" : "2025-2026",
    homeroomTeacher: id === 1 ? "Nguyễn Đức Anh" : undefined,
    status: id === 21 ? "PAUSED" : "ACTIVE",
  });
});

const deletedSeedRecords: CulturalClassRecord[] = Array.from({ length: 4 }, (_, index) =>
  buildRecord(101 + index, {
    code: "Lớp U12-A",
    name: "Kỹ thuật bóng đá cơ bản",
    gradeName: "Khối 10",
    schoolYear: "2024-2025",
    homeroomTeacher: "Nguyễn Đức Anh",
    deletedAt: `2025-02-01 09:00`,
  }),
);

let culturalClassStore: CulturalClassRecord[] = [
  ...activeSeedRecords,
  ...deletedSeedRecords,
];

let nextClassId = 1000;
let nextStudentId = 20000;

const cloneSessions = (sessions: CulturalClassSessionRecord[]) =>
  sessions.map((session) => ({ ...session }));

const cloneStudents = (students: CulturalClassStudentRecord[]) =>
  students.map((student) => ({
    ...student,
    attendance: student.attendance.map((attendance) => ({ ...attendance })),
    scores: { ...student.scores },
  }));

const cloneRecord = (record: CulturalClassRecord): CulturalClassRecord => ({
  ...record,
  sessions: cloneSessions(record.sessions),
  students: cloneStudents(record.students),
});

const toListItem = (
  record: CulturalClassRecord,
  order: number,
): CulturalClassListItem => ({
  id: record.id,
  order,
  code: record.code,
  name: record.name,
  gradeName: record.gradeName,
  schoolYear: record.schoolYear,
  homeroomTeacher: record.homeroomTeacher,
  status: record.status,
  statusLabel: statusLabelMap[record.status],
  deletedAt: record.deletedAt,
});

const paginate = <T>(items: T[], page: number, pageSize: number) => {
  const safePageSize = Math.max(1, pageSize);
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * safePageSize;

  return {
    data: items.slice(start, start + safePageSize),
    meta: {
      currentPage: safePage,
      totalPages,
      totalItems,
      itemsPerPage: safePageSize,
    },
  };
};

const computeSummary = (records: CulturalClassRecord[]): CulturalClassSummary => ({
  total: records.length,
  active: records.filter((record) => record.status === "ACTIVE").length,
  paused: records.filter((record) => record.status === "PAUSED").length,
});

const getActiveRecords = () =>
  culturalClassStore.filter((record) => record.deletedAt === null);

const getDeletedRecords = () =>
  culturalClassStore.filter((record) => record.deletedAt !== null);

const filterRecords = (
  records: CulturalClassRecord[],
  filters: CulturalClassListFilters,
) => {
  const keyword = normalizeText(filters.keyword ?? "");
  const schoolYear = filters.schoolYear ?? "all";
  const status = filters.status ?? "all";
  const deletedDate = filters.deletedDate ?? "all";

  return records.filter((record) => {
    const matchesKeyword =
      keyword.length === 0 ||
      normalizeText(record.code).includes(keyword) ||
      normalizeText(record.name).includes(keyword) ||
      normalizeText(record.homeroomTeacher).includes(keyword);
    const matchesYear = schoolYear === "all" || record.schoolYear === schoolYear;
    const matchesStatus = status === "all" || record.status === status;
    const matchesDeletedDate =
      deletedDate === "all" ||
      (record.deletedAt ? record.deletedAt.startsWith(deletedDate) : false);

    return matchesKeyword && matchesYear && matchesStatus && matchesDeletedDate;
  });
};

const parsePage = (value: number | undefined) => value ?? 1;

const parsePageSize = (value: number | undefined) => value ?? DEFAULT_PAGE_SIZE;

const buildNewStudents = (classId: number) => {
  const sessions = buildSessions(classId);
  return buildStudents(classId, 21, sessions);
};

export const culturalClassService = {
  async list(filters: CulturalClassListFilters = {}): Promise<CulturalClassListResponse> {
    await delay();

    const activeRecords = getActiveRecords();
    const filtered = filterRecords(activeRecords, filters);
    const paged = paginate(filtered, parsePage(filters.page), parsePageSize(filters.pageSize));

    return {
      data: paged.data.map((record, index) =>
        toListItem(
          record,
          (paged.meta.currentPage - 1) * paged.meta.itemsPerPage + index + 1,
        ),
      ),
      meta: paged.meta,
      summary: computeSummary(activeRecords),
    };
  },

  async listDeleted(
    filters: CulturalClassListFilters = {},
  ): Promise<CulturalClassListResponse> {
    await delay();

    const deletedRecords = getDeletedRecords();
    const filtered = filterRecords(deletedRecords, filters);
    const paged = paginate(filtered, parsePage(filters.page), parsePageSize(filters.pageSize));

    return {
      data: paged.data.map((record, index) =>
        toListItem(
          record,
          (paged.meta.currentPage - 1) * paged.meta.itemsPerPage + index + 1,
        ),
      ),
      meta: paged.meta,
      summary: computeSummary(getActiveRecords()),
    };
  },

  async getById(id: number): Promise<{ data?: CulturalClassRecord }> {
    await delay();

    const record = culturalClassStore.find((item) => item.id === id);
    return { data: record ? cloneRecord(record) : undefined };
  },

  async create(input: SaveCulturalClassInput): Promise<{ data: CulturalClassRecord }> {
    await delay();

    const id = nextClassId++;
    const timestamp = buildTimestamp();
    const sessions = buildSessions(id);
    const students = buildNewStudents(id);
    const record = buildRecord(id, {
      code: buildClassCode(input.gradeName, id),
      name: input.name.trim(),
      gradeName: input.gradeName,
      schoolYear: input.schoolYear,
      homeroomTeacher: input.homeroomTeacher,
      status: input.status,
      createdAt: timestamp,
      updatedAt: timestamp,
      deletedAt: null,
      sessions,
      students,
    });

    culturalClassStore = [record, ...culturalClassStore];
    return { data: cloneRecord(record) };
  },

  async update(
    id: number,
    input: SaveCulturalClassInput,
  ): Promise<{ data?: CulturalClassRecord }> {
    await delay();

    const record = culturalClassStore.find((item) => item.id === id);
    if (!record) {
      return { data: undefined };
    }

    record.name = input.name.trim();
    record.gradeName = input.gradeName;
    record.schoolYear = input.schoolYear;
    record.homeroomTeacher = input.homeroomTeacher;
    record.status = input.status;
    record.code = buildClassCode(input.gradeName, id);
    record.updatedAt = buildTimestamp();

    return { data: cloneRecord(record) };
  },

  async softDelete(id: number): Promise<{ success: boolean }> {
    await delay();

    const record = culturalClassStore.find((item) => item.id === id);
    if (!record || record.deletedAt) {
      return { success: false };
    }

    record.deletedAt = buildTimestamp();
    record.updatedAt = record.deletedAt;
    return { success: true };
  },

  async restore(id: number): Promise<{ success: boolean }> {
    await delay();

    const record = culturalClassStore.find((item) => item.id === id);
    if (!record || !record.deletedAt) {
      return { success: false };
    }

    record.deletedAt = null;
    record.updatedAt = buildTimestamp();
    return { success: true };
  },

  async hardDelete(id: number): Promise<{ success: boolean }> {
    await delay();

    const beforeLength = culturalClassStore.length;
    culturalClassStore = culturalClassStore.filter((record) => record.id !== id);
    return { success: beforeLength !== culturalClassStore.length };
  },

  async addMockStudent(classId: number): Promise<{ data?: CulturalClassRecord }> {
    await delay();

    const record = culturalClassStore.find((item) => item.id === classId);
    if (!record) {
      return { data: undefined };
    }

    const nextIndex = record.students.length;
    const student = buildStudents(classId, nextIndex + 1, record.sessions)[nextIndex];
    student.id = nextStudentId++;
    record.students = [...record.students, student];
    record.totalStudents = record.students.length;
    record.averageScore = computeAverageScore(record.students);
    record.attendanceRate = computeAttendanceRate(record.students, record.sessions);
    record.updatedAt = buildTimestamp();

    return { data: cloneRecord(record) };
  },
};
