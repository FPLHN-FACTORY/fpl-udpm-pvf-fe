<template>
  <nav>
    <div class="nav-inner">
      <a
        v-for="link in links"
        :key="link.id"
        href="#"
        :class="{ active: activeLink === link.id }"
        @click.prevent="handleClick(link)"
      >
        {{ link.name }}
      </a>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  links: {
    type: Array,
    default: () => [
      { id: 'ha-noi', name: 'Hà Nội' },
      { id: 'dong-nai', name: 'Đồng Nai' },
      { id: 'hung-yen', name: 'Hưng Yên' }
    ]
  }
})

const emit = defineEmits(['location-change'])
const activeLink = ref(props.links[0]?.id || '')

function handleClick(link) {
  activeLink.value = link.id
  emit('location-change', link.id)
}
</script>

<style scoped>
nav {
  background: #E81919;
}
.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
nav a {
  color: white;
  text-decoration: none;
  padding: 14px 60px;
  font-family: 'Public Sans', sans-serif;
  font-weight: 700px;
  font-size: 18px;
  letter-spacing: 1px;
  font-style: bold;
  transition: background 0.2s;
  display: block;
  line-height: 24px;
}
nav a:hover {
  text-decoration: underline;
  color: #FFFFFF;
}
@media (max-width: 768px) {
  nav a {
    padding: 12px 20px;
    font-size: 13px;
  }
}
</style>
