import type { RouteRecordRaw } from 'vue-router'
export const subjectRoute: RouteRecordRaw = {
  path: 'subject',
  name: 'cultural-subject',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: { title: 'Môn học văn hóa', icon: 'BxBookAlt' }
}
