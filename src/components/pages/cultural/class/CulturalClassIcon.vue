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
      <path d="m16.5 3.5 4 4-2.25 2.25-4-4z" />
      <path d="M8 14.25h2.75L18 7l-2-2-7.25 7.25z" />
      <path d="M19 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6" />
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

    <template v-else-if="name === 'BxRevision'">
      <path d="M4 12a8 8 0 1 0 2.4-5.7" />
      <path d="M4 4v5h5" />
    </template>

    <template v-else-if="name === 'BxUpload'">
      <path d="M12 16V5" />
      <path d="m8 9 4-4 4 4" />
      <path d="M4 19h16" />
    </template>

    <template v-else-if="name === 'BxDownload'">
      <path d="M12 5v11" />
      <path d="m8 12 4 4 4-4" />
      <path d="M4 19h16" />
    </template>

    <template v-else-if="name === 'BxPanelSplit'">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M11.5 4v16" />
      <path d="M14.5 9.25h2" />
      <path d="M14.5 12.75h2" />
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

    <template v-else-if="name === 'BxCalendar'">
      <rect x="3.75" y="5.75" width="16.5" height="14.5" rx="2" />
      <path d="M7.5 3.75v4" />
      <path d="M16.5 3.75v4" />
      <path d="M3.75 9.5h16.5" />
    </template>

    <template v-else-if="name === 'BxLayersStacked'">
      <path d="m12 4 8 4-8 4-8-4 8-4Z" />
      <path d="m4 12 8 4 8-4" />
      <path d="m4 16 8 4 8-4" />
    </template>

    <template v-else-if="name === 'BxLayersPlus'">
      <path d="m11 5 6.5 3.25L11 11.5 4.5 8.25 11 5Z" />
      <path d="m4.5 11.75 6.5 3.25 6.5-3.25" />
      <path d="m4.5 15.25 6.5 3.25 6.5-3.25" />
      <path d="M19.75 4v3.5" />
      <path d="M18 5.75h3.5" />
    </template>

    <template v-else-if="name === 'BxLayersMinus'">
      <path d="m11 5 6.5 3.25L11 11.5 4.5 8.25 11 5Z" />
      <path d="m4.5 11.75 6.5 3.25 6.5-3.25" />
      <path d="m4.5 15.25 6.5 3.25 6.5-3.25" />
      <path d="M18 5.75h3.5" />
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
