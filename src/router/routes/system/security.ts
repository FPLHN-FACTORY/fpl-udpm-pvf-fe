import type { RouteRecordRaw } from 'vue-router'

export const securityPoliciesRoutes: RouteRecordRaw[] = [
  {
    path: 'password-policy',
    name: 'password-policy',
    component: () => import('../../../components/pages/system/PasswordPolicyPage.vue'),
    meta: { title: 'Chính sách mật khẩu', icon: 'BxLock' }
  },
  {
    path: 'login-policy',
    name: 'login-policy',
    component: () => import('../../../components/pages/system/LoginPolicyPage.vue'),
    meta: { title: 'Chính sách đăng nhập', icon: 'BxLogInCircle' }
  },
  {
    path: 'ip-restriction',
    meta: { title: 'Giới hạn địa chỉ IP', icon: 'BxGlobe' },
    children: [
      {
        path: '',
        name: 'ip-restriction-list',
        component: () => import('../../../components/pages/system/IpRestrictionListPage.vue'),
      },
      {
        path: 'add',
        name: 'ip-restriction-add',
        component: () => import('../../../components/pages/system/IpRestrictionCreatePage.vue'),
        meta: { title: 'Thêm địa chỉ IP', hidden: true }
      },
      {
        path: ':id',
        name: 'ip-restriction-detail',
        component: () => import('../../../components/pages/system/IpRestrictionDetailPage.vue'),
        meta: { title: 'Chi tiết địa chỉ IP', hidden: true }
      },
      {
        path: 'edit/:id',
        name: 'ip-restriction-edit',
        component: () => import('../../../components/pages/system/IpRestrictionEditPage.vue'),
        meta: { title: 'Điều chỉnh địa chỉ IP', hidden: true }
      }
    ]
  }
]
