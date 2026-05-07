import type { RouteRecordRaw } from 'vue-router'


export const schoolYearRoute: RouteRecordRaw = {
  path: 'school-year',
  name: 'cultural-year',
  component: () => import('../../../components/pages/dashboard/DashboardPage.vue'),
  meta: { title: 'N\u0103m h\u1ecdc', icon: 'BxSpreadsheet' }
}
export const schoolYearRoutes: RouteRecordRaw[] = [
  {
    path: 'school-year',
    name: 'cultural-year',
    component: () => import('@/components/pages/cultural/school-year/SchoolYearPage.vue'),
    meta: { title: 'Năm học', icon: 'BxSpreadsheet' }
  },
  {
    path: 'school-year/add',
    name: 'cultural-year-add',
    component: () => import('@/components/pages/cultural/school-year/AddSchoolYearPage.vue'),
    meta: { title: 'Thêm mới Năm học', hidden: true }
  },
  {
    path: 'school-year/edit/:id',
    name: 'cultural-year-edit',
    component: () => import('@/components/pages/cultural/school-year/EditSchoolYearPage.vue'),
    meta: { title: 'Điều chỉnh Năm học', hidden: true }
  },
  {
    path: 'school-year/detail/:id',
    name: 'cultural-year-detail',
    component: () => import('@/components/pages/cultural/school-year/SchoolYearDetailPage.vue'),
    meta: { title: 'Chi tiết Năm học', hidden: true }
  }
]
