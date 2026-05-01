import type { RouteRecordRaw } from 'vue-router'

export const centerRoute: RouteRecordRaw[] = [
  {
    path: 'affiliated-center',
    name: 'affiliated-center',
    component: () => import('../../../components/pages/affiliated-center/index.vue'),
    meta: { title: 'Trung tâm liên kết', icon: 'BxBuildingHouse' }
  },
  {
    path: 'affiliated-center/detail/:id',
    name: 'affiliated-center-detail',
    component: () => import('../../../components/pages/affiliated-center/Detail.vue'),
    meta: { title: 'Chi tiết Trung tâm liên kết', icon: 'BxBuildingHouse', hidden: true }
  },
  {
    path: 'affiliated-center/add',
    name: 'affiliated-center-add',
    component: () => import('../../../components/pages/affiliated-center/Add.vue'),
    meta: { title: 'Thêm mới Trung tâm liên kết', icon: 'BxBuildingHouse', hidden: true }
  },
  {
    path: 'affiliated-center/edit/:id',
    name: 'affiliated-center-edit',
    component: () => import('../../../components/pages/affiliated-center/Edit.vue'),
    meta: { title: 'Điều chỉnh Trung tâm liên kết', icon: 'BxBuildingHouse', hidden: true }
  },
  {
    path: 'affiliated-center/deleted-list',
    name: 'affiliated-center-deleted',
    component: () => import('../../../components/pages/affiliated-center/Deleted.vue'),
    meta: { title: 'Danh sách Trung tâm liên kết đã xóa', icon: 'BxBuildingHouse', hidden: true }
  }
]
