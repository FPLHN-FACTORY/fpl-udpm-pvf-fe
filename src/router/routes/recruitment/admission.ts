import type { RouteRecordRaw } from 'vue-router'

export const admissionRoute: RouteRecordRaw = {
  path: 'admission',
  name: 'admission',
  meta: { title: 'Tuyển sinh', icon: 'BxsUserDetail', hasSubmenu: true },
  children: [
    {
      path: 'admission-periods',
      name: 'admission-periods',
      component: () => import('../../../components/pages/recruitment/admission-period/AdmissionPeriodListPage.vue'),
      meta: { title: 'Kỳ tuyển sinh' }
    },
    {
      path: 'rounds',
      name: 'admission-rounds',
      component: () => import('../../../components/pages/KyTuyenSinh/VongTuyenSinhListPage.vue'),
      meta: { title: 'Vòng tuyển sinh' }
    },
    {
      path: 'rounds/detail/:id',
      name: 'admission-rounds-detail',
      component: () => import('../../../components/pages/KyTuyenSinh/VongTuyenSinhDetailPage.vue'),
      meta: { title: 'Chi tiết Vòng tuyển sinh', hidden: true }
    },
    {
      path: 'rounds/create',
      name: 'admission-rounds-create',
      component: () => import('../../../components/pages/KyTuyenSinh/VongTuyenSinhCreatePage.vue'),
      meta: { title: 'Thêm mới Vòng tuyển sinh', hidden: true }
    },
    {
      path: 'rounds/edit/:id',
      name: 'admission-rounds-edit',
      component: () => import('../../../components/pages/KyTuyenSinh/VongTuyenSinhEditPage.vue'),
      meta: { title: 'Điều chỉnh Vòng tuyển sinh', hidden: true }
    },
    {
      path: 'rounds/deleted',
      name: 'admission-rounds-deleted',
      component: () => import('../../../components/pages/KyTuyenSinh/VongTuyenSinhDeletedPage.vue'),
      meta: { title: 'Danh sách Vòng tuyển sinh đã xóa', hidden: true }
    },
    {
      path: 'evaluation',
      name: 'admission-evaluation',
      component: () => import('../../../components/pages/recruitment/CandidateEvaluationPage.vue'),
      meta: { title: 'Đánh giá thí sinh' }
    }
  ]
}
