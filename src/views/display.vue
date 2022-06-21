<template>
  <div>
    <h3>动态渲染 .vue 文件的组件—— Display</h3>

    <y-display :code="code"></y-display>
  </div>
</template>
<script>
  import yDisplay from '../components/display/display.vue';
  import defaultCode from './default-code.js';
  export default {
    components: { yDisplay },
    data () {
      return {
        code: defaultCode
      }
    }
  }
</script>
