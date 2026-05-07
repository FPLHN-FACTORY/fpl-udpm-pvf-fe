<template>
  <div class="hero">
    <div class="slider">
      <div
        class="slides"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="slide"
        >
          <img :src="slide" alt="banner" />
        </div>
      </div>
    </div>

    <!-- dots -->
    <div class="dots">
      <span
        v-for="(slide, index) in slides"
        :key="index"
        :class="{ active: index === currentIndex }"
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const slides = ref([
  'https://pvf.com.vn/wp-content/uploads/2025/07/u13-pvf-1400x525.jpg',
  'https://pvf.com.vn/wp-content/uploads/2025/08/525356827_764337569504068_755034553509975660_n-1536x1023.jpg',
  'https://pvf.com.vn/wp-content/uploads/2025/08/0ef3594ea2ac2bf272bd-1536x1024.jpg',
  'https://pvf.com.vn/wp-content/uploads/2025/08/515440901_1285275290057699_5979419856568871099_n-2048x937.jpg'
])

const currentIndex = ref(0)
let interval = null

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length
}

function goToSlide(index) {
  currentIndex.value = index
}

onMounted(() => {
  interval = setInterval(nextSlide, 3000) // 3s chuyển ảnh
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>
<style scoped>
.hero {
  position: relative;
  overflow: hidden;
}

.slider {
  min-width: 100%;
  height: 576px;
  overflow: hidden;
}

.slides {
  display: flex;
  transition: transform 0.6s ease-in-out; /* mượt */
  height: 100%;
}

.slide {
  flex: 0 0 100%;   /* QUAN TRỌNG - mỗi slide = 100% */
  height: 100%;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* dots */
.dots {
  position: absolute;
  bottom: 15px;
  width: 100%;
  text-align: center;
}

.dots span {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background: rgba(255,255,255,0.5);
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
}

.dots span.active {
  background: #fff;
  transform: scale(1.2);
}
</style>
