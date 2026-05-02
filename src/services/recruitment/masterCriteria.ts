export type MasterCriteriaStatus = "ACTIVE" | "INACTIVE";

export interface MasterCriteriaCriterionRecord {
  id: number;
  name: string;
  description: string;
  weight: number;
}

export interface MasterCriteriaUsageRecord {
  id: number;
  facilityName: string;
  admissionName: string;
  admissionDate: string;
  endDate: string;
  status: MasterCriteriaStatus;
}

export interface MasterCriteriaRecord {
  id: number;
  code: string;
  name: string;
  description: string;
  status: MasterCriteriaStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  criteria: MasterCriteriaCriterionRecord[];
  usages: MasterCriteriaUsageRecord[];
}

export interface MasterCriteriaListItem {
  id: number;
  order: number;
  code: string;
  name: string;
  description: string;
  status: MasterCriteriaStatus;
  statusLabel: string;
  deletedAt: string | null;
  criteriaCount: number;
  usageCount: number;
}

export interface MasterCriteriaSummary {
  total: number;
  inUse: number;
  unused: number;
  active: number;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface MasterCriteriaListFilters {
  keyword?: string;
  status?: "all" | MasterCriteriaStatus;
  page?: number;
  pageSize?: number;
}

export interface MasterCriteriaListResponse {
  data: MasterCriteriaListItem[];
  meta: PaginationMeta;
  summary: MasterCriteriaSummary;
}

export interface SaveMasterCriteriaInput {
  name: string;
  description: string;
  status: MasterCriteriaStatus;
  criteria: Array<{
    name: string;
    description: string;
    weight: number;
  }>;
}

const DELAY = 200;
const DEFAULT_PAGE_SIZE = 9;

const statusLabelMap: Record<MasterCriteriaStatus, string> = {
  ACTIVE: "Đang hoạt động",
  INACTIVE: "Ngưng hoạt động",
};

export const masterCriteriaStatusOptions = [
  { value: "ACTIVE", label: "Đang hoạt động" },
  { value: "INACTIVE", label: "Ngưng hoạt động" },
] as const;

const facilitySeeds = [
  "Cơ sở đào tạo FPT Hà Nội",
  "Cơ sở đào tạo Hưng Yên",
  "Trung tâm liên kết Đồng Nai",
];

const admissionSeeds = [
  "Kỳ tuyển sinh Xuân 2025",
  "Kỳ tuyển sinh Hè 2025",
  "Kỳ tuyển sinh Thu 2025",
];

const delay = (ms = DELAY) => new Promise((resolve) => setTimeout(resolve, ms));

const padNumber = (value: number) => String(value).padStart(2, "0");

const formatDateTime = (year: number, month: number, day: number) =>
  `${year}-${padNumber(month)}-${padNumber(day)} ${padNumber(8 + (day % 9))}:${padNumber((day * 5) % 60)}:45`;

const buildCriteriaRows = (seed: number): MasterCriteriaCriterionRecord[] => [
  {
    id: seed * 10 + 1,
    name: "Kỹ thuật cá nhân",
    description: "Đánh giá kỹ năng xử lý bóng, rê bóng, chuyền bóng và dứt điểm",
    weight: 50,
  },
  {
    id: seed * 10 + 2,
    name: "Thể chất và tư duy",
    description: "Đánh giá thể lực, tốc độ, phản xạ và khả năng ra quyết định",
    weight: 50,
  },
];

const buildUsageRows = (seed: number, count: number): MasterCriteriaUsageRecord[] =>
  Array.from({ length: count }, (_, index) => ({
    id: seed * 100 + index + 1,
    facilityName: facilitySeeds[(seed + index) % facilitySeeds.length],
    admissionName: admissionSeeds[(seed + index) % admissionSeeds.length],
    admissionDate: `2025-${padNumber((index % 9) + 1)}-15`,
    endDate: `2025-${padNumber((index % 9) + 3)}-31`,
    status: "ACTIVE",
  }));

const activeSeedRecords: MasterCriteriaRecord[] = Array.from(
  { length: 21 },
  (_, index) => {
    const id = index + 1;
    const usageCount = id === 21 ? 0 : (id % 3) + 1;

    return {
      id,
      code: `MC-${padNumber(id)}`,
      name: id === 1 ? "Bộ tiêu chí tuyển sinh số 1" : `Bộ tiêu chí đánh giá hồ sơ ${id}`,
      description:
        id === 1
          ? "Mô tả bộ tiêu chí số 1"
          : "Đánh giá thông tin cá nhân, học lực, thành tích và hồ sơ đăng ký của thí sinh",
      status: "ACTIVE",
      createdAt: formatDateTime(2026, 1, (id % 20) + 1),
      updatedAt: formatDateTime(2026, 1, (id % 20) + 1),
      deletedAt: null,
      criteria: buildCriteriaRows(id),
      usages: buildUsageRows(id, usageCount),
    };
  },
);

const deletedSeedRecords: MasterCriteriaRecord[] = Array.from(
  { length: 4 },
  (_, index) => {
    const id = 101 + index;
    return {
      id,
      code: `MC-${id}`,
      name: "Bộ tiêu chí đánh giá hồ sơ",
      description:
        "Đánh giá thông tin cá nhân, học lực, thành tích và hồ sơ đăng ký của thí sinh",
      status: "ACTIVE",
      createdAt: formatDateTime(2025, 3, index + 2),
      updatedAt: formatDateTime(2025, 3, index + 7),
      deletedAt: `2025-03-31 08:30`,
      criteria: buildCriteriaRows(id),
      usages: [],
    };
  },
);

let masterCriteriaStore: MasterCriteriaRecord[] = [
  ...activeSeedRecords,
  ...deletedSeedRecords,
];

let nextMasterCriteriaId = 1000;
let nextCriterionId = 5000;
let nextUsageId = 9000;

const cloneCriteria = (criteria: MasterCriteriaCriterionRecord[]) =>
  criteria.map((criterion) => ({ ...criterion }));

const cloneUsages = (usages: MasterCriteriaUsageRecord[]) =>
  usages.map((usage) => ({ ...usage }));

const cloneRecord = (record: MasterCriteriaRecord): MasterCriteriaRecord => ({
  ...record,
  criteria: cloneCriteria(record.criteria),
  usages: cloneUsages(record.usages),
});

const toListItem = (
  record: MasterCriteriaRecord,
  order: number,
): MasterCriteriaListItem => ({
  id: record.id,
  order,
  code: record.code,
  name: record.name,
  description: record.description,
  status: record.status,
  statusLabel: statusLabelMap[record.status],
  deletedAt: record.deletedAt,
  criteriaCount: record.criteria.length,
  usageCount: record.usages.length,
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

const computeSummary = (records: MasterCriteriaRecord[]): MasterCriteriaSummary => {
  const total = records.length;
  const inUse = records.filter((record) => record.usages.length > 0).length;
  const active = records.filter((record) => record.status === "ACTIVE").length;

  return {
    total,
    inUse,
    unused: total - inUse,
    active,
  };
};

const normalizeText = (value: string) => value.trim().toLowerCase();

const filterRecords = (
  records: MasterCriteriaRecord[],
  filters: MasterCriteriaListFilters,
) => {
  const keyword = normalizeText(filters.keyword ?? "");
  const status = filters.status ?? "all";

  return records.filter((record) => {
    const matchesKeyword =
      keyword.length === 0 ||
      normalizeText(record.name).includes(keyword) ||
      normalizeText(record.code).includes(keyword) ||
      normalizeText(record.description).includes(keyword);
    const matchesStatus = status === "all" || record.status === status;

    return matchesKeyword && matchesStatus;
  });
};

const getActiveRecords = () =>
  masterCriteriaStore.filter((record) => record.deletedAt === null);

const getDeletedRecords = () =>
  masterCriteriaStore.filter((record) => record.deletedAt !== null);

const buildCode = (id: number) => `MC-${padNumber(id)}`;

const buildCriteriaPayload = (
  criteria: SaveMasterCriteriaInput["criteria"],
): MasterCriteriaCriterionRecord[] =>
  criteria.map((criterion) => ({
    id: nextCriterionId++,
    name: criterion.name.trim(),
    description: criterion.description.trim(),
    weight: criterion.weight,
  }));

const buildTimestamp = () => {
  const now = new Date();
  return `${now.getFullYear()}-${padNumber(now.getMonth() + 1)}-${padNumber(now.getDate())} ${padNumber(now.getHours())}:${padNumber(now.getMinutes())}:${padNumber(now.getSeconds())}`;
};

const parsePage = (value: number | undefined) => value ?? 1;

const parsePageSize = (value: number | undefined) => value ?? DEFAULT_PAGE_SIZE;

export const masterCriteriaService = {
  async list(filters: MasterCriteriaListFilters = {}): Promise<MasterCriteriaListResponse> {
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
    filters: MasterCriteriaListFilters = {},
  ): Promise<MasterCriteriaListResponse> {
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

  async getById(id: number): Promise<{ data?: MasterCriteriaRecord }> {
    await delay();

    const record = masterCriteriaStore.find((item) => item.id === id);
    return { data: record ? cloneRecord(record) : undefined };
  },

  async create(
    input: SaveMasterCriteriaInput,
  ): Promise<{ data: MasterCriteriaRecord }> {
    await delay();

    const timestamp = buildTimestamp();
    const id = nextMasterCriteriaId++;
    const record: MasterCriteriaRecord = {
      id,
      code: buildCode(id),
      name: input.name.trim(),
      description: input.description.trim(),
      status: input.status,
      createdAt: timestamp,
      updatedAt: timestamp,
      deletedAt: null,
      criteria: buildCriteriaPayload(input.criteria),
      usages: [],
    };

    masterCriteriaStore = [record, ...masterCriteriaStore];

    return { data: cloneRecord(record) };
  },

  async update(
    id: number,
    input: SaveMasterCriteriaInput,
  ): Promise<{ data?: MasterCriteriaRecord }> {
    await delay();

    const record = masterCriteriaStore.find((item) => item.id === id);
    if (!record) {
      return { data: undefined };
    }

    record.name = input.name.trim();
    record.description = input.description.trim();
    record.status = input.status;
    record.updatedAt = buildTimestamp();
    record.criteria = buildCriteriaPayload(input.criteria);

    return { data: cloneRecord(record) };
  },

  async softDelete(id: number): Promise<{ success: boolean }> {
    await delay();

    const record = masterCriteriaStore.find((item) => item.id === id);
    if (!record || record.deletedAt) {
      return { success: false };
    }

    record.deletedAt = buildTimestamp();
    record.updatedAt = record.deletedAt;
    return { success: true };
  },

  async restore(id: number): Promise<{ success: boolean }> {
    await delay();

    const record = masterCriteriaStore.find((item) => item.id === id);
    if (!record || !record.deletedAt) {
      return { success: false };
    }

    record.deletedAt = null;
    record.updatedAt = buildTimestamp();
    return { success: true };
  },

  async hardDelete(id: number): Promise<{ success: boolean }> {
    await delay();

    const before = masterCriteriaStore.length;
    masterCriteriaStore = masterCriteriaStore.filter((item) => item.id !== id);
    return { success: masterCriteriaStore.length < before };
  },

  async duplicate(id: number): Promise<{ data?: MasterCriteriaRecord }> {
    await delay();

    const source = masterCriteriaStore.find((item) => item.id === id);
    if (!source) {
      return { data: undefined };
    }

    const timestamp = buildTimestamp();
    const duplicatedId = nextMasterCriteriaId++;
    const record: MasterCriteriaRecord = {
      ...cloneRecord(source),
      id: duplicatedId,
      code: buildCode(duplicatedId),
      name: `${source.name} - Bản sao`,
      createdAt: timestamp,
      updatedAt: timestamp,
      deletedAt: null,
      criteria: source.criteria.map((criterion) => ({
        ...criterion,
        id: nextCriterionId++,
      })),
      usages: source.usages.map((usage) => ({
        ...usage,
        id: nextUsageId++,
      })),
    };

    masterCriteriaStore = [record, ...masterCriteriaStore];

    return { data: cloneRecord(record) };
  },
};

export const getMasterCriteriaStatusLabel = (status: MasterCriteriaStatus) =>
  statusLabelMap[status];
