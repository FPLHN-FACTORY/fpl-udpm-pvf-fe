import type { RouteRecordRaw } from 'vue-router'

export const classRoute: RouteRecordRaw = {
  path: 'class',
  name: 'cultural-class',
  component: () =>
    import('../../../components/pages/cultural/class/CulturalClassListPage.vue'),
  meta: { title: 'Lớp học văn hóa', icon: 'BxsSchool' }
}

export const classHiddenRoute: RouteRecordRaw = {
  path: 'class',
  children: [
    {
      path: 'create',
      name: 'cultural-class-create',
      component: () =>
        import('../../../components/pages/cultural/class/CulturalClassCreatePage.vue'),
      meta: { title: 'Thêm mới lớp học văn hóa', hidden: true }
    },
    {
      path: 'deleted',
      name: 'cultural-class-deleted',
      component: () =>
        import('../../../components/pages/cultural/class/CulturalClassDeletedPage.vue'),
      meta: { title: 'Danh sách lớp học văn hóa đã xóa', hidden: true }
    },
    {
      path: ':id/edit',
      name: 'cultural-class-edit',
      component: () =>
        import('../../../components/pages/cultural/class/CulturalClassEditPage.vue'),
      meta: { title: 'Điều chỉnh lớp học văn hóa', hidden: true }
    },
    {
      path: ':id',
      name: 'cultural-class-detail',
      component: () =>
        import('../../../components/pages/cultural/class/CulturalClassDetailPage.vue'),
      meta: { title: 'Chi tiết lớp học văn hóa', hidden: true }
    }
  ]
}
