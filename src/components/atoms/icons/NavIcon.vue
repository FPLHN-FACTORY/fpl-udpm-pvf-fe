// fpl-udpm-pvf-fe/src/components/atoms/icons/NavIcon.vue
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
    <path v-if="name === 'BxGridAlt'" d="M4 4h7v7H4V4zm0 9h7v7H4v-7zm9-9h7v7h-7V4zm0 9h7v7h-7v-7z" />

    <!-- BxInfoCircle -->
    <path v-if="name === 'BxInfoCircle'" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/><path v-if="name === 'BxInfoCircle'" d="M11 11h2v6h-2zm0-4h2v2h-2z"/>
    
    <!-- BxBuildingHouse -->
    <path v-if="name === 'BxBuildingHouse' || name === 'BxBuilding'" d="M19 2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM5 4h8v2H5V4zm0 4h8v2H5V8zm0 4h8v2H5v-2zm14 6H5v-2h14v2zm0-4h-4v-2h4v2zm0-4h-4V8h4v2zm0-4h-4V4h4v2z" />
    
    <!-- BxsUserDetail -->
    <path v-if="name === 'BxsUserDetail'" d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z" />
    
    <!-- BxSpreadsheet / BxTemplate -->
    <path v-if="name === 'BxSpreadsheet' || name === 'BxTemplate'" d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm0 16H5V5h14v14z"/><path v-if="name === 'BxSpreadsheet' || name === 'BxTemplate'" d="M7 7h10v2H7zm0 4h10v2H7zm0 4h7v2H7z"/>
    
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

    <!-- BxBookAlt / BxBook -->
    <path v-if="name === 'BxBookAlt' || name === 'BxBook'" d="M19 2H6a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h13a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zm-1 18H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h12v16z"/><path v-if="name === 'BxBookAlt' || name === 'BxBook'" d="M8 7h8v2H8zm0 4h8v2H8zm0 4h5v2H8z"/>

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

    <!-- BxArrowBack -->
    <path v-if="name === 'BxArrowBack'" d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z" />

    <!-- BxGroup -->
    <path v-if="name === 'BxGroup'" d="M16 13c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zM7 13c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zM12 4c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z" />

    <!-- BxLayer -->
    <path v-if="name === 'BxLayer'" d="M12 16.402l-8.586-4.586L2 13.23l10 5.354 10-5.354-1.414-1.414zM12 21.03l-8.586-4.586L2 17.858 12 23.212l10-5.354-1.414-1.414zM12 12l8.586-4.586L22 6.001 12 .647 2 6.001l1.414 1.414z" />

    <!-- BxPlusCircle -->
    <path v-if="name === 'BxPlusCircle'" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />

    <!-- Navigation Helpers -->
    <path v-if="name === 'ChevronRightIcon' || name === 'BxChevronRight'" d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z" />
    <path v-if="name === 'ChevronLeftIcon' || name === 'BxChevronLeft'" d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z" />
    <!-- Globe / Bell / etc -->

    <path v-if="name === 'BxGlobe' || name === 'LanguageIcon'" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm7.931 9h-2.764a14.67 14.67 0 0 0-1.792-6.243A8.013 8.013 0 0 1 19.931 11zM12.53 4.07c1.517 1.896 2.431 4.455 2.431 6.93h-5.922c0-2.475.914-5.034 2.431-6.93a3.749 3.749 0 0 1 1.06 0zM4.069 11a8.013 8.013 0 0 1 4.556-6.243 14.67 14.67 0 0 0-1.792 6.243H4.069zm0 2h2.764a14.67 14.67 0 0 0 1.792 6.243A8.013 8.013 0 0 1 4.069 13zm4.556 6.243a14.67 14.67 0 0 0 1.792-6.243h5.922a14.67 14.67 0 0 0-1.792 6.243 8.013 8.013 0 0 1-4.556 6.243zm5.922-6.243c0 2.475-.914 5.034-2.431 6.93a3.749 3.749 0 0 1-1.06 0c-1.517-1.896-2.431-4.455-2.431-6.93h5.922zm2.764 6.243a14.67 14.67 0 0 0 1.792-6.243h2.764a8.013 8.013 0 0 1-4.556 6.243z" />
    <path v-if="name === 'BxMoon' || name === 'MoonIcon'" d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.91-.11-1.35a1 1 0 0 0-1.03-.84 1 1 0 0 0-.82.63 7 7 0 1 1-6.52-6.52 1 1 0 0 0 .63-.82 1 1 0 0 0-.84-1.03C12.91 3.04 12.46 3 12 3z" />
    <path v-if="name === 'BxBell' || name === 'BellIcon'" d="M12 22a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22zm7-6v-6a7 7 0 0 0-14 0v6l-2 2v1h18v-1l-2-2zM7 17v-7a5 5 0 0 1 10 0v7H7z" />
    
    <!-- BxRadioCircle -->
    <circle v-if="name === 'BxRadioCircle'" cx="12" cy="12" r="3" />

    <!-- BxLogInWrapper -->
    <path v-if="name === 'BxLogInWrapper'" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm4-9h-4V7l-5 5 5 5v-4h4v-2z" />

    <!-- BxSearch -->
    <g
      v-if="name === 'BxSearch'"
      fill="none"
      stroke="currentColor"
      stroke-width="2.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="10" cy="10" r="7.2" />
      <path d="m15.55 15.55 4.95 4.95" />
    </g>

    <!-- BxReset -->
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

    <!-- BxLock -->

    <path v-if="name === 'BxLock'" d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7zm9 13H6v-8h12v8z"/><circle v-if="name === 'BxLock'" cx="12" cy="16" r="1.5"/>

    <!-- BxLogInCircle -->
    <path v-if="name === 'BxLogInCircle'" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/><path v-if="name === 'BxLogInCircle'" d="M11 16v-3h4v-2h-4V8l-4 4z"/>

    <!-- BxEditAlt -->
    <path v-if="name === 'BxEditAlt'" d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"/><path v-if="name === 'BxEditAlt'" d="M19 19H5V5h7V3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-7h-2v7z" />

    <!-- BxCheckShield -->
    <path v-if="name === 'BxCheckShield'" d="M20.905 6.427c-.302-3.415-3.327-6.046-6.849-6.046a.75.75 0 0 0-.15.015C10.741.875 7.74 3.491 7.42 6.892L7 11.233c0 5.666 3.633 10.75 8.948 12.567a.751.751 0 0 0 .474 0C21.733 21.983 25.367 16.899 25.367 11.233l-.462-4.806zM15.183 22.25c-4.49-1.611-7.583-5.917-7.583-10.717l.383-4.142c.241-2.571 2.508-4.542 5.117-4.873a.747.747 0 0 0-.112-.008c2.617 0 4.908 1.983 5.142 4.567l.4 4.456c0 4.8-3.093 9.106-7.583 10.717z" /><path v-if="name === 'BxCheckShield'" d="m11.25 12.75 2.25 2.25 5.25-5.25" />

    <!-- BxTime -->
    <path v-if="name === 'BxTime'" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" /><path v-if="name === 'BxTime'" d="M13 7h-2v6h6v-2h-4z" />

    <!-- BxBarChartAlt2 -->
    <path v-if="name === 'BxBarChartAlt2'" d="M19 21h2v-2h-2v2zm-4 0h2V11h-2v10zm-4 0h2V7h-2v14zm-4 0h2v-6H7v6zm-4 0h2v-4H3v4z" />

    <!-- BxHistory -->
    <path v-if="name === 'BxHistory'" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm1-13h-2v7l5 3 1-1.5-4-2.5V7z" />

    <!-- BxCheck -->
    <path v-if="name === 'BxCheck'" d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />

    <!-- BxChevronsLeft -->
    <path v-if="name === 'BxChevronsLeft'" d="m11.707 16.293-4.293-4.293 4.293-4.293-1.414-1.414L4.586 12l5.707 5.707z" /><path v-if="name === 'BxChevronsLeft'" d="m17.707 16.293-4.293-4.293 4.293-4.293-1.414-1.414L10.586 12l5.707 5.707z" />

    <!-- BxChevronsRight -->
    <path v-if="name === 'BxChevronsRight'" d="m6.293 7.707 4.293 4.293-4.293 4.293 1.414 1.414L13.414 12 7.707 6.293z" /><path v-if="name === 'BxChevronsRight'" d="m12.293 7.707 4.293 4.293-4.293 4.293 1.414 1.414L19.414 12l-5.707-5.707z" />

    <!-- BxExport -->
    <path v-if="name === 'BxExport'" d="M18 7H6V3H4v18h2v-2h12v2h2V3h-2v4zM6 9h12v8H6V9zm4 2v2h4v-2h-4z" />

    <!-- BxImport -->
    <path v-if="name === 'BxImport'" d="M18 7H6V3H4v18h2v-2h12v2h2V3h-2v4zM6 9h12v8H6V9zm4 4v-2h4v2h-4z" />

    <!-- BxBookOpen -->
    <path v-if="name === 'BxBookOpen'" d="M13 13.5h6v-2h-6v2zm0-4h6v-2h-6v2zm-2 5h-6v-2h6v2zm0-4h-6v-2h6v2zm10-5v14.5c0 .828-.672 1.5-1.5 1.5h-15c-.828 0-1.5-.672-1.5-1.5v-14.5c0-.828.672-1.5 1.5-1.5h6c.414 0 .75.336.75.75s-.336.75-.75.75h-5.25v13h13.5v-13h-5.25c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h6c.828 0 1.5.672 1.5 1.5z" />

    <!-- BxRadioCircleMarked -->
    <path v-if="name === 'BxRadioCircleMarked'" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" /><circle v-if="name === 'BxRadioCircleMarked'" cx="12" cy="12" r="4" />

    <!-- BxUserCheck -->
    <path v-if="name === 'BxUserCheck'" d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1zM15.412 12.342l-4.574 4.574-1.838-1.838-1.414 1.414 3.252 3.252 5.988-5.988z" />

    <!-- BxUserMinus -->
    <path v-if="name === 'BxUserMinus'" d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1zm-7-3h6v2h-6z" />

    <!-- BxRefresh -->
    <path v-if="name === 'BxRefresh'" d="M19 11h-1.071c-.482-3.415-3.39-6-6.929-6-3.859 0-7 3.141-7 7s3.141 7 7 7c2.047 0 3.928-.769 5.354-2.043l-2.047-2.03V10H20v5h-4.915l1.938 1.921C15.396 18.487 13.774 19 12 19c-3.859 0-7-3.141-7-7s3.141-7 7-7c1.778 0 3.4.663 4.646 1.757L18 5.243V11z" />

    <!-- BxCalendar -->
    <path v-if="name === 'BxCalendar'" d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z" /><path v-if="name === 'BxCalendar'" d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v4H9V2H7v4H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8v12H5V8h14z" />
    
    <!-- BxUpload -->
    <path v-if="name === 'BxUpload'" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline v-if="name === 'BxUpload'" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="17 8 12 3 7 8" />
    <line v-if="name === 'BxUpload'" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" x1="12" y1="3" x2="12" y2="15" />

    <!-- BxDownload -->
    <path v-if="name === 'BxDownload'" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline v-if="name === 'BxDownload'" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="7 10 12 15 17 10" />
    <line v-if="name === 'BxDownload'" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" x1="12" y1="15" x2="12" y2="3" />

    <!-- BxBookContent -->
    <path v-if="name === 'BxBookContent'" d="M20 2H6a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14V2zm-2 18H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h12v16zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" />

    <!-- BxLayers -->
    <path v-if="name === 'BxLayers'" d="m12 16.48-7.53-4.31-1.47.83 9 5.15 9-5.15-1.47-.83L12 16.48zM12 14l7.53-4.3-1.47-.84L12 12.31 5.94 8.86 4.47 9.7 12 14zM12 4.15l7.53 4.31 1.47-.84L12 2.47l-9 5.15 1.47.84L12 4.15z" />

    <!-- BxAward -->
    <path v-if="name === 'BxAward'" d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm7 11H5v-2a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v2z" />


    <!-- BxStatsTile -->
    <path v-if="name === 'BxStatsTile'" d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v12h16V6H4z" />
    <path v-if="name === 'BxStatsTile'" d="M9 6h2v12H9zM13 8h5v2h-5zM13 12h5v2h-5z" />

    <!-- BxCalendarCheck -->
    <path v-if="name === 'BxCalendarCheck'" d="M7 2h2v2h6V2h2v2h2a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2V2zm12 7H5v10h14V9zM5 7h14V6H5v1z" />
    <path v-if="name === 'BxCalendarCheck'" d="m10.2 16.4-2.1-2.1 1.4-1.4 1 1 3.4-3.4 1.4 1.4z" />

    <!-- BxLayerStack -->
    <g
      v-if="name === 'BxLayerStack'"
      fill="none"
      stroke="currentColor"
      stroke-width="1.7"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="m12 6.25 5.5 2.75L12 11.75 6.5 9 12 6.25Z" />
      <path d="m6.5 11.9 5.5 2.75 5.5-2.75" />
      <path d="m6.5 15.1 5.5 2.75 5.5-2.75" />
      <path d="m16.45 5.05 2.35 1.15-2.35 1.2-2.35-1.2 2.35-1.15Z" />
    </g>

    <!-- BxLayersMinus -->
    <g
      v-if="name === 'BxLayersMinus'"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="m12 5.3 6.35 3.15L12 11.6 5.65 8.45 12 5.3Z" />
      <path d="m5.65 11.2 6.35 3.15 6.35-3.15" />
      <path d="m5.65 14.55 6.35 3.15 6.35-3.15" />
      <path d="M17.95 5.15h3.1" />
    </g>

    <!-- BxLayersPlus -->
    <g
      v-if="name === 'BxLayersPlus'"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="m12 5.3 6.35 3.15L12 11.6 5.65 8.45 12 5.3Z" />
      <path d="m5.65 11.2 6.35 3.15 6.35-3.15" />
      <path d="m5.65 14.55 6.35 3.15 6.35-3.15" />
      <path d="M19.5 3.6v3.1" />
      <path d="M17.95 5.15h3.1" />
    </g>

    <!-- BxUndo / BxRotateLeft -->
    <path v-if="name === 'BxUndo' || name === 'BxRotateLeft'" d="M9 10h6c1.654 0 3 1.346 3 3s-1.346 3-3 3h-3v2h3c2.757 0 5-2.243 5-5s-2.243-5-5-5H9V5L4 9l5 4v-3z" />

    <!-- BxListUl -->
    <path v-if="name === 'BxListUl'" d="M4 6h2v2H4zm0 5h2v2H4zm0 5h2v2H4zm16-8V6H8v2h12zM8 13h12v-2H8v2zm0 5h12v-2H8v2z" />

    <!-- BxUserPlus -->
    <path v-if="name === 'BxUserPlus'" d="M15 11h2V9h2v2h2v2h-2v2h-2v-2h-2zM7 9a4 4 0 1 1 4 4 4 4 0 0 1-4-4zm6 4a2 2 0 1 0-2-2 2 2 0 0 0 2 2zM4 18a6 6 0 0 1 12 0v1H4z" />

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