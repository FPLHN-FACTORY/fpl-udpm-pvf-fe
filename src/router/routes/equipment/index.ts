import type { RouteRecordRaw } from 'vue-router'
import { allocationRequestRoute, allocationRequestHiddenRoutes } from './allocation-request'

export const equipmentRoutes: RouteRecordRaw[] = [
  {
    path: '/equipment',
    meta: { title: 'Quản lý công cụ -dụng cụ thi đấu', icon: 'BxDumbbell', isHeader: true },
    children: [
      allocationRequestRoute,
    ],
  },
]

export const equipmentHiddenRoutes: RouteRecordRaw[] = [
  {
    path: '/equipment',
    children: allocationRequestHiddenRoutes,
  },
]
