import type { RouteRecordRaw } from 'vue-router'

export const expensesManagementRoutes: RouteRecordRaw[] = [
  {
    path: '', // Để rỗng để làm trang mặc định
    name: 'expenses-list',
    component: () => import('../../../components/pages/expenses/ExpensesList.vue'),
    meta: { title: 'Yêu cầu rút sinh hoạt phí', icon: 'BxsContact' }
  },
  {
    path: 'detail/:id',
    name: 'expenses-detail',
    component: () => import('../../../components/pages/expenses/ExpensesDetail.vue'),
    meta: { title: 'Chi tiết chi phí', hidden: true } // Ẩn khỏi menu
  },
  {
    path: 'edit/:id',
    name: 'expenses-edit',
    component: () => import('../../../components/pages/expenses/ExpensesEdit.vue'),
    meta: { title: 'Chỉnh sửa chi phí', hidden: true }
  },
  {
    path: 'delete/:id',
    name: 'expenses-delete',
    component: () => import('../../../components/pages/expenses/ExpensesDelete.vue'),
    meta: { title: 'Xóa chi phí', hidden: true }
  }
]