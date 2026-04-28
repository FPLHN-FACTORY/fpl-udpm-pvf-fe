<template>
  <div class="flex items-center gap-6 text-[#566a7f]">
    <button class="hover:bg-gray-100 p-2 rounded-full transition-colors">
      <NavIcon name="BxGlobe" class-name="w-[22px] h-[22px]" />
    </button>
    <button class="hover:bg-gray-100 p-2 rounded-full transition-colors">
      <NavIcon name="BxMoon" class-name="w-[22px] h-[22px]" />
    </button>
    <button class="hover:bg-gray-100 p-2 rounded-full transition-colors">
      <NavIcon name="BxGridAlt" class-name="w-[22px] h-[22px]" />
    </button>
    <button class="hover:bg-gray-100 p-2 rounded-full transition-colors relative">
      <NavIcon name="BxBell" class-name="w-[22px] h-[22px]" />
      <span class="absolute top-2 right-2 w-2 h-2 bg-[#ff3e1d] border-2 border-white rounded-full"></span>
    </button>
    
    <div class="relative cursor-pointer ml-2">
      <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-gray-200 transition-all">
        <img src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png" alt="User Avatar" class="w-full h-full object-cover" />
      </div>
      <span class="absolute bottom-0 right-0 w-3 h-3 bg-[#71dd37] border-2 border-white rounded-full"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavIcon from '../atoms/NavIcon.vue'
</script>
