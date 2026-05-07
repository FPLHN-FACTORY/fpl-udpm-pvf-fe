import type { RouteRecordRaw } from 'vue-router'
export const templatesRoute: RouteRecordRaw = {
  path: 'templates',
  name: 'discipline-templates',
  component: () => import('../../../components/pages/discipline/TemplateListPage.vue'),
  component: () => import('../../../components/pages/dashboard/DashboardPage.vue'),
  meta: { title: 'Mẫu biên bản', icon: 'BxFile' }
}

export const templatesHiddenRoute: RouteRecordRaw = {
  path: 'templates',
  children: [
    {
      path: 'detail/:id',
      name: 'discipline-templates-detail',
      component: () => import('../../../components/pages/discipline/TemplateDetailPage.vue'),
      meta: { title: 'Chi tiết Mẫu biên bản', hidden: true }
    },
    {
      path: 'create',
      name: 'discipline-templates-create',
      component: () => import('../../../components/pages/discipline/TemplateCreatePage.vue'),
      meta: { title: 'Thêm mới Mẫu biên bản', hidden: true }
    },
    {
      path: 'edit/:id',
      name: 'discipline-templates-edit',
      component: () => import('../../../components/pages/discipline/TemplateEditPage.vue'),
      meta: { title: 'Điều chỉnh Mẫu biên bản', hidden: true }
    },
    {
      path: 'deleted',
      name: 'discipline-templates-deleted',
      component: () => import('../../../components/pages/discipline/TemplateDeletedListPage.vue'),
      meta: { title: 'Danh sách Mẫu biên bản đã xóa', hidden: true }
    }
  ]
}
