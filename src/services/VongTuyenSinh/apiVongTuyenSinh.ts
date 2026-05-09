import type {
  AdmissionRoundCreateInput,
  AdmissionRoundDetailRecord,
  AdmissionRoundEntity,
  AdmissionRoundListQuery,
  AdmissionRoundRecord,
  AdmissionRoundStatusValue,
  AdmissionRoundUpdateInput,
  CriteriaListQuery,
  CriteriaLine,
  CriteriaMasterRecord,
  CriteriaRecord,
  KyTuyenSinhCreatePageData,
  KyTuyenSinhDeletedPageData,
  KyTuyenSinhDetailPageData,
  KyTuyenSinhEditSeed,
  KyTuyenSinhEditPageData,
  KyTuyenSinhFormOptions,
  KyTuyenSinhListPageData,
  MetricCardItem,
  PaginationResult,
  RoundFormPayload,
  SelectOption,
  StatusTone
} from '../../types'

const sessionOptions: SelectOption[] = [
  { label: 'Kỳ tuyển sinh Xuân 2025', value: 'xuan-2025' },
  { label: 'Kỳ tuyển sinh Hè 2025', value: 'he-2025' },
  { label: 'Kỳ tuyển sinh Thu 2025', value: 'thu-2025' }
]

const roundOptions: SelectOption[] = [
  { label: 'Vòng thi chuyên môn', value: 'specialized' },
  { label: 'Vòng đánh giá thể lực', value: 'fitness' },
  { label: 'Vòng phỏng vấn phụ huynh', value: 'interview' }
]

const criteriaOptions: SelectOption[] = [
  { label: 'Bộ tiêu chí đánh giá năng lực chuyên môn', value: 'criteria-1' },
  { label: 'Bộ tiêu chí đánh giá thể lực tổng quát', value: 'criteria-2' },
  { label: 'Bộ tiêu chí phỏng vấn phụ huynh', value: 'criteria-3' }
]

const statusOptions: SelectOption[] = [
  { label: 'Đang hoạt động', value: 'active' },
  { label: 'Ngừng hoạt động', value: 'inactive' },
  { label: 'Chờ khởi động', value: 'pending' }
]

const deletedStatusOptions: SelectOption[] = [
  { label: 'Đã xóa', value: 'deleted' }
]

function cloneData<T>(data: T): T {
  return JSON.parse(JSON.stringify(data)) as T
}

const MOCK_DELAY = 120
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

let roundMetricsStore: MetricCardItem[] = [
  {
    label: 'Tổng số vòng',
    value: 21,
    icon: 'BxSidebar',
    iconColor: 'text-[#696cff]',
    iconBackground: 'bg-[#ececff]'
  },
  {
    label: 'Số vòng đã hoàn thành',
    value: 20,
    change: '(95%)',
    icon: 'BxBadgeCheck',
    iconColor: 'text-[#ff3e1d]',
    iconBackground: 'bg-[#ffe4df]'
  },
  {
    label: 'Số vòng đang diễn ra',
    value: 1,
    change: '(5%)',
    icon: 'BxLayer',
    iconColor: 'text-[#ffab00]',
    iconBackground: 'bg-[#fff1d6]'
  },
  {
    label: 'Số vòng chưa bắt đầu',
    value: 1,
    change: '(5%)',
    icon: 'BxLayerPlus',
    iconColor: 'text-[#ffab00]',
    iconBackground: 'bg-[#fff1d6]'
  }
]

const detailMetricsStore: MetricCardItem[] = [
  {
    label: 'Tổng số học viên vào vòng',
    value: 21,
    icon: 'BxSidebar',
    iconColor: 'text-[#696cff]',
    iconBackground: 'bg-[#ececff]'
  },
  {
    label: 'Số học viên tham gia thực tế',
    value: 20,
    change: '(95%)',
    icon: 'BxBadgeCheck',
    iconColor: 'text-[#ff3e1d]',
    iconBackground: 'bg-[#ffe4df]'
  },
  {
    label: 'Số pass',
    value: 1,
    change: '(5%)',
    icon: 'BxLayer',
    iconColor: 'text-[#ffab00]',
    iconBackground: 'bg-[#fff1d6]'
  },
  {
    label: 'Số loại',
    value: 1,
    change: '(5%)',
    icon: 'BxLayerPlus',
    iconColor: 'text-[#ffab00]',
    iconBackground: 'bg-[#fff1d6]'
  }
]

