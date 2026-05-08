<template>
  <div class="floating-input">
    <input
      :id="id"
      v-model="value"
      :type="type"
      :placeholder="placeholder ? ' ' : ''"
      class="input-field"
      @keyup.enter="$emit('enter')"
    />
    <label :for="id" class="input-label">
      {{ placeholder }}
    </label>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    placeholder: String,
    type: {
      type: String,
      default: 'text'
    },
    id: {
      type: String,
      default: () => `input-${Math.random()}`
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      }
    }
  }
}
</script>

<style scoped>
.floating-input {
  position: relative;
}

.input-field {
  width: 250px;
  height: 38px;
  padding: 16px 12px 8px;
  font-size: 15px;
  line-height: 24px;
  border: 1px solid rgba(34, 48, 62, 0.22);
  border-radius: 4px;
  outline: none;
  transition: all 0.2s;
  background: white;
}

.input-field:focus {
  border-color: rgb(105, 108, 255);
  box-shadow: 0 0 0 2px rgb(165, 167, 255);
}

.input-label {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(34, 48, 62, 0.4);
  transition: all 0.2s ease;
  pointer-events: none;
  background: white;
  padding: 0 4px;
  font-size: 15px;
}

.input-field:focus + .input-label,
.input-field:not(:placeholder-shown) + .input-label {
  top: 0;
  font-size: 12px;
  color: rgba(34, 48, 62, 0.7);
  line-height: 15px;
  font-size: 13px;
}
</style>