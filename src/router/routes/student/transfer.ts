import type { RouteRecordRaw } from 'vue-router'

export const transferRoutes: RouteRecordRaw[] = [
  {
    path: 'transfer-request',
    name: 'student-transfer',
    component: () => import('../../../components/pages/student/TransferApplication.vue'),
    meta: { title: 'Đơn xin chuyển trường', icon: 'BxLogInWrapper' }
  },
  {
    path: 'transfer-request/create',
    name: 'student-transfer-create',
    component: () => import('../../../components/pages/student/TransferApplicationCreate.vue'),
    meta: { title: 'Thêm mới Đơn xin chuyển trường', hidden: true }
  },
  {
    path: 'transfer-request/edit/:id',
    name: 'student-transfer-edit',
    component: () => import('../../../components/pages/student/TransferApplicationEdit.vue'),
    meta: { title: 'Chỉnh sửa Đơn xin chuyển trường', hidden: true }
  },
  {
    path: 'transfer-request/detail/:id',
    name: 'student-transfer-detail',
    component: () => import('../../../components/pages/student/TransferApplicationDetail.vue'),
    meta: { title: 'Chi tiết Đơn xin chuyển trường', hidden: true }
  }
]
