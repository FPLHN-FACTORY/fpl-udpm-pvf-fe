import type { RouteRecordRaw } from 'vue-router'

export const expensesManagementRoutes: RouteRecordRaw[] = [
  {
    path: 'withdrawal',
    name: 'expenses-list',
    component: () => import('../../../components/pages/expenses/ExpensesList.vue'),
    meta: { title: 'Yêu cầu rút sinh hoạt phí', icon: 'BxsContact' }
  }
]

export const expensesManagementHiddenRoutes: RouteRecordRaw[] = [
  {
    path: 'withdrawal/detail/:id',
    name: 'expenses-detail',
    component: () => import('../../../components/pages/expenses/ExpensesDetail.vue'),
    meta: { title: 'Chi tiết chi phí', hidden: true }
  },
  {
    path: 'withdrawal/edit/:id',
    name: 'expenses-edit',
    component: () => import('../../../components/pages/expenses/ExpensesEdit.vue'),
    meta: { title: 'Chỉnh sửa chi phí', hidden: true }
  },
  {
    path: 'withdrawal/history-detail/:id',
    name: 'expenses-history-detail',
    component: () => import('../../../components/pages/expenses/ExpensesHistoryDetail.vue'),
    meta: { title: 'Chi tiết lịch sử xử lý', hidden: true }
  },
  {
    path: 'withdrawal/delete',
    name: 'expenses-delete',
    component: () => import('../../../components/pages/expenses/ExpensesDelete.vue'),
    meta: { title: 'Xóa chi phí', hidden: true }
  }
]
