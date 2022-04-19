<template>
  <div>
    <input type="text" :value="currtValue" @input="handleInput" @blur="handleBlur">
  </div>
</template>

<script>
import Emitter from '../../mixins/emitter.js';
export default {
  name: 'YInput',
  mixins: [Emitter],
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currtValue: this.value
    }
  },
  watch: {
    value(val) {
      this.currtValue = val;
    }
  },
  methods: {
    handleInput(event) {
      const value = event.target.value;
      this.currentValue = value;
      this.$emit('input', value);
      this.dispatch('iFormItem', 'on-form-change', value);
    },
    handleBlur() {
      this.dispatch('iFormItem', 'on-form-blur', this.currentValue);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
