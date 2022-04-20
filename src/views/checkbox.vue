<template>
  <div>
    <y-check-box v-model="single">单独选项</y-check-box>
    <br>
    <y-checkbox-group v-model="multiple">
      <y-check-box label="option1">选项 1</y-check-box>
      <y-check-box label="option2">选项 2</y-check-box>
      <y-check-box label="option3">选项 3</y-check-box>
      <y-check-box label="option4">选项 4</y-check-box>
    </y-checkbox-group>
  </div>
</template>

<script>
import YCheckBox from './../components/checkbox/checkbox.vue'
import YCheckboxGroup from './../components/checkbox/checkboxgroup.vue'
export default {
  name: 'CheckBox',
  components: {
    YCheckBox,
    YCheckboxGroup
  },
  data() {
    return {
      single: false,
      multiple: ['option1', 'option3']
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
