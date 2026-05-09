import type { RouteRecordRaw } from 'vue-router'

export const signedContractRoute: RouteRecordRaw = {
  path: 'signed-contract',
  meta: { title: 'Hợp đồng đã ký', icon: 'BxsPen' },
  component: () => import('../../../components/pages/contract/SignedContractPage.vue'),
  children: [
    {
      path: '',
      name: 'SignedContractList',
      component: () => import('../../../components/pages/contract/SignedContractPage.vue'),
      meta: { hidden: true }
    },
    {
      path: 'create',
      name: 'SignedContractCreate',
      component: () => import('../../../components/pages/contract/CreateContractPage.vue'),
      meta: { title: 'Thêm mới hợp đồng', hidden: true }
    },
    {
      path: 'detail/:id',
      name: 'SignedContractDetail',
      component: () => import('../../../components/pages/contract/DetailContractPage.vue'),
      meta: { title: 'Chi tiết hợp đồng', hidden: true }
    },
    {
      path: 'edit/:id',
      name: 'SignedContractEdit',
      component: () => import('../../../components/pages/contract/EditContractPage.vue'),
      meta: { title: 'Chỉnh sửa hợp đồng', hidden: true }
    },
    {
      path: 'deleted',
      name: 'SignedContractDeleted',
      component: () => import('../../../components/pages/contract/DeletedContractPage.vue'),
      meta: { title: 'Hợp đồng đã xóa', hidden: true }
    }
  ]
}
