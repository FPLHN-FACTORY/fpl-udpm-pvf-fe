import type { RouteRecordRaw } from 'vue-router'

export const logRoute: RouteRecordRaw[] = [
  {
    path: 'log',
    name: 'system-log',
    component: () => import('../../../components/pages/system/log/LogPage.vue'),
    meta: { title: 'Nhật ký hệ thống', icon: 'BxHistory' }
  },
  {
    path: 'log/detail/:id',
    name: 'system-log-detail',
    component: () => import('../../../components/pages/system/log/LogDetailPage.vue'),
    meta: { title: 'Chi tiết Nhật ký', hidden: true }
  }
]
