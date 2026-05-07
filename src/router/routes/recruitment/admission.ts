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
      component: () => import('../../../components/pages/dashboard/DashboardPage.vue'),
      meta: { title: 'Vòng tuyển sinh' }
    },
    {
      path: 'evaluation',
      name: 'admission-evaluation',
      component: () => import('../../../components/pages/dashboard/DashboardPage.vue'),
      meta: { title: 'Đánh giá thí sinh' }
    }
  ]
}
