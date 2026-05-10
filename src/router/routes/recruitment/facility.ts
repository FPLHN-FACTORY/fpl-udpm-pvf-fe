import type { RouteRecordRaw } from 'vue-router'

export const facilityRoute: RouteRecordRaw = {
  path: 'facility',
  redirect: '/recruitment/facility/list',
  meta: { title: 'Thông tin cơ sở', icon: 'BxBuilding' },
  children: [
    {
      path: 'list',
      name: 'facility-list',
      component: () => import('../../../components/pages/recruitment/FacilityListPage.vue'),
      meta: { title: 'Thông tin cơ sở', icon: 'BxInfoCircle', hidden: true }
    },
    {
      path: 'info',
      name: 'facility-info',
      component: () => import('../../../components/pages/recruitment/FacilityInfoPage.vue'),
      meta: { title: 'Chi tiết cơ sở', hidden: true }
    },
    {
      path: 'create',
      name: 'facility-create',
      component: () => import('../../../components/pages/recruitment/FacilityCreatePage.vue'),
      meta: { title: 'Thêm mới cơ sở', icon: 'BxPlusCircle', hidden: true }
    },
    {
      path: 'edit/:id',
      name: 'facility-edit',
      component: () => import('../../../components/pages/recruitment/FacilityEditPage.vue'),
      meta: { title: 'Điều chỉnh cơ sở', hidden: true }
    },
    {
      path: 'deleted',
      name: 'facility-deleted',
      component: () => import('../../../components/pages/recruitment/FacilityDeletedListPage.vue'),
      meta: { title: 'Danh sách đã xóa', icon: 'BxTrash', hidden: true }
    }
  ]
}
