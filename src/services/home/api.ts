import imageLogo from '../../assets/logo.png'

// Mock data for Teachers
export const mockTeachers = [
  { 
    key: '1', 
    code: 'GV002', 
    name: 'Trần Minh Tuấn', 
    phone: '0912 456 789', 
    email: 'tuan.tran@pvf.com.vn', 
    status: 'Đang giảng dạy',
    createdAt: '2025-01-05 08:30:00',
    updatedAt: '2026-01-20 10:15:45'
  },
  { 
    key: '2', 
    code: 'GV003', 
    name: 'Lê Hoàng Nam', 
    phone: '0912 456 789', 
    email: 'nam.le@pvf.com.vn', 
    status: 'Đang giảng dạy',
    createdAt: '2025-01-10 09:00:00',
    updatedAt: '2026-01-22 14:20:00'
  },
  { key: '3', code: 'GV004', name: 'Nguyễn Thị Hương', phone: '0912 456 789', email: 'huong.nguyen@pvf.com.vn', status: 'Đang giảng dạy' },
  { key: '4', code: 'GV001', name: 'Nguyễn Văn Hùng', phone: '0903 123 456', email: 'hung.nguyen@pvf.com.vn', status: 'Đang giảng dạy' },
  { key: '5', code: 'GV005', name: 'Phạm Thanh Sơn', phone: '0912 456 789', email: 'son.pham@pvf.com.vn', status: 'Đang giảng dạy' },
  { key: '6', code: 'GV006', name: 'Vũ Minh Đức', phone: '0912 456 789', email: 'duc.vu@pvf.com.vn', status: 'Ngừng hợp tác' },
  { key: '7', code: 'GV007', name: 'Đặng Thùy Chi', phone: '0912 456 789', email: 'chi.dang@pvf.com.vn', status: 'Ngừng hợp tác' },
  { key: '8', code: 'GV008', name: 'Bùi Anh Tuấn', phone: '0912 456 789', email: 'tuan.bui@pvf.com.vn', status: 'Ngừng hợp tác' },
]

export const mockDeletedTeachers = [
  { key: '1', code: 'GV009', name: 'Trần Minh Tuấn', phone: '0912 456 789', email: 'tuan.tran@pvf.com.vn', deletedAt: '2025-02-01 12:12' },
  { key: '2', code: 'GV010', name: 'Lê Hoàng Nam', phone: '0912 456 789', email: 'nam.le@pvf.com.vn', deletedAt: '2025-02-01 12:12' },
  { key: '3', code: 'GV011', name: 'Hoàng Văn Bách', phone: '0912 456 789', email: 'bach.hoang@pvf.com.vn', deletedAt: '2025-02-01 12:12' },
]

// Mock data for Subjects
export const mockSubjects = [
  { 
    key: '1', 
    code: 'MH001', 
    name: 'Tin học', 
    grade: '12', 
    endDate: '2025-02-10', 
    status: 'Đang hoạt động',
    note: 'Môn tin học lớp 12',
    createdAt: '2025-01-05 08:30:00',
    updatedAt: '2026-01-20 10:15:45'
  },
  { 
    key: '2', 
    code: 'MH002', 
    name: 'Toán học', 
    grade: '12', 
    endDate: '2025-02-10', 
    status: 'Đang hoạt động',
    note: 'Môn toán học lớp 12',
    createdAt: '2025-01-06 09:15:00',
    updatedAt: '2026-01-21 11:30:00'
  },
  { key: '3', code: 'MH003', name: 'Văn học', grade: '12', endDate: '2025-02-10', status: 'Tạm ngưng', note: 'Môn văn học lớp 12' },
  { key: '4', code: 'MH004', name: 'Lịch sử', grade: '12', endDate: '2025-02-10', status: 'Đang hoạt động', note: 'Môn lịch sử lớp 12' },
]

export const mockDeletedSubjects = [
  { key: '1', code: 'MH005', name: 'Kỹ thuật bóng đá cơ bản', grade: '12', balance: '25-02-01 8:30' },
  { key: '2', code: 'MH006', name: 'Chiến thuật bóng đá', grade: '12', balance: '25-02-01 8:30' },
]

export const mockClasses = [
  { key: '1', subject: 'Tâm lý thi đấu', className: 'UT1301', teacher: 'Nguyễn Văn Hùng', location: 'Phòng thể lực PVF', capacity: '32', status: 'Đang giảng dạy' },
  { key: '2', subject: 'Chiến thuật bóng đá', className: 'UT1302', teacher: 'Nguyễn Văn Hùng', location: 'Sân bóng PVF', capacity: '25', status: 'Đang giảng dạy' },
]

