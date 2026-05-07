// Mock API service for permissions
const DELAY = 300

// Mock data for permissions
const mockPermissions = [
  {
    id: 1,
    name: 'Management',
    description: 'Quản lý toàn bộ hệ thống',
    roles: [
      { name: 'Administrator', type: 'primary' }
    ],
    createdAt: '2021-04-14 20:43:00',
    updatedAt: '2024-01-20 15:30:00',
    category: 'system',
    isActive: true
  },
  {
    id: 2,
    name: 'Manage Billing & Roles',
    description: 'Quản lý thanh toán và phân quyền',
    roles: [
      { name: 'Administrator', type: 'primary' }
    ],
    createdAt: '2021-09-16 17:20:00',
    updatedAt: '2024-01-18 10:15:00',
    category: 'billing',
    isActive: true
  },
  {
    id: 3,
    name: 'Add & Remove Users',
    description: 'Thêm và xóa người dùng',
    roles: [
      { name: 'Administrator', type: 'primary' },
      { name: 'Manager', type: 'warning' }
    ],
    createdAt: '2021-08-10 14:30:00',
    updatedAt: '2024-01-15 09:45:00',
    category: 'user_management',
    isActive: true
  },
  {
    id: 4,
    name: 'Project Planning',
    description: 'Lập kế hoạch và quản lý dự án',
    roles: [
      { name: 'Administrator', type: 'primary' },
      { name: 'User', type: 'success' }
    ],
    createdAt: '2021-07-25 11:15:00',
    updatedAt: '2024-01-12 16:20:00',
    category: 'project',
    isActive: true
  },
  {
    id: 5,
    name: 'Manage Email Sequences',
    description: 'Quản lý chuỗi email tự động',
    roles: [
      { name: 'Administrator', type: 'primary' },
      { name: 'User', type: 'success' },
      { name: 'Support', type: 'info' }
    ],
    createdAt: '2021-06-12 08:45:00',
    updatedAt: '2024-01-10 14:30:00',
    category: 'communication',
    isActive: true
  },
  {
    id: 6,
    name: 'Client Communication',
    description: 'Giao tiếp với khách hàng',
    roles: [
      { name: 'Administrator', type: 'primary' },
      { name: 'Manager', type: 'warning' }
    ],
    createdAt: '2021-05-20 13:20:00',
    updatedAt: '2024-01-08 11:45:00',
    category: 'communication',
    isActive: true
  },
  {
    id: 7,
    name: 'Only View',
    description: 'Chỉ được xem, không được chỉnh sửa',
    roles: [
      { name: 'Administrator', type: 'primary' },
      { name: 'Restricted User', type: 'danger' }
    ],
    createdAt: '2021-04-30 16:10:00',
    updatedAt: '2024-01-05 12:30:00',
    category: 'view',
    isActive: false
  },
  {
    id: 8,
    name: 'Financial Management',
    description: 'Quản lý tài chính và kế toán',
    roles: [
      { name: 'Administrator', type: 'primary' },
      { name: 'Manager', type: 'warning' }
    ],
    createdAt: '2021-03-15 09:30:00',
    updatedAt: '2024-01-03 15:45:00',
    category: 'finance',
    isActive: true
  },
  {
    id: 9,
    name: 'Manage Others Tasks',
    description: 'Quản lý công việc của người khác',
    roles: [
      { name: 'Administrator', type: 'primary' },
      { name: 'Support', type: 'info' }
    ],
    createdAt: '2021-02-28 12:45:00',
    updatedAt: '2024-01-01 10:20:00',
    category: 'task_management',
    isActive: true
  },
  {
    id: 10,
    name: 'System Configuration',
    description: 'Cấu hình hệ thống và thiết lập',
    roles: [
      { name: 'Administrator', type: 'primary' }
    ],
    createdAt: '2021-01-10 14:20:00',
    updatedAt: '2023-12-28 16:30:00',
    category: 'system',
    isActive: true
  }
]

