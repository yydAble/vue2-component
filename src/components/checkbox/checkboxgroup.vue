<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import { findComponentsDownward } from '../../utils/assist.js';
import Emitter from '../../mixins/emitter.js';
export default {
  name: 'YCheckboxGroup',
  mixins: [Emitter],
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentValue: this.value,
      childrens: []
    }
  },
  watch: {
    value() {
      this.uploadModel(true)
    }
  },
  mounted() {
    this.uploadModel(true)
  },
  methods: {
    uploadModel(update) {
      this.childrens = findComponentsDownward(this, 'YCheckBox')
      if (this.childrens) {
        const { value } = this
        this.childrens.forEach(child => {
          child.model = value
          if (update) {
            child.currentValue = value.indexOf(child.label) >= 0
            child.group = true
          }
        })
      }
    },
    change(data) {
      this.currentValue = data
      this.$emit('input', data)
      this.$emit('on-change', data);
      this.dispatch('YFormItem', 'on-form-change', data);
    }
  }
}
</script>
