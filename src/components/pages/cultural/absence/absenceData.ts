import { computed, ref } from 'vue'

export interface AbsenceRequestRecord {
  id: number
  code: string
  order: number
  studentId: string
  listStudentName: string
  detailStudentName: string
  submittedAt: string
  detailSubmittedAt: string
  startDate: string
  endDate: string
  detailStartDate: string
  detailEndDate: string
  reason: string
  fileName: string
  updatedAt: string
  deletedAt?: string
  status: 'Chấp nhận' | 'Chờ xác nhận'
}

export interface AbsenceStudentOption {
  value: string
  label: string
}

export interface AbsenceStatistic {
  title: string
  value: string
  hint?: string
  accent: 'purple' | 'orange' | 'amber' | 'gold'
  iconName: 'BxStatsTile' | 'BxCalendarCheck' | 'BxLayersMinus' | 'BxLayersPlus'
}

export interface AbsenceDetailRow {
  title: string
  value: string
  type?: 'file' | 'status'
}

type AbsenceSeed = {
  studentId: string
  submittedAt: string
  startDate: string
  endDate: string
  reason: string
  fileName: string
  status?: 'Chấp nhận' | 'Chờ xác nhận'
  updatedAt?: string
  deletedAt?: string
}

export const absenceStudentOptions: AbsenceStudentOption[] = [
  { value: 'hv-1', label: 'Nguyễn Văn An' },
  { value: 'hv-2', label: 'Nguyễn Văn Bình' },
  { value: 'hv-3', label: 'Trần Quốc Huy' },
  { value: 'hv-4', label: 'Lê Minh Khang' },
  { value: 'hv-5', label: 'Phạm Gia Hưng' },
  { value: 'hv-6', label: 'Đỗ Nhật Nam' },
  { value: 'hv-7', label: 'Bùi Thành Công' },
  { value: 'hv-8', label: 'Hoàng Đức Long' }
]

const studentNameById = new Map(absenceStudentOptions.map((student) => [student.value, student.label]))

const activeAbsenceSeeds: AbsenceSeed[] = [
  { studentId: 'hv-1', submittedAt: '2025-01-02', startDate: '2025-02-01', endDate: '2025-02-03', reason: 'Lịch cá nhân', fileName: 'don-nghi-01.pdf' },
  { studentId: 'hv-2', submittedAt: '2025-01-04', startDate: '2025-02-05', endDate: '2025-02-08', reason: 'Khám sức khỏe định kỳ', fileName: 'don-nghi-02.pdf' },
  { studentId: 'hv-3', submittedAt: '2025-01-05', startDate: '2025-02-10', endDate: '2025-02-12', reason: 'Nghỉ ốm', fileName: 'don-nghi-03.pdf' },
  { studentId: 'hv-4', submittedAt: '2025-01-07', startDate: '2025-02-14', endDate: '2025-02-16', reason: 'Việc gia đình', fileName: 'don-nghi-04.pdf' },
  { studentId: 'hv-5', submittedAt: '2025-01-08', startDate: '2025-02-18', endDate: '2025-02-19', reason: 'Tham gia thi đấu', fileName: 'don-nghi-05.pdf' },
  { studentId: 'hv-6', submittedAt: '2025-01-10', startDate: '2025-02-20', endDate: '2025-02-22', reason: 'Nghỉ dưỡng sức', fileName: 'don-nghi-06.pdf' },
  { studentId: 'hv-7', submittedAt: '2025-01-11', startDate: '2025-02-24', endDate: '2025-02-25', reason: 'Khám răng hàm mặt', fileName: 'don-nghi-07.pdf' },
  { studentId: 'hv-8', submittedAt: '2025-01-12', startDate: '2025-02-26', endDate: '2025-02-28', reason: 'Công việc cá nhân', fileName: 'don-nghi-08.pdf' },
  { studentId: 'hv-1', submittedAt: '2025-01-14', startDate: '2025-03-01', endDate: '2025-03-03', reason: 'Về quê có việc', fileName: 'don-nghi-09.pdf' },
  { studentId: 'hv-2', submittedAt: '2025-01-15', startDate: '2025-03-04', endDate: '2025-03-06', reason: 'Nghỉ ốm', fileName: 'don-nghi-10.pdf' },
  { studentId: 'hv-3', submittedAt: '2025-01-16', startDate: '2025-03-07', endDate: '2025-03-08', reason: 'Bảo lưu buổi học', fileName: 'don-nghi-11.pdf' },
  { studentId: 'hv-4', submittedAt: '2025-01-18', startDate: '2025-03-10', endDate: '2025-03-12', reason: 'Tham gia sự kiện trường', fileName: 'don-nghi-12.pdf' },
  { studentId: 'hv-5', submittedAt: '2025-01-19', startDate: '2025-03-13', endDate: '2025-03-15', reason: 'Đi kiểm tra sức khỏe', fileName: 'don-nghi-13.pdf' },
  { studentId: 'hv-6', submittedAt: '2025-01-20', startDate: '2025-03-16', endDate: '2025-03-17', reason: 'Việc nhà đột xuất', fileName: 'don-nghi-14.pdf' },
  { studentId: 'hv-7', submittedAt: '2025-01-22', startDate: '2025-03-18', endDate: '2025-03-20', reason: 'Tham gia giải phong trào', fileName: 'don-nghi-15.pdf' },
  { studentId: 'hv-8', submittedAt: '2025-01-23', startDate: '2025-03-21', endDate: '2025-03-22', reason: 'Nghỉ dưỡng sức', fileName: 'don-nghi-16.pdf' },
  { studentId: 'hv-1', submittedAt: '2025-01-24', startDate: '2025-03-24', endDate: '2025-03-26', reason: 'Khám chuyên khoa', fileName: 'don-nghi-17.pdf' },
  { studentId: 'hv-3', submittedAt: '2025-01-25', startDate: '2025-03-27', endDate: '2025-03-28', reason: 'Lịch gia đình', fileName: 'don-nghi-18.pdf' },
  { studentId: 'hv-5', submittedAt: '2025-01-27', startDate: '2025-03-29', endDate: '2025-03-31', reason: 'Nghỉ ốm', fileName: 'don-nghi-19.pdf' },
  { studentId: 'hv-7', submittedAt: '2025-01-29', startDate: '2025-04-02', endDate: '2025-04-04', reason: 'Việc cá nhân', fileName: 'don-nghi-20.pdf' },
  { studentId: 'hv-4', submittedAt: '2025-01-31', startDate: '2025-04-05', endDate: '2025-04-06', reason: 'Chờ xác nhận lịch thi đấu', fileName: 'don-nghi-21.pdf', status: 'Chờ xác nhận' }
]