let admissionRoundStore: AdmissionRoundEntity[] = [
  {
    id: '1',
    order: 1,
    sessionValue: 'xuan-2025',
    sessionName: 'Kỳ tuyển sinh Xuân 2025',
    roundValue: 'specialized',
    roundName: 'Vòng thi chuyên môn',
    criteriaValue: 'criteria-1',
    criteriaName: 'Bộ tiêu chí đánh giá năng lực chuyên môn',
    startDate: '2025-02-01',
    endDate: '2025-02-10',
    statusValue: 'active',
    statusLabel: 'Đang hoạt động',
    statusTone: 'active',
    centerDeadline: '2025-01-05 08:30:00',
    updatedAt: '2026-01-20 10:15:45'
  },
  {
    id: '2',
    order: 2,
    sessionValue: 'xuan-2025',
    sessionName: 'Kỳ tuyển sinh Xuân 2025',
    roundValue: 'specialized',
    roundName: 'Vòng thi chuyên môn',
    criteriaValue: 'criteria-1',
    criteriaName: 'Bộ tiêu chí đánh giá năng lực chuyên môn',
    startDate: '2025-02-01',
    endDate: '2025-02-10',
    statusValue: 'active',
    statusLabel: 'Đang hoạt động',
    statusTone: 'active',
    centerDeadline: '2025-01-05 08:30:00',
    updatedAt: '2026-01-20 10:15:45'
  },
  {
    id: '3',
    order: 3,
    sessionValue: 'xuan-2025',
    sessionName: 'Kỳ tuyển sinh Xuân 2025',
    roundValue: 'specialized',
    roundName: 'Vòng thi chuyên môn',
    criteriaValue: 'criteria-1',
    criteriaName: 'Bộ tiêu chí đánh giá năng lực chuyên môn',
    startDate: '2025-02-01',
    endDate: '2025-02-10',
    statusValue: 'active',
    statusLabel: 'Đang hoạt động',
    statusTone: 'active',
    centerDeadline: '2025-01-05 08:30:00',
    updatedAt: '2026-01-20 10:15:45'
  },
  {
    id: '4',
    order: 4,
    sessionValue: 'xuan-2025',
    sessionName: 'Kỳ tuyển sinh Xuân 2025',
    roundValue: 'specialized',
    roundName: 'Vòng thi chuyên môn',
    criteriaValue: 'criteria-1',
    criteriaName: 'Bộ tiêu chí đánh giá năng lực chuyên môn',
    startDate: '2025-02-01',
    endDate: '2025-02-10',
    statusValue: 'active',
    statusLabel: 'Đang hoạt động',
    statusTone: 'active',
    centerDeadline: '2025-01-05 08:30:00',
    updatedAt: '2026-01-20 10:15:45'
  },
  {
    id: '5',
    order: 5,
    sessionValue: 'xuan-2025',
    sessionName: 'Kỳ tuyển sinh Xuân 2025',
    roundValue: 'specialized',
    roundName: 'Vòng thi chuyên môn',
    criteriaValue: 'criteria-1',
    criteriaName: 'Bộ tiêu chí đánh giá năng lực chuyên môn',
    startDate: '2025-02-01',
    endDate: '2025-02-10',
    statusValue: 'active',
    statusLabel: 'Đang hoạt động',
    statusTone: 'active',
    centerDeadline: '2025-01-05 08:30:00',
    updatedAt: '2026-01-20 10:15:45'
  },
  {
    id: '6',
    order: 6,
    sessionValue: 'xuan-2025',
    sessionName: 'Kỳ tuyển sinh Xuân 2025',
    roundValue: 'specialized',
    roundName: 'Vòng thi chuyên môn',
    criteriaValue: 'criteria-1',
    criteriaName: 'Bộ tiêu chí đánh giá năng lực chuyên môn',
    startDate: '2025-02-01',
    endDate: '2025-02-10',
    statusValue: 'active',
    statusLabel: 'Đang hoạt động',
    statusTone: 'active',
    centerDeadline: '2025-01-05 08:30:00',
    updatedAt: '2026-01-20 10:15:45'
  },
  {
    id: '7',
    order: 7,
    sessionValue: 'xuan-2025',
    sessionName: 'Kỳ tuyển sinh Xuân 2025',
    roundValue: 'specialized',
    roundName: 'Vòng thi chuyên môn',
    criteriaValue: 'criteria-1',
    criteriaName: 'Bộ tiêu chí đánh giá năng lực chuyên môn',
    startDate: '2025-02-01',
    endDate: '2025-02-10',
    statusValue: 'inactive',
    statusLabel: 'Ngừng hoạt động',
    statusTone: 'warning',
    centerDeadline: '2025-01-05 08:30:00',
    updatedAt: '2026-01-20 10:15:45'
  },
  {
    id: '8',
    order: 8,
    sessionValue: 'xuan-2025',
    sessionName: 'Kỳ tuyển sinh Xuân 2025',
    roundValue: 'specialized',
    roundName: 'Vòng thi chuyên môn',
    criteriaValue: 'criteria-1',
    criteriaName: 'Bộ tiêu chí đánh giá năng lực chuyên môn',
    startDate: '2025-02-01',
    endDate: '2025-02-10',
    statusValue: 'inactive',
    statusLabel: 'Ngừng hoạt động',
    statusTone: 'warning',
    centerDeadline: '2025-01-05 08:30:00',
    updatedAt: '2026-01-20 10:15:45'
  },
  {
    id: '9',
    order: 9,
    sessionValue: 'xuan-2025',
    sessionName: 'Kỳ tuyển sinh Xuân 2025',
    roundValue: 'specialized',
    roundName: 'Vòng thi chuyên môn',
    criteriaValue: 'criteria-1',
    criteriaName: 'Bộ tiêu chí đánh giá năng lực chuyên môn',
    startDate: '2025-02-01',
    endDate: '2025-02-10',
    statusValue: 'inactive',
    statusLabel: 'Ngừng hoạt động',
    statusTone: 'warning',
    centerDeadline: '2025-01-05 08:30:00',
    updatedAt: '2026-01-20 10:15:45'
  },
  {
    id: '11',
    order: 1,
    sessionValue: 'xuan-2025',
    sessionName: 'Kỳ tuyển sinh Xuân 2025',
    roundValue: 'specialized',
    roundName: 'Vòng thi chuyên môn',
    criteriaValue: 'criteria-1',
    criteriaName: 'Bộ tiêu chí đánh giá năng lực chuyên môn',
    startDate: '2025-02-01',
    endDate: '2025-02-10',
    statusValue: 'deleted',
    statusLabel: 'Đã xóa',
    statusTone: 'inactive',
    centerDeadline: '2025-01-05 08:30:00',
    updatedAt: '2026-03-04 12:00:00',
    deletedAt: '04/03/2026 12:00'
  },
  {
    id: '12',
    order: 2,
    sessionValue: 'xuan-2025',
    sessionName: 'Kỳ tuyển sinh Xuân 2025',
    roundValue: 'specialized',
    roundName: 'Vòng thi chuyên môn',
    criteriaValue: 'criteria-1',
    criteriaName: 'Bộ tiêu chí đánh giá năng lực chuyên môn',
    startDate: '2025-02-01',
    endDate: '2025-02-10',
    statusValue: 'deleted',
    statusLabel: 'Đã xóa',
    statusTone: 'inactive',
    centerDeadline: '2025-01-05 08:30:00',
    updatedAt: '2026-03-04 12:00:00',
    deletedAt: '04/03/2026 12:00'
  },
  {
    id: '13',
    order: 3,
    sessionValue: 'xuan-2025',
    sessionName: 'Kỳ tuyển sinh Xuân 2025',
    roundValue: 'specialized',
    roundName: 'Vòng thi chuyên môn',
    criteriaValue: 'criteria-1',
    criteriaName: 'Bộ tiêu chí đánh giá năng lực chuyên môn',
    startDate: '2025-02-01',
    endDate: '2025-02-10',
    statusValue: 'deleted',
    statusLabel: 'Đã xóa',
    statusTone: 'inactive',
    centerDeadline: '2025-01-05 08:30:00',
    updatedAt: '2026-03-04 12:00:00',
    deletedAt: '04/03/2026 12:00'
  },
  {
    id: '14',
    order: 4,
    sessionValue: 'xuan-2025',
    sessionName: 'Kỳ tuyển sinh Xuân 2025',
    roundValue: 'specialized',
    roundName: 'Vòng thi chuyên môn',
    criteriaValue: 'criteria-1',
    criteriaName: 'Bộ tiêu chí đánh giá năng lực chuyên môn',
    startDate: '2025-02-01',
    endDate: '2025-02-10',
    statusValue: 'deleted',
    statusLabel: 'Đã xóa',
    statusTone: 'inactive',
    centerDeadline: '2025-01-05 08:30:00',
    updatedAt: '2026-03-04 12:00:00',
    deletedAt: '04/03/2026 12:00'
  }
]

