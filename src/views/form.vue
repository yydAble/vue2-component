<template>
  <div>
    <y-form ref="form" :model="fromValiate" :rules="ruleValiate">
      <y-form-item label="姓名" prop="name">
        <y-input v-model="fromValiate.name"></y-input>
      </y-form-item>
      <y-form-item label="邮箱" prop="mail">
        <y-input v-model="fromValiate.mail"></y-input>
      </y-form-item>
      <y-form-item label="多选" prop="multiple">
        <y-checkbox-group v-model="fromValiate.multiple">
          <y-check-box label="option1">选项 1</y-check-box>
          <y-check-box label="option2">选项 2</y-check-box>
          <y-check-box label="option3">选项 3</y-check-box>
          <y-check-box label="option4">选项 4</y-check-box>
        </y-checkbox-group>
      </y-form-item>
    </y-form>
    <button @click="handleSubmit">提交</button>
    <button @click="handleReset">重置</button>
  </div>
</template>

<script>
import YForm from './../components/from/form.vue'
import YFormItem from './../components/from/form-item.vue'
import YInput from './../components/input/input.vue'
import YCheckBox from './../components/checkbox/checkbox.vue'
import YCheckboxGroup from './../components/checkbox/checkboxgroup.vue'
export default {
  name: 'Form',
  components: {
    YForm,
    YFormItem,
    YInput,
    YCheckBox,
    YCheckboxGroup
  },
  data() {
    return {
      fromValiate: {
        name: '',
        mail: '',
        multiple: []
      },
      ruleValiate: {
        name: [
          { required: true, message: '用户名不能为空', tigger: 'blur' }
        ],
        mail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        multiple: [{ required: true, message: '请选择'}]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          window.alert('提交成功');
        } else {
          window.alert('表单校验失败');
        }
      })
    },
    handleReset() {
      this.$refs.form.resetFields();
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
