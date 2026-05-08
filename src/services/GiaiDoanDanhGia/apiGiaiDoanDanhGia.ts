import type { MetricCardItem, PaginationResult, SelectOption, StatusTone } from '../../types'

export type EvaluationStageStatusValue = 'active' | 'inactive' | 'pending' | 'deleted'

export interface EvaluationStageFormPayload {
  activityName: string
  stageValue: string | undefined
  courseValue: string | undefined
  formValue: string | undefined
  startDate: string | null
  endDate: string | null
  status: EvaluationStageStatusValue | undefined
}

export interface EvaluationStageRecord {
  key: string
  order: number
  stageName: string
  courseName: string
  formName: string
  startAt: string
  endAt: string
  statusValue: EvaluationStageStatusValue
  statusLabel: string
  statusTone: StatusTone
  deletedAt?: string
}

export interface EvaluationStageDetailRecord extends EvaluationStageRecord {
  id: string
  activityName: string
  createdAt: string
  updatedAt: string
}

export interface EvaluationStageStudentRecord {
  key: string
  order: number
  studentName: string
  studentCode: string
  stageName: string
  evaluator: string
  totalScore: string
  statusLabel: string
  statusTone: StatusTone
}

export interface EvaluationStageListQuery {
  keyword?: string
  date?: string | null
  status?: string
  page?: number
  pageSize?: number
}

export interface EvaluationStageFormOptions {
  stageOptions: SelectOption[]
  courseOptions: SelectOption[]
  formOptions: SelectOption[]
  statusOptions: SelectOption[]
}

interface EvaluationStageEntity extends EvaluationStageDetailRecord {
  stageValue: string
  courseValue: string
  formValue: string
}

const MOCK_DELAY = 120
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const cloneData = <T>(data: T): T => JSON.parse(JSON.stringify(data)) as T
const normalizeText = (value: string) => value.trim().toLowerCase()

const stageOptions: SelectOption[] = [
  { label: 'Sơ tuyển U13', value: 'so-tuyen-u13' },
  { label: 'Đánh giá chuyên môn U15', value: 'chuyen-mon-u15' },
  { label: 'Đánh giá thể lực U17', value: 'the-luc-u17' }
]

const courseOptions: SelectOption[] = [
  { label: 'PVF 2025', value: 'pvf-2025' },
  { label: 'PVF 2026', value: 'pvf-2026' }
]

const formOptions: SelectOption[] = [
  { label: 'Form PVF U13 v1.0', value: 'form-u13-v1' },
  { label: 'Form PVF U15 v1.0', value: 'form-u15-v1' },
  { label: 'Form PVF thể lực', value: 'form-fitness' }
]

const statusOptions: SelectOption[] = [
  { label: 'Đang diễn ra', value: 'active' },
  { label: 'Chưa bắt đầu', value: 'pending' },
  { label: 'Đã khóa', value: 'inactive' }
]

const deletedStatusOptions: SelectOption[] = [{ label: 'Đã xóa', value: 'deleted' }]

const metrics: MetricCardItem[] = [
  { label: 'Tổng số giai đoạn', value: 21, icon: 'BxSpreadsheet', iconColor: 'text-[#696cff]', iconBackground: 'bg-[#ececff]' },
  { label: 'Số giai đoạn đang diễn ra', value: 20, change: '(95%)', icon: 'BxCalendarCheck', iconColor: 'text-[#ff3e1d]', iconBackground: 'bg-[#ffe4df]' },
  { label: 'Số học viên đã đánh giá', value: 1, change: '(5%)', icon: 'BxLayer', iconColor: 'text-[#ffab00]', iconBackground: 'bg-[#fff1d6]' }
]

const evaluatedStudents: EvaluationStageStudentRecord[] = [
  { key: '1', order: 1, studentName: 'Nguyễn Văn An', studentCode: 'HV124', stageName: 'Sơ tuyển U13', evaluator: 'HLV A', totalScore: '7.8', statusLabel: 'Đã khóa', statusTone: 'active' },
  { key: '2', order: 2, studentName: 'Nguyễn Văn An', studentCode: 'HV124', stageName: 'Sơ tuyển U13', evaluator: 'HLV A', totalScore: '7.8', statusLabel: 'Đã khóa', statusTone: 'active' }
]

