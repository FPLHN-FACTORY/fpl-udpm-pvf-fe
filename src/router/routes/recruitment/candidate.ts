import type { RouteRecordRaw } from 'vue-router'

export const candidateRoute: RouteRecordRaw = {
  path: 'candidate-profile',
  name: 'candidate-profile',
  meta: { title: 'Hồ sơ thí sinh', icon: 'BxFile', hasSubmenu: true },
  children: [
    {
      path: 'list',
      name: 'candidate-list',
      component: () => import('../../../components/pages/recruitment/candidate-profile/CandidateProfileListPage.vue'),
      meta: { title: 'Danh sách hồ sơ' }
    },
    {
      path: 'evaluation',
      name: 'candidate-evaluation',
      component: () => import('../../../components/pages/recruitment/CandidateEvaluationPage.vue'),
      meta: { title: 'Đánh giá thí sinh' }
    }
  ]
}

export const candidateHiddenRoutes: RouteRecordRaw[] = [
  {
    path: 'candidate-profile/detail/:id',
    name: 'candidate-detail',
    component: () => import('../../../components/pages/recruitment/candidate-profile/CandidateProfileDetailPage.vue'),
    meta: { title: 'Chi tiết hồ sơ', hidden: true }
  },
  {
    path: 'candidate-profile/add',
    name: 'candidate-add',
    component: () => import('../../../components/pages/recruitment/candidate-profile/CandidateProfileCreatePage.vue'),
    meta: { title: 'Thêm hồ sơ', hidden: true }
  },
  {
    path: 'candidate-profile/edit/:id',
    name: 'candidate-edit',
    component: () => import('../../../components/pages/recruitment/candidate-profile/CandidateProfileEditPage.vue'),
    meta: { title: 'Chỉnh sửa hồ sơ', hidden: true }
  },
  {
    path: 'candidate-profile/deleted',
    name: 'candidate-deleted',
    component: () => import('../../../components/pages/recruitment/candidate-profile/CandidateProfileDeletedPage.vue'),
    meta: { title: 'Hồ sơ đã xóa', hidden: true }
  },
]