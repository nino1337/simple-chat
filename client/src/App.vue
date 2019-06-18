<template>
  <div id="app">

  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      socket: ''
    }
  },
  created() {
    const vm = this;

    vm.socket = /8080/.test(window.location.port) ? io.connect('localhost:6006') : io();
  }
};
</script>

<style lang="scss">

</style>
