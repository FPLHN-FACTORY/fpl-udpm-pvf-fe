export type EvaluationKind = "student" | "course";

export type EvaluationStatus = "Đã khóa" | "Đang mở" | "Chưa đánh giá";

export interface EvaluationCriterion {
  id: number;
  name: string;
  weight: number;
  score: number | null;
  convertedScore: number;
}

export interface EvaluationRecord {
  id: number;
  order: number;
  evaluationCode: string;
  studentName: string;
  studentCode: string;
  stage: string;
  course: string;
  reviewer: string;
  totalScore: number;
  averageScore: number;
  rank: number;
  classification: string;
  formName: string;
  overview: string;
  lockedAt: string;
  createdAt: string;
  updatedAt: string;
  status: EvaluationStatus;
  criteria: EvaluationCriterion[];
}

export interface CreateEvaluationCriterion {
  id: number;
  name: string;
  weight: number;
}

export interface UpdateEvaluationInput {
  studentCode: string;
  stage: string;
  formName: string;
  reviewer: string;
  totalScore: number;
  overview: string;
  lockedAt: string;
  status: EvaluationStatus;
  criteria: EvaluationCriterion[];
}

export interface DeletedEvaluationRecord {
  id: number;
  order: number;
  sourceId: number;
  studentName: string;
  studentCode: string;
  stage: string;
  reviewer: string;
  totalScore: number;
  deletedAt: string;
  status: EvaluationStatus;
}

const baseRows = [
  {
    id: 1,
    order: 1,
    studentName: "Nguyễn Văn An",
    studentCode: "HV123",
    stage: "Sơ tuyển U13",
    reviewer: "HLV A",
    totalScore: 7.8,
    status: "Đã khóa",
  },
  {
    id: 2,
    order: 2,
    studentName: "Trần Minh Khôi",
    studentCode: "HV125",
    stage: "Sơ tuyển U13",
    reviewer: "HLV A",
    totalScore: 7.6,
    status: "Đã khóa",
  },
  {
    id: 3,
    order: 3,
    studentName: "Phạm Gia Hưng",
    studentCode: "HV126",
    stage: "Sơ tuyển U13",
    reviewer: "HLV B",
    totalScore: 8.2,
    status: "Đang mở",
  },
  {
    id: 4,
    order: 4,
    studentName: "Lê Hoàng Nam",
    studentCode: "HV127",
    stage: "Sơ tuyển U13",
    reviewer: "HLV A",
    totalScore: 7.9,
    status: "Đã khóa",
  },
  {
    id: 5,
    order: 5,
    studentName: "Đỗ Quang Huy",
    studentCode: "HV128",
    stage: "Sơ tuyển U13",
    reviewer: "HLV C",
    totalScore: 7.4,
    status: "Đã khóa",
  },
  {
    id: 6,
    order: 6,
    studentName: "Bùi Hải Đăng",
    studentCode: "HV129",
    stage: "Sơ tuyển U15",
    reviewer: "HLV B",
    totalScore: 7.1,
    status: "Đã khóa",
  },
  {
    id: 7,
    order: 7,
    studentName: "Ngô Đức Mạnh",
    studentCode: "HV130",
    stage: "Sơ tuyển U15",
    reviewer: "HLV B",
    totalScore: 6.9,
    status: "Đã khóa",
  },
  {
    id: 8,
    order: 8,
    studentName: "Phan Tiến Đạt",
    studentCode: "HV131",
    stage: "Sơ tuyển U15",
    reviewer: "HLV C",
    totalScore: 7.7,
    status: "Đang mở",
  },
  {
    id: 9,
    order: 9,
    studentName: "Vũ Thành Công",
    studentCode: "HV132",
    stage: "Sơ tuyển U15",
    reviewer: "HLV A",
    totalScore: 8.1,
    status: "Đã khóa",
  },
  {
    id: 10,
    order: 10,
    studentName: "Hoàng Phúc Long",
    studentCode: "HV133",
    stage: "Sơ tuyển U15",
    reviewer: "HLV A",
    totalScore: 7.5,
    status: "Đã khóa",
  },
  {
    id: 11,
    order: 11,
    studentName: "Mai Xuân Trường",
    studentCode: "HV134",
    stage: "Sơ tuyển U17",
    reviewer: "HLV D",
    totalScore: 6.8,
    status: "Đã khóa",
  },
  {
    id: 12,
    order: 12,
    studentName: "Nguyễn Tuấn Kiệt",
    studentCode: "HV135",
    stage: "Sơ tuyển U17",
    reviewer: "HLV D",
    totalScore: 7.0,
    status: "Đã khóa",
  },
  {
    id: 13,
    order: 13,
    studentName: "Phùng Anh Tuấn",
    studentCode: "HV136",
    stage: "Sơ tuyển U17",
    reviewer: "HLV C",
    totalScore: 7.3,
    status: "Đã khóa",
  },
  {
    id: 14,
    order: 14,
    studentName: "Lý Quốc Bảo",
    studentCode: "HV137",
    stage: "Sơ tuyển U17",
    reviewer: "HLV C",
    totalScore: 7.2,
    status: "Đã khóa",
  },
  {
    id: 15,
    order: 15,
    studentName: "Trịnh Quốc Đạt",
    studentCode: "HV138",
    stage: "Sơ tuyển U17",
    reviewer: "HLV B",
    totalScore: 7.6,
    status: "Đã khóa",
  },
  {
    id: 16,
    order: 16,
    studentName: "Đặng Nhật Minh",
    studentCode: "HV139",
    stage: "Nâng cao U19",
    reviewer: "HLV D",
    totalScore: 8.5,
    status: "Đã khóa",
  },
  {
    id: 17,
    order: 17,
    studentName: "Lưu Trường Giang",
    studentCode: "HV140",
    stage: "Nâng cao U19",
    reviewer: "HLV E",
    totalScore: 8.0,
    status: "Đang mở",
  },
  {
    id: 18,
    order: 18,
    studentName: "Đinh Minh Tâm",
    studentCode: "HV141",
    stage: "Nâng cao U19",
    reviewer: "HLV E",
    totalScore: 7.9,
    status: "Đã khóa",
  },
  {
    id: 19,
    order: 19,
    studentName: "Hà Công Phượng",
    studentCode: "HV142",
    stage: "Nâng cao U19",
    reviewer: "HLV D",
    totalScore: 8.4,
    status: "Đã khóa",
  },
  {
    id: 20,
    order: 20,
    studentName: "Tạ Gia Bảo",
    studentCode: "HV143",
    stage: "Nâng cao U19",
    reviewer: "HLV E",
    totalScore: 8.2,
    status: "Đã khóa",
  },
  {
    id: 21,
    order: 21,
    studentName: "Dương Anh Khoa",
    studentCode: "HV144",
    stage: "Nâng cao U19",
    reviewer: "HLV F",
    totalScore: 0,
    status: "Chưa đánh giá",
  },
] as const satisfies ReadonlyArray<{
  id: number;
  order: number;
  studentName: string;
  studentCode: string;
  stage: string;
  reviewer: string;
  totalScore: number;
  status: EvaluationStatus;
}>;