const criteriaTemplateSeed: Record<string, { criteriaMaster: CriteriaMasterRecord; criteriaLines: CriteriaLine[] }> = {
  default: {
    criteriaMaster: {
      name: 'Bộ tiêu chí chuyên môn',
      status: 'Đang hoạt động',
      description: 'Đánh giá nhóm tiêu chí nền tảng phục vụ cho vòng thi chuyên môn.'
    },
    criteriaLines: [
      {
        id: 1,
        name: 'Tiêu chí 1',
        description: 'Mô tả tiêu chí 1',
        weight: '30%'
      },
      {
        id: 2,
        name: 'Tiêu chí 2',
        description: 'Mô tả',
        weight: '20%'
      }
    ]
  }
}

const roundCriteriaStore = new Map<string, { criteriaMaster: CriteriaMasterRecord; criteriaLines: CriteriaLine[] }>(
  admissionRoundStore.map((round) => [
    round.id,
    {
      criteriaMaster: {
        name: round.criteriaName,
        status: round.statusLabel,
        description: `Bộ tiêu chí được gán cho ${round.roundName} trong ${round.sessionName}.`
      },
      criteriaLines: cloneData(criteriaTemplateSeed.default.criteriaLines)
    }
  ])
)

const defaultFormOptions: KyTuyenSinhFormOptions = {
  sessionOptions,
  roundOptions,
  criteriaOptions,
  statusOptions
}

