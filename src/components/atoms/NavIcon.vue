<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    :class="className"
    :width="size"
    :height="size"
  >
    <!-- BxGridAlt / Dashboard -->
    <path v-if="name === 'BxGridAlt' || name === 'Squares2X2Icon' || name === 'BxHomeSmile'" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm-4-9a1.5 1.5 0 1 1 1.5 1.5A1.5 1.5 0 0 1 8 11zm8 0a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5zm-4 7a4 4 0 0 1-3.44-2h6.88A4 4 0 0 1 12 18z" />

    <!-- BxInfoCircle -->
    <path v-if="name === 'BxInfoCircle'" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/><path v-if="name === 'BxInfoCircle'" d="M11 11h2v6h-2zm0-4h2v2h-2z"/>
    
    <!-- BxBuildingHouse -->
    <path v-if="name === 'BxBuildingHouse'" d="M19 2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM5 4h8v2H5V4zm0 4h8v2H5V8zm0 4h8v2H5v-2zm14 6H5v-2h14v2zm0-4h-4v-2h4v2zm0-4h-4V8h4v2zm0-4h-4V4h4v2z" />
    
    <!-- BxsUserDetail -->
    <path v-if="name === 'BxsUserDetail'" d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z" />
    
    <!-- BxSpreadsheet -->
    <path v-if="name === 'BxSpreadsheet'" d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm0 16H5V5h14v14z"/><path v-if="name === 'BxSpreadsheet'" d="M7 7h10v2H7zm0 4h10v2H7zm0 4h7v2H7z"/>
    
    <!-- BxFile -->
    <path v-if="name === 'BxFile'" d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm8 7V4l5 5h-5z" />

    <!-- BxsCategoryAlt -->
    <path v-if="name === 'BxsCategoryAlt'" d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM9 9H5V5h4v4zm11-6h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 6h-4V5h4v4zm-10 4H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zm-1 6H5v-4h4v4zm11-6h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zm-1 6h-4v-4h4v4z" />

    <!-- BxsContact -->
    <path v-if="name === 'BxsContact'" d="M21 4H3c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h18c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM8 17H5v-2h3v2zm0-4H5v-2h3v2zm0-4H5V7h3v2zm10 8h-7v-2h7v2zm0-4h-7v-2h7v2zm0-4h-7V7h7v2z" />

    <!-- BxServer -->
    <path v-if="name === 'BxServer'" d="M20 13H4c-1.103 0-2 .897-2 2v4c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-4c0-1.103-.897-2-2-2zM4 19v-4h16v4H4zm16-16H4c-1.103 0-2 .897-2 2v4c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 9V5h16v4H4z" /><circle v-if="name === 'BxServer'" cx="17" cy="7" r="1"/><circle v-if="name === 'BxServer'" cx="17" cy="17" r="1"/>

    <!-- BxsPen -->
    <path v-if="name === 'BxsPen'" d="m16.303 4.303 3.394 3.394a.999.999 0 0 0 1.414 0l1.586-1.586a.999.999 0 0 0 0-1.414l-3.394-3.394a.999.999 0 0 0-1.414 0l-1.586 1.586a.999.999 0 0 0 0 1.414zM3 17.586V21h3.414l9.293-9.293-3.414-3.414L3 17.586z" />

    <!-- BxBookAlt -->
    <path v-if="name === 'BxBookAlt'" d="M19 2H6a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h13a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zm-1 18H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h12v16z"/><path v-if="name === 'BxBookAlt'" d="M8 7h8v2H8zm0 4h8v2H8zm0 4h5v2H8z"/>

    <!-- BxlZoom -->
    <path v-if="name === 'BxlZoom'" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/><circle v-if="name === 'BxlZoom'" cx="12" cy="12" r="5"/>

    <!-- BxsUserBadge -->
    <path v-if="name === 'BxsUserBadge'" d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm7 11H5v-2a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v2z" />

    <!-- BxsSchool -->
    <path v-if="name === 'BxsSchool'" d="M12 2 2 7v2h20V7L12 2zM4 11v8H2v2h20v-2h-2v-8h-2v8H6v-8H4zm6 8h4v-4h-4v4z" />

    <!-- BxsKeyWrapper -->
    <path v-if="name === 'BxsKeyWrapper'" d="M7 10a5 5 0 0 0 0 10 5 5 0 0 0 0-10zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm10-5h-3v2h2v3h-2v2h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2zm-1-8a6.96 6.96 0 0 0-5.12 2.22L2 12.11V21h3v-2h2v-2h2v-2h3.11l2.11-2.11A6.94 6.94 0 0 0 12 5zm0 10a5 5 0 1 1 5-5 5 5 0 0 1-5 5z" />

    <!-- BxExtensionWrapper -->
    <path v-if="name === 'BxExtensionWrapper'" d="M21 13h-2v-2h2v-2h-2V7h-2V5h-2v2h-2V5H9v2H7v2H5v2h2v2H5v2h2v2h2v2h2v-2h2v2h2v-2h2v-2h2v-2zM9 13H7v-2h2v2zm0-4H7V7h2v2zm4 4h-2v-2h2v2zm0-4h-2V7h2v2zm4 4h-2v-2h2v2zm0-4h-2V7h2v2z" />

    <!-- Navigation Helpers -->
    <path v-if="name === 'ChevronRightIcon' || name === 'BxChevronRight'" d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z" />
    <path v-if="name === 'ChevronLeftIcon'" d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z" />

    <!-- Globe / Bell / etc -->
    <path v-if="name === 'BxGlobe' || name === 'LanguageIcon'" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm7.931 9h-2.764a14.67 14.67 0 0 0-1.792-6.243A8.013 8.013 0 0 1 19.931 11zM12.53 4.07c1.517 1.896 2.431 4.455 2.431 6.93h-5.922c0-2.475.914-5.034 2.431-6.93a3.749 3.749 0 0 1 1.06 0zM4.069 11a8.013 8.013 0 0 1 4.556-6.243 14.67 14.67 0 0 0-1.792 6.243H4.069zm0 2h2.764a14.67 14.67 0 0 0 1.792 6.243A8.013 8.013 0 0 1 4.069 13zm4.556 6.243a14.67 14.67 0 0 0 1.792-6.243h5.922a14.67 14.67 0 0 0-1.792 6.243 8.013 8.013 0 0 1-4.556 6.243zm5.922-6.243c0 2.475-.914 5.034-2.431 6.93a3.749 3.749 0 0 1-1.06 0c-1.517-1.896-2.431-4.455-2.431-6.93h5.922zm2.764 6.243a14.67 14.67 0 0 0 1.792-6.243h2.764a8.013 8.013 0 0 1-4.556 6.243z" />
    <path v-if="name === 'BxMoon' || name === 'MoonIcon'" d="M12 11.807A9.13 9.13 0 0 1 12 20a9.19 9.19 0 0 1-8-8 9.13 9.13 0 0 1 8.193-9 9.39 9.39 0 0 0 0 18 9.19 9.19 0 0 0 8-8 9.13 9.13 0 0 0-8.193-1.193z" />
    <path v-if="name === 'BxBell' || name === 'BellIcon'" d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.073 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z" />

    <!-- BxRadioCircle -->
    <circle v-if="name === 'BxRadioCircle'" cx="12" cy="12" r="3" />

    <!-- BxLogInWrapper -->
    <path v-if="name === 'BxLogInWrapper'" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm4-9h-4V7l-5 5 5 5v-4h4v-2z" />

    <!-- BxSearch -->
    <path v-if="name === 'BxSearch'" d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />

    <!-- BxReset -->
    <!-- BxReset (Custom for user requirement) -->
    <path v-if="name === 'BxReset'" d="M12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm0-6a2 2 0 1 0 2 2 2 2 0 0 0-2-2z" />
    <path v-if="name === 'BxReset'" d="M12 20a8.13 8.13 0 0 1-8-8 8 8 0 0 1 8-8c2.047 0 3.928.769 5.354 2.043l-2.047 2.03V10H20V5h-4.915l1.938 1.921C15.396 5.513 13.774 5 12 5c-3.859 0-7 3.141-7 7s3.141 7 7 7c1.778 0 3.4-.663 4.646-1.757l1.315 1.513C16.34 20.129 14.28 21 12 21z" />

    <!-- BxCopy -->
    <path v-if="name === 'BxCopy'" d="M20 2H10c-1.103 0-2 .897-2 2v4H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2v-4h4c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM14 20H4v-10h10v10zm6-6h-4v-4c0-1.103-.897-2-2-2h-4V4h10v10z" />

    <!-- BxShow -->
    <path v-if="name === 'BxShow'" d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.576 10.846 6.649 7 12 7s7.424 3.846 7.926 5c-.502 1.154-2.575 5-7.926 5z"/><circle v-if="name === 'BxShow'" cx="12" cy="12" r="3" />

    <!-- BxEdit -->
    <path v-if="name === 'BxEdit'" d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"/><path v-if="name === 'BxEdit'" d="M19 19H5V5h7V3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-7h-2v7z" />

    <!-- BxTrash -->
    <path v-if="name === 'BxTrash'" d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8H5v12zM9 10h2v10H9V10zm4 0h2v10h-2V10zM18 4h-2.5l-1-1h-5l-1 1H5v2h13V4z" />

    <!-- BxUser -->
    <path v-if="name === 'BxUser'" d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z" />

    <!-- BxPlus -->
    <path v-if="name === 'BxPlus'" d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />

    <!-- BxBookContent (Custom for mockup) -->
    <path v-if="name === 'BxBookContent'" d="M19 2H6a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h13a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zm-1 2v16H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h12z"/><path v-if="name === 'BxBookContent'" d="M8 7h8v2H8zm0 4h8v2H8zm0 4h5v2H8z"/>

    <!-- BxsLayers (Custom for mockup) -->
    <path v-if="name === 'BxsLayers'" d="M12 16a1 1 0 0 1-.64-.23l-8-7a1 1 0 0 1 0-1.54l8-7a1 1 0 0 1 1.28 0l8 7a1 1 0 0 1 0 1.54l-8 7a1 1 0 0 1-.64.23z"/><path v-if="name === 'BxsLayers'" d="m11.36 21.77-8-7a1 1 0 1 1 1.28-1.54l7.36 6.44 7.36-6.44a1 1 0 1 1 1.28 1.54l-8 7a1 1 0 0 1-1.28 0z"/><path v-if="name === 'BxsLayers'" d="m11.36 17.77-8-7a1 1 0 1 1 1.28-1.54l7.36 6.44 7.36-6.44a1 1 0 1 1 1.28 1.54l-8 7a1 1 0 0 1-1.28 0z"/>

    <!-- BxsDatabaseMinus (Custom for mockup) -->
    <path v-if="name === 'BxsDatabaseMinus'" d="M20 13c-1.103 0-2 .897-2 2v4c0 1.103.897 2 2 2h-16c-1.103 0-2-.897-2-2v-4c0-1.103.897-2 2-2h14zM4 19h16v-4h-16v4zm16-16c1.103 0 2 .897 2 2v4c0 1.103-.897 2-2 2h-16c-1.103 0-2-.897-2-2v-4c0-1.103.897-2 2-2h16zM4 9h16v-4h-16v4zm13-12h-2v2h2v-2zm-1 8h-4v2h4v-2z" />

    <!-- BxArrowBack (Custom for mockup) -->
    <path v-if="name === 'BxArrowBack'" d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z" />

    <!-- BxsUserBadgeCheck (Custom for mockup) -->
    <path v-if="name === 'BxsUserBadgeCheck'" d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm7 11H5v-2a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v2z"/><path v-if="name === 'BxsUserBadgeCheck'" d="M14.293 12.293 11 15.586l-1.293-1.293-1.414 1.414L11 18.414l4.707-4.707z" />

    <!-- BxsErrorCircle (Custom for mockup) -->
    <path v-if="name === 'BxsErrorCircle'" d="M11.953 2C6.465 2 2 6.486 2 12s4.465 10 9.953 10c5.488 0 9.953-4.486 9.953-10S17.441 2 11.953 2zm.047 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm1-5h-2V7h2v6z" />

    <!-- BxWaves (Custom for mockup) -->
    <path v-if="name === 'BxWaves'" d="M12 16a1 1 0 0 1-.64-.23l-8-7a1 1 0 0 1 0-1.54l8-7a1 1 0 0 1 1.28 0l8 7a1 1 0 0 1 0 1.54l-8 7a1 1 0 0 1-.64.23z"/><path v-if="name === 'BxWaves'" d="m11.36 21.77-8-7a1 1 0 1 1 1.28-1.54l7.36 6.44 7.36-6.44a1 1 0 1 1 1.28 1.54l-8 7a1 1 0 0 1-1.28 0z" />



  </svg>
</template>

<script setup lang="ts">
interface Props {
  name?: string
  className?: string
  size?: string | number
}

withDefaults(defineProps<Props>(), {
  size: '24'
})
</script>
