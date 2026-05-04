import type { RouteRecordRaw } from 'vue-router'

export const criteriaRoutes: RouteRecordRaw[] = [
  {
    path: 'criteria',
    name: 'evaluation-criteria-list',
    component: () => import('../../../components/pages/evaluation/criteria/List.vue'),
    meta: { title: 'Tiêu chí đánh giá', icon: 'BxSpreadsheet' }
  },
  {
    path: 'criteria/create',
    name: 'evaluation-criteria-create',
    component: () => import('../../../components/pages/evaluation/criteria/Create.vue'),
    meta: { title: 'Thêm mới Tiêu chí đánh giá', hidden: true }
  },
  {
    path: 'criteria/edit/:id',
    name: 'evaluation-criteria-edit',
    component: () => import('../../../components/pages/evaluation/criteria/Edit.vue'),
    meta: { title: 'Điều chỉnh Tiêu chí đánh giá', hidden: true }
  },
  {
    path: 'criteria/detail/:id',
    name: 'evaluation-criteria-detail',
    component: () => import('../../../components/pages/evaluation/criteria/Detail.vue'),
    meta: { title: 'Chi tiết Tiêu chí đánh giá', hidden: true }
  },
  {
    path: 'criteria/deleted',
    name: 'evaluation-criteria-deleted',
    component: () => import('../../../components/pages/evaluation/criteria/Deleted.vue'),
    meta: { title: 'Danh sách Tiêu chí đánh giá đã xóa', hidden: true }
  }
]
