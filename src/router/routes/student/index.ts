import type { RouteRecordRaw } from 'vue-router'
import { equipmentRoute } from './equipment'
import { contractTypeRoutes } from './contract-type'
import { contractVersionRoutes } from './contract-version'
import { signedContractRoute } from './signed-contract'
import { infoRoute } from './info'
import { transferRoute } from './transfer'

export const studentRoutes: RouteRecordRaw[] = [
  {
    path: '/student',
    meta: { title: 'Quản lý học viên', icon: 'BxsUserDetail', isHeader: true },
    children: [
      equipmentRoute,
      ...contractTypeRoutes,
      ...contractVersionRoutes,
      signedContractRoute,
      infoRoute,
      transferRoute
    ]
  }
]
