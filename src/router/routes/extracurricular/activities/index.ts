import { h } from 'vue'
import { RouterView, type RouteRecordRaw } from 'vue-router'
import { activityChildRoutes } from './list'
export const activitiesRoute: RouteRecordRaw = {
  path: 'activities', 
  component: { render: () => h(RouterView) }, 
  meta: { title: 'Quản lý hoạt động ngoại khóa', icon: 'BxlZoom' },
  children: activityChildRoutes
}