const defaultCreateForm = (): RoundFormPayload => ({
  session: undefined,
  round: undefined,
  criteria: undefined,
  startDate: null,
  endDate: null,
  status: undefined
})

const normalizeText = (value: string) => value.trim().toLowerCase()

const resolveStatusToneFromLabel = (statusLabel: string): StatusTone => {
  const normalizedStatus = normalizeText(statusLabel)

  if (normalizedStatus === normalizeText('Ngừng hoạt động')) {
    return 'warning'
  }

  if (normalizedStatus === normalizeText('Chờ khởi động')) {
    return 'info'
  }

  if (normalizedStatus === normalizeText('Đã xóa')) {
    return 'inactive'
  }

  return 'active'
}

const buildStatusMeta = (statusValue: string | undefined): { value: AdmissionRoundStatusValue; label: string; tone: StatusTone } => {
  switch (statusValue) {
    case 'inactive':
      return { value: 'inactive', label: 'Ngừng hoạt động', tone: 'warning' }
    case 'pending':
      return { value: 'pending', label: 'Chờ khởi động', tone: 'info' }
    case 'deleted':
      return { value: 'deleted', label: 'Đã xóa', tone: 'inactive' }
    default:
      return { value: 'active', label: 'Đang hoạt động', tone: 'active' }
  }
}

const resolveLabel = (options: SelectOption[], value: string | undefined, fallback: string) =>
  options.find((option) => option.value === value)?.label || fallback

const mapEntityToListRecord = (entity: AdmissionRoundEntity): AdmissionRoundRecord => ({
  key: entity.id,
  order: entity.order,
  sessionName: entity.sessionName,
  roundName: entity.roundName,
  startDate: entity.startDate,
  endDate: entity.endDate,
  statusValue: entity.statusValue,
  statusLabel: entity.statusLabel,
  statusTone: entity.statusTone,
  deletedAt: entity.deletedAt
})

