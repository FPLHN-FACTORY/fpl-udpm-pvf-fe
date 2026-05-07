import type { RouteRecordRaw } from 'vue-router'
import { expensesManagementRoutes } from './expenses-management' 

export const expensesRoutes: RouteRecordRaw[] = [
  {
    path: '/expenses',
    meta: { title: 'Quản lý sinh hoạt phí', icon: 'BxsContact', isHeader: true },
    children: [
      {
        path: 'withdrawal',
        // Lưu ý: Không dùng 'component' ở đây nếu không có layout cha
        children: [
          ...expensesManagementRoutes
        ]
      }
    ]
  }
]