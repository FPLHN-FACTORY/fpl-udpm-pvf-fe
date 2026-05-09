import type { RouteRecordRaw } from 'vue-router'

export const allocationRequestRoute: RouteRecordRaw = {
  path: 'allocation-request',
  name: 'equipment-allocation-request-list',
  component: () => import('../../../components/pages/equipment/allocation-request/AllocationRequestListPage.vue'),
  meta: { title: 'Yêu cầu cấp phát', icon: 'BxFile' }
}

export const allocationRequestHiddenRoutes: RouteRecordRaw[] = [
  {
    path: 'allocation-request/add',
    name: 'equipment-allocation-request-create',
    component: () => import('../../../components/pages/equipment/allocation-request/AllocationRequestCreatePage.vue'),
    meta: { title: 'Thêm mới Yêu cầu cấp phát', hidden: true }
  },
  {
    path: 'allocation-request/edit/:id',
    name: 'equipment-allocation-request-edit',
    component: () => import('../../../components/pages/equipment/allocation-request/AllocationRequestEditPage.vue'),
    meta: { title: 'Chỉnh sửa Yêu cầu cấp phát', hidden: true }
  },
  {
    path: 'allocation-request/detail/:id',
    name: 'equipment-allocation-request-detail',
    component: () => import('../../../components/pages/equipment/allocation-request/AllocationRequestDetailPage.vue'),
    meta: { title: 'Chi tiết Yêu cầu cấp phát', hidden: true }
  },
  {
    path: 'allocation-request/detail/:requestId/history/:historyId',
    name: 'equipment-allocation-history-detail',
    component: () => import('../../../components/pages/equipment/allocation-request/AllocationHistoryDetailPage.vue'),
    meta: { title: 'Chi tiết lịch sử xử lý yêu cầu', hidden: true }
  }
]