let stageStore: EvaluationStageEntity[] = [
  ...Array.from({ length: 9 }, (_, index) => ({
    key: String(index + 1),
    id: `UT${String(index + 1).padStart(4, '0')}`,
    order: index + 1,
    activityName: 'Đánh giá học viên U13',
    stageValue: 'so-tuyen-u13',
    stageName: 'Sơ tuyển U13',
    courseValue: 'pvf-2025',
    courseName: 'PVF 2025',
    formValue: 'form-u13-v1',
    formName: 'Form PVF U13 v1.0',
    startAt: '15/03/2025 08:00',
    endAt: '15/03/2025 17:00',
    statusValue: index > 6 ? 'pending' as const : 'active' as const,
    statusLabel: index > 6 ? 'Chưa bắt đầu' : 'Đang diễn ra',
    statusTone: index > 6 ? 'info' as const : 'active' as const,
    createdAt: '2025-01-05 08:30:00',
    updatedAt: '2026-01-20 10:15:45'
  })),
  ...Array.from({ length: 4 }, (_, index) => ({
    key: String(index + 20),
    id: `UT${String(index + 20).padStart(4, '0')}`,
    order: index + 1,
    activityName: 'Đánh giá học viên U13',
    stageValue: 'so-tuyen-u13',
    stageName: 'Sơ tuyển U13',
    courseValue: 'pvf-2025',
    courseName: 'PVF 2025',
    formValue: 'form-u13-v1',
    formName: 'Form PVF U13 v1.0',
    startAt: '15/03/2025 08:00',
    endAt: '15/03/2025 17:00',
    statusValue: 'deleted' as const,
    statusLabel: 'Đã xóa',
    statusTone: 'inactive' as const,
    createdAt: '2025-01-05 08:30:00',
    updatedAt: '2026-03-04 12:00:00',
    deletedAt: '10/10/2025 8:20'
  }))
]

const paginate = <T>(items: T[], page = 1, pageSize = 10): PaginationResult<T> => {
  const size = Math.max(pageSize, 1)
  const totalPages = Math.max(Math.ceil(items.length / size), 1)
  const normalizedPage = Math.min(Math.max(page, 1), totalPages)
  const start = (normalizedPage - 1) * size
  return { items: items.slice(start, start + size), total: items.length, page: normalizedPage, pageSize: size }
}

const resolveLabel = (options: SelectOption[], value: string | undefined, fallback: string) =>
  options.find((option) => option.value === value)?.label || fallback

const buildStatusMeta = (status: EvaluationStageStatusValue | undefined) => {
  if (status === 'pending') return { value: 'pending' as const, label: 'Chưa bắt đầu', tone: 'info' as StatusTone }
  if (status === 'inactive') return { value: 'inactive' as const, label: 'Đã khóa', tone: 'warning' as StatusTone }
  if (status === 'deleted') return { value: 'deleted' as const, label: 'Đã xóa', tone: 'inactive' as StatusTone }
  return { value: 'active' as const, label: 'Đang diễn ra', tone: 'active' as StatusTone }
}

const filterStages = (items: EvaluationStageEntity[], query: EvaluationStageListQuery = {}) => {
  const keyword = normalizeText(query.keyword || '')
  return items.filter((item) => {
    const matchKeyword = !keyword || [item.stageName, item.courseName, item.formName].some((field) => normalizeText(field).includes(keyword))
    const matchStatus = !query.status || item.statusValue === query.status
    const matchDate = !query.date || item.startAt.includes(query.date) || item.endAt.includes(query.date)
    return matchKeyword && matchStatus && matchDate
  })
}

const mapRecord = (item: EvaluationStageEntity): EvaluationStageRecord => ({
  key: item.key,
  order: item.order,
  stageName: item.stageName,
  courseName: item.courseName,
  formName: item.formName,
  startAt: item.startAt,
  endAt: item.endAt,
  statusValue: item.statusValue,
  statusLabel: item.statusLabel,
  statusTone: item.statusTone,
  deletedAt: item.deletedAt
})

const reindexStages = (deleted: boolean) => {
  stageStore.filter((item) => deleted ? item.deletedAt : !item.deletedAt).forEach((item, index) => {
    item.order = index + 1
  })
}

const toDisplayDateTime = (date: string | null, time: string) => date ? `${date.split('-').reverse().join('/')} ${time}` : ''

const createEntity = (form: EvaluationStageFormPayload): EvaluationStageEntity => {
  const nextKey = String(Math.max(...stageStore.map((item) => Number(item.key)), 0) + 1)
  const status = buildStatusMeta(form.status)
  return {
    key: nextKey,
    id: `UT${nextKey.padStart(4, '0')}`,
    order: stageStore.filter((item) => !item.deletedAt).length + 1,
    activityName: form.activityName,
    stageValue: form.stageValue || '',
    stageName: resolveLabel(stageOptions, form.stageValue, 'Giai đoạn đánh giá mới'),
    courseValue: form.courseValue || '',
    courseName: resolveLabel(courseOptions, form.courseValue, 'PVF 2025'),
    formValue: form.formValue || '',
    formName: resolveLabel(formOptions, form.formValue, 'Form PVF'),
    startAt: toDisplayDateTime(form.startDate, '08:00'),
    endAt: toDisplayDateTime(form.endDate, '17:00'),
    statusValue: status.value,
    statusLabel: status.label,
    statusTone: status.tone,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
  }
}

