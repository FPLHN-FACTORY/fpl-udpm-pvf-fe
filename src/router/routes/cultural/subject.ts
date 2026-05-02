import type { RouteRecordRaw } from 'vue-router'

export const subjectRoute: RouteRecordRaw = {
  path: 'subject',
  name: 'cultural-subject',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: { title: 'M\u00f4n h\u1ecdc v\u0103n h\u00f3a', icon: 'BxBookAlt' }
  component: () => import('../../../components/pages/dashboard/DashboardPage.vue'),
  meta: { title: 'Môn học văn hóa', icon: 'BxBookAlt' }
}
