import type { RouteRecordRaw } from 'vue-router'

export const levelsRoute: RouteRecordRaw = {
  path: 'levels',
  name: 'discipline-levels',
  component: () => import('../../../components/pages/discipline/level/LevelListPage.vue'),
  meta: { title: 'Mức độ khen thưởng/kỷ luật', icon: 'BxInfoCircle' }
}

export const levelsHiddenRoute: RouteRecordRaw = {
  path: 'levels',
  children: [
    {
      path: 'create',
      name: 'discipline-level-create',
      component: () => import('../../../components/pages/discipline/level/LevelCreatePage.vue'),
    },
    {
      path: 'edit/:id',
      name: 'discipline-level-edit',
      component: () => import('../../../components/pages/discipline/level/LevelEditPage.vue'),
    },
    {
      path: 'detail/:id',
      name: 'discipline-level-detail',
      component: () => import('../../../components/pages/discipline/level/LevelDetailPage.vue'),
    },
    {
      path: 'deleted',
      name: 'discipline-level-deleted',
      component: () => import('../../../components/pages/discipline/level/LevelDeletedListPage.vue'),
    }
  ]
}
