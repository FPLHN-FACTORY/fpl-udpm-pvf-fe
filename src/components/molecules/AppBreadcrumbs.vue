<template>
  <a-breadcrumb class="app-breadcrumb">
    <a-breadcrumb-item v-for="(item, index) in normalizedItems" :key="`${item.title}-${index}`">
      <router-link v-if="item.to && index !== normalizedItems.length - 1" :to="item.to">
        {{ item.title }}
      </router-link>
      <span v-else>{{ item.title }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export interface BreadcrumbItem {
  title: string
  to?: string
}

const props = defineProps<{
  items?: BreadcrumbItem[]
}>()

const route = useRoute()

const routeBreadcrumbs = computed<BreadcrumbItem[]>(() => {
  if (props.items?.length) {
    return props.items
  }

  const path = route.path
  const currentTitle = route.meta?.title as string | undefined
  const items: BreadcrumbItem[] = []

  if (path.startsWith('/system/security')) {
    items.push({ title: 'Bảo mật & Phân quyền', to: '/system/security/roles' })

    if (path.includes('/permissions')) {
      items.push({ title: 'Danh sách Quyền người dùng', to: '/system/security/permissions' })
    } else if (path.includes('/roles')) {
      items.push({ title: 'Phân quyền người dùng', to: '/system/security/roles' })
    }
  } else if (path.startsWith('/system/log')) {
    items.push({ title: 'Nhật ký hệ thống', to: '/system/log' })
  } else {
    route.matched
      .filter((matchedRoute) => matchedRoute.meta?.title && !matchedRoute.meta?.isHeader)
      .forEach((matchedRoute) => {
        items.push({ title: matchedRoute.meta.title as string, to: matchedRoute.path })
      })
  }

  if (currentTitle && items.at(-1)?.title !== currentTitle) {
    items.push({ title: currentTitle })
  }

  return items
})

const normalizedItems = computed(() => routeBreadcrumbs.value.filter((item) => item.title))
</script>

<style scoped>
.app-breadcrumb {
  color: #a1acb8;
  font-size: 13px;
}

:deep(.ant-breadcrumb-link),
:deep(.ant-breadcrumb-separator) {
  color: #a1acb8;
}

:deep(.ant-breadcrumb li:last-child .ant-breadcrumb-link) {
  color: #566a7f;
  font-weight: 600;
}
</style>