const mapEntityToDetailRecord = (entity: AdmissionRoundEntity): AdmissionRoundDetailRecord => ({
  ...mapEntityToListRecord(entity),
  sessionValue: entity.sessionValue,
  roundValue: entity.roundValue,
  criteriaValue: entity.criteriaValue,
  criteriaName: entity.criteriaName,
  centerDeadline: entity.centerDeadline,
  updatedAt: entity.updatedAt
})

const paginate = <T>(items: T[], page = 1, pageSize = 10): PaginationResult<T> => {
  const normalizedPageSize = Math.max(pageSize, 1)
  const totalPages = Math.max(Math.ceil(items.length / normalizedPageSize), 1)
  const normalizedPage = Math.min(Math.max(page, 1), totalPages)
  const start = (normalizedPage - 1) * normalizedPageSize

  return {
    items: items.slice(start, start + normalizedPageSize),
    total: items.length,
    page: normalizedPage,
    pageSize: normalizedPageSize
  }
}

const createCriteriaTemplateForRound = (entity: AdmissionRoundEntity) => ({
  criteriaMaster: {
    name: entity.criteriaName,
    status: entity.statusLabel,
    description: `Bộ tiêu chí được gán cho ${entity.roundName} trong ${entity.sessionName}.`
  },
  criteriaLines: cloneData(criteriaTemplateSeed.default.criteriaLines)
})

const buildCriteriaRecordForRound = (roundId: string): CriteriaRecord[] => {
  const found = admissionRoundStore.find((item) => item.id === roundId)
  if (!found) {
    return []
  }

  const criteriaEditor = roundCriteriaStore.get(roundId) || createCriteriaTemplateForRound(found)

  return [
    {
      key: roundId,
      order: 1,
      name: criteriaEditor.criteriaMaster.name,
      description: criteriaEditor.criteriaMaster.description,
      statusLabel: criteriaEditor.criteriaMaster.status,
      statusTone: resolveStatusToneFromLabel(criteriaEditor.criteriaMaster.status)
    }
  ]
}

const filterCriteriaRecords = (records: CriteriaRecord[], query: CriteriaListQuery = {}) => {
  const keyword = normalizeText(query.keyword || '')
  const normalizedStatus = query.status === 'active'
    ? normalizeText('Đang hoạt động')
    : query.status === 'inactive'
      ? normalizeText('Ngừng hoạt động')
      : query.status === 'pending'
        ? normalizeText('Chờ khởi động')
        : ''

  return cloneData(records.filter((item) => {
    const matchKeyword = !keyword || [
      item.name,
      item.description
    ].some((field) => normalizeText(field).includes(keyword))

    const matchStatus = !normalizedStatus || normalizeText(item.statusLabel) === normalizedStatus

    return matchKeyword && matchStatus
  }))
}

const filterRounds = (source: AdmissionRoundEntity[], query: AdmissionRoundListQuery) => {
  const keyword = normalizeText(query.keyword || '')
  const selectedDate = query.date || null

  return source.filter((item) => {
    const matchKeyword = !keyword || [
      item.sessionName,
      item.roundName,
      item.criteriaName
    ].some((field) => normalizeText(field).includes(keyword))

    const matchStatus = !query.status || item.statusValue === query.status
    const matchDate = !selectedDate || item.startDate === selectedDate || item.endDate === selectedDate

    return matchKeyword && matchStatus && matchDate
  })
}

const reindexRounds = (deleted: boolean) => {
  const filtered = admissionRoundStore
    .filter((item) => deleted ? item.deletedAt : !item.deletedAt)
    .sort((left, right) => Number(left.id) - Number(right.id))

  filtered.forEach((item, index) => {
    item.order = index + 1
  })
}

const bumpRoundMetricTotal = (delta: number) => {
  const currentValue = Number(roundMetricsStore[0]?.value || 0)
  roundMetricsStore[0].value = Math.max(currentValue + delta, 0)
}

