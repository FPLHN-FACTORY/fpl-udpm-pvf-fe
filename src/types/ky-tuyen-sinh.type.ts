export type StatusTone = 'active' | 'warning' | 'inactive' | 'info'

export type AdmissionRoundStatusValue = 'active' | 'inactive' | 'pending' | 'deleted'

export interface SelectOption {
  label: string
  value: string
}

export interface MetricCardItem {
  label: string
  value: number | string
  change?: string
  icon: string
  iconColor: string
  iconBackground: string
}

export interface CriteriaRecord {
  key: string
  order: number
  name: string
  description: string
  statusLabel: string
  statusTone: StatusTone
}

export interface CriteriaLine {
  id: number
  name: string
  description: string
  weight: string
}

export interface CriteriaMasterRecord {
  name: string
  status: string
  description: string
}

export interface AdmissionRoundEntity {
  id: string
  order: number
  sessionValue: string
  sessionName: string
  roundValue: string
  roundName: string
  criteriaValue: string
  criteriaName: string
  startDate: string
  endDate: string
  statusValue: AdmissionRoundStatusValue
  statusLabel: string
  statusTone: StatusTone
  centerDeadline: string
  updatedAt: string
  deletedAt?: string
}

export interface AdmissionRoundRecord {
  key: string
  order: number
  sessionName: string
  roundName: string
  startDate: string
  endDate: string
  statusValue: AdmissionRoundStatusValue
  statusLabel: string
  statusTone: StatusTone
  deletedAt?: string
}

export interface AdmissionRoundDetailRecord extends AdmissionRoundRecord {
  sessionValue: string
  roundValue: string
  criteriaValue: string
  criteriaName: string
  centerDeadline: string
  updatedAt: string
}

export interface RoundFormPayload {
  session: string | undefined
  round: string | undefined
  criteria: string | undefined
  startDate: string | null
  endDate: string | null
  status: string | undefined
}

export interface RoundFormViewState {
  session: string | undefined
  round: string | undefined
  criteria: string | undefined
  startDate: string | null
  endDate: string | null
  status: string | undefined
}

export interface KyTuyenSinhEditSeed {
  form: RoundFormPayload
  criteriaMaster: CriteriaMasterRecord
  criteriaLines: CriteriaLine[]
}

export interface AdmissionRoundCreateInput {
  form: RoundFormPayload
}

export interface AdmissionRoundUpdateInput {
  form: RoundFormPayload
  criteriaMaster: CriteriaMasterRecord
  criteriaLines: CriteriaLine[]
}

export interface AdmissionRoundListQuery {
  keyword?: string
  date?: string | null
  status?: string
  page?: number
  pageSize?: number
}

export interface CriteriaListQuery {
  keyword?: string
  status?: string
}

export interface PaginationResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

export interface KyTuyenSinhFormOptions {
  sessionOptions: SelectOption[]
  roundOptions: SelectOption[]
  criteriaOptions: SelectOption[]
  statusOptions: SelectOption[]
}

export interface KyTuyenSinhFilterPayload {
  keyword: string
  date: string | null
  stage: string | undefined
  assignee: string | undefined
  status: string | undefined
}

export interface KyTuyenSinhListPageData {
  metrics: MetricCardItem[]
  rounds: PaginationResult<AdmissionRoundRecord>
  statusOptions: SelectOption[]
}

export interface KyTuyenSinhDeletedPageData {
  rounds: PaginationResult<AdmissionRoundRecord>
  statusOptions: SelectOption[]
}

export interface KyTuyenSinhDetailPageData {
  detail: AdmissionRoundDetailRecord | null
  metrics: MetricCardItem[]
  criteriaRecords: CriteriaRecord[]
  statusOptions: SelectOption[]
}

export interface KyTuyenSinhCreatePageData {
  options: KyTuyenSinhFormOptions
  initialForm: RoundFormPayload
}

export interface KyTuyenSinhEditPageData {
  options: KyTuyenSinhFormOptions
  initialData: KyTuyenSinhEditSeed | null
}
