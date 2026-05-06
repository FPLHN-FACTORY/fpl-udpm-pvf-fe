<template>
  <div class="topbar">
    <div class="topbar-inner">
      <span>{{ contact?.phone || '0221 3737087' }}</span>
      <span class="email-span">{{ contact?.email || 'info@pvf.com.vn' }}</span>
      <span>{{ contact?.address || 'Thôn Sổ Đông, xã Nghĩa Trụ, tỉnh Hưng Yên, Việt Nam' }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  contact: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style scoped>
.topbar {
    width: 1440;
    height: 30;
    angle: 0 deg;
    opacity: 1;
  background: #E81919;
  color: #ccc;
  font-size: 12px;
  padding: 6px 0;
}
.topbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 24px;
  align-items: center;
}
.topbar a {
  color: #ffffff;
  text-decoration: none;
}
.topbar span {
  display: flex;
  align-items: center;
  gap: 6px;
}

.email-span {
  border-left: 0.5px solid rgba(255, 255, 255, 0.8);
  border-right: 0.5px solid rgba(255, 255, 255, 0.8);
  padding: 0 16px;
  line-height: 1.2;
  /* Các styles khác theo yêu cầu */
  display: inline-flex;
  align-items: center;
}
@media (max-width: 768px) {
  .topbar-inner {
    flex-wrap: wrap;
    gap: 12px;
  }
}
</style>
