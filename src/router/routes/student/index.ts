import type { RouteRecordRaw } from 'vue-router'
import { equipmentRoute } from './equipment'
import { contractTypeRoute } from './contract-type'
import { contractVersionRoute } from './contract-version'
import { signedContractRoute } from './signed-contract'
import { infoRoute } from './info'

export const studentRoutes: RouteRecordRaw[] = [
  {
    path: '/student',
    meta: { title: 'Quản lý học viên', icon: 'BxsUserDetail', isHeader: true },
    children: [
      equipmentRoute,
      contractTypeRoute,
      contractVersionRoute,
      signedContractRoute,
      infoRoute
    ]
  }
]
