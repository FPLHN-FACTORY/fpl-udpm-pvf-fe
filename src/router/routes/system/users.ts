import type { RouteRecordRaw } from 'vue-router'
export const usersRoute: RouteRecordRaw = {
  path: 'users',
  name: 'system-users',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: { title: 'Quản lý người dùng', icon: 'BxsUserDetail' }
}
