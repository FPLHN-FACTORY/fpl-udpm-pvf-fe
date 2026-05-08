// dungCuService.ts
// Service layer for Dụng Cụ (Equipment) management API
// TODO: Khi có backend, xóa phần mock và bỏ comment phần fetch thực

export interface DungCu {
  id: number
  ten: string
  moTa: string
  trangThai: 'Đang sử dụng' | 'Ngừng sử dụng' | 'Bảo trì'
  thoiGianTao?: string
  thoiGianCapNhat?: string
  ngayXoa?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface SearchParams {
  keyword?: string
  trangThai?: string
  page?: number
  pageSize?: number
}

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

let mockDanhSach: DungCu[] = [
  { id: 1,  ten: 'Áo tập luyện',       moTa: 'Trang phục dùng cho học viên trong các buổi tập hàng ngày', trangThai: 'Đang sử dụng',  thoiGianTao: '2025-01-05 06:30:00', thoiGianCapNhat: '2026-01-30 10:15:45' },
  { id: 2,  ten: 'Quần tập luyện',     moTa: 'Quần thể thao chuyên dụng cho các buổi tập gym',            trangThai: 'Đang sử dụng',  thoiGianTao: '2025-01-06 08:00:00', thoiGianCapNhat: '2026-01-30 10:15:45' },
  { id: 3,  ten: 'Găng tay tập gym',   moTa: 'Bảo vệ bàn tay khi tập với tạ nặng',                        trangThai: 'Bảo trì',        thoiGianTao: '2025-01-07 09:00:00', thoiGianCapNhat: '2026-02-01 08:00:00' },
  { id: 4,  ten: 'Dây nhảy',           moTa: 'Dây nhảy chuyên dụng cho bài tập cardio',                   trangThai: 'Đang sử dụng',  thoiGianTao: '2025-01-08 10:00:00', thoiGianCapNhat: '2026-02-01 09:00:00' },
  { id: 5,  ten: 'Thảm yoga',          moTa: 'Thảm tập yoga chống trượt, độ dày 6mm',                     trangThai: 'Đang sử dụng',  thoiGianTao: '2025-01-09 11:00:00', thoiGianCapNhat: '2026-02-02 10:00:00' },
  { id: 6,  ten: 'Tạ đơn 5kg',         moTa: 'Tạ đơn cao su chống trượt 5kg',                             trangThai: 'Ngừng sử dụng', thoiGianTao: '2025-01-10 12:00:00', thoiGianCapNhat: '2026-02-03 11:00:00' },
  { id: 7,  ten: 'Tạ đơn 10kg',        moTa: 'Tạ đơn cao su chống trượt 10kg',                            trangThai: 'Đang sử dụng',  thoiGianTao: '2025-01-11 13:00:00', thoiGianCapNhat: '2026-02-04 12:00:00' },
  { id: 8,  ten: 'Bóng tập gym',       moTa: 'Bóng tập gym đường kính 65cm',                              trangThai: 'Đang sử dụng',  thoiGianTao: '2025-01-12 14:00:00', thoiGianCapNhat: '2026-02-05 13:00:00' },
  { id: 9,  ten: 'Dây kháng lực',      moTa: 'Bộ dây kháng lực 5 mức độ',                                 trangThai: 'Bảo trì',        thoiGianTao: '2025-01-13 15:00:00', thoiGianCapNhat: '2026-02-06 14:00:00' },
  { id: 10, ten: 'Ghế tập đa năng',    moTa: 'Ghế tập điều chỉnh độ nghiêng đa năng',                     trangThai: 'Đang sử dụng',  thoiGianTao: '2025-01-14 16:00:00', thoiGianCapNhat: '2026-02-07 15:00:00' },
  { id: 11, ten: 'Xà đơn treo tường',  moTa: 'Xà đơn gắn tường chịu tải 150kg',                           trangThai: 'Đang sử dụng',  thoiGianTao: '2025-01-15 07:00:00', thoiGianCapNhat: '2026-02-08 08:00:00' },
  { id: 12, ten: 'Con lăn bụng',       moTa: 'Con lăn tập cơ bụng có tay cầm chống trượt',                trangThai: 'Ngừng sử dụng', thoiGianTao: '2025-01-16 08:30:00', thoiGianCapNhat: '2026-02-09 09:00:00' },
]

let mockDaXoa: DungCu[] = [
  { id: 101, ten: 'Áo tập luyện cũ', moTa: 'Trang phục dùng cho học viên trong các buổi tập hàng ngày', trangThai: 'Ngừng sử dụng', thoiGianTao: '2024-06-01 08:00:00', thoiGianCapNhat: '2025-01-01 10:00:00', ngayXoa: '2025-02-01 08:30' },
  { id: 102, ten: 'Tạ 20kg hỏng',    moTa: 'Tạ đơn bị nứt vỏ cao su',                                   trangThai: 'Ngừng sử dụng', thoiGianTao: '2024-07-01 09:00:00', thoiGianCapNhat: '2025-01-02 11:00:00', ngayXoa: '2025-02-01 08:30' },
  { id: 103, ten: 'Thảm yoga cũ',    moTa: 'Thảm bị rách, không còn sử dụng được',                      trangThai: 'Ngừng sử dụng', thoiGianTao: '2024-08-01 10:00:00', thoiGianCapNhat: '2025-01-03 12:00:00', ngayXoa: '2025-02-01 08:30' },
  { id: 104, ten: 'Dây nhảy đứt',    moTa: 'Dây nhảy bị đứt không thể sửa chữa',                        trangThai: 'Ngừng sử dụng', thoiGianTao: '2024-09-01 11:00:00', thoiGianCapNhat: '2025-01-04 13:00:00', ngayXoa: '2025-02-02 09:00' },
]

let nextId = 200

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function delay(ms = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function filterList(list: DungCu[], params: SearchParams): DungCu[] {
  let result = [...list]
  if (params.keyword) {
    const kw = params.keyword.toLowerCase()
    result = result.filter(
      item => item.ten.toLowerCase().includes(kw) || item.moTa.toLowerCase().includes(kw)
    )
  }
  if (params.trangThai) {
    result = result.filter(item => item.trangThai === params.trangThai)
  }
  return result
}

function paginate<T>(list: T[], page = 1, pageSize = 10): PaginatedResponse<T> {
  const total = list.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * pageSize
  return { data: list.slice(start, start + pageSize), total, page: safePage, pageSize, totalPages }
}

function now(): string {
  return new Date().toISOString().replace('T', ' ').slice(0, 19)
}

// ─── SERVICE ─────────────────────────────────────────────────────────────────

export const dungCuService = {

  // Lấy danh sách dụng cụ có phân trang và tìm kiếm
  async getDanhSach(params: SearchParams = {}): Promise<PaginatedResponse<DungCu>> {
    await delay()

    // TODO: Thay bằng call API thực
    // const query = new URLSearchParams()
    // if (params.keyword)            query.set('keyword', params.keyword)
    // if (params.trangThai)          query.set('trangThai', params.trangThai)
    // if (params.page !== undefined)     query.set('page', String(params.page))
    // if (params.pageSize !== undefined) query.set('pageSize', String(params.pageSize))
    // const res = await fetch(`/api/dung-cu?${query}`)
    // if (!res.ok) throw new Error(await res.text())
    // return res.json()

    return paginate(filterList(mockDanhSach, params), params.page, params.pageSize)
  },

  // Lấy danh sách dụng cụ đã xóa
  async getDanhSachDaXoa(params: SearchParams = {}): Promise<PaginatedResponse<DungCu>> {
    await delay()

    // TODO: Thay bằng call API thực
    // const query = new URLSearchParams()
    // if (params.keyword)            query.set('keyword', params.keyword)
    // if (params.page !== undefined)     query.set('page', String(params.page))
    // if (params.pageSize !== undefined) query.set('pageSize', String(params.pageSize))
    // const res = await fetch(`/api/dung-cu/da-xoa?${query}`)
    // if (!res.ok) throw new Error(await res.text())
    // return res.json()

    return paginate(filterList(mockDaXoa, params), params.page, params.pageSize)
  },

  // Lấy chi tiết một dụng cụ
  async getChiTiet(id: number): Promise<DungCu> {
    await delay()

    // TODO: Thay bằng call API thực
    // const res = await fetch(`/api/dung-cu/${id}`)
    // if (!res.ok) throw new Error(await res.text())
    // return res.json()

    const item = mockDanhSach.find(d => d.id === id)
    if (!item) throw new Error(`Không tìm thấy dụng cụ id=${id}`)
    return { ...item }
  },

  // Thêm mới dụng cụ
  async themMoi(data: Omit<DungCu, 'id'>): Promise<DungCu> {
    await delay()

    // TODO: Thay bằng call API thực
    // const res = await fetch('/api/dung-cu', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // })
    // if (!res.ok) throw new Error(await res.text())
    // return res.json()

    const newItem: DungCu = { ...data, id: nextId++, thoiGianTao: now(), thoiGianCapNhat: now() }
    mockDanhSach.unshift(newItem)
    return { ...newItem }
  },

  // Cập nhật dụng cụ
  async capNhat(id: number, data: Partial<Omit<DungCu, 'id'>>): Promise<DungCu> {
    await delay()

    // TODO: Thay bằng call API thực
    // const res = await fetch(`/api/dung-cu/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // })
    // if (!res.ok) throw new Error(await res.text())
    // return res.json()

    const idx = mockDanhSach.findIndex(d => d.id === id)
    if (idx === -1) throw new Error(`Không tìm thấy dụng cụ id=${id}`)
    mockDanhSach[idx] = { ...mockDanhSach[idx], ...data, thoiGianCapNhat: now() }
    return { ...mockDanhSach[idx] }
  },

  // Xóa mềm dụng cụ
  async xoa(id: number): Promise<void> {
    await delay()

    // TODO: Thay bằng call API thực
    // const res = await fetch(`/api/dung-cu/${id}`, { method: 'DELETE' })
    // if (!res.ok) throw new Error(await res.text())

    const idx = mockDanhSach.findIndex(d => d.id === id)
    if (idx === -1) throw new Error(`Không tìm thấy dụng cụ id=${id}`)
    const [removed] = mockDanhSach.splice(idx, 1)
    mockDaXoa.unshift({ ...removed, ngayXoa: now() })
  },

  // Khôi phục dụng cụ đã xóa
  async khoiPhuc(id: number): Promise<DungCu> {
    await delay()

    // TODO: Thay bằng call API thực
    // const res = await fetch(`/api/dung-cu/${id}/khoi-phuc`, { method: 'PATCH' })
    // if (!res.ok) throw new Error(await res.text())
    // return res.json()

    const idx = mockDaXoa.findIndex(d => d.id === id)
    if (idx === -1) throw new Error(`Không tìm thấy dụng cụ đã xóa id=${id}`)
    const [restored] = mockDaXoa.splice(idx, 1)
    const { ngayXoa: _removed, ...rest } = restored
    const restoredItem: DungCu = { ...rest, thoiGianCapNhat: now() }
    mockDanhSach.unshift(restoredItem)
    return { ...restoredItem }
  },

  // Xóa nhiều dụng cụ cùng lúc
  async xoaNhieu(ids: number[]): Promise<void> {
    await delay()

    // TODO: Thay bằng call API thực
    // const res = await fetch('/api/dung-cu/xoa-nhieu', {
    //   method: 'DELETE',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ ids }),
    // })
    // if (!res.ok) throw new Error(await res.text())

    const toRemove = mockDanhSach.filter(d => ids.includes(d.id))
    mockDanhSach = mockDanhSach.filter(d => !ids.includes(d.id))
    toRemove.forEach(item => mockDaXoa.unshift({ ...item, ngayXoa: now() }))
  },
}