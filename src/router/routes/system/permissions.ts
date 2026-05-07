import type { RouteRecordRaw } from 'vue-router'

export const permissionsRoutes: RouteRecordRaw[] = [
  {
    path: 'permissions',
    name: 'system-permissions',
    component: () => import('../../../components/pages/system/permissions/PermissionsPage.vue'),
    meta: { title: 'Danh sách Quyền người dùng', icon: 'BxRadioCircle' }
  },
  {
    path: 'permissions/add',
    name: 'system-permissions-add',
    component: () => import('../../../components/pages/system/permissions/AddPermissionPage.vue'),
    meta: { title: 'Thêm quyền', hidden: true }
  },
  {
    path: 'permissions/edit/:id',
    name: 'system-permissions-edit',
    component: () => import('../../../components/pages/system/permissions/EditPermissionPage.vue'),
    meta: { title: 'Sửa quyền', hidden: true }
  },
  {
    path: 'permissions/detail/:id',
    name: 'system-permissions-detail',
    component: () => import('../../../components/pages/system/permissions/PermissionDetailPage.vue'),
    meta: { title: 'Chi tiết quyền', hidden: true }
  }
]