export const mockMainClasses = [
  {
    key: '1',
    className: 'Lớp U12-A',
    grade: 'Khối 10',
    year: '2024-2025',
    teacher: 'Nguyễn Đức Anh',
    status: 'Đang hoạt động'
  },
  {
    key: '2',
    className: 'Lớp U12-B',
    grade: 'Khối 10',
    year: '2024-2025',
    teacher: 'Lê Thu Trang',
    status: 'Đang hoạt động'
  }
]

export const mockCourseEvaluations = [
  { key: '1', studentName: 'Nguyễn Văn An', studentCode: 'HV124', course: 'PVF 2025', rank: '1', classification: 'Xuất sắc', status: 'Đã khóa' },
  { key: '2', studentName: 'Nguyễn Văn An', studentCode: 'HV124', course: 'PVF 2025', rank: '1', classification: 'Xuất sắc', status: 'Đã khóa' },
  { key: '3', studentName: 'Nguyễn Văn An', studentCode: 'HV124', course: 'PVF 2025', rank: '1', classification: 'Xuất sắc', status: 'Đã khóa' },
  { key: '4', studentName: 'Nguyễn Văn An', studentCode: 'HV124', course: 'PVF 2025', rank: '1', classification: 'Xuất sắc', status: 'Đã khóa' },
  { key: '5', studentName: 'Nguyễn Văn An', studentCode: 'HV124', course: 'PVF 2025', rank: '1', classification: 'Xuất sắc', status: 'Đã khóa' },
  { key: '6', studentName: 'Nguyễn Văn An', studentCode: 'HV124', course: 'PVF 2025', rank: '1', classification: 'Xuất sắc', status: 'Đã khóa' },
  { key: '7', studentName: 'Nguyễn Văn An', studentCode: 'HV124', course: 'PVF 2025', rank: '1', classification: 'Xuất sắc', status: 'Đã khóa' },
  { key: '8', studentName: 'Nguyễn Văn An', studentCode: 'HV124', course: 'PVF 2025', rank: '1', classification: 'Xuất sắc', status: 'Đã khóa' },
  { key: '9', studentName: 'Nguyễn Văn An', studentCode: 'HV124', course: 'PVF 2025', rank: '1', classification: 'Xuất sắc', status: 'Đã khóa' },
  { key: '10', studentName: 'Nguyễn Văn An', studentCode: 'HV124', course: 'PVF 2025', rank: '1', classification: 'Xuất sắc', status: 'Đã khóa' },
]

export const mockDeletedCourseEvaluations = [
  { key: 'd1', studentName: 'Nguyễn Văn An', studentCode: 'HV124', course: 'PVF 2025', rank: '1', classification: 'Xuất sắc', status: 'Đã khóa', deletedAt: '2025-01-05 08:30:00' },
  { key: 'd2', studentName: 'Nguyễn Văn An', studentCode: 'HV124', course: 'PVF 2025', rank: '1', classification: 'Xuất sắc', status: 'Đã khóa', deletedAt: '2025-01-05 08:30:00' },
]

// Mock API service
const DELAY = 300

// Mock data
const mockSiteConfig = {
  brand: {
    name: 'PVF',
    logo: imageLogo,
    slogan: 'Đào tạo tài năng bóng đá trẻ'
  },
  contact: {
    phone: '0221 3737087',
    email: 'info@pvf.com.vn',
    address: 'Thôn Sổ Đông, xã Nghĩa Trụ, tỉnh Hưng Yên, Việt Nam',
    hotline: '0221 3737087'
  },
  navLinks: [
    { id: 'ha-noi', name: 'Hà Nội' },
    { id: 'dong-nai', name: 'Đồng Nai' },
    { id: 'hung-yen', name: 'Hưng Yên' }
  ],
  hero: {
    title: 'Kiên Định Tỏa Sáng',
    subtitle: 'PVF Football Academy'
  },
  aboutLinks: [
    { id: 1, name: 'Trang chủ' },
    { id: 2, name: 'Giới thiệu' }
  ],
  socialLinks: [
    { id: 1, name: 'Facebook', url: '#', class: 'fb', icon: 'f' },
    { id: 2, name: 'TikTok', url: '#', class: 'tt', icon: 'TT' },
    { id: 3, name: 'YouTube', url: '#', class: 'yt', icon: '▶' }
  ]
}

