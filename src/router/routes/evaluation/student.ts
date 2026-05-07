import type { RouteRecordRaw } from 'vue-router'

export const studentEvaluationRoute: RouteRecordRaw = {
  path: 'student',
  name: 'evaluation-student',
  component: () => import('../../../components/pages/evaluation/StudentEvaluationListPage.vue'),
  meta: {
    title: 'Đánh giá học viên',
    icon: 'BxsUserDetail',
    evaluationKind: 'student'
  }
}

export const studentEvaluationCreateRoute: RouteRecordRaw = {
  path: 'student/create',
  name: 'evaluation-student-create',
  component: () => import('../../../components/pages/evaluation/StudentEvaluationCreatePage.vue'),
  meta: {
    title: 'Thêm mới đánh giá học viên',
    hidden: true,
    evaluationKind: 'student'
  }
}

export const studentEvaluationDeletedRoute: RouteRecordRaw = {
  path: 'student/deleted',
  name: 'evaluation-student-deleted',
  component: () => import('../../../components/pages/evaluation/StudentEvaluationDeletedPage.vue'),
  meta: {
    title: 'Danh sách đánh giá học viên đã xóa',
    hidden: true,
    evaluationKind: 'student'
  }
}

export const studentEvaluationEditRoute: RouteRecordRaw = {
  path: 'student/:id/edit',
  name: 'evaluation-student-edit',
  component: () => import('../../../components/pages/evaluation/StudentEvaluationEditPage.vue'),
  meta: {
    title: 'Chỉnh sửa đánh giá học viên',
    hidden: true,
    evaluationKind: 'student'
  }
}

export const studentEvaluationDetailRoute: RouteRecordRaw = {
  path: 'student/:id',
  name: 'evaluation-student-detail',
  component: () => import('../../../components/pages/evaluation/EvaluationDetailPage.vue'),
  meta: {
    title: 'Chi tiết đánh giá học viên',
    hidden: true,
    evaluationKind: 'student'
  }
}
