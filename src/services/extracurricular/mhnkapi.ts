export interface ScoreType {
  id: string
  name: string
  weight: number
  status: 'Đang áp dụng' | 'Ngừng áp dụng'
}

export interface SubjectRecord {
  id: string
  code: string
  name: string
  description: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  status: 'Đang hoạt động' | 'Tạm ngưng' | 'Đang sử dụng'
  totalClasses?: number
  totalStudents?: number
  averageScore?: number
  passRate?: number
  scores?: ScoreType[]
}

const mockScoresNK001: ScoreType[] = [
  { id: '1', name: 'Điểm chuyên cần', weight: 20, status: 'Đang áp dụng' },
  { id: '2', name: 'Điểm tham gia hoạt động', weight: 15, status: 'Đang áp dụng' },
  { id: '3', name: 'Điểm bài tập thực hành', weight: 25, status: 'Đang áp dụng' },
  { id: '4', name: 'Điểm đánh giá kỹ năng', weight: 30, status: 'Đang áp dụng' },
  { id: '5', name: 'Điểm kiểm tra cuối khóa', weight: 10, status: 'Đang áp dụng' },
]

const mockSubjects: SubjectRecord[] = [
  { 
    id: '1', 
    code: 'NK001', 
    name: 'Kỹ năng làm việc nhóm', 
    description: 'Rèn luyện khả năng phối hợp, giao tiếp và tinh thần đồng đội cho học viên', 
    status: 'Đang hoạt động',
    createdAt: '2025-01-05 08:30:00',
    updatedAt: '2026-01-20 10:15:45',
    totalClasses: 21,
    totalStudents: 20,
    averageScore: 1,
    passRate: 21,
    scores: mockScoresNK001
  },
  { id: '2', code: 'NK002', name: 'Kỹ năng giao tiếp', description: 'Phát triển kỹ năng giao tiếp, ứng xử...', status: 'Đang hoạt động', scores: [] },
  { id: '3', code: 'NK003', name: 'Tâm lý thi đấu', description: 'Giúp học viên ổn định tâm lý, tăng khả năng kiểm...', status: 'Tạm ngưng', scores: [] },
  { id: '4', code: 'NK004', name: 'Dinh dưỡng thể thao', description: 'Trang bị kiến thức dinh dưỡng phù hợp cho cầu...', status: 'Đang hoạt động', scores: [] },
]

const mockDeletedSubjects: SubjectRecord[] = [
  { id: '1', code: 'NK001', name: 'Kỹ năng làm việc nhóm', description: 'Rèn luyện khả năng phối hợp, giao tiếp và...', deletedAt: '2025-02-01 12:12', status: 'Đang hoạt động' },
  { id: '2', code: 'NK002', name: 'Kỹ năng giao tiếp', description: 'Phát triển kỹ năng giao tiếp, ứng xử...', deletedAt: '2025-02-01 12:12', status: 'Đang hoạt động' },
  { id: '3', code: 'NK003', name: 'Tâm lý thi đấu', description: 'Giúp học viên ổn định tâm lý, tăng khả năng kiểm...', deletedAt: '2025-02-01 12:12', status: 'Tạm ngưng' },
  { id: '4', code: 'NK004', name: 'Dinh dưỡng thể thao', description: 'Trang bị kiến thức dinh dưỡng phù hợp cho cầu...', deletedAt: '2025-02-01 12:12', status: 'Đang hoạt động' },
]

export const scoreTypesOptions = [
  'Điểm chuyên cần (20%)',
  'Điểm tham gia hoạt động (15%)',
  'Điểm bài tập thực hành (25%)',
  'Điểm đánh giá kỹ năng (30%)',
  'Điểm kiểm tra cuối khóa (10%)'
]

const DELAY = 400

export const mhnkService = {
  async getList(filters: any, page: number = 1, pageSize: number = 10) {
    await new Promise(resolve => setTimeout(resolve, DELAY))
    let filtered = [...mockSubjects]
    
    if (filters.keyword) {
      filtered = filtered.filter(a => 
        a.name.toLowerCase().includes(filters.keyword.toLowerCase()) || 
        a.code.toLowerCase().includes(filters.keyword.toLowerCase())
      )
    }
    if (filters.status) {
      filtered = filtered.filter(a => a.status === filters.status)
    }

    return {
      data: filtered,
      meta: { total: filtered.length, current: page, pageSize },
      summary: {
        total: 21,
        active: 20,
        paused: 1
      }
    }
  },

  async getDeletedList(_filters: any, page: number = 1, pageSize: number = 10) {
    await new Promise(resolve => setTimeout(resolve, DELAY))
    return {
      data: [...mockDeletedSubjects],
      meta: { total: mockDeletedSubjects.length, current: page, pageSize }
    }
  },

  async getById(id: string) {
    await new Promise(resolve => setTimeout(resolve, DELAY))
    const subject = mockSubjects.find(a => a.id === id || a.code === id) || mockSubjects[0]
    return {
      data: subject
    }
  },

  async create(_payload: any) {
    await new Promise(resolve => setTimeout(resolve, DELAY))
    return { success: true, message: 'Thêm mới thành công' }
  },

  async update(_id: string, _payload: any) {
    await new Promise(resolve => setTimeout(resolve, DELAY))
    return { success: true, message: 'Cập nhật thành công' }
  },

  async softDelete(_id: string) {
    await new Promise(resolve => setTimeout(resolve, DELAY))
    return { success: true }
  },

  async restore(_id: string) {
    await new Promise(resolve => setTimeout(resolve, DELAY))
    return { success: true }
  },

  async hardDelete(_id: string) {
    await new Promise(resolve => setTimeout(resolve, DELAY))
    return { success: true }
  }
}