const mockTuyenSinh = [
  {
    id: 1,
    badge: 'Tuyển Sinh PVF Khóa XVI Năm 2025',
    title: 'Tuyển sinh U11',
    subtitle: 'Hà Nội',
    content: 'This is some text within a card body. Jelly lemon drops tiramisu chocolate cake cotton candy soufflé oat cake sweet roll.',
    description: 'Buổi Chào Đón Học Viên Khóa XVI Năm 2025 – Của Trung Tâm Đào Tạo Bóng Đá Trẻ PVF',
    locationKey: 'ha-noi'
  },
  {
    id: 2,
    badge: 'Tuyển Sinh PVF Khóa XVI Năm 2025',
    title: 'Tuyển sinh U13',
    subtitle: 'Đồng Nai',
    content: 'This is some text within a card body. Jelly lemon drops tiramisu chocolate cake cotton candy soufflé oat cake sweet roll.',
    description: 'Buổi Chào Đón Học Viên Khóa XVI Năm 2025 – Của Trung Tâm Đào Tạo Bóng Đá Trẻ PVF',
    locationKey: 'dong-nai'
  },
  {
    id: 3,
    badge: 'Tuyển Sinh PVF Khóa XVI Năm 2025',
    title: 'Tuyển sinh U15',
    subtitle: 'Hưng Yên',
    content: 'This is some text within a card body. Jelly lemon drops tiramisu chocolate cake cotton candy soufflé oat cake sweet roll.',
    description: 'Buổi Chào Đón Học Viên Khóa XVI Năm 2025 – Của Trung Tâm Đào Tạo Bóng Đá Trẻ PVF',
    locationKey: 'hung-yen'
  },
  {
    id: 4,
    badge: 'Tuyển Sinh PVF Khóa XVI Năm 2025',
    title: 'Tuyển sinh U17',
    subtitle: 'Hà Nội',
    content: 'This is some text within a card body. Jelly lemon drops tiramisu chocolate cake cotton candy soufflé oat cake sweet roll.',
    description: 'Buổi Chào Đón Học Viên Khóa XVI Năm 2025 – Của Trung Tâm Đào Tạo Bóng Đá Trẻ PVF',
    locationKey: 'ha-noi'
  },
  {
    id: 5,
    badge: 'Tuyển Sinh PVF Khóa XVI Năm 2025',
    title: 'Tuyển sinh U19',
    subtitle: 'Đồng Nai',
    content: 'This is some text within a card body. Jelly lemon drops tiramisu chocolate cake cotton candy soufflé oat cake sweet roll.',
    description: 'Buổi Chào Đón Học Viên Khóa XVI Năm 2025 – Của Trung Tâm Đào Tạo Bóng Đá Trẻ PVF',
    locationKey: 'dong-nai'
  },
  {
    id: 6,
    badge: 'Tuyển Sinh PVF Khóa XVI Năm 2025',
    title: 'Tuyển sinh U21',
    subtitle: 'Hưng Yên',
    content: 'This is some text within a card body. Jelly lemon drops tiramisu chocolate cake cotton candy soufflé oat cake sweet roll.',
    description: 'Buổi Chào Đón Học Viên Khóa XVI Năm 2025 – Của Trung Tâm Đào Tạo Bóng Đá Trẻ PVF',
    locationKey: 'hung-yen'
  },
  {
    id: 7,
    badge: 'Tuyển Sinh PVF Khóa XVI Năm 2025',
    title: 'Tuyển sinh U21',
    subtitle: 'Hưng Yên',
    content: 'This is some text within a card body. Jelly lemon drops tiramisu chocolate cake cotton candy soufflé oat cake sweet roll.',
    description: 'Buổi Chào Đón Học Viên Khóa XVI Năm 2025 – Của Trung Tâm Đào Tạo Bóng Đá Trẻ PVF',
    locationKey: 'hung-yen'
  },
  {
    id: 8,
    badge: 'Tuyển Sinh PVF Khóa XVI Năm 2025',
    title: 'Tuyển sinh U21',
    subtitle: 'Hưng Yên',
    content: 'This is some text within a card body. Jelly lemon drops tiramisu chocolate cake cotton candy soufflé oat cake sweet roll.',
    description: 'Buổi Chào Đón Học Viên Khóa XVI Năm 2025 – Của Trung Tâm Đào Tạo Bóng Đá Trẻ PVF',
    locationKey: 'hung-yen'
  },
  {
    id: 9,
    badge: 'Tuyển Sinh PVF Khóa XVI Năm 2025',
    title: 'Tuyển sinh U21',
    subtitle: 'Hưng Yên',
    content: 'This is some text within a card body. Jelly lemon drops tiramisu chocolate cake cotton candy soufflé oat cake sweet roll.',
    description: 'Buổi Chào Đón Học Viên Khóa XVI Năm 2025 – Của Trung Tâm Đào Tạo Bóng Đá Trẻ PVF',
    locationKey: 'hung-yen'
  },
  {
    id: 10,
    badge: 'Tuyển Sinh PVF Khóa XVI Năm 2025',
    title: 'Tuyển sinh U21',
    subtitle: 'Hưng Yên',
    content: 'This is some text within a card body. Jelly lemon drops tiramisu chocolate cake cotton candy soufflé oat cake sweet roll.',
    description: 'Buổi Chào Đón Học Viên Khóa XVI Năm 2025 – Của Trung Tâm Đào Tạo Bóng Đá Trẻ PVF',
    locationKey: 'hung-yen'
  },
  {
    id: 11,
    badge: 'Tuyển Sinh PVF Khóa XVI Năm 2025',
    title: 'Tuyển sinh U21',
    subtitle: 'Hưng Yên',
    content: 'This is some text within a card body. Jelly lemon drops tiramisu chocolate cake cotton candy soufflé oat cake sweet roll.',
    description: 'Buổi Chào Đón Học Viên Khóa XVI Năm 2025 – Của Trung Tâm Đào Tạo Bóng Đá Trẻ PVF',
    locationKey: 'hung-yen'
  },
  {
    id: 12,
    badge: 'Tuyển Sinh PVF Khóa XVI Năm 2025',
    title: 'Tuyển sinh U21',
    subtitle: 'Hưng Yên',
    content: 'This is some text within a card body. Jelly lemon drops tiramisu chocolate cake cotton candy soufflé oat cake sweet roll.',
    description: 'Buổi Chào Đón Học Viên Khóa XVI Năm 2025 – Của Trung Tâm Đào Tạo Bóng Đá Trẻ PVF',
    locationKey: 'hung-yen'
  },
  {
    id: 13,
    badge: 'Tuyển Sinh PVF Khóa XVI Năm 2025',
    title: 'Tuyển sinh U21',
    subtitle: 'Hưng Yên',
    content: 'This is some text within a card body. Jelly lemon drops tiramisu chocolate cake cotton candy soufflé oat cake sweet roll.',
    description: 'Buổi Chào Đón Học Viên Khóa XVI Năm 2025 – Của Trung Tâm Đào Tạo Bóng Đá Trẻ PVF',
    locationKey: 'hung-yen'
  },
  {
    id: 14,
    badge: 'Tuyển Sinh PVF Khóa XVI Năm 2025',
    title: 'Tuyển sinh U21',
    subtitle: 'Hưng Yên',
    content: 'This is some text within a card body. Jelly lemon drops tiramisu chocolate cake cotton candy soufflé oat cake sweet roll.',
    description: 'Buổi Chào Đón Học Viên Khóa XVI Năm 2025 – Của Trung Tâm Đào Tạo Bóng Đá Trẻ PVF',
    locationKey: 'hung-yen'
  },
  {
    id: 15,
    badge: 'Tuyển Sinh PVF Khóa XVI Năm 2025',
    title: 'Tuyển sinh U21',
    subtitle: 'Hưng Yên',
    content: 'This is some text within a card body. Jelly lemon drops tiramisu chocolate cake cotton candy soufflé oat cake sweet roll.',
    description: 'Buổi Chào Đón Học Viên Khóa XVI Năm 2025 – Của Trung Tâm Đào Tạo Bóng Đá Trẻ PVF',
    locationKey: 'hung-yen'
  },
]

