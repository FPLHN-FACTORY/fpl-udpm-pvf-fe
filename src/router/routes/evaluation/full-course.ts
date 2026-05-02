import type { RouteRecordRaw } from 'vue-router'

export const courseEvaluationRoute: RouteRecordRaw = {
  path: 'full-course',
  name: 'evaluation-full-course',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: {
    title: 'Đánh giá toàn khóa',
    icon: 'BxsSchool',
    evaluationKind: 'course'
  }
}

export const courseEvaluationDetailRoute: RouteRecordRaw = {
  path: 'full-course/:id',
  name: 'evaluation-full-course-detail',
  component: () => import('../../../components/pages/DashboardPage.vue'),
  meta: {
    title: 'Chi tiết đánh giá toàn khóa',
    hidden: true,
    evaluationKind: 'course'
  }
}