const createEntityFromInput = (input: AdmissionRoundCreateInput): AdmissionRoundEntity => {
  const statusMeta = buildStatusMeta(input.form.status)
  const nextId = String(
    Math.max(...admissionRoundStore.map((item) => Number(item.id)), 0) + 1
  )

  return {
    id: nextId,
    order: admissionRoundStore.filter((item) => !item.deletedAt).length + 1,
    sessionValue: input.form.session || '',
    sessionName: resolveLabel(sessionOptions, input.form.session, 'Kỳ tuyển sinh mới'),
    roundValue: input.form.round || '',
    roundName: resolveLabel(roundOptions, input.form.round, 'Vòng tuyển sinh mới'),
    criteriaValue: input.form.criteria || '',
    criteriaName: resolveLabel(criteriaOptions, input.form.criteria, 'Bộ tiêu chí mới'),
    startDate: input.form.startDate || '',
    endDate: input.form.endDate || '',
    statusValue: statusMeta.value,
    statusLabel: statusMeta.label,
    statusTone: statusMeta.tone,
    centerDeadline: input.form.startDate ? `${input.form.startDate} 08:30:00` : '',
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
  }
}

const updateEntityFromInput = (entity: AdmissionRoundEntity, input: AdmissionRoundUpdateInput) => {
  const statusMeta = buildStatusMeta(input.form.status)

  entity.sessionValue = input.form.session || ''
  entity.sessionName = resolveLabel(sessionOptions, input.form.session, entity.sessionName)
  entity.roundValue = input.form.round || ''
  entity.roundName = resolveLabel(roundOptions, input.form.round, entity.roundName)
  entity.criteriaValue = input.form.criteria || ''
  entity.criteriaName = resolveLabel(criteriaOptions, input.form.criteria, entity.criteriaName)
  entity.startDate = input.form.startDate || ''
  entity.endDate = input.form.endDate || ''
  entity.statusValue = statusMeta.value
  entity.statusLabel = statusMeta.label
  entity.statusTone = statusMeta.tone
  entity.updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ')

  if (entity.statusValue !== 'deleted') {
    entity.deletedAt = undefined
  }
}

