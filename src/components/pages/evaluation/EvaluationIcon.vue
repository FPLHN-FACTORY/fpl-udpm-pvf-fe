<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    :class="className"
    aria-hidden="true"
  >
    <template v-if="name === 'BxSearch'">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </template>

    <template v-else-if="name === 'BxRefresh'">
      <path d="M20 11a8 8 0 1 0 2 5.3" />
      <path d="M20 4v7h-7" />
    </template>

    <template v-else-if="name === 'BxShow'">
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </template>

    <template v-else-if="name === 'BxEditAlt'">
      <path d="M3 21h4.5L19 9.5 14.5 5 3 16.5V21Z" />
      <path d="m13.5 6 4.5 4.5" />
      <path d="M15 4.5 17 2.5a1.8 1.8 0 0 1 2.5 0l2 2a1.8 1.8 0 0 1 0 2.5l-2 2" />
    </template>

    <template v-else-if="name === 'BxTrash'">
      <path d="M4 7h16" />
      <path d="M9 3h6l1 2H8l1-2Z" />
      <path d="M7 7v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V7" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </template>

    <template v-else-if="name === 'BxPlus'">
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </template>

    <template v-else-if="name === 'BxPanelStats'">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M8 15v-3" />
      <path d="M12 15V9" />
      <path d="M16 15V7" />
    </template>

    <template v-else-if="name === 'BxCalendarCheck'">
      <rect x="4" y="5" width="16" height="15" rx="3" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M4 9h16" />
      <path d="m9.5 14 1.8 1.8 3.7-4" />
    </template>

    <template v-else-if="name === 'BxLayersStacked'">
      <path d="m12 4 8 4-8 4-8-4 8-4Z" />
      <path d="m4 12 8 4 8-4" />
      <path d="m4 16 8 4 8-4" />
    </template>

    <template v-else-if="name === 'BxChevronStep'">
      <path d="M5 16.5 10 11l3 3 6-6" />
      <path d="M19 8v5h-5" />
    </template>

    <template v-else-if="name === 'BxChevronLeft'">
      <path d="m15 18-6-6 6-6" />
    </template>

    <template v-else-if="name === 'BxChevronRight'">
      <path d="m9 18 6-6-6-6" />
    </template>
  </svg>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    name: string
    className?: string
  }>(),
  {
    className: '',
  },
)
</script>
