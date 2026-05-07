import type { RouteRecordRaw } from 'vue-router'
export const roomsRoute: RouteRecordRaw = {
  path: 'rooms',
  name: 'extracurricular-rooms',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: { title: 'Phòng học ngoại khóa', icon: 'BxlZoom' }
}
