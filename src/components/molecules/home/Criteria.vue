<template>
  <div class="criteria">
    <div class="criteria-inner">
      <div class="criteria-header">
        <div class="criteria-eyebrow">Tiêu Chí</div>
        <div class="criteria-title">Tuyển Sinh – Tuyển Trạch</div>
      </div>

      <div class="criteria-grid">
        <div class="criteria-col">
          <div class="criteria-item" v-for="item in leftItems" :key="item.id">
            <div class="criteria-item-title">{{ item.title }}</div>
            <div class="criteria-item-desc" v-if="item.description">{{ item.description }}</div>
          </div>
        </div>

        <div class="mascot-wrap">
          <div class="mascot">
            <div class="mascot-body">
              <div class="m-arm l"></div>
              <div class="m-arm r"></div>
              <div class="m-head"></div>
              <div class="m-torso"></div>
              <div class="m-shorts">
                <div class="m-leg l"></div>
                <div class="m-leg r"></div>
              </div>
              <div class="m-ball"></div>
            </div>
          </div>
        </div>

        <div class="criteria-col right">
          <div class="criteria-item" v-for="item in rightItems" :key="item.id">
            <div class="criteria-item-title">{{ item.title }}</div>
            <div class="criteria-item-desc" v-if="item.description">{{ item.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  leftItems: {
    type: Array,
    default: () => []
  },
  rightItems: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.criteria {
  background: #d0021b;
  padding: 60px 20px;
  position: relative;
  overflow: hidden;
}
.criteria::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255, 255, 255, 0.03) 20px, rgba(255, 255, 255, 0.03) 40px);
}
.criteria-inner {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
.criteria-header {
  text-align: center;
  margin-bottom: 40px;
}
.criteria-eyebrow {
  font-family: 'Oswald', sans-serif;
  font-size: 11px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 6px;
}
.criteria-title {
  font-family: 'Oswald', sans-serif;
  font-size: 36px;
  font-weight: 700;
  text-transform: uppercase;
  color: white;
  letter-spacing: 3px;
  line-height: 1.1;
}
.criteria-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0 30px;
  align-items: center;
}
.criteria-col {
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.criteria-col.right {
  align-items: flex-end;
  text-align: right;
}
.criteria-item {
  max-width: 340px;
}
.criteria-col.right .criteria-item {
  text-align: right;
}
.criteria-item-title {
  font-family: 'Oswald', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.criteria-col.right .criteria-item-title {
  justify-content: flex-end;
}
.criteria-item-title::before {
  content: '';
  display: block;
  width: 4px;
  height: 16px;
  background: #f5c518;
  border-radius: 2px;
  flex-shrink: 0;
}
.criteria-col.right .criteria-item-title::before {
  order: 1;
}
.criteria-item-desc {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.5;
  padding-left: 12px;
}
.criteria-col.right .criteria-item-desc {
  padding-left: 0;
  padding-right: 12px;
}
.mascot-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.mascot {
  width: 140px;
  height: 180px;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.mascot-body {
  position: relative;
  width: 80px;
  height: 120px;
}
.m-head {
  width: 54px;
  height: 54px;
  background: #f9c97a;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}
.m-head::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 6px;
  width: 42px;
  height: 24px;
  background: #3d2000;
  border-radius: 40px 40px 0 0;
}
.m-torso {
  width: 50px;
  height: 50px;
  background: #c0021b;
  border-radius: 8px 8px 4px 4px;
  position: absolute;
  top: 44px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}
.m-torso::before {
  content: 'PVF';
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Oswald', sans-serif;
  font-size: 9px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 1px;
}
.m-shorts {
  width: 50px;
  height: 24px;
  background: #003087;
  border-radius: 0 0 4px 4px;
  position: absolute;
  top: 92px;
  left: 50%;
  transform: translateX(-50%);
}
.m-leg {
  width: 16px;
  height: 30px;
  background: #f9c97a;
  border-radius: 0 0 6px 6px;
  position: absolute;
  bottom: -6px;
}
.m-leg.l {
  left: 4px;
  transform: rotate(8deg);
}
.m-leg.r {
  right: 4px;
  transform: rotate(-8deg);
}
.m-shoe {
  width: 20px;
  height: 10px;
  background: #1565c0;
  border-radius: 0 8px 8px 0;
  position: absolute;
  bottom: -10px;
}
.m-shoe.l {
  left: 0;
  border-radius: 8px 0 0 8px;
}
.m-shoe.r {
  right: 0;
}
.m-arm {
  width: 12px;
  height: 28px;
  background: #f9c97a;
  border-radius: 6px;
  position: absolute;
  top: 48px;
}
.m-arm.l {
  left: -10px;
  transform: rotate(-20deg);
}
.m-arm.r {
  right: -10px;
  transform: rotate(20deg);
}
.m-ball {
  width: 28px;
  height: 28px;
  background: radial-gradient(circle at 35% 35%, #eee, #888);
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  right: -20px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
}
@media (max-width: 768px) {
  .criteria-grid {
    grid-template-columns: 1fr;
  }
  .criteria-col.right {
    align-items: flex-start;
    text-align: left;
  }
  .criteria-col.right .criteria-item {
    text-align: left;
  }
  .criteria-col.right .criteria-item-title {
    justify-content: flex-start;
  }
  .criteria-col.right .criteria-item-title::before {
    order: 0;
  }
  .criteria-col.right .criteria-item-desc {
    padding-left: 12px;
    padding-right: 0;
  }
  .mascot-wrap {
    display: none;
  }
}
</style>
