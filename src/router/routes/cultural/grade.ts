import type { RouteRecordRaw } from 'vue-router'

export const gradeRoute: RouteRecordRaw = {
  path: 'grade',
  name: 'cultural-grade',
  component: () => import('../../../components/pages/cultural/GradeListPage.vue'),
  component: () => import('../../../components/pages/dashboard/DashboardPage.vue'),
  meta: { title: 'Khối lớp', icon: 'BxsCategoryAlt' }
}

export const gradeHiddenRoute: RouteRecordRaw = {
  path: 'grade',
  children: [
    {
      path: 'detail/:id',
      name: 'cultural-grade-detail',
      component: () => import('../../../components/pages/cultural/GradeDetailPage.vue'),
      meta: { title: 'Chi tiết Khối lớp', hidden: true }
    },
    {
      path: 'create',
      name: 'cultural-grade-create',
      component: () => import('../../../components/pages/cultural/GradeCreatePage.vue'),
      meta: { title: 'Thêm mới Khối lớp', hidden: true }
    },
    {
      path: 'edit/:id',
      name: 'cultural-grade-edit',
      component: () => import('../../../components/pages/cultural/GradeEditPage.vue'),
      meta: { title: 'Điều chỉnh Khối lớp', hidden: true }
    },
    {
      path: 'deleted',
      name: 'cultural-grade-deleted',
      component: () => import('../../../components/pages/cultural/GradeDeletedListPage.vue'),
      meta: { title: 'Danh sách Khối lớp đã xóa', hidden: true }
    }
  ]
}
