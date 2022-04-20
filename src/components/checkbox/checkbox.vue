<template>
  <label>
    <span>
      <input v-if="group" type="checkbox" :disabled="disabled" :value="label" v-model="model" @change="change">
      <input v-else type="checkbox" :disabled="disabled" :checked="currentValue" @change="change">
    </span>
    <slot></slot>
  </label>
</template>

<script>
import Emitter from './../../mixins/emitter';
import { findComponentUpward } from '../../utils/assist.js';
export default {
  name: "YCheckBox",
  mixins: [Emitter],
  props: {
      label: {
        type: [String, Number, Boolean]
      },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    }
  },
  data() {
    return {
      currentValue: this.value,
      model: [],
      group: false,
      parent: null
    }
  },
  watch: {
    value(val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.uploadModel()
      } else {
        throw new Error('value should be trueValue or falseValue')
      }
    }
  },
  mounted() {
    this.parent = findComponentUpward(this, 'YCheckboxGroup');
    console.log(this.parent)
    if (this.parent) {
      this.group = true
    }
    if (this.group) {
      this.parent.uploadModel(true)
    } else {
      this.uploadModel()
    }
  },
  methods: {
    change(event) {
      if (this.disabled) {
        return false
      }
      const checked = event.target.checked
      this.currentValue = checked
      const value = checked ? this.trueValue : this.falseValue
      this.$emit('input', value)
      if (this.group) {
        this.parent.change(this.model);
      } else {
        this.$emit('on-change', value);
        this.dispatch('YFormItem', 'on-form-change', value);
      }
    },
    uploadModel() {
      this.currentValue = this.value === this.trueValue
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
