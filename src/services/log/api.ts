// Mock API service for system logs
const DELAY = 300

// Mock data for system logs
const mockLogs = [
  {
    id: '6979',
    time: '2024-01-25 10:21:30',
    user: {
      id: 1,
      name: 'Nguyễn Văn An',
      email: 'nguyen.van.an@pvf.com.vn',
      avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png'
    },
    action: 'CREATE',
    objectType: 'USER',
    object: 'U001_NguyenVanA',
    description: 'Tạo tài khoản người dùng mới',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    details: {
      oldValue: null,
      newValue: {
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@pvf.com.vn',
        role: 'User'
      }
    }
  },
  {
    id: '6624',
    time: '2024-01-24 16:43:15',
    user: {
      id: 2,
      name: 'Trần Thị Bình',
      email: 'tran.thi.binh@pvf.com.vn',
      avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/2.png'
    },
    action: 'DELETE',
    objectType: 'USER',
    object: 'U002_TranVanB',
    description: 'Xóa tài khoản người dùng',
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    details: {
      oldValue: {
        name: 'Trần Văn B',
        email: 'tranvanb@pvf.com.vn',
        role: 'Editor'
      },
      newValue: null
    }
  },
  {
    id: '9305',
    time: '2024-01-24 08:05:22',
    user: {
      id: 3,
      name: 'Lê Văn Cường',
      email: 'le.van.cuong@pvf.com.vn',
      avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/3.png'
    },
    action: 'LOGIN',
    objectType: 'AUTH',
    object: 'LOGIN_SESSION_001',
    description: 'Đăng nhập vào hệ thống',
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
    details: {
      loginMethod: 'email_password',
      sessionId: 'sess_abc123xyz',
      deviceInfo: 'Desktop - Chrome 120'
    }
  },
  {
    id: '8005',
    time: '2024-01-23 15:01:45',
    user: {
      id: 4,
      name: 'Phạm Thị Dung',
      email: 'pham.thi.dung@pvf.com.vn',
      avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/4.png'
    },
    action: 'UPDATE',
    objectType: 'USER',
    object: 'U003_LeVanC',
    description: 'Cập nhật thông tin người dùng',
    ipAddress: '192.168.1.103',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
    details: {
      oldValue: {
        name: 'Lê Văn C',
        role: 'User'
      },
      newValue: {
        name: 'Lê Văn Cường',
        role: 'Editor'
      }
    }
  },
  {
    id: '8114',
    time: '2024-01-23 11:39:18',
    user: {
      id: 5,
      name: 'Hoàng Văn Em',
      email: 'hoang.van.em@pvf.com.vn',
      avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/5.png'
    },
    action: 'DELETE',
    objectType: 'IP_POLICY',
    object: 'IP_POLICY_001',
    description: 'Xóa chính sách IP',
    ipAddress: '192.168.1.104',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0',
    details: {
      oldValue: {
        ipRange: '192.168.1.0/24',
        action: 'ALLOW',
        description: 'Internal network access'
      },
      newValue: null
    }
  },
  {
    id: '6890',
    time: '2024-01-22 19:24:33',
    user: {
      id: 6,
      name: 'Vũ Thị Giang',
      email: 'vu.thi.giang@pvf.com.vn',
      avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/6.png'
    },
    action: 'LOGIN',
    objectType: 'AUTH',
    object: 'LOGIN_SESSION_002',
    description: 'Đăng nhập vào hệ thống',
    ipAddress: '192.168.1.105',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
    details: {
      loginMethod: 'google_oauth',
      sessionId: 'sess_def456uvw',
      deviceInfo: 'MacBook Pro - Safari 17'
    }
  },
  {
    id: '5911',
    time: '2024-01-22 14:26:07',
    user: {
      id: 7,
      name: 'Đỗ Văn Hùng',
      email: 'do.van.hung@pvf.com.vn',
      avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/7.png'
    },
    action: 'CREATE',
    objectType: 'IP_POLICY',
    object: 'IP_POLICY_002',
    description: 'Tạo chính sách IP mới',
    ipAddress: '192.168.1.106',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    details: {
      oldValue: null,
      newValue: {
        ipRange: '10.0.0.0/8',
        action: 'BLOCK',
        description: 'Block external access'
      }
    }
  },
  {
    id: '5531',
    time: '2024-01-21 09:21:55',
    user: {
      id: 8,
      name: 'Bùi Thị Hoa',
      email: 'bui.thi.hoa@pvf.com.vn',
      avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/8.png'
    },
    action: 'UPDATE',
    objectType: 'AUTH',
    object: 'AUTH_POLICY_001',
    description: 'Cập nhật chính sách xác thực',
    ipAddress: '192.168.1.107',
    userAgent: 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/121.0',
    details: {
      oldValue: {
        passwordPolicy: 'MEDIUM',
        sessionTimeout: 3600
      },
      newValue: {
        passwordPolicy: 'STRONG',
        sessionTimeout: 7200
      }
    }
  },
  {
    id: '4892',
    time: '2024-01-20 16:15:42',
    user: {
      id: 9,
      name: 'Ngô Văn Inh',
      email: 'ngo.van.inh@pvf.com.vn',
      avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/9.png'
    },
    action: 'LOGIN',
    objectType: 'AUTH',
    object: 'LOGIN_SESSION_003',
    description: 'Đăng nhập vào hệ thống',
    ipAddress: '192.168.1.108',
    userAgent: 'Mozilla/5.0 (Android 14; Mobile; rv:109.0) Gecko/121.0 Firefox/121.0',
    details: {
      loginMethod: 'email_password',
      sessionId: 'sess_ghi789rst',
      deviceInfo: 'Android Phone - Firefox Mobile'
    }
  },
  {
    id: '4321',
    time: '2024-01-20 13:45:28',
    user: {
      id: 10,
      name: 'Trương Thị Kim',
      email: 'truong.thi.kim@pvf.com.vn',
      avatar: 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/10.png'
    },
    action: 'CREATE',
    objectType: 'USER',
    object: 'U004_PhamVanD',
    description: 'Tạo tài khoản người dùng mới',
    ipAddress: '192.168.1.109',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    details: {
      oldValue: null,
      newValue: {
        name: 'Phạm Văn D',
        email: 'phamvand@pvf.com.vn',
        role: 'Support'
      }
    }
  }
]

