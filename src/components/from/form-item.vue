
<template>
  <div class="form-item">
    <label v-if="label" :class="{ 'i-form-item-label-required': isRequired }">{{ label }}</label>
    <div>
      <slot></slot>
      <div v-if="validateState === 'error'" class="i-form-item-message">
        {{validateMessage}}        
      </div>
    </div>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator';
import Emitter from './../../mixins/emitter'
export default {
  name: 'YFormItem',
  mixins: [Emitter],
  inject:['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
    }
  },
  data() {
    return {
      isRequired:false,
      validateState: '',  // 校验状态
      validateMessage: '',  // 校验不通过时的提示信息
    }
  },
  computed:{
    fieldValue(){
      return this.form.model[this.prop]
    }
  },
  mounted() {
    if (this.prop) {
      this.dispatch('YForm', 'on-form-item-add', this);
       // 设置初始值，以便在重置时恢复默认值
        this.initialValue = this.fieldValue;
      this.setRules();
    }
  },
  methods: {
    setRules() {
      let rules = this.getRules();
      if(rules.length){
        rules = rules.every(rule =>{
          this.isRequired = rule.required;
        })
      }

      this.$on('on-form-blur', this.onFieldBlur);
      this.$on('on-form-change', this.onFieldChange);
    },
    getRules() {
      let formRules = this.form.rules;
      formRules = formRules ? formRules[this.prop] : []
      return [].concat(formRules || []);
    },
    getFilteredRules(trigger){
      const rules = this.getRules();
      return rules.filter(rule=>!rule.tigger || rule.tigger.indexOf(trigger) !== -1);
    },
    validate(trigger,callback=function(){}) {
        let rules = this.getFilteredRules(trigger);
        if(!rules || rules.length === 0){
          return true;
        }
        this.validateState = 'validating'

        let descriptor = {}
        descriptor[this.prop] = rules
        const validator = new AsyncValidator(descriptor)
        let model = {}

        model[this.prop] = this.fieldValue;
        validator.validate(model,{firstFields:true},error=>{
          this.validateState = !error ? 'success' : 'error'
          this.validateMessage = error ? error[0].message : ''
          callback(this.validateMessage)
        });
    },
    onFieldBlur() {
      this.validate('blur');
    },
    onFieldChange() {
      this.validate('change');
    },
    resetFields() {
      this.validateState = ''
      this.validateMessage = ''
      this.form.model[this.prop] = this.initialValue
      }
  },
  beforeDestroy() {
    this.dispatch('YForm', 'on-form-item-remove', this);
  }
}
</script>

<style  scoped>
  .i-form-item-label-required:before {
    content: '*';
    color: red;
  }
  .i-form-item-message {
    color: red;
  }
  .form-item{
    display: flex;
  }
</style>
