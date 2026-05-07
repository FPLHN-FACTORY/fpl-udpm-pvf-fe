<template>
  <section style="background: #fff;">
    <div class="section-inner">
      <h2 class="section-title">Danh Sách Tuyển Sinh</h2>
      <div class="section-divider"><span class="dot"></span></div>

      <div v-if="loading" class="loading-skeleton">
        <div v-for="i in 6" :key="i" class="skeleton-card">
          <div class="skeleton skeleton-img"></div>
          <div class="skeleton skeleton-title"></div>
          <div class="skeleton skeleton-text"></div>
        </div>
      </div>

      <div v-else class="cards-grid">
        <div v-for="card in cards" :key="card.id" class="card">
          <div class="card-img">
            <div class="card-badge">{{ card.badge || 'Tuyển Sinh PVF Khóa XVI Năm 2025' }}</div>
            <div class="card-img-title">Tuyển<br>Sinh</div>
            <div class="card-description">
              {{ card.description || 'Buổi Chào Đón Học Viên Khóa XVI Năm 2025 – Của Trung Tâm Đào Tạo Bóng Đá Trẻ PVF' }}
            </div>
            <div class="card-players">
              <div class="cp"></div>
              <div class="cp tall"></div>
              <div class="cp"></div>
            </div>
            <div class="sponsors-row">
              <div class="sponsor-logo">MASTERISE HOMES</div>
              <div class="sponsor-logo vpb">VPBank</div>
              <div class="sponsor-logo msb">MSB</div>
              <div class="sponsor-logo thaco">THACO</div>
            </div>
          </div>
          <div class="card-body">
            <div class="card-header-text">{{ card.title || 'Card header' }}</div>
            <div class="card-subtitle">{{ card.subtitle || 'Subtitle' }}</div>
            <p class="card-desc">{{ card.content || 'This is some text within a card body.' }}</p>
          </div>
        </div>
      </div>

      <div v-if="!loading && totalPages > 1" class="pagination">
        <button class="page-btn" @click="changePage(1)" :disabled="currentPage === 1">«</button>
        <button class="page-btn" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">‹</button>
        <button
          v-for="page in visiblePages"
          :key="page"
          class="page-btn"
          :class="{ active: page === currentPage }"
          @click="changePage(page)"
        >
          {{ page }}
        </button>
        <button class="page-btn" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">›</button>
        <button class="page-btn" @click="changePage(totalPages)" :disabled="currentPage === totalPages">»</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  cards: {
    type: Array,
    default: () => []
  },
  currentPage: {
    type: Number,
    default: 1
  },
  totalPages: {
    type: Number,
    default: 1
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['change-page'])

const visiblePages = computed(() => {
  const delta = 2
  const range = []
  const start = Math.max(1, props.currentPage - delta)
  const end = Math.min(props.totalPages, props.currentPage + delta)
  for (let i = start; i <= end; i++) {
    range.push(i)
  }
  return range
})

function changePage(page) {
  if (page >= 1 && page <= props.totalPages) {
    emit('change-page', page)
  }
}
</script>

<style scoped>
section {
  padding: 60px 20px;
}
.section-inner {
  max-width: 1200px;
  margin: 0 auto;
}
.section-title {
  text-align: center;
  font-family: 'Oswald', sans-serif;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #d0021b;
  margin-bottom: 8px;
  position: relative;
}
.section-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
  margin-bottom: 40px;
}
.section-divider::before, .section-divider::after {
  content: '';
  height: 2px;
  width: 80px;
  background: linear-gradient(to right, transparent, #d0021b);
}
.section-divider::after {
  background: linear-gradient(to left, transparent, #d0021b);
}
.section-divider .dot {
  width: 8px;
  height: 8px;
  background: #d0021b;
  border-radius: 50%;
}
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 40px;
}
.card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.25s, box-shadow 0.25s;
  cursor: pointer;
  background: #fff;
}
.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(208, 2, 27, 0.2);
}
.card-img {
  position: relative;
  background: linear-gradient(135deg, #c0021b, #8b0000);
  padding: 20px 16px 16px;
  overflow: hidden;
}
.card-img::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.03) 10px, rgba(255, 255, 255, 0.03) 20px);
}
.card-img::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 4px;
  background: #f5c518;
}
.card-badge {
  display: inline-block;
  background: #f5c518;
  color: #111;
  font-family: 'Oswald', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 3px 10px;
  margin-bottom: 8px;
}
.card-img-title {
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1.15;
  position: relative;
  z-index: 1;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  margin-bottom: 16px;
}
.card-description {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1.4;
  position: relative;
  z-index: 1;
}
.sponsors-row {
  display: flex;
  gap: 6px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 12px;
}
.sponsor-logo {
  background: white;
  border-radius: 3px;
  padding: 3px 7px;
  font-size: 9px;
  font-weight: 700;
  color: #333;
  letter-spacing: 0.5px;
}
.sponsor-logo.msb {
  color: #003087;
}
.sponsor-logo.vpb {
  color: #007b3e;
}
.sponsor-logo.thaco {
  color: #c0021b;
}
.card-players {
  display: flex;
  gap: 4px;
  justify-content: flex-end;
  margin-top: -8px;
  margin-bottom: -4px;
  position: relative;
  z-index: 1;
}
.cp {
  width: 28px;
  height: 55px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px 4px 0 0;
  flex-shrink: 0;
}
.cp.tall {
  height: 65px;
  background: rgba(255, 255, 255, 0.28);
}
.card-body {
  padding: 16px;
}
.card-header-text {
  font-family: 'Oswald', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #222;
  margin-bottom: 2px;
}
.card-subtitle {
  font-size: 12px;
  color: #888;
  margin-bottom: 8px;
}
.card-desc {
  font-size: 12.5px;
  color: #555;
  line-height: 1.6;
}
.pagination {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 10px;
}
.page-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid #ddd;
  border-radius: 4px;
  font-size: 13px;
  font-family: 'Be Vietnam Pro', sans-serif;
  cursor: pointer;
  color: #222;
  background: white;
  transition: all 0.2s;
  text-decoration: none;
}
.page-btn:hover {
  border-color: #d0021b;
  color: #d0021b;
}
.page-btn.active {
  background: #d0021b;
  color: white;
  border-color: #d0021b;
  font-weight: 700;
}
.page-btn:disabled {
  color: #ccc;
  cursor: default;
  opacity: 0.5;
}
.loading-skeleton {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.skeleton-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}
.skeleton-img {
  height: 200px;
}
.skeleton-title {
  height: 24px;
  width: 80%;
  margin: 15px 16px 10px;
}
.skeleton-text {
  height: 16px;
  width: 90%;
  margin: 0 16px 20px;
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
@media (max-width: 992px) {
  .cards-grid, .loading-skeleton {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 768px) {
  .cards-grid, .loading-skeleton {
    grid-template-columns: 1fr;
  }
}
</style>
