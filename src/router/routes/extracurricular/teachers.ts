import type { RouteRecordRaw } from 'vue-router'

export const teachersRoute: RouteRecordRaw[] = [
  {
    path: 'teachers',
    name: 'extracurricular-teachers',
    component: () => import('../../../components/pages/TeacherInChargePage.vue'),
    meta: { title: 'Giáo viên phụ trách', icon: 'BxsUserBadge' }
  },
  {
    path: 'teachers/:id',
    name: 'extracurricular-teacher-detail',
    component: () => import('../../../components/pages/TeacherDetailPage.vue'),
    meta: { title: 'Chi tiết Giáo viên phụ trách', hidden: true }
  },
  {
    path: 'teachers/create',
    name: 'extracurricular-teacher-create',
    component: () => import('../../../components/pages/CreateTeacherPage.vue'),
    meta: { title: 'Thêm mới Giáo viên phụ trách', hidden: true }
  },
  {
    path: 'teachers/edit/:id',
    name: 'extracurricular-teacher-edit',
    component: () => import('../../../components/pages/EditTeacherPage.vue'),
    meta: { title: 'Điều chỉnh Giáo viên phụ trách', hidden: true }
  },
  {
    path: 'teachers/deleted',
    name: 'extracurricular-teacher-deleted',
    component: () => import('../../../components/pages/DeletedTeacherPage.vue'),
    meta: { title: 'Danh sách Giáo viên phụ trách đã xóa', hidden: true }
  }
]