// Mock statistics data
const mockLogStats = {
  totalLogs: 1247,
  todayLogs: 23,
  actionStats: {
    CREATE: 312,
    UPDATE: 445,
    DELETE: 156,
    LOGIN: 334
  },
  objectTypeStats: {
    USER: 523,
    AUTH: 412,
    IP_POLICY: 312
  },
  topUsers: [
    { name: 'Nguyễn Văn An', count: 45 },
    { name: 'Trần Thị Bình', count: 38 },
    { name: 'Lê Văn Cường', count: 32 }
  ]
}

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
  // Lấy danh sách logs với filter và pagination
  async getLogs({ 
    page = 1, 
    pageSize = 10,
    search = '', 
    objectType = '', 
    action = '',
    startDate = '',
    endDate = ''
  }) {
    await delay(DELAY)
    
    let filtered = [...mockLogs]
    
    // Filter by search (user name or email)
    if (search) {
      filtered = filtered.filter(log => 
        log.user.name.toLowerCase().includes(search.toLowerCase()) ||
        log.user.email.toLowerCase().includes(search.toLowerCase()) ||
        log.object.toLowerCase().includes(search.toLowerCase())
      )
    }
    
    // Filter by object type
    if (objectType) {
      filtered = filtered.filter(log => log.objectType === objectType)
    }
    
    // Filter by action
    if (action) {
      filtered = filtered.filter(log => log.action === action)
    }
    
    // Filter by date range
    if (startDate && endDate) {
      filtered = filtered.filter(log => {
        const logDate = new Date(log.time)
        const start = new Date(startDate)
        const end = new Date(endDate)
        return logDate >= start && logDate <= end
      })
    }

    // Sort by time (newest first)
    filtered.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())

    const start = (page - 1) * pageSize
    const pagedData = filtered.slice(start, start + pageSize)

    // Format data for display
    const formattedData = pagedData.map(log => ({
      key: log.id,
      id: log.id,
      time: formatDate(log.time),
      user: log.user,
      action: log.action,
      objectType: log.objectType,
      object: log.object,
      description: log.description,
      ipAddress: log.ipAddress,
      userAgent: log.userAgent,
      details: log.details
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

  // Lấy chi tiết log theo ID
  async getLogById(id: string) {
    await delay(DELAY)
    const log = mockLogs.find(l => l.id === id)
    if (!log) {
      throw new Error('Log not found')
    }
    
    return { 
      data: {
        ...log,
        time: formatDate(log.time)
      }
    }
  },

  // Lấy thống kê logs
  async getLogStats() {
    await delay(DELAY)
    return { data: mockLogStats }
  },

  // Xuất logs ra file
  async exportLogs(filters: any) {
    await delay(DELAY * 2) // Longer delay for export
    
    // Simulate export process
    await this.getLogs({ 
      ...filters, 
      page: 1, 
      pageSize: 1000 // Get all matching records
    })
    
    return {
      success: true,
      downloadUrl: '/api/log/export/log_export_' + Date.now() + '.xlsx',
      fileName: `system_log_${new Date().toISOString().split('T')[0]}.xlsx`
    }
  },

  // Xóa logs cũ (bulk delete)
  async deleteLogs(logIds: string[]) {
    await delay(DELAY)
    
    // Remove logs from mock data
    logIds.forEach(id => {
      const index = mockLogs.findIndex(log => log.id === id)
      if (index !== -1) {
        mockLogs.splice(index, 1)
      }
    })
    
    return {
      success: true,
      deletedCount: logIds.length
    }
  },

  // Lấy danh sách actions có thể filter
  async getAvailableActions() {
    await delay(100)
    return {
      data: ['CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'EXPORT', 'IMPORT']
    }
  },

  // Lấy danh sách object types có thể filter
  async getAvailableObjectTypes() {
    await delay(100)
    return {
      data: ['USER', 'AUTH', 'IP_POLICY', 'ROLE', 'PERMISSION', 'SYSTEM']
    }
  }
}
