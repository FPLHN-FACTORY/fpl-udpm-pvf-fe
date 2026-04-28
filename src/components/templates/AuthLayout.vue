<template>
  <div class="auth-layout">
    <div class="auth-layout__background">
      <!-- Background decorations -->
      <div class="auth-layout__decoration auth-layout__decoration--top"></div>
      <div class="auth-layout__decoration auth-layout__decoration--bottom"></div>
    </div>
    
    <div class="auth-layout__container">
      <div class="auth-layout__card">
        <div class="auth-layout__logo">
          <img 
            src="/src/assets/logo.png" 
            alt="PVF Football Academy" 
            class="auth-layout__logo-image"
          />
        </div>
        
        <div class="auth-layout__content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No props needed for this layout
</script>

<style scoped>
.auth-layout {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.auth-layout__background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.auth-layout__decoration {
  position: absolute;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.auth-layout__decoration--top {
  width: 200px;
  height: 200px;
  top: 10%;
  right: 15%;
  animation-delay: 0s;
}

.auth-layout__decoration--bottom {
  width: 300px;
  height: 300px;
  bottom: 10%;
  left: 10%;
  animation-delay: 3s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

.auth-layout__container {
  width: 100%;
  max-width: 480px;
  z-index: 1;
}

.auth-layout__card {
  background: white;
  border-radius: 16px;
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  padding: 48px 40px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.auth-layout__logo {
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
}

.auth-layout__logo-image {
  height: 80px;
  width: auto;
  object-fit: contain;
}

.auth-layout__content {
  width: 100%;
}

/* Responsive */
@media (max-width: 640px) {
  .auth-layout {
    padding: 16px;
  }
  
  .auth-layout__card {
    padding: 32px 24px;
  }
  
  .auth-layout__decoration--top,
  .auth-layout__decoration--bottom {
    display: none;
  }
}
</style>