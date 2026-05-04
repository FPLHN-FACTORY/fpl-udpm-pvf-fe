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

    <template v-else-if="name === 'BxGridAlt'">
      <path d="M4 4h7v7H4V4zm0 13h7v-7H4v7zm9-13h7v7h-7V4zm0 13h7v-7h-7v7z" />
    </template>

    <template v-else-if="name === 'BxPanelSplit'">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M11.5 4v16" />
      <path d="M14.5 9.25h2" />
      <path d="M14.5 12.75h2" />
    </template>

    <template v-else-if="name === 'BxPanelStats'">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <rect x="7" y="12" width="3" height="6" rx="1" />
      <rect x="11" y="9" width="3" height="9" rx="1" />
      <rect x="15" y="14" width="3" height="4" rx="1" />
    </template>

    <template v-else-if="name === 'BxCalendarCheck'">
      <rect x="4" y="5" width="16" height="15" rx="3" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M4 9h16" />
      <path d="m9.5 14 1.8 1.8 3.7-4" />
    </template>

    <template v-else-if="name === 'BxCheckShield'">
      <path d="M12 3 5 7v6c0 5 4 8 7 8s7-3 7-8V7l-7-4z" />
      <path d="m9.5 12.5 2 2 4-4" />
    </template>

    <template v-else-if="name === 'BxLayersStacked'">
      <path d="m12 4 8 4-8 4-8-4 8-4Z" />
      <path d="m4 12 8 4 8-4" />
      <path d="m4 16 8 4 8-4" />
    </template>

    <template v-else-if="name === 'BxLayersMinus'">
      <path d="m12 4 8 4-8 4-8-4 8-4Z" />
      <path d="m4 12 8 4 8-4" />
      <path d="m4 16 8 4 8-4" />
      <path d="M19.75 4h3" />
    </template>

    <template v-else-if="name === 'BxAverageAngle'">
      <path d="M8 7h8l4 5-4 5H8l3.5-5L8 7Z" />
    </template>

    <template v-else-if="name === 'BxChevronRight'">
      <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z" />
    </template>

    <template v-else-if="name === 'BxChevronStep'">
      <path d="M5 16.5 10 11l3 3 6-6" />
      <path d="M19 8v5h-5" />
    </template>

    <template v-else-if="name === 'BxChevronLeft'">
      <path d="m15 18-6-6 6-6" />
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
