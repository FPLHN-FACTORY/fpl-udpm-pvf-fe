import type { RouteRecordRaw } from 'vue-router'

const masterCriteriaRoute: RouteRecordRaw = {
  path: 'master-criteria',
  name: 'master-criteria',
  component: () =>
    import('../../../components/pages/recruitment/master-criteria/MasterCriteriaListPage.vue'),
  meta: { title: 'Bộ tiêu chí gốc' }
}

const masterCriteriaHiddenChildren: RouteRecordRaw[] = [
  {
    path: 'master-criteria/create',
    name: 'master-criteria-create',
    component: () =>
      import('../../../components/pages/recruitment/master-criteria/MasterCriteriaCreatePage.vue'),
    meta: { title: 'Thêm mới bộ tiêu chí gốc', hidden: true }
  },
  {
    path: 'master-criteria/deleted',
    name: 'master-criteria-deleted',
    component: () =>
      import('../../../components/pages/recruitment/master-criteria/MasterCriteriaDeletedPage.vue'),
    meta: { title: 'Danh sách bộ tiêu chí gốc đã xóa', hidden: true }
  },
  {
    path: 'master-criteria/:id',
    name: 'master-criteria-detail',
    component: () =>
      import('../../../components/pages/recruitment/master-criteria/MasterCriteriaDetailPage.vue'),
    meta: { title: 'Chi tiết bộ tiêu chí gốc', hidden: true }
  },
  {
    path: 'master-criteria/:id/edit',
    name: 'master-criteria-edit',
    component: () =>
      import('../../../components/pages/recruitment/master-criteria/MasterCriteriaEditPage.vue'),
    meta: { title: 'Điều chỉnh bộ tiêu chí gốc', hidden: true }
  }
]

export const evaluationRoute: RouteRecordRaw = {
  path: 'evaluation-criteria',
  name: 'evaluation-criteria',
  meta: { title: 'Tiêu chí/Trọng số đánh giá', icon: 'BxSpreadsheet', hasSubmenu: true },
  children: [masterCriteriaRoute]
}

export const evaluationHiddenRoute: RouteRecordRaw = {
  path: 'evaluation-criteria',
  children: masterCriteriaHiddenChildren
}
