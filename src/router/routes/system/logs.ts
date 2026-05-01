import type { RouteRecordRaw } from 'vue-router'

export const logsRoute: RouteRecordRaw[] = [
  {
    path: 'logs',
    name: 'system-logs',
    component: () => import('../../../components/pages/LogsPage.vue'),
    meta: { title: 'Nhật ký hệ thống', icon: 'BxHistory' }
  },
  {
    path: 'logs/detail/:id',
    name: 'system-logs-detail',
    component: () => import('../../../components/pages/LogDetailPage.vue'),
    meta: { title: 'Chi tiết Nhật ký', hidden: true }
  }
]
