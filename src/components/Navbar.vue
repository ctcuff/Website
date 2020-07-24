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
  @import '../scss/mixins/breakpoints';
  @import '../scss/mixins/debug';
  @import '../scss/mixins/fonts';

  nav {
    position: absolute;
    display: grid;
    width: 100%;
    margin-top: 1em;
    grid-template-columns: 1fr 2fr 1fr;
    justify-items: center;
    z-index: 2;
    font-size: 0.8em;

    @include breakpoint(lg) {
      font-size: 1em;
      margin-top: 3em;
    }
  }

  .navbar__link {
    text-decoration: none;
    color: black;

    @include font('AvenirNext');
  }
</style>
