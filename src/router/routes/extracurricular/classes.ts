import type { RouteRecordRaw } from 'vue-router'

export const classesRoute: RouteRecordRaw = {
  path: 'classes',
  name: 'extracurricular-classes',
  meta: { title: 'Lớp học ngoại khóa', icon: 'BxsSchool', hasSubmenu: true },
  children: [
    {
      path: 'list',
      name: 'extracurricular-classes-list',
      component: () => import('../../../components/pages/extracurricular/ExtracurricularClassListPage.vue'),
      meta: { title: 'Danh sách' }
    },
    {
      path: 'create',
      name: 'extracurricular-classes-create',
      component: () => import('../../../components/pages/extracurricular/ExtracurricularClassCreatePage.vue'),
      meta: { title: 'Thêm mới', hidden: true }
    },
    {
      path: 'edit/:id',
      name: 'extracurricular-classes-edit',
      component: () => import('../../../components/pages/extracurricular/ExtracurricularClassEditPage.vue'),
      meta: { title: 'Điều chỉnh', hidden: true }
    },
    {
      path: 'deleted',
      name: 'extracurricular-classes-deleted',
      component: () => import('../../../components/pages/extracurricular/ExtracurricularClassDeletedListPage.vue'),
      meta: { title: 'Danh sách đã xóa', hidden: true }
    },
    {
      path: 'detail/:id',
      name: 'extracurricular-classes-detail',
      component: () => import('../../../components/pages/extracurricular/ExtracurricularClassDetailPage.vue'),
      meta: { title: 'Chi tiết', hidden: true }
    },
    {
      path: 'attendance',
      name: 'extracurricular-classes-attendance',
      component: () => import('../../../components/pages/extracurricular/ExtracurricularAttendanceListPage.vue'),
      meta: { title: 'Điểm danh' }
    },
    {
      path: 'grades',
      name: 'extracurricular-classes-grades',
      component: () => import('../../../components/pages/extracurricular/ExtracurricularGradesListPage.vue'),
      meta: { title: 'Bảng điểm' }
    }
  ]
}