export const apiVongTuyenSinh = {
  async getAdmissionRounds(query: AdmissionRoundListQuery = {}): Promise<KyTuyenSinhListPageData> {
    await delay(MOCK_DELAY)

    return {
      metrics: apiVongTuyenSinh.getRoundMetrics(),
      rounds: apiVongTuyenSinh.listAdmissionRounds(query),
      statusOptions: apiVongTuyenSinh.getStatusOptions()
    }
  },

  async getDeletedAdmissionRounds(query: AdmissionRoundListQuery = {}): Promise<KyTuyenSinhDeletedPageData> {
    await delay(MOCK_DELAY)

    return {
      rounds: apiVongTuyenSinh.listDeletedAdmissionRounds(query),
      statusOptions: apiVongTuyenSinh.getDeletedStatusOptions()
    }
  },

  async getAdmissionRoundDetailPage(id: string, criteriaQuery: CriteriaListQuery = {}): Promise<KyTuyenSinhDetailPageData> {
    await delay(MOCK_DELAY)

    return {
      detail: apiVongTuyenSinh.getAdmissionRoundDetail(id),
      metrics: apiVongTuyenSinh.getDetailMetrics(),
      criteriaRecords: apiVongTuyenSinh.getCriteriaRecordsByRound(id, criteriaQuery),
      statusOptions: apiVongTuyenSinh.getStatusOptions()
    }
  },

  async getCreateFormData(): Promise<KyTuyenSinhCreatePageData> {
    await delay(MOCK_DELAY)

    return {
      options: apiVongTuyenSinh.getFormOptions(),
      initialForm: apiVongTuyenSinh.getDefaultCreateForm()
    }
  },

  async getEditFormData(id: string): Promise<KyTuyenSinhEditPageData> {
    await delay(MOCK_DELAY)

    return {
      options: apiVongTuyenSinh.getFormOptions(),
      initialData: apiVongTuyenSinh.getEditSeed(id)
    }
  },

  getFormOptions(): KyTuyenSinhFormOptions {
    return cloneData(defaultFormOptions)
  },

  getDefaultCreateForm(): RoundFormPayload {
    return defaultCreateForm()
  },

  getRoundMetrics(): MetricCardItem[] {
    return cloneData(roundMetricsStore)
  },

  getDetailMetrics(): MetricCardItem[] {
    return cloneData(detailMetricsStore)
  },

  listAdmissionRounds(query: AdmissionRoundListQuery = {}): PaginationResult<AdmissionRoundRecord> {
    const activeRounds = admissionRoundStore.filter((item) => !item.deletedAt)
    const filtered = filterRounds(activeRounds, query).map(mapEntityToListRecord)

    return paginate(filtered, query.page, query.pageSize)
  },

  listDeletedAdmissionRounds(query: AdmissionRoundListQuery = {}): PaginationResult<AdmissionRoundRecord> {
    const deletedRounds = admissionRoundStore.filter((item) => !!item.deletedAt)
    const filtered = filterRounds(deletedRounds, query).map(mapEntityToListRecord)

    return paginate(filtered, query.page, query.pageSize)
  },

  getAdmissionRoundDetail(id: string): AdmissionRoundDetailRecord | null {
    const found = admissionRoundStore.find((item) => item.id === id)
    return found ? mapEntityToDetailRecord(found) : null
  },

  getEditSeed(id: string): KyTuyenSinhEditSeed | null {
    const found = admissionRoundStore.find((item) => item.id === id)
    if (!found) {
      return null
    }

    const criteriaEditor = roundCriteriaStore.get(id) || createCriteriaTemplateForRound(found)

    return {
      form: {
        session: found.sessionValue,
        round: found.roundValue,
        criteria: found.criteriaValue,
        startDate: found.startDate,
        endDate: found.endDate,
        status: found.statusValue
      },
      criteriaMaster: cloneData(criteriaEditor.criteriaMaster),
      criteriaLines: cloneData(criteriaEditor.criteriaLines)
    }
  },

  createAdmissionRound(input: AdmissionRoundCreateInput): AdmissionRoundDetailRecord {
    const entity = createEntityFromInput(input)
    admissionRoundStore.push(entity)
    roundCriteriaStore.set(entity.id, createCriteriaTemplateForRound(entity))
    bumpRoundMetricTotal(1)
    reindexRounds(false)

    return mapEntityToDetailRecord(entity)
  },

  updateAdmissionRound(id: string, input: AdmissionRoundUpdateInput): AdmissionRoundDetailRecord | null {
    const found = admissionRoundStore.find((item) => item.id === id)
    if (!found) {
      return null
    }

    updateEntityFromInput(found, input)
    found.criteriaName = input.criteriaMaster.name || found.criteriaName
    roundCriteriaStore.set(id, {
      criteriaMaster: cloneData(input.criteriaMaster),
      criteriaLines: cloneData(input.criteriaLines)
    })

    return mapEntityToDetailRecord(found)
  },

  softDeleteAdmissionRound(id: string): boolean {
    const found = admissionRoundStore.find((item) => item.id === id && !item.deletedAt)
    if (!found) {
      return false
    }

    found.statusValue = 'deleted'
    found.statusLabel = 'Đã xóa'
    found.statusTone = 'inactive'
    found.deletedAt = '04/03/2026 12:00'
    found.updatedAt = '2026-03-04 12:00:00'
    bumpRoundMetricTotal(-1)
    reindexRounds(false)
    reindexRounds(true)

    return true
  },

  restoreAdmissionRound(id: string): boolean {
    const found = admissionRoundStore.find((item) => item.id === id && !!item.deletedAt)
    if (!found) {
      return false
    }

    const statusMeta = buildStatusMeta('active')
    found.statusValue = statusMeta.value
    found.statusLabel = statusMeta.label
    found.statusTone = statusMeta.tone
    found.deletedAt = undefined
    found.updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ')
    bumpRoundMetricTotal(1)
    reindexRounds(false)
    reindexRounds(true)

    return true
  },

  removeDeletedAdmissionRound(id: string): boolean {
    const targetIndex = admissionRoundStore.findIndex((item) => item.id === id && !!item.deletedAt)
    if (targetIndex === -1) {
      return false
    }

    admissionRoundStore.splice(targetIndex, 1)
    roundCriteriaStore.delete(id)
    reindexRounds(true)

    return true
  },

  getCriteriaRecordsByRound(roundId: string, query: CriteriaListQuery = {}): CriteriaRecord[] {
    return filterCriteriaRecords(buildCriteriaRecordForRound(roundId), query)
  },

  getDeletedStatusOptions(): SelectOption[] {
    return cloneData(deletedStatusOptions)
  },

  getStatusOptions(): SelectOption[] {
    return cloneData(statusOptions)
  }
}
