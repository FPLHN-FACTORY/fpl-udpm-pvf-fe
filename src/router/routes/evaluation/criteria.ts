import type { RouteRecordRaw } from 'vue-router'

export const criteriaRoute: RouteRecordRaw = {
  path: 'criteria',
  name: 'evaluation-criteria-list',
  component: () => import('../../../components/pages/evaluation/criteria/List.vue'),
  meta: { title: 'Tiêu chí đánh giá', icon: 'BxSpreadsheet' }
}

export const criteriaCreateRoute: RouteRecordRaw = {
  path: 'criteria/create',
  name: 'evaluation-criteria-create',
  component: () => import('../../../components/pages/evaluation/criteria/Create.vue'),
  meta: { title: 'Thêm mới tiêu chí đánh giá', hidden: true }
}

export const criteriaEditRoute: RouteRecordRaw = {
  path: 'criteria/edit/:id',
  name: 'evaluation-criteria-edit',
  component: () => import('../../../components/pages/evaluation/criteria/Edit.vue'),
  meta: { title: 'Điều chỉnh tiêu chí đánh giá', hidden: true }
}

export const criteriaDetailRoute: RouteRecordRaw = {
  path: 'criteria/detail/:id',
  name: 'evaluation-criteria-detail',
  component: () => import('../../../components/pages/evaluation/criteria/Detail.vue'),
  meta: { title: 'Chi tiết tiêu chí đánh giá', hidden: true }
}

export const criteriaDeletedRoute: RouteRecordRaw = {
  path: 'criteria/deleted',
  name: 'evaluation-criteria-deleted',
  component: () => import('../../../components/pages/evaluation/criteria/Deleted.vue'),
  meta: { title: 'Danh sách tiêu chí đánh giá đã xóa', hidden: true }
}
