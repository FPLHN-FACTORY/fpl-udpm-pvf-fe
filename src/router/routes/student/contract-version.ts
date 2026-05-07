import type { RouteRecordRaw } from 'vue-router'

export const contractVersionRoutes: RouteRecordRaw[] = [
  {
    path: 'contract-version',
    name: 'student-contract-version',
    component: () => import('../../../components/pages/student/contract-version/List.vue'),
    meta: { title: 'Phiên bản hợp đồng', icon: 'BxServer' }
  },
  {
    path: 'contract-version/create',
    name: 'student-contract-version-create',
    component: () => import('../../../components/pages/student/contract-version/Create.vue'),
    meta: { title: 'Thêm mới Phiên bản hợp đồng', hidden: true }
  },
  {
    path: 'contract-version/edit/:id',
    name: 'student-contract-version-edit',
    component: () => import('../../../components/pages/student/contract-version/Edit.vue'),
    meta: { title: 'Điều chỉnh Phiên bản hợp đồng', hidden: true }
  },
  {
    path: 'contract-version/detail/:id',
    name: 'student-contract-version-detail',
    component: () => import('../../../components/pages/student/contract-version/Detail.vue'),
    meta: { title: 'Chi tiết Phiên bản hợp đồng', hidden: true }
  },
  {
    path: 'contract-version/deleted',
    name: 'student-contract-version-deleted',
    component: () => import('../../../components/pages/student/contract-version/Deleted.vue'),
    meta: { title: 'Danh sách Phiên bản hợp đồng đã xóa', hidden: true }
  }
]
