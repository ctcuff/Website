<template>
  <router-view></router-view>
</template>

<script>
  export default {
    beforeRouteLeave(to, from, next) {
      // eslint-disable-next-line no-console
      console.log('LEAVING')
      next()
    }
  }
</script>
