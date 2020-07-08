<template>
  <div>
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar'
  import debounce from '@/util/debounce'

  export default {
    components: {
      Navbar
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
        // Updates the --vh variable used in the height mixin
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      }
    }
  }
</script>