const criteriaTemplate = [
  { id: 1, name: "Kỹ thuật cơ bản", weight: 25, offset: 0.3 },
  { id: 2, name: "Tư duy chiến thuật", weight: 20, offset: 0.1 },
  { id: 3, name: "Thể lực", weight: 20, offset: -0.2 },
  { id: 4, name: "Tốc độ", weight: 15, offset: 0.2 },
  { id: 5, name: "Tinh thần thi đấu", weight: 20, offset: 0 },
] as const;

export const createCriteriaTemplate: CreateEvaluationCriterion[] = [
  { id: 1, name: "Thể lực", weight: 25 },
  { id: 2, name: "Kỹ thuật", weight: 30 },
  { id: 3, name: "Chiến thuật", weight: 15 },
  { id: 4, name: "Tâm lý", weight: 10 },
  { id: 5, name: "Thái độ", weight: 10 },
  { id: 6, name: "Tiềm năng", weight: 10 },
];

const padNumber = (value: number) => String(value).padStart(2, "0");

const formatTimestamp = (date: Date) => {
  const year = date.getFullYear();
  const month = padNumber(date.getMonth() + 1);
  const day = padNumber(date.getDate());
  const hours = padNumber(date.getHours());
  const minutes = padNumber(date.getMinutes());
  const seconds = padNumber(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const roundTo = (value: number, fractionDigits = 2) =>
  Number(value.toFixed(fractionDigits));

const clampScore = (value: number) => Math.min(10, Math.max(0, value));

const extractCourse = (stage: string) => {
  const matchedCourse = stage.match(/U\d+/i);
  return matchedCourse?.[0]?.toUpperCase() ?? "U13";
};

const getClassification = (score: number, status: EvaluationStatus) => {
  if (status === "Chưa đánh giá") {
    return "Chưa xếp loại";
  }

  if (score >= 8) {
    return "Xuất sắc";
  }

  if (score >= 7.5) {
    return "Tốt";
  }

  if (score >= 7) {
    return "Khá";
  }

  return "Đạt";
};

const getOverview = (score: number, status: EvaluationStatus) => {
  if (status === "Chưa đánh giá") {
    return "Chưa có nhận xét tổng quan.";
  }

  if (score >= 8) {
    return "Học viên thể hiện tốt ở hầu hết tiêu chí.";
  }

  if (score >= 7.5) {
    return "Học viên đáp ứng tốt yêu cầu đánh giá.";
  }

  if (score >= 7) {
    return "Học viên đạt yêu cầu và cần tăng độ ổn định.";
  }

  return "Học viên cần tiếp tục hoàn thiện thêm.";
};

const buildCriteria = (
  totalScore: number,
  status: EvaluationStatus,
): EvaluationCriterion[] => {
  if (status === "Chưa đánh giá") {
    return criteriaTemplate.map((criterion) => ({
      id: criterion.id,
      name: criterion.name,
      weight: criterion.weight,
      score: null,
      convertedScore: 0,
    }));
  }

  let accumulated = 0;

  return criteriaTemplate.map((criterion, index) => {
    if (index === criteriaTemplate.length - 1) {
      const convertedScore = roundTo(Math.max(0, totalScore - accumulated));
      const score = roundTo((convertedScore * 100) / criterion.weight, 1);

      return {
        id: criterion.id,
        name: criterion.name,
        weight: criterion.weight,
        score,
        convertedScore,
      };
    }

    const score = roundTo(clampScore(totalScore + criterion.offset), 1);
    const convertedScore = roundTo((score * criterion.weight) / 100);
    accumulated += convertedScore;

    return {
      id: criterion.id,
      name: criterion.name,
      weight: criterion.weight,
      score,
      convertedScore,
    };
  });
};

export const evaluationRows: EvaluationRecord[] = baseRows.map((row, index) => {
  const course = extractCourse(row.stage);
  const createdDay = 5 + (index % 20);
  const lockedDay = 15 + (index % 10);
  const updatedDay = 20 + (index % 10);

  return {
    ...row,
    evaluationCode: `UT${1300 + row.id}`,
    course,
    averageScore: row.totalScore,
    rank: row.order,
    classification: getClassification(row.totalScore, row.status),
    formName: `Form ${course} v1.0`,
    overview: getOverview(row.totalScore, row.status),
    lockedAt:
      row.status === "Đã khóa"
        ? `${padNumber(lockedDay)}/03/2025 17:00`
        : "Chưa khóa",
    createdAt: `2025-01-${padNumber(createdDay)} 08:30:00`,
    updatedAt: `2026-01-${padNumber(updatedDay)} 10:15:45`,
    criteria: buildCriteria(row.totalScore, row.status),
  };
});

export const stageOptions = Array.from(
  new Set(evaluationRows.map((row) => row.stage)),
);

export const statusOptions: EvaluationStatus[] = [
  "Đã khóa",
  "Đang mở",
  "Chưa đánh giá",
];

export const studentOptions = Array.from(
  new Map(
    evaluationRows.map((row) => [
      row.studentCode,
      {
        code: row.studentCode,
        name: row.studentName,
      },
    ]),
  ).values(),
);

export const reviewerOptions = Array.from(
  new Set(evaluationRows.map((row) => row.reviewer)),
);

export const formOptions = Array.from(
  new Set(evaluationRows.map((row) => row.formName)),
);

export const deletedEvaluationRows: DeletedEvaluationRecord[] = Array.from(
  { length: 30 },
  (_, index) => {
    const sourceRow = evaluationRows[index % evaluationRows.length];
    const deletedDay = (index % 5) + 1;

    return {
      id: 500 + index + 1,
      order: index + 1,
      sourceId: sourceRow.id,
      studentName: sourceRow.studentName,
      studentCode: sourceRow.studentCode,
      stage: sourceRow.stage,
      reviewer: sourceRow.reviewer,
      totalScore: sourceRow.totalScore,
      deletedAt: `${deletedDay}/1/2025 8:00`,
      status: sourceRow.status,
    };
  },
);

export const getEvaluationById = (id: number) =>
  evaluationRows.find((row) => row.id === id);

export const updateEvaluationById = (
  id: number,
  input: UpdateEvaluationInput,
) => {
  const record = evaluationRows.find((row) => row.id === id);

  if (!record) {
    return undefined;
  }

  const matchedStudent = studentOptions.find(
    (student) => student.code === input.studentCode,
  );
  const totalScore = clampScore(roundTo(input.totalScore, 1));
  const nextStatus = input.status;

  record.studentCode = input.studentCode;
  record.studentName = matchedStudent?.name ?? record.studentName;
  record.stage = input.stage;
  record.course = extractCourse(input.stage);
  record.reviewer = input.reviewer;
  record.totalScore = totalScore;
  record.averageScore = totalScore;
  record.classification = getClassification(totalScore, nextStatus);
  record.formName = input.formName;
  record.overview = input.overview.trim() || getOverview(totalScore, nextStatus);
  record.lockedAt = input.lockedAt.trim() || "Chưa khóa";
  record.updatedAt = formatTimestamp(new Date());
  record.status = nextStatus;
  record.criteria = input.criteria.map((criterion) => ({
    ...criterion,
    score:
      criterion.score === null ? null : roundTo(clampScore(criterion.score), 1),
    convertedScore: roundTo(Math.max(0, criterion.convertedScore)),
  }));

  return record;
};
