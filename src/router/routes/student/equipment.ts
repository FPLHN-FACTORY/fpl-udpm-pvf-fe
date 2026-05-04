import type { RouteRecordRaw } from 'vue-router'

export const equipmentRoute: RouteRecordRaw[] = [
  {
    path: 'equipment',
    name: 'student-equipment',
    component: () => import('../../../components/pages/student/equipment/List.vue'),
    meta: { title: 'Dụng cụ', icon: 'BxsCategoryAlt' }
  },
  {
    path: 'equipment/them-moi',
    name: 'student-equipment-create',
    component: () => import('../../../components/pages/student/equipment/Create.vue'),
    meta: { title: 'Thêm mới Dụng cụ', hidden: true }
  },
  {
    path: 'equipment/chi-tiet/:id',
    name: 'student-equipment-detail',
    component: () => import('../../../components/pages/student/equipment/Detail.vue'),
    meta: { title: 'Chi tiết Dụng cụ', hidden: true }
  },
  {
    path: 'equipment/chinh-sua/:id',
    name: 'student-equipment-edit',
    component: () => import('../../../components/pages/student/equipment/Edit.vue'),
    meta: { title: 'Điều chỉnh Dụng cụ', hidden: true }
  },
  {
    path: 'equipment/da-xoa',
    name: 'student-equipment-deleted',
    component: () => import('../../../components/pages/student/equipment/Deleted.vue'),
    meta: { title: 'Dụng cụ đã xóa', hidden: true }
  }
]

