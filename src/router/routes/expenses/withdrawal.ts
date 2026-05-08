import type { RouteRecordRaw } from 'vue-router'
import { expensesManagementRoutes } from './expenses-management'

export const withdrawalRoute: RouteRecordRaw = {
  path: 'withdrawal',
  name: 'expenses-withdrawal',
  // Sửa dòng này: Trỏ thẳng vào ExpensesList thay vì DashboardPage
  component: () => import('../../../components/pages/expenses/ExpensesList.vue'),
  meta: { title: 'Yêu cầu rút sinh hoạt phí', icon: 'BxsContact' },
  // Giữ các route edit, detail, delete ở đây nhưng để hidden
  children: [
    ...expensesManagementRoutes.map(route => ({
      ...route,
      meta: { ...route.meta, hidden: true } // Ẩn để không bị xổ xuống
    }))
  ]
}
