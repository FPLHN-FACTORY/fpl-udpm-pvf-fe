import type { RouteRecordRaw } from 'vue-router'
export const subjectsRoute: RouteRecordRaw = {
  path: 'subjects',
  name: 'extracurricular-subjects',
  component: () => import('../../../components/pages/dashboard/DashboardPage.vue'),
  meta: { title: 'Môn học ngoại khóa', icon: 'BxBookAlt' }
}