export const apiGiaiDoanDanhGia = {
  async getFormOptions(): Promise<EvaluationStageFormOptions> {
    await delay(MOCK_DELAY)
    return cloneData({ stageOptions, courseOptions, formOptions, statusOptions })
  },
  async getDefaultForm(): Promise<EvaluationStageFormPayload> {
    await delay(MOCK_DELAY)
    return { activityName: '', stageValue: undefined, courseValue: undefined, formValue: undefined, startDate: null, endDate: null, status: undefined }
  },
  async listStages(query: EvaluationStageListQuery = {}) {
    await delay(MOCK_DELAY)
    const items = filterStages(stageStore.filter((item) => !item.deletedAt), query).map(mapRecord)
    return { metrics: cloneData(metrics), stages: paginate(items, query.page, query.pageSize), statusOptions: cloneData(statusOptions) }
  },
  async listDeletedStages(query: EvaluationStageListQuery = {}) {
    await delay(MOCK_DELAY)
    const items = filterStages(stageStore.filter((item) => item.deletedAt), query).map(mapRecord)
    return { stages: paginate(items, query.page, query.pageSize), statusOptions: cloneData(deletedStatusOptions) }
  },
  async getStageDetail(id: string) {
    await delay(MOCK_DELAY)
    const found = stageStore.find((item) => item.key === id)
    return { detail: found ? cloneData(found) : null, students: cloneData(evaluatedStudents), statusOptions: cloneData(statusOptions) }
  },
  async getEditForm(id: string): Promise<EvaluationStageFormPayload | null> {
    await delay(MOCK_DELAY)
    const found = stageStore.find((item) => item.key === id)
    return found ? {
      activityName: found.activityName,
      stageValue: found.stageValue,
      courseValue: found.courseValue,
      formValue: found.formValue,
      startDate: found.startAt.slice(0, 10).split('/').reverse().join('-'),
      endDate: found.endAt.slice(0, 10).split('/').reverse().join('-'),
      status: found.statusValue
    } : null
  },
  async createStage(form: EvaluationStageFormPayload) {
    await delay(MOCK_DELAY)
    const entity = createEntity(form)
    stageStore.push(entity)
    reindexStages(false)
    return cloneData(entity)
  },
  async updateStage(id: string, form: EvaluationStageFormPayload) {
    await delay(MOCK_DELAY)
    const found = stageStore.find((item) => item.key === id)
    if (!found) return null
    const status = buildStatusMeta(form.status)
    found.activityName = form.activityName
    found.stageValue = form.stageValue || ''
    found.stageName = resolveLabel(stageOptions, form.stageValue, found.stageName)
    found.courseValue = form.courseValue || ''
    found.courseName = resolveLabel(courseOptions, form.courseValue, found.courseName)
    found.formValue = form.formValue || ''
    found.formName = resolveLabel(formOptions, form.formValue, found.formName)
    found.startAt = toDisplayDateTime(form.startDate, '08:00')
    found.endAt = toDisplayDateTime(form.endDate, '17:00')
    found.statusValue = status.value
    found.statusLabel = status.label
    found.statusTone = status.tone
    found.updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ')
    return cloneData(found)
  },
  async deleteStage(id: string) {
    await delay(MOCK_DELAY)
    const found = stageStore.find((item) => item.key === id && !item.deletedAt)
    if (!found) return false
    found.deletedAt = '10/10/2025 8:20'
    found.statusValue = 'deleted'
    found.statusLabel = 'Đã xóa'
    found.statusTone = 'inactive'
    reindexStages(false)
    reindexStages(true)
    return true
  },
  async restoreStage(id: string) {
    await delay(MOCK_DELAY)
    const found = stageStore.find((item) => item.key === id && item.deletedAt)
    if (!found) return false
    const status = buildStatusMeta('active')
    found.deletedAt = undefined
    found.statusValue = status.value
    found.statusLabel = status.label
    found.statusTone = status.tone
    reindexStages(false)
    reindexStages(true)
    return true
  },
  async removeDeletedStage(id: string) {
    await delay(MOCK_DELAY)
    const index = stageStore.findIndex((item) => item.key === id && item.deletedAt)
    if (index === -1) return false
    stageStore.splice(index, 1)
    reindexStages(true)
    return true
  }
}
