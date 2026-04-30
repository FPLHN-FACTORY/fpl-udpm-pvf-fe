import imageLogo from '../../assets/logo.png'
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

function delay(ms) {
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