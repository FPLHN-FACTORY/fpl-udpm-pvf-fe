import type { RouteRecordRaw } from 'vue-router'

export const stageRoute: RouteRecordRaw = {
  path: 'stages',
  name: 'evaluation-stages',
  component: () => import('../../../components/pages/GiaiDoanDanhGia/GiaiDoanDanhGiaListPage.vue'),
  meta: { title: 'Giai đoạn đánh giá', icon: 'BxGridAlt' }
}

export const stageDetailRoute: RouteRecordRaw = {
  path: 'stages/detail/:id',
  name: 'evaluation-stages-detail',
  component: () => import('../../../components/pages/GiaiDoanDanhGia/GiaiDoanDanhGiaDetailPage.vue'),
  meta: { title: 'Chi tiết Giai đoạn đánh giá', hidden: true }
}

export const stageCreateRoute: RouteRecordRaw = {
  path: 'stages/create',
  name: 'evaluation-stages-create',
  component: () => import('../../../components/pages/GiaiDoanDanhGia/GiaiDoanDanhGiaCreatePage.vue'),
  meta: { title: 'Thêm mới Giai đoạn đánh giá', hidden: true }
}

export const stageEditRoute: RouteRecordRaw = {
  path: 'stages/edit/:id',
  name: 'evaluation-stages-edit',
  component: () => import('../../../components/pages/GiaiDoanDanhGia/GiaiDoanDanhGiaEditPage.vue'),
  meta: { title: 'Điều chỉnh Giai đoạn đánh giá', hidden: true }
}

export const stageDeletedRoute: RouteRecordRaw = {
  path: 'stages/deleted',
  name: 'evaluation-stages-deleted',
  component: () => import('../../../components/pages/GiaiDoanDanhGia/GiaiDoanDanhGiaDeletedPage.vue'),
  meta: { title: 'Danh sách Giai đoạn đánh giá đã xóa', hidden: true }
}
