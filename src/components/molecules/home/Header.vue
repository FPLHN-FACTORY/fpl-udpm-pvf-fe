<template>
  <header>
    <div class="header-inner">
      <a href="#" class="logo">
        <img :src="brand?.logo" :alt="brand?.name">
      </a>
      <div class="search-box">
        <input type="text" placeholder="Tìm kiếm" v-model="searchTerm" @keyup.enter="onSearch">
        <button @click="onSearch">
          <i class='bx bx-search'></i>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

// Định nghĩa props
const props = defineProps({
  brand: {
    type: Object,
    default: () => ({})
  },
  contact: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['search'])
const searchTerm = ref('')

function onSearch() {
  emit('search', searchTerm.value)
}
</script>

<style scoped>
/* Import BoxIcons CSS - THÊM DÒNG NÀY */
@import url('https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css');

header {
  background: #fff;
  border-bottom: 3px solid #d0021b;
  padding: 12px 20px;
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

img {
  width: 417px;
  height: 87px;
  object-fit: contain;
}

.search-box {
  background: #ECE6F0;
  display: flex;
  border: 1px solid #D2D2D2;
  overflow: hidden;
  align-items: center;
  width: 265px;
  height: 41px;
  max-width: 720px;
  angle: 0 deg;
  opacity: 1;
  border-radius: 28px;
  gap: 4px;
}

.search-box input {
  border: none;
  outline: none;
  padding: 8px 16px;
  font-size: 14px;
  width: 400px;
  font-family: 'Public Sans', sans-serif;
  background: transparent;
}

.search-box button {
  background: #ECE6F0;
  border: none;
  color: #49454FB2;
  padding: 8px 14px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}


.search-box button i {
  font-size: 18px;
  color: #49454FB2;
  display: block;
}

@media (max-width: 768px) {
  .header-inner {
    flex-direction: column;
    gap: 15px;
  }
  
  .search-box input {
    width: 150px;
  }
  
  img {
    width: 250px;
    height: auto;
  }
}
</style>
