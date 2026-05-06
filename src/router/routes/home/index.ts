import type { RouteRecordRaw } from 'vue-router'

// Chuyển sang dùng dynamic import để tránh lỗi đường dẫn
export const TuyenSinhRoutes: RouteRecordRaw[] = [

  {
    path: '/tuyensinh',
    name: 'TuyenSinh',
    component: () => import('../../../components/pages/home/index.vue'),
    meta: {
      title: 'Tuyển Sinh PVF',
      icon: 'BxsGraduation',
      isHeader: true
    }
  }
]
