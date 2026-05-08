import type { RouteRecordRaw } from 'vue-router'

export const absenceRoute: RouteRecordRaw = {
  path: 'absence',
  name: 'cultural-absence',
  component: () => import('../../../components/pages/cultural/absence/AbsenceListPage.vue'),
  meta: { title: 'Đơn xin phép nghỉ học', icon: 'BxLogInWrapper' }
}

export const absenceHiddenRoute: RouteRecordRaw = {
  path: 'absence',
  children: [
    {
      path: 'detail/:id',
      name: 'cultural-absence-detail',
      component: () => import('../../../components/pages/cultural/absence/AbsenceDetailPage.vue'),
      meta: { title: 'Chi tiết Đơn xin phép nghỉ học', hidden: true }
    },
    {
      path: 'create',
      name: 'cultural-absence-create',
      component: () => import('../../../components/pages/cultural/absence/AbsenceCreatePage.vue'),
      meta: { title: 'Thêm mới Đơn xin phép nghỉ học', hidden: true }
    },
    {
      path: 'edit/:id',
      name: 'cultural-absence-edit',
      component: () => import('../../../components/pages/cultural/absence/AbsenceEditPage.vue'),
      meta: { title: 'Điều chỉnh Đơn xin phép nghỉ học', hidden: true }
    },
    {
      path: 'deleted',
      name: 'cultural-absence-deleted',
      component: () => import('../../../components/pages/cultural/absence/AbsenceDeletedListPage.vue'),
      meta: { title: 'Danh sách Đơn xin phép nghỉ học đã xóa', hidden: true }
    }
  ]
}
