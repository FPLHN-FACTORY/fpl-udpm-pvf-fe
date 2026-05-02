<template>
  <a-tag :class="['pvf-tag', `pvf-tag-${type || 'default'}`]" class="px-3 py-1 rounded-md border-none font-medium">
    <slot />
  </a-tag>
</template>

<script setup lang="ts">
interface Props {
  type?: 'success' | 'warning' | 'error' | 'processing' | 'default' | 'primary' | 'info' | 'danger'
}

withDefaults(defineProps<Props>(), {
  type: 'default'
})
</script>

<style scoped>
.pvf-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1.5;
  margin-right: 0;
  transition: all 0.3s;
}

.pvf-tag-success {
  background-color: #71DD3729 !important;
  color: #71DD37 !important;
}

.pvf-tag-warning {
  background-color: #FFAB0029 !important;
  color: #FFAB00 !important;
}

.pvf-tag-error, .pvf-tag-danger {
  background-color: #FF3E1D29 !important;
  color: #FF3E1D !important;
}

.pvf-tag-primary, .pvf-tag-processing {
  background-color: #696CFF29 !important;
  color: #696CFF !important;
}

.pvf-tag-info {
  background-color: #03C3EC29 !important;
  color: #03C3EC !important;
}

.pvf-tag-default {
  background-color: #8592A329 !important;
  color: #8592A3 !important;
}
</style>
