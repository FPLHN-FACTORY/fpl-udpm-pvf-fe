import type { RouteRecordRaw } from 'vue-router'

export const classRoute: RouteRecordRaw = {
  path: 'class',
  name: 'cultural-class',
  component: () =>
    import('../../../components/pages/cultural/class/CulturalClassListPage.vue'),
  meta: { title: 'L\u1edbp h\u1ecdc v\u0103n h\u00f3a', icon: 'BxsSchool' }
}

export const classHiddenRoute: RouteRecordRaw = {
  path: 'class',
  children: [
    {
      path: 'create',
      name: 'cultural-class-create',
      component: () =>
        import('../../../components/pages/cultural/class/CulturalClassCreatePage.vue'),
      meta: { title: 'Th\u00eam m\u1edbi l\u1edbp h\u1ecdc v\u0103n h\u00f3a', hidden: true }
    },
    {
      path: 'deleted',
      name: 'cultural-class-deleted',
      component: () =>
        import('../../../components/pages/cultural/class/CulturalClassDeletedPage.vue'),
      meta: { title: 'Danh s\u00e1ch l\u1edbp h\u1ecdc v\u0103n h\u00f3a \u0111\u00e3 x\u00f3a', hidden: true }
    },
    {
      path: ':id/edit',
      name: 'cultural-class-edit',
      component: () =>
        import('../../../components/pages/cultural/class/CulturalClassEditPage.vue'),
      meta: { title: '\u0110i\u1ec1u ch\u1ec9nh l\u1edbp h\u1ecdc v\u0103n h\u00f3a', hidden: true }
    },
    {
      path: ':id',
      name: 'cultural-class-detail',
      component: () =>
        import('../../../components/pages/cultural/class/CulturalClassDetailPage.vue'),
      meta: { title: 'Chi ti\u1ebft l\u1edbp h\u1ecdc v\u0103n h\u00f3a', hidden: true }
    }
  ]
}
