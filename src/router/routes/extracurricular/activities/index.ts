import { h } from 'vue'
import { RouterView, type RouteRecordRaw } from 'vue-router'
import { activityChildRoutes } from './list'
export const activitiesRoute: RouteRecordRaw = {
  path: 'activities', 
  redirect: '/extracurricular/activities/list',
  component: { render: () => h(RouterView) }, 
  meta: { title: 'Quản lý hoạt động ngoại khóa', icon: 'BxlZoom', hasSubmenu: false },
  children: activityChildRoutes
}