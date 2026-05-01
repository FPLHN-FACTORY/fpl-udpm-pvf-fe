// Mock API service for roles
const DELAY = 300

// Mock data for roles
const mockRoles = [
  {
    id: 1,
    title: 'Administrator',
    totalUsers: 4,
    avatars: [
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png',
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/2.png',
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/3.png',
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/4.png'
    ],
    permissions: ['Quản lý hệ thống', 'Quản lý người dùng', 'Quản lý phân quyền', 'Xem báo cáo'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: 2,
    title: 'Editor',
    totalUsers: 7,
    avatars: [
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/5.png',
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/6.png',
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/7.png',
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/8.png',
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/9.png'
    ],
    permissions: ['Chỉnh sửa nội dung', 'Xem nội dung', 'Tạo bài viết'],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18'
  },
  {
    id: 3,
    title: 'Users',
    totalUsers: 5,
    avatars: [
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/10.png',
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/11.png',
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/12.png'
    ],
    permissions: ['Xem nội dung', 'Cập nhật thông tin cá nhân'],
    createdAt: '2024-01-05',
    updatedAt: '2024-01-15'
  },
  {
    id: 4,
    title: 'Support',
    totalUsers: 6,
    avatars: [
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/13.png',
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/14.png',
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png'
    ],
    permissions: ['Hỗ trợ khách hàng', 'Xem ticket', 'Trả lời tin nhắn'],
    createdAt: '2024-01-08',
    updatedAt: '2024-01-22'
  },
  {
    id: 5,
    title: 'Restricted User',
    totalUsers: 10,
    avatars: [
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/2.png',
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/3.png',
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/4.png',
      'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/5.png'
    ],
    permissions: ['Xem nội dung hạn chế'],
    createdAt: '2024-01-12',
    updatedAt: '2024-01-25'
  }
]

const mockUsers = [
  {
    id: 1,
    name: 'Nguyễn Văn An',
    email: 'nguyen.van.an@pvf.com.vn',
    role: 'Administrator',
    status: 'active',
    avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png',
    createdAt: '2024-01-15',
    lastLogin: '2024-01-25 09:30:00'
  },
  {
    id: 2,
    name: 'Trần Thị Bình',
    email: 'tran.thi.binh@pvf.com.vn',
    role: 'Editor',
    status: 'active',
    avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/2.png',
    createdAt: '2024-01-10',
    lastLogin: '2024-01-24 14:20:00'
  },
  {
    id: 3,
    name: 'Lê Văn Cường',
    email: 'le.van.cuong@pvf.com.vn',
    role: 'Users',
    status: 'inactive',
    avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/3.png',
    createdAt: '2024-01-05',
    lastLogin: '2024-01-20 16:45:00'
  },
  {
    id: 4,
    name: 'Phạm Thị Dung',
    email: 'pham.thi.dung@pvf.com.vn',
    role: 'Support',
    status: 'active',
    avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/4.png',
    createdAt: '2024-01-08',
    lastLogin: '2024-01-25 11:15:00'
  },
  {
    id: 5,
    name: 'Hoàng Văn Em',
    email: 'hoang.van.em@pvf.com.vn',
    role: 'Restricted User',
    status: 'active',
    avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/5.png',
    createdAt: '2024-01-12',
    lastLogin: '2024-01-23 08:00:00'
  }
]

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default {
  // Lấy danh sách roles
  async getRoles() {
    await delay(DELAY)
    return { 
      data: mockRoles,
      meta: {
        total: mockRoles.length
      }
    }
  },

  // Lấy chi tiết role theo ID
  async getRoleById(id: number) {
    await delay(DELAY)
    const role = mockRoles.find(r => r.id === id)
    if (!role) {
      throw new Error('Role not found')
    }
    return { data: role }
  },

  // Tạo role mới
  async createRole(roleData: any) {
    await delay(DELAY)
    const newRole = {
      id: mockRoles.length + 1,
      ...roleData,
      totalUsers: 0,
      avatars: [],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    }
    mockRoles.push(newRole)
    return { data: newRole }
  },

  // Cập nhật role
  async updateRole(id: number, roleData: any) {
    await delay(DELAY)
    const roleIndex = mockRoles.findIndex(r => r.id === id)
    if (roleIndex === -1) {
      throw new Error('Role not found')
    }
    mockRoles[roleIndex] = {
      ...mockRoles[roleIndex],
      ...roleData,
      updatedAt: new Date().toISOString().split('T')[0]
    }
    return { data: mockRoles[roleIndex] }
  },

  // Xóa role
  async deleteRole(id: number) {
    await delay(DELAY)
    const roleIndex = mockRoles.findIndex(r => r.id === id)
    if (roleIndex === -1) {
      throw new Error('Role not found')
    }
    mockRoles.splice(roleIndex, 1)
    return { success: true }
  },

  // Lấy danh sách users theo role
  async getUsersByRole({ page = 1, role = '', status = '', search = '' }) {
    await delay(DELAY)
    
    let filtered = [...mockUsers]
    
    // Filter by role
    if (role) {
      filtered = filtered.filter(user => user.role.toLowerCase().includes(role.toLowerCase()))
    }
    
    // Filter by status
    if (status) {
      filtered = filtered.filter(user => user.status === status)
    }
    
    // Filter by search
    if (search) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      )
    }

    const itemsPerPage = 10
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
  }
}