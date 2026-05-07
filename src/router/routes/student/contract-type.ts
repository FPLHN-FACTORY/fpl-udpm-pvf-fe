import type { RouteRecordRaw } from 'vue-router'

export const contractTypeRoutes: RouteRecordRaw[] = [
  {
    path: 'contract-type',
    name: 'student-contract-type',
    component: () => import('../../../components/pages/student/contract-type/List.vue'),
    meta: { title: 'Loại hợp đồng', icon: 'BxsContact' }
  },
  {
    path: 'contract-type/create',
    name: 'student-contract-type-create',
    component: () => import('../../../components/pages/student/contract-type/Create.vue'),
    meta: { title: 'Thêm mới Loại hợp đồng', hidden: true }
  },
  {
    path: 'contract-type/edit/:id',
    name: 'student-contract-type-edit',
    component: () => import('../../../components/pages/student/contract-type/Edit.vue'),
    meta: { title: 'Sửa Loại hợp đồng', hidden: true }
  },
  {
    path: 'contract-type/detail/:id',
    name: 'student-contract-type-detail',
    component: () => import('../../../components/pages/student/contract-type/Detail.vue'),
    meta: { title: 'Chi tiết Loại hợp đồng', hidden: true }
  },
  {
    path: 'contract-type/deleted',
    name: 'student-contract-type-deleted',
    component: () => import('../../../components/pages/student/contract-type/Deleted.vue'),
    meta: { title: 'Danh sách Loại hợp đồng đã xóa', hidden: true }
  }
]
