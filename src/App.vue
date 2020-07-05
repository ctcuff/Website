<template>
  <div class="app">
    <CustomCursor />
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar'
  import CustomCursor from '@/components/Cursor'
  import debounce from '@/util/debounce'

  export default {
    components: {
      Navbar,
      CustomCursor
    },
    mounted() {
      this.updateViewport()
      window.addEventListener('resize', debounce(this.updateViewport, 250))
    },
    destroyed() {
      window.removeEventListener('resize', this.updateViewport)
    },
    methods: {
      updateViewport() {
        // Updats the --vh variable used in the height mixin
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app {
    cursor: none;
  }
</style>
