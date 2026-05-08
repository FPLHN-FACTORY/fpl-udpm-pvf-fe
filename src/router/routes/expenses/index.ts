import { expensesManagementRoutes, expensesManagementHiddenRoutes } from './expenses-management' 

export const expensesRoutes: RouteRecordRaw[] = [
  {
    path: '/expenses',
    meta: { title: 'Quản lý sinh hoạt phí', icon: 'BxsContact', isHeader: true },
    children: [
      ...expensesManagementRoutes
    ]
  }
]

export const expensesHiddenRoutes: RouteRecordRaw[] = [
  {
    path: '/expenses',
    children: [
      ...expensesManagementHiddenRoutes
    ]
  }
]