<template>
  <nav ref="navbar">
    <router-link to="/projects" class="navbar__link">
      Projects
    </router-link>
    <router-link to="/" class="navbar__link">
      Welcome to my portfolio
    </router-link>
    <router-link to="/about" class="navbar__link">
      About
    </router-link>
  </nav>
</template>

<script>
  import { gsap } from 'gsap'

  export default {
    mounted() {
      gsap.fromTo(
        this.$refs.navbar,
        {
          opacity: 0,
          y: '-100%'
        },
        {
          opacity: 1,
          duration: 1,
          y: '0%'
        }
      )
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/components/navbar';
</style>