const deletedAbsenceSeeds: AbsenceSeed[] = [
  { studentId: 'hv-2', submittedAt: '2025-01-01', startDate: '2025-02-01', endDate: '2025-02-02', reason: 'Nghỉ khám bệnh', fileName: 'don-da-xoa-01.pdf', deletedAt: '2025-03-02 07:20' },
  { studentId: 'hv-6', submittedAt: '2025-01-09', startDate: '2025-02-09', endDate: '2025-02-10', reason: 'Việc gia đình', fileName: 'don-da-xoa-02.pdf', deletedAt: '2025-03-03 09:10' }
]

function getStudentLabel(studentId: string) {
  return studentNameById.get(studentId) ?? 'Nguyễn Văn An'
}

function buildRecord(seed: AbsenceSeed, index: number, offset = 0): AbsenceRequestRecord {
  const studentName = getStudentLabel(seed.studentId)
  const id = offset + index + 1

  return {
    id,
    code: String(id),
    order: index + 1,
    studentId: seed.studentId,
    listStudentName: studentName,
    detailStudentName: studentName.toUpperCase(),
    submittedAt: seed.submittedAt,
    detailSubmittedAt: seed.submittedAt,
    startDate: seed.startDate,
    endDate: seed.endDate,
    detailStartDate: seed.startDate,
    detailEndDate: seed.endDate,
    reason: seed.reason,
    fileName: seed.fileName,
    updatedAt: seed.updatedAt ?? `${seed.submittedAt} 10:15:45`,
    deletedAt: seed.deletedAt,
    status: seed.status ?? 'Chấp nhận'
  }
}

const activeAbsenceRequests = ref<AbsenceRequestRecord[]>(
  activeAbsenceSeeds.map((seed, index) => buildRecord(seed, index))
)

const deletedAbsenceRequests = ref<AbsenceRequestRecord[]>(
  deletedAbsenceSeeds.map((seed, index) => buildRecord(seed, index, 100))
)

let nextAbsenceId = activeAbsenceRequests.value.length + 1

export function useAbsenceStatistics() {
  return computed<AbsenceStatistic[]>(() => {
    const totalCount = activeAbsenceRequests.value.length
    const acceptedCount = activeAbsenceRequests.value.filter((item) => item.status === 'Chấp nhận').length
    const pendingCount = activeAbsenceRequests.value.filter((item) => item.status === 'Chờ xác nhận').length

    return [
      { title: 'Tổng số đơn', value: String(totalCount), accent: 'purple', iconName: 'BxStatsTile' },
      { title: 'Số đơn mới', value: String(acceptedCount), hint: '(95%)', accent: 'orange', iconName: 'BxCalendarCheck' },
      { title: 'Số đơn chưa xử lý', value: String(pendingCount), hint: '(5%)', accent: 'amber', iconName: 'BxLayersMinus' },
      { title: 'Số đơn đã xử lý', value: String(totalCount), hint: '(5%)', accent: 'gold', iconName: 'BxLayersPlus' }
    ]
  })
}

