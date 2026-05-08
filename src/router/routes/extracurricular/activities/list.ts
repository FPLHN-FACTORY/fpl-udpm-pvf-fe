import type { RouteRecordRaw } from 'vue-router'

export const activityChildRoutes: RouteRecordRaw[] = [
  {
    path: 'list',
    name: 'activities-list',
    component: () => import('@/components/pages/extracurricular/activity/ActivityListPage.vue'),
    meta: { title: 'Danh sách hoạt động', icon: 'BxlZoom' }
  },
  {
    path: 'create',
    name: 'activities-create',
    component: () => import('@/components/pages/extracurricular/activity/ActivityCreatePage.vue'),
    meta: { title: 'Thêm mới hoạt động', hidden: true }
  },
  {
    path: 'detail/:id',
    name: 'activities-detail',
    component: () => import('@/components/pages/extracurricular/activity/ActivityDetailPage.vue'),
    meta: { title: 'Chi tiết hoạt động', hidden: true }
  },
  {
    path: 'edit/:id',
    name: 'activities-edit',
    component: () => import('@/components/pages/extracurricular/activity/ActivityEditPage.vue'),
    meta: { title: 'Điều chỉnh hoạt động', hidden: true }
  },
  {
    path: 'deleted',
    name: 'activities-deleted',
    component: () => import('@/components/pages/extracurricular/activity/ActivityDeletedPage.vue'),
    meta: { title: 'Hoạt động đã xóa', hidden: true }
  }
]