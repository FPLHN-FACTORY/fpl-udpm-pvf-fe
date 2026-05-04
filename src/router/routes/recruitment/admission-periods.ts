import type { RouteRecordRaw } from 'vue-router'

export const admissionPeriodsHiddenRoute: RouteRecordRaw = {
  path: 'admission-periods',
  children: [
    {
      path: 'create',
      name: 'admission-period-create',
      component: () => import('../../../components/pages/recruitment/admission-period/AdmissionPeriodCreatePage.vue'),
    },
    {
      path: 'edit/:id',
      name: 'admission-period-edit',
      component: () => import('../../../components/pages/recruitment/admission-period/AdmissionPeriodEditPage.vue'),
    },
    {
      path: 'detail/:id',
      name: 'admission-period-detail',
      component: () => import('../../../components/pages/recruitment/admission-period/AdmissionPeriodDetailPage.vue'),
    },
    {
      path: 'deleted',
      name: 'admission-period-deleted',
      component: () => import('../../../components/pages/recruitment/admission-period/AdmissionPeriodDeletedListPage.vue'),
    }
  ]
}
