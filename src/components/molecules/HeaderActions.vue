<template>
  <div class="flex items-center gap-[10px] text-[#39424e]">
    <button class="header-icon-button" aria-label="Language">
      <svg class="header-icon" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="17.5" />
        <path d="M6.5 24h35" />
        <path d="M24 6.5c5.2 4.8 7.6 10.8 7.6 17.5S29.2 36.7 24 41.5" />
        <path d="M24 6.5c-5.2 4.8-7.6 10.8-7.6 17.5S18.8 36.7 24 41.5" />
      </svg>
    </button>

    <button class="header-icon-button" aria-label="Dark mode">
      <svg class="header-icon" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M35.5 35.5A17 17 0 0 1 22.2 6.2 17.7 17.7 0 1 0 41.8 25.8 17 17 0 0 1 35.5 35.5Z" />
      </svg>
    </button>

    <button class="header-icon-button" aria-label="Apps">
      <svg class="header-icon" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M10 10h10v10H10z" />
        <path d="M28 10h10v10H28z" />
        <path d="M10 28h10v10H10z" />
        <path d="M28 28h10v10H28z" />
      </svg>
    </button>

    <button class="header-icon-button relative" aria-label="Notifications">
      <svg class="header-icon" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M15 20.8C15 14.7 19 10 24 10s9 4.7 9 10.8V29l4.8 5H10.2L15 29Z" />
        <path d="M20.5 38a4 4 0 0 0 7 0" />
      </svg>
      <span class="absolute right-[5px] top-[5px] h-[10px] w-[10px] rounded-full border-[2px] border-white bg-[#ff3e1d]"></span>
    </button>

    <div class="relative ml-[4px] cursor-pointer">
      <div class="h-[46px] w-[46px] overflow-hidden rounded-full bg-[#9f98ff] p-[3px]">
        <img
          src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png"
          alt="User Avatar"
          class="h-full w-full rounded-full object-cover"
        />
      </div>
      <span class="absolute bottom-[2px] right-[-1px] h-[12px] w-[12px] rounded-full border-[3px] border-white bg-[#6fe33f]"></span>
    </div>
  </div>
</template>

<style scoped>
.header-icon-button {
  display: flex;
  height: 34px;
  width: 34px;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  transition: background-color 0.2s ease;
}

.header-icon-button:hover {
  background-color: #f8fafc;
}

.header-icon {
  width: 28px;
  height: 28px;
  fill: none;
  stroke: currentColor;
  stroke-width: 3.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
