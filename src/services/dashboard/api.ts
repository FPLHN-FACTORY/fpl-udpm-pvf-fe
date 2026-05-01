// Mock API service for dashboard
const DELAY = 300

// Mock dashboard statistics
const mockDashboardStats = {
  overview: {
    totalUsers: 1247,
    totalRoles: 8,
    totalPermissions: 45,
    totalLogs: 3892
  },
  userStats: {
    activeUsers: 1156,
    inactiveUsers: 91,
    newUsersThisMonth: 23,
    newUsersToday: 3
  },
  systemStats: {
    systemUptime: '15 ngày 8 giờ 32 phút',
    lastBackup: '2024-01-25 02:00:00',
    diskUsage: 67.5,
    memoryUsage: 45.2
  },
  recentActivities: [
    {
      id: 1,
      user: 'Nguyễn Văn An',
      action: 'Đăng nhập vào hệ thống',
      time: '2024-01-25 10:30:00',
      type: 'login'
    },
    {
      id: 2,
      user: 'Trần Thị Bình',
      action: 'Tạo tài khoản người dùng mới',
      time: '2024-01-25 09:45:00',
      type: 'create'
    },
    {
      id: 3,
      user: 'Lê Văn Cường',
      action: 'Cập nhật thông tin cá nhân',
      time: '2024-01-25 09:15:00',
      type: 'update'
    },
    {
      id: 4,
      user: 'Phạm Thị Dung',
      action: 'Xóa quyền người dùng',
      time: '2024-01-25 08:30:00',
      type: 'delete'
    },
    {
      id: 5,
      user: 'Hoàng Văn Em',
      action: 'Đăng xuất khỏi hệ thống',
      time: '2024-01-25 08:00:00',
      type: 'logout'
    }
  ],
  chartData: {
    userGrowth: {
      labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
      data: [120, 135, 142, 158, 167, 175, 189]
    },
    loginActivity: {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      data: [12, 8, 45, 67, 89, 34]
    },
    roleDistribution: {
      labels: ['Administrator', 'Editor', 'User', 'Support', 'Restricted'],
      data: [4, 7, 5, 6, 10]
    }
  },
  alerts: [
    {
      id: 1,
      type: 'warning',
      title: 'Dung lượng đĩa cứng',
      message: 'Dung lượng đĩa cứng đã sử dụng 67.5%, cần kiểm tra và dọn dẹp',
      time: '2024-01-25 09:00:00'
    },
    {
      id: 2,
      type: 'info',
      title: 'Sao lưu dữ liệu',
      message: 'Sao lưu dữ liệu tự động đã hoàn thành thành công',
      time: '2024-01-25 02:00:00'
    },
    {
      id: 3,
      type: 'success',
      title: 'Cập nhật hệ thống',
      message: 'Hệ thống đã được cập nhật lên phiên bản mới nhất',
      time: '2024-01-24 18:30:00'
    }
  ]
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default {
  // Lấy thống kê tổng quan dashboard
  async getDashboardStats() {
    await delay(DELAY)
    return { data: mockDashboardStats }
  },

  // Lấy thống kê theo khoảng thời gian
  async getStatsByDateRange(startDate: string, endDate: string) {
    await delay(DELAY)
    
    // Simulate different data based on date range
    const daysDiff = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))
    
    return {
      data: {
        ...mockDashboardStats,
        overview: {
          ...mockDashboardStats.overview,
          totalUsers: mockDashboardStats.overview.totalUsers + Math.floor(Math.random() * daysDiff),
          totalLogs: mockDashboardStats.overview.totalLogs + Math.floor(Math.random() * daysDiff * 10)
        }
      }
    }
  },

  // Lấy hoạt động gần đây
  async getRecentActivities(limit = 10) {
    await delay(DELAY)
    return {
      data: mockDashboardStats.recentActivities.slice(0, limit)
    }
  },

  // Lấy dữ liệu biểu đồ
  async getChartData(chartType: string) {
    await delay(DELAY)
    
    const chartData = mockDashboardStats.chartData[chartType as keyof typeof mockDashboardStats.chartData]
    if (!chartData) {
      throw new Error('Chart type not found')
    }
    
    return { data: chartData }
  },

  // Lấy cảnh báo hệ thống
  async getSystemAlerts() {
    await delay(DELAY)
    return { data: mockDashboardStats.alerts }
  },

  // Đánh dấu cảnh báo đã đọc
  async markAlertAsRead(alertId: number) {
    await delay(DELAY)
    const alertIndex = mockDashboardStats.alerts.findIndex(alert => alert.id === alertId)
    if (alertIndex !== -1) {
      mockDashboardStats.alerts.splice(alertIndex, 1)
    }
    return { success: true }
  },

  // Lấy thông tin hệ thống
  async getSystemInfo() {
    await delay(DELAY)
    return {
      data: {
        version: '1.0.0',
        buildDate: '2024-01-15',
        environment: 'production',
        database: {
          type: 'PostgreSQL',
          version: '15.2',
          status: 'connected'
        },
        server: {
          os: 'Ubuntu 22.04 LTS',
          memory: '16 GB',
          cpu: 'Intel Xeon E5-2686 v4',
          uptime: mockDashboardStats.systemStats.systemUptime
        }
      }
    }
  }
}