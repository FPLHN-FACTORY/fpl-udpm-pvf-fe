import type { RouteRecordRaw } from 'vue-router'

export const formRoutes: RouteRecordRaw[] = [
  {
    path: 'forms',
    name: 'evaluation-forms',
    component: () => import('@/components/pages/evaluation/form/EvaluationFormListPage.vue'),
    meta: { title: 'Form đánh giá', icon: 'BxFile' }
  },
  {
    path: 'forms/detail/:id',
    name: 'evaluation-form-detail',
    component: () => import('@/components/pages/evaluation/form/EvaluationFormDetailPage.vue'),
    meta: { title: 'Chi tiết Form đánh giá', hidden: true }
  },{
    path: 'forms/add',
    name: 'evaluation-form-add',
    component: () => import('@/components/pages/evaluation/form/EvaluationFormCreatePage.vue'),
    meta: { title: 'Thêm mới Form đánh giá', hidden: true }
  },{
    path: 'forms/edit/:id',
    name: 'evaluation-form-edit',
    component: () => import('@/components/pages/evaluation/form/EvaluationFormEditPage.vue'),
    meta: { title: 'Chỉnh sửa Form đánh giá', hidden: true }
  },{
    path: 'forms/deleted',
    name: 'evaluation-form-deleted',
    component: () => import('@/components/pages/evaluation/form/EvaluationFormDeletedPage.vue'),
    meta: { title: 'Form đã xóa', hidden: true }
  },
]