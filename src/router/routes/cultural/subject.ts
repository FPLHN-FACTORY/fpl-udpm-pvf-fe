import type { RouteRecordRaw } from 'vue-router'
export const subjectRoute: RouteRecordRaw[] = [
  {
    path: 'subject',
    name: 'cultural-subject',
    component: () => import('../../../components/pages/CulturalSubjectPage.vue'),
    meta: { title: 'Môn học văn hóa', icon: 'BxBookAlt' }
  },
  {
    path: 'subject/:id',
    name: 'cultural-subject-detail',
    component: () => import('../../../components/pages/SubjectDetailPage.vue'),
    meta: { title: 'Chi tiết Môn học văn hóa', hideInMenu: true }
  },
  {
    path: 'subject/create',
    name: 'cultural-subject-create',
    component: () => import('../../../components/pages/CreateSubjectPage.vue'),
    meta: { title: 'Thêm mới Môn học văn hóa', hideInMenu: true }
  },
  {
    path: 'subject/edit/:id',
    name: 'cultural-subject-edit',
    component: () => import('../../../components/pages/EditSubjectPage.vue'),
    meta: { title: 'Điều chỉnh Môn học văn hóa', hideInMenu: true }
  },
  {
    path: 'subject/deleted',
    name: 'cultural-subject-deleted',
    component: () => import('../../../components/pages/DeletedSubjectPage.vue'),
    meta: { title: 'Danh sách Môn học văn hóa đã xóa', hideInMenu: true }
  }
]
