import type { RouteRecordRaw } from 'vue-router'
export const rolesRoutes: RouteRecordRaw[] = [
  {
    path: 'roles',
    name: 'system-roles',
    component: () => import('../../../components/pages/RolesPage.vue'),
    meta: { title: 'Vai trò', icon: 'BxRadioCircle' }
  },
  {
    path: 'roles/add',
    name: 'system-roles-add',
    component: () => import('../../../components/pages/AddRolePage.vue'),
    meta: { title: 'Thêm nhóm quyền', hidden: true }
  },
  {
    path: 'roles/edit/:id',
    name: 'system-roles-edit',
    component: () => import('../../../components/pages/EditRolePage.vue'),
    meta: { title: 'Sửa nhóm quyền', hidden: true }
  },
  {
    path: 'roles/detail/:id',
    name: 'system-roles-detail',
    component: () => import('../../../components/pages/RoleDetailPage.vue'),
    meta: { title: 'Chi tiết nhóm quyền', hidden: true }
  }
]
