import type { RouteRecordRaw } from 'vue-router'

export const disciplineDecisionRoute: RouteRecordRaw = {
  path: 'discipline-decisions',
  name: 'discipline-decisions',
  component: () => import('../../../components/pages/discipline/DisciplineList.vue'),
  meta: { 
    title: 'Quyết định kỷ luật', 
    icon: 'BxsPen'
  }
}

export const disciplineSubRoutes: RouteRecordRaw[] = [
  {
    path: 'discipline-decisions/detail/:id',
    name: 'discipline-decisions-detail',
    component: () => import('../../../components/pages/discipline/DisciplineDetail.vue'),
    meta: { title: 'Chi tiết', hideInMenu: true }
  },
  {
    path: 'discipline-decisions/create',
    name: 'discipline-decisions-create',
    component: () => import('../../../components/pages/discipline/DisciplineForm.vue'),
    meta: { title: 'Thêm mới', hideInMenu: true }
  },
  {
    path: 'discipline-decisions/edit/:id',
    name: 'discipline-decisions-edit',
    component: () => import('../../../components/pages/discipline/DisciplineForm.vue'),
    meta: { title: 'Cập nhật', hideInMenu: true }
  },
  {
    path: 'discipline-decisions/deleted',
    name: 'discipline-decisions-deleted',
    component: () => import('../../../components/pages/discipline/DeletedDiscipline.vue'),
    meta: { title: 'Đã xóa', hideInMenu: true }
  }
]