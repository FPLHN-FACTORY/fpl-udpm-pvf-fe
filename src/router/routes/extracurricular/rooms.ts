import type { RouteRecordRaw } from 'vue-router'

export const roomsRoutes: RouteRecordRaw[] = [
  {
    path: 'rooms',
    name: 'extracurricular-rooms',
    component: () => import('../../../components/pages/extracurricular/rooms/List.vue'),
    meta: { title: 'Phòng học ngoại khóa', icon: 'BxlZoom' }
  },
  {
    path: 'rooms/create',
    name: 'extracurricular-rooms-create',
    component: () => import('../../../components/pages/extracurricular/rooms/Create.vue'),
    meta: { title: 'Thêm mới Phòng học ngoại khóa', hidden: true }
  },
  {
    path: 'rooms/edit/:id',
    name: 'extracurricular-rooms-edit',
    component: () => import('../../../components/pages/extracurricular/rooms/Edit.vue'),
    meta: { title: 'Điều chỉnh Phòng học ngoại khóa', hidden: true }
  },
  {
    path: 'rooms/detail/:id',
    name: 'extracurricular-rooms-detail',
    component: () => import('../../../components/pages/extracurricular/rooms/Detail.vue'),
    meta: { title: 'Chi tiết Phòng học ngoại khóa', hidden: true }
  },
  {
    path: 'rooms/deleted',
    name: 'extracurricular-rooms-deleted',
    component: () => import('../../../components/pages/extracurricular/rooms/Deleted.vue'),
    meta: { title: 'Danh sách Phòng học ngoại khóa đã xóa', hidden: true }
  }
]
