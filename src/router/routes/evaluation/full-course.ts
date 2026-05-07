import type { RouteRecordRaw } from 'vue-router'
export const courseEvaluationRoute: RouteRecordRaw[] = [
  {
    path: 'full-course',
    name: 'evaluation-full-course',
    component: () => import('../../../components/pages/CourseEvaluationPage.vue'),
    meta: { title: 'Đánh giá toàn khóa', icon: 'BxsSchool' }
  },
  {
    path: 'full-course/:id',
    name: 'evaluation-full-course-detail',
    component: () => import('../../../components/pages/CourseEvaluationDetailPage.vue'),
    meta: { title: 'Chi tiết Đánh giá toàn khóa', hidden: true }
  },
  {
    path: 'full-course/edit/:id',
    name: 'evaluation-full-course-edit',
    component: () => import('../../../components/pages/EditCourseEvaluationPage.vue'),
    meta: { title: 'Chỉnh sửa Đánh giá toàn khóa', hidden: true }
  },
  {
    path: 'full-course/create',
    name: 'evaluation-full-course-create',
    component: () => import('../../../components/pages/CreateCourseEvaluationPage.vue'),
    meta: { title: 'Thêm mới Đánh giá toàn khóa', hidden: true }
  },
  {
    path: 'full-course/deleted',
    name: 'evaluation-full-course-deleted',
    component: () => import('../../../components/pages/DeletedCourseEvaluationPage.vue'),
    meta: { title: 'Danh sách Đánh giá toàn khóa đã xóa', hidden: true }
  }
]
