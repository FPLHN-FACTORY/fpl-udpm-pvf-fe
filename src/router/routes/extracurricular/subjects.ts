import type { RouteRecordRaw } from 'vue-router'

export const subjectsRoutes: RouteRecordRaw[] = [
  {
    path: 'subjects',
    name: 'extracurricular-subjects',
    component: () => import('../../../components/pages/extracurricular/ExtracurricularSubjectListPage.vue'),
    meta: { title: 'Môn học ngoại khóa', icon: 'BxBookAlt' }
  },
  {
    path: 'subjects/create',
    name: 'extracurricular-subjects-create',
    component: () => import('../../../components/pages/extracurricular/ExtracurricularSubjectCreatePage.vue'),
  },
  {
    path: 'subjects/deleted',
    name: 'extracurricular-subjects-deleted',
    component: () => import('../../../components/pages/extracurricular/ExtracurricularSubjectDeletedListPage.vue'),
  },
  {
    path: 'subjects/:id',
    name: 'extracurricular-subjects-detail',
    component: () => import('../../../components/pages/extracurricular/ExtracurricularSubjectDetailPage.vue'),
  },
  {
    path: 'subjects/:id/edit',
    name: 'extracurricular-subjects-edit',
    component: () => import('../../../components/pages/extracurricular/ExtracurricularSubjectEditPage.vue'),
  }
]
