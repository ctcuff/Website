<template>
  <div>
    <Sidebar />
    <div id="wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Sidebar from '@/components/Sidebar';

  export default {
    components: {
      Sidebar
    }
  };
</script>

<style lang="scss" scoped>
  @import 'assets/scss/sidebar';

  #wrapper {
    margin-left: $sidebar-width;
  }
</style>