const mockTieuChi = {
  left: [
    { id: 1, title: 'Về Sức Khỏe', description: '' },
    { id: 2, title: 'Không Vấn Đề Về Mắt', description: 'Mắt có thị lực tốt, không bị loạn thị và có khả năng nhìn rõ các chi tiết nhỏ' },
    { id: 3, title: 'Không Vấn Đề Về Tim Mạch, Thần Kinh', description: 'Không có vấn đề về tim mạch, thần kinh chống chỉ định nào trong thể thao' },
    { id: 4, title: 'Không Vấn Đề Về Chấn Thương', description: 'Không gặp bất cứ chấn thương nào' }
  ],
  right: [
    { id: 5, title: 'Các Năng Lực', description: '' },
    { id: 6, title: 'Tâm Lý Chiến Thắng', description: 'Khát khao bền bỉ, luôn cố gắng trở thành người giỏi nhất' },
    { id: 7, title: 'Tư Duy Chơi Bóng', description: 'Hiểu rõ các thời điểm của trận đấu và đưa ra quyết định chính xác, đúng thời điểm' },
    { id: 8, title: 'Kỹ Thuật Chơi Bóng', description: 'Khả năng làm chủ quả bóng và làm chủ cơ thể' }
  ]
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default {
  async getSiteConfig() {
    await delay(DELAY)
    return { data: mockSiteConfig }
  },

  async getTuyenSinh({ page = 1, location = '' }) {
    await delay(DELAY)
    const filtered = location
      ? mockTuyenSinh.filter(card => card.locationKey === location)
      : mockTuyenSinh

    const itemsPerPage = 6
    const start = (page - 1) * itemsPerPage
    const pagedData = filtered.slice(start, start + itemsPerPage)

    return {
      data: pagedData,
      meta: {
        currentPage: page,
        totalPages: Math.ceil(filtered.length / itemsPerPage),
        totalItems: filtered.length,
        itemsPerPage
      }
    }
  },

  async getTieuChi() {
    await delay(DELAY)
    return { data: mockTieuChi }
  }
}
