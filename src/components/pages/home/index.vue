<template>
  <div v-if="loading" class="loading-container">
    <div class="loading-text">Đang tải dữ liệu...</div>
  </div>
  <div v-else-if="error" class="error-container">
    <div class="error-text">Đã xảy ra lỗi khi tải dữ liệu: {{ error }}</div>
  </div>
  <template v-else>
    <TopBar :contact="siteConfig.contact" />
    <Header :brand="siteConfig.brand" :contact="siteConfig.contact" />
    <NavBar :links="siteConfig.navLinks" @location-change="onLocationChange" />
    <Hero :hero="siteConfig.hero" />
    <CardSection
      :cards="cards"
      :current-page="pagination.currentPage"
      :total-pages="pagination.totalPages"
      :loading="cardsLoading"
      @change-page="onPageChange"
    />
    <Criteria :left-items="criteria.left" :right-items="criteria.right" />
    <Footer
      :brand="siteConfig.brand"
      :contact="siteConfig.contact"
      :about-links="siteConfig.aboutLinks"
      :social-links="siteConfig.socialLinks"
    />
  </template>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TopBar from '../../molecules/home/TopBar.vue'
import Header from '../../molecules/home/Header.vue'
import NavBar from '../../molecules/home/NavBar.vue'
import Hero from '../../molecules/home/Hero.vue'
import CardSection from '../../molecules/home/CardSection.vue'
import Criteria from '../../molecules/home/Criteria.vue'
import Footer from '../../molecules/home/Footer.vue'
import ApiService from '../../../services/home/api.js'

const loading = ref(true)
const cardsLoading = ref(false)
const error = ref(null)
const siteConfig = ref(null)
const cards = ref([])
const criteria = ref({
  left: [],
  right: []
})
const pagination = ref({
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10
})
const activeLocation = ref('')

async function loadInitialData() {
  try {
    const [configRes, cardsRes, criteriaRes] = await Promise.all([
      ApiService.getSiteConfig(),
      ApiService.getTuyenSinh({ page: 1 }),
      ApiService.getTieuChi()
    ])
    siteConfig.value = configRes.data
    cards.value = cardsRes.data
    pagination.value = cardsRes.meta
    criteria.value = criteriaRes.data
  } catch (err) {
    error.value = 'Không thể tải dữ liệu. Vui lòng thử lại sau.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

async function onPageChange(page) {
  cardsLoading.value = true
  try {
    const res = await ApiService.getTuyenSinh({ page, location: activeLocation.value })
    cards.value = res.data
    pagination.value = res.meta
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (err) {
    console.error(err)
  } finally {
    cardsLoading.value = false
  }
}

async function onLocationChange(locationKey) {
  activeLocation.value = locationKey
  await onPageChange(1)
}

onMounted(() => {
  loadInitialData()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&family=Oswald:wght@400;500;600;700&display=swap');
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --red: #d0021b;
  --red-dark: #a80015;
  --red-light: #ff1a2e;
  --gold: #f5c518;
  --white: #ffffff;
  --gray-light: #f5f5f5;
  --gray: #888;
  --text: #222;
}

body {
   font-family: 'Public Sans', sans-serif;
  color: var(--text);
  background: #fff;
}

/* Animation keyframes */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.loading-container {
  padding: 80px;
  text-align: center;
}

.loading-text {
  font-family: 'Oswald', sans-serif;
  color: #d0021b;
  letter-spacing: 3px;
  font-size: 20px;
}

.error-container {
  padding: 40px;
  text-align: center;
}

.error-text {
  color: #c00;
}

/* Global styles cho toàn bộ ứng dụng */
:deep(.card) {
  animation: fadeUp 0.5s ease both;
}

:deep(.card:nth-child(1)) { animation-delay: 0.05s; }
:deep(.card:nth-child(2)) { animation-delay: 0.1s; }
:deep(.card:nth-child(3)) { animation-delay: 0.15s; }
:deep(.card:nth-child(4)) { animation-delay: 0.2s; }
:deep(.card:nth-child(5)) { animation-delay: 0.25s; }
:deep(.card:nth-child(6)) { animation-delay: 0.3s; }
</style>
