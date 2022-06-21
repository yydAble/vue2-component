<template>
  <div>
    <Ylert v-if="show">这是一条提示信息</Ylert>
    <button @click="show = true">显示</button>
  </div>
</template>
<script>
  import Ylert from './../components/alert/alert.vue';

  export default {
    components: { Ylert },
    data () {
      return {
        show: false
      }
    }
  }
</script>
