import type { RouteRecordRaw } from 'vue-router'
import { withdrawalRoute } from './withdrawal'

export const expensesRoutes: RouteRecordRaw[] = [
  {
    path: '/expenses',
    meta: { title: 'Quản lý sinh hoạt phí', icon: 'BxsContact', isHeader: true },
    children: [
      withdrawalRoute
    ]
  }
]
