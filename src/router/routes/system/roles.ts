import type { RouteRecordRaw } from 'vue-router'
export const rolesRoute: RouteRecordRaw = {
  path: 'roles',
  name: 'system-roles',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: { title: 'Phân quyền', icon: 'BxsKeyWrapper' }
}