export function findAbsenceRequestById(id: string | number) {
  return (
    activeAbsenceRequests.value.find((item) => String(item.id) === String(id))
    ?? deletedAbsenceRequests.value.find((item) => String(item.id) === String(id))
    ?? activeAbsenceRequests.value[0]
  )
}

export function buildAbsenceDetailRows(request: AbsenceRequestRecord): AbsenceDetailRow[] {
  return [
    { title: 'Mã Đơn xin phép', value: request.code },
    { title: 'Học viên', value: request.detailStudentName },
    { title: 'Ngày gửi đơn', value: request.detailSubmittedAt },
    { title: 'Ngày bắt đầu nghỉ', value: request.detailStartDate },
    { title: 'Ngày kết thúc nghỉ', value: request.detailEndDate },
    { title: 'Lý do nghỉ', value: request.reason },
    { title: 'Đường dẫn file scan đơn nghỉ', value: request.fileName, type: 'file' },
    { title: 'Thời gian cập nhật', value: request.updatedAt },
    { title: 'Trạng thái', value: request.status, type: 'status' }
  ]
}

export function createAbsenceRequest(payload: {
  studentId?: string
  startDate?: string
  endDate?: string
  reason?: string
  fileName?: string
}) {
  const studentId = payload.studentId ?? 'hv-1'
  const studentName = getStudentLabel(studentId)
  const newRecord: AbsenceRequestRecord = {
    id: nextAbsenceId,
    code: String(nextAbsenceId),
    order: activeAbsenceRequests.value.length + 1,
    studentId,
    listStudentName: studentName,
    detailStudentName: studentName.toUpperCase(),
    submittedAt: '2025-02-01',
    detailSubmittedAt: '2025-02-01',
    startDate: payload.startDate || '2025-04-08',
    endDate: payload.endDate || '2025-04-10',
    detailStartDate: payload.startDate || '2025-04-08',
    detailEndDate: payload.endDate || '2025-04-10',
    reason: payload.reason || 'Lý do nghỉ',
    fileName: payload.fileName || 'don-moi.pdf',
    updatedAt: '2025-02-01 09:30:00',
    status: 'Chấp nhận'
  }

  nextAbsenceId += 1
  activeAbsenceRequests.value.unshift(newRecord)
  activeAbsenceRequests.value = activeAbsenceRequests.value.map((item, index) => ({
    ...item,
    order: index + 1
  }))
  return newRecord
}

export function updateAbsenceRequest(
  id: string | number,
  payload: {
    studentId?: string
    studentName?: string
    startDate?: string
    endDate?: string
    reason?: string
    fileName?: string
  }
) {
  const target = activeAbsenceRequests.value.find((item) => String(item.id) === String(id))
  if (!target) {
    return null
  }

  const studentId = payload.studentId || target.studentId
  const studentLabel = payload.studentName?.trim() || getStudentLabel(studentId)

  target.studentId = studentId
  target.listStudentName = studentLabel
  target.detailStudentName = studentLabel.toUpperCase()
  target.startDate = payload.startDate || target.startDate
  target.endDate = payload.endDate || target.endDate
  target.detailStartDate = payload.startDate || target.detailStartDate
  target.detailEndDate = payload.endDate || target.detailEndDate
  target.reason = payload.reason || target.reason
  target.fileName = payload.fileName || target.fileName
  target.updatedAt = '2025-02-05 14:20:00'

  return target
}

export function softDeleteAbsenceRequest(id: number) {
  const targetIndex = activeAbsenceRequests.value.findIndex((item) => item.id === id)
  if (targetIndex === -1) {
    return
  }

  const [removed] = activeAbsenceRequests.value.splice(targetIndex, 1)
  deletedAbsenceRequests.value.unshift({
    ...removed,
    order: 1,
    deletedAt: '2025-03-02 07:20'
  })

  activeAbsenceRequests.value = activeAbsenceRequests.value.map((item, index) => ({
    ...item,
    order: index + 1
  }))

  deletedAbsenceRequests.value = deletedAbsenceRequests.value.map((item, index) => ({
    ...item,
    order: index + 1
  }))
}

export function useAbsenceData() {
  return {
    activeAbsenceRequests,
    deletedAbsenceRequests
  }
}
