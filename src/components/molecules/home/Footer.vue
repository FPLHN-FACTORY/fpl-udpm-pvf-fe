<template>
  <footer>
    <div class="footer-inner">
      <div>
        <div class="footer-brand-name">Trung Tâm Đào Tạo Bóng Đá Trẻ PVF Bộ Công An</div>
        <div class="footer-contact-item">
          <span class="footer-contact-icon"></span>
          <span>{{ contact?.address || 'Thôn Sổ Đông, xã Nghĩa Trụ, tỉnh Hưng Yên, Việt Nam' }}</span>
        </div>
        <div class="footer-contact-item">
          <span class="footer-contact-icon"></span>
          <span>{{ contact?.phone || '0221 3737087' }}</span>
        </div>
        <div class="footer-contact-item">
          <span class="footer-contact-icon"></span>
          <span>{{ contact?.email || 'info@pvf.com.vn' }}</span>
        </div>
      </div>

      <div>
        <div class="footer-col-title">Về Chúng Tôi</div>
        <ul class="footer-links">
          <li v-for="link in aboutLinks" :key="link.id"><a href="#">{{ link.name }}</a></li>
        </ul>
      </div>

      <div>
        <div class="footer-col-title">Liên Kết Mạng Xã Hội</div>
        <div class="social-links">
          <a v-for="social in socialLinks" :key="social.id" :href="social.url" class="social-btn" :class="social.class">
            {{ social.icon }}
          </a>
        </div>
      </div>
    </div>
    <div class="footer-copy">
      Copyright 2026 © Trung tâm Đào tạo Bóng đá trẻ PVF – Bộ Công An
    </div>
  </footer>
</template>

<script setup>
defineProps({
  brand: {
    type: Object,
    default: () => ({})
  },
  contact: {
    type: Object,
    default: () => ({})
  },
  aboutLinks: {
    type: Array,
    default: () => [
      { id: 1, name: 'Trang chủ' },
      { id: 2, name: 'Giới thiệu' }
    ]
  },
  socialLinks: {
    type: Array,
    default: () => [
      { id: 1, name: 'Facebook', url: '#', class: 'fb', icon: 'f' },
      { id: 2, name: 'TikTok', url: '#', class: 'tt', icon: 'TT' },
      { id: 3, name: 'YouTube', url: '#', class: 'yt', icon: '▶' }
    ]
  }
})
</script>

<style scoped>
footer {
  background: #111;
  color: #aaa;
  padding: 40px 20px 0;
}
.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid #333;
}
.footer-brand-name {
  font-family: 'Oswald', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
  line-height: 1.4;
}
.footer-contact-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 10px;
  font-size: 13px;
}
.footer-contact-icon {
  width: 16px;
  flex-shrink: 0;
  margin-top: 2px;
  color: #d0021b;
}
.footer-col-title {
  font-family: 'Oswald', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 16px;
}
.footer-links {
  list-style: none;
}
.footer-links li {
  margin-bottom: 8px;
}
.footer-links a {
  color: #aaa;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.2s;
}
.footer-links a:hover {
  color: #d0021b;
}
.social-links {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}
.social-btn {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  text-decoration: none;
  color: white;
  font-weight: 700;
  transition: transform 0.2s, opacity 0.2s;
}
.social-btn:hover {
  transform: scale(1.1);
  opacity: 0.9;
}
.social-btn.fb {
  background: #1877f2;
}
.social-btn.tt {
  background: #010101;
}
.social-btn.yt {
  background: #ff0000;
}
.footer-copy {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 0;
  text-align: center;
  font-size: 12px;
  color: #666;
}
@media (max-width: 768px) {
  .footer-inner {
    grid-template-columns: 1fr;
  }
}
</style>
