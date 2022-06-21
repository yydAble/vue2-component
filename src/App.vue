<template>
  <div id="app">
    <ul>
      <li>
        <router-link to="/form">一：Form</router-link>
      </li>
       <li>
        <router-link to="/checkbox">二：CheckBox</router-link>
      </li>
        <li>
        <router-link to="/display">三：Display</router-link>
      </li>
        <li>
        <router-link to="/alert">四：Alert</router-link>
      </li>
    </ul>
    <hr>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
  ul{
    list-style: none;
    display: flex;
    justify-content:space-around;
  }
</style>
