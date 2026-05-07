import type { RouteRecordRaw } from 'vue-router'
export const studentInfoRoutes: RouteRecordRaw[] = [
  {
    path: 'info',
    name: 'student-info',
    component: () => import('@/components/pages/student/info/StudentInfoPage.vue'),
    meta: { title: 'Thông tin học viên', icon: 'BxsUserDetail' }
  },
  {
    path: 'info/add',
    name: 'student-info-add',
    component: () => import('@/components/pages/student/info/AddStudentPage.vue'),
    meta: { title: 'Thêm mới học viên', hidden: true }
  },
  {
    path: 'info/edit/:id',
    name: 'student-info-edit',
    component: () => import('@/components/pages/student/info/EditStudentPage.vue'),
    meta: { title: 'Điều chỉnh học viên', hidden: true }
  },
  {
    path: 'info/detail/:id',
    name: 'student-info-detail',
    component: () => import('@/components/pages/student/info/StudentDetailPage.vue'),
    meta: { title: 'Chi tiết học viên', hidden: true }
  }
]


