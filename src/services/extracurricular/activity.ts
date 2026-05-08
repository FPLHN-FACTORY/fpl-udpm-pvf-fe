// fpl-udpm-pvf-fe/src/services/extracurricular/activity.ts

export interface ActivityRecord {
  id: string
  name: string
  location: string
  teacher: string
  teacherId: string
  start: string
  end: string
  status: 'Đang diễn ra' | 'Sắp diễn ra' | 'Đã hoàn thành'
  description?: string
  note?: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
}

export interface StudentActivity {
  id: string
  code: string
  name: string
  email: string
  joinedDate: string
  status: string
}

const mockActivities: ActivityRecord[] = [
  { id: 'UT1301', name: 'Giải đấu nội bộ U13', location: 'Sân tập số 1 PVF', teacher: 'Trần Minh Tuấn', teacherId: '1', start: '15/03/2025 08:00', end: '15/03/2025 17:00', status: 'Đang diễn ra', description: 'Tổ chức thi đấu giao hữu giữa các đội U13', note: 'Yêu cầu mặc đồng phục thi đấu', createdAt: '2025-01-05 08:30:00', updatedAt: '2026-01-20 10:15:45' },
  { id: 'UT1302', name: 'Giao hữu quốc tế U15', location: 'Sân tập số 2 PVF', teacher: 'Nguyễn Văn Hùng', teacherId: '2', start: '20/03/2025 08:00', end: '20/03/2025 17:00', status: 'Đang diễn ra', description: 'Giao hữu với đội trẻ Hàn Quốc', note: 'Chuẩn bị thể lực tốt', createdAt: '2025-01-10 08:30:00', updatedAt: '2026-01-22 10:15:45' },
  { id: 'UT1303', name: 'Kiểm tra thể lực định kỳ', location: 'Phòng Gym PVF', teacher: 'Lê Thế Anh', teacherId: '3', start: '25/03/2025 08:00', end: '25/03/2025 11:00', status: 'Sắp diễn ra', description: 'Đo lường các chỉ số thể lực', note: 'Không ăn no trước khi test', createdAt: '2025-01-15 08:30:00', updatedAt: '2026-01-25 10:15:45' },
]

const mockDeletedActivities: ActivityRecord[] = [
  { id: 'UT1304', name: 'Giải đấu nội bộ U11 (Hủy)', location: 'Sân tập số 3 PVF', teacher: 'Trần Minh Tuấn', teacherId: '1', start: '10/02/2025 08:00', end: '10/02/2025 17:00', status: 'Đã hoàn thành', deletedAt: '04/03/2026 12:00:00' },
  { id: 'UT1305', name: 'Dã ngoại team building', location: 'Ba Vì, Hà Nội', teacher: 'Nguyễn Văn Hùng', teacherId: '2', start: '12/02/2025 07:00', end: '13/02/2025 17:00', status: 'Đã hoàn thành', deletedAt: '05/03/2026 15:30:00' },
]

const mockStudents: StudentActivity[] = [
  { id: '1', code: 'HV1301', name: 'Nguyễn Xuân An', email: 'an.nx@pvf.com.vn', joinedDate: '10/01/2025', status: 'Đang học' },
  { id: '2', code: 'HV1302', name: 'Trần Văn Bình', email: 'binh.tv@pvf.com.vn', joinedDate: '10/01/2025', status: 'Đang học' }
]

const DELAY = 400 // Giả lập độ trễ mạng 400ms

export const activityService = {
  // Lấy danh sách hoạt động
  async getList(filters: any, page: number = 1, pageSize: number = 10) {
    await new Promise(resolve => setTimeout(resolve, DELAY))
    let filtered = [...mockActivities]
    
    if (filters.keyword) {
      filtered = filtered.filter(a => a.name.toLowerCase().includes(filters.keyword.toLowerCase()))
    }
    if (filters.teacher) {
      filtered = filtered.filter(a => a.teacherId === filters.teacher)
    }
    if (filters.status) {
      filtered = filtered.filter(a => (filters.status === 'active' ? a.status === 'Đang diễn ra' : a.status === 'Sắp diễn ra'))
    }

    return {
      data: filtered,
      meta: { total: filtered.length, current: page, pageSize },
      summary: {
        total: mockActivities.length,
        active: mockActivities.filter(a => a.status === 'Đang diễn ra').length,
        completed: 15,
        totalStudents: 120
      }
    }
  },

  // Lấy danh sách đã xóa
  async getDeletedList(filters: any, page: number = 1, pageSize: number = 10) {
    await new Promise(resolve => setTimeout(resolve, DELAY))
    return {
      data: [...mockDeletedActivities],
      meta: { total: mockDeletedActivities.length, current: page, pageSize }
    }
  },

  // Lấy chi tiết hoạt động (kèm danh sách sinh viên)
  async getById(id: string) {
    await new Promise(resolve => setTimeout(resolve, DELAY))
    const activity = mockActivities.find(a => a.id === id) || mockActivities[0]
    return {
      data: activity,
      students: [...mockStudents]
    }
  },

  // Thêm mới
  async create(payload: any) {
    await new Promise(resolve => setTimeout(resolve, DELAY))
    return { success: true, message: 'Thêm mới thành công' }
  },

  // Cập nhật
  async update(id: string, payload: any) {
    await new Promise(resolve => setTimeout(resolve, DELAY))
    return { success: true, message: 'Cập nhật thành công' }
  },

  // Xóa tạm (đưa vào thùng rác)
  async softDelete(id: string) {
    await new Promise(resolve => setTimeout(resolve, DELAY))
    return { success: true }
  },

  // Khôi phục
  async restore(id: string) {
    await new Promise(resolve => setTimeout(resolve, DELAY))
    return { success: true }
  },

  // Xóa vĩnh viễn
  async hardDelete(id: string) {
    await new Promise(resolve => setTimeout(resolve, DELAY))
    return { success: true }
  }
}