const mockPermissionCategories = [
  { id: 'system', name: 'Hệ thống', description: 'Quyền liên quan đến quản lý hệ thống' },
  { id: 'user_management', name: 'Quản lý người dùng', description: 'Quyền quản lý tài khoản người dùng' },
  { id: 'billing', name: 'Thanh toán', description: 'Quyền liên quan đến thanh toán và hóa đơn' },
  { id: 'project', name: 'Dự án', description: 'Quyền quản lý dự án và kế hoạch' },
  { id: 'communication', name: 'Giao tiếp', description: 'Quyền liên quan đến email và giao tiếp' },
  { id: 'finance', name: 'Tài chính', description: 'Quyền quản lý tài chính và kế toán' },
  { id: 'task_management', name: 'Quản lý công việc', description: 'Quyền phân công và theo dõi công việc' },
  { id: 'view', name: 'Xem', description: 'Quyền chỉ xem thông tin' }
]

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export default {
  // Lấy danh sách permissions với filter và pagination
  async getPermissions({ 
    page = 1, 
    pageSize = 10,
    search = '', 
    role = '', 
    category = '',
    isActive = null
  }) {
    await delay(DELAY)
    
    let filtered = [...mockPermissions]
    
    // Filter by search (permission name or description)
    if (search) {
      filtered = filtered.filter(permission => 
        permission.name.toLowerCase().includes(search.toLowerCase()) ||
        permission.description.toLowerCase().includes(search.toLowerCase())
      )
    }
    
    // Filter by role
    if (role) {
      filtered = filtered.filter(permission => 
        permission.roles.some(r => r.name.toLowerCase().includes(role.toLowerCase()))
      )
    }
    
    // Filter by category
    if (category) {
      filtered = filtered.filter(permission => permission.category === category)
    }
    
    // Filter by active status
    if (isActive !== null) {
      filtered = filtered.filter(permission => permission.isActive === isActive)
    }

    // Sort by created date (newest first)
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    const start = (page - 1) * pageSize
    const pagedData = filtered.slice(start, start + pageSize)

    // Format data for display
    const formattedData = pagedData.map(permission => ({
      key: permission.id.toString(),
      id: permission.id,
      name: permission.name,
      description: permission.description,
      roles: permission.roles,
      createdAt: formatDate(permission.createdAt),
      updatedAt: formatDate(permission.updatedAt),
      category: permission.category,
      isActive: permission.isActive
    }))

    return {
      data: formattedData,
      meta: {
        currentPage: page,
        totalPages: Math.ceil(filtered.length / pageSize),
        totalItems: filtered.length,
        itemsPerPage: pageSize
      }
    }
  },

  // Lấy chi tiết permission theo ID
  async getPermissionById(id: number) {
    await delay(DELAY)
    const permission = mockPermissions.find(p => p.id === id)
    if (!permission) {
      throw new Error('Permission not found')
    }
    
    return { 
      data: {
        ...permission,
        createdAt: formatDate(permission.createdAt),
        updatedAt: formatDate(permission.updatedAt)
      }
    }
  },

  // Tạo permission mới
  async createPermission(permissionData: any) {
    await delay(DELAY)
    const newPermission = {
      id: mockPermissions.length + 1,
      ...permissionData,
      roles: permissionData.roles || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: permissionData.isActive !== undefined ? permissionData.isActive : true
    }
    mockPermissions.push(newPermission)
    return { data: newPermission }
  },

  // Cập nhật permission
  async updatePermission(id: number, permissionData: any) {
    await delay(DELAY)
    const permissionIndex = mockPermissions.findIndex(p => p.id === id)
    if (permissionIndex === -1) {
      throw new Error('Permission not found')
    }
    mockPermissions[permissionIndex] = {
      ...mockPermissions[permissionIndex],
      ...permissionData,
      updatedAt: new Date().toISOString()
    }
    return { data: mockPermissions[permissionIndex] }
  },

  // Xóa permission
  async deletePermission(id: number) {
    await delay(DELAY)
    const permissionIndex = mockPermissions.findIndex(p => p.id === id)
    if (permissionIndex === -1) {
      throw new Error('Permission not found')
    }
    mockPermissions.splice(permissionIndex, 1)
    return { success: true }
  },

  // Lấy danh sách categories
  async getPermissionCategories() {
    await delay(DELAY)
    return { data: mockPermissionCategories }
  },

  // Gán permission cho role
  async assignPermissionToRole(permissionId: number, _roleId: number, roleName: string, roleType: string) {
    await delay(DELAY)
    const permission = mockPermissions.find(p => p.id === permissionId)
    if (!permission) {
      throw new Error('Permission not found')
    }
    
    // Check if role already exists
    const existingRole = permission.roles.find(r => r.name === roleName)
    if (!existingRole) {
      permission.roles.push({ name: roleName, type: roleType })
      permission.updatedAt = new Date().toISOString()
    }
    
    return { data: permission }
  },

  // Hủy gán permission khỏi role
  async unassignPermissionFromRole(permissionId: number, roleName: string) {
    await delay(DELAY)
    const permission = mockPermissions.find(p => p.id === permissionId)
    if (!permission) {
      throw new Error('Permission not found')
    }
    
    permission.roles = permission.roles.filter(r => r.name !== roleName)
    permission.updatedAt = new Date().toISOString()
    
    return { data: permission }
  },

  // Lấy thống kê permissions
  async getPermissionStats() {
    await delay(DELAY)
    
    const totalPermissions = mockPermissions.length
    const activePermissions = mockPermissions.filter(p => p.isActive).length
    const inactivePermissions = totalPermissions - activePermissions
    
    const categoryStats = mockPermissionCategories.map(category => ({
      category: category.name,
      count: mockPermissions.filter(p => p.category === category.id).length
    }))
    
    return {
      data: {
        totalPermissions,
        activePermissions,
        inactivePermissions,
        categoryStats,
        mostUsedPermissions: mockPermissions
          .sort((a, b) => b.roles.length - a.roles.length)
          .slice(0, 5)
          .map(p => ({ name: p.name, roleCount: p.roles.length }))
      }
    }
  }
}
