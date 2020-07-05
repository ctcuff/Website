<template>
  <nav ref="navbar">
    <router-link to="/projects" class="link navbar__link navbar__link--bold link">
      <span>Projects</span>
    </router-link>
    <router-link to="/" class="link navbar__link">Welcome to my portfolio</router-link>
    <router-link to="/about" class="link navbar__link navbar__link--bold link">
      <span>About</span>
    </router-link>
  </nav>
</template>

<script>
  import gsap from 'gsap'

  const timeline = gsap.timeline({ paused: true })

  export default {
    mounted() {
      timeline
        .fromTo(
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
        .play()
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/mixins/breakpoints';
  @import '../scss/mixins/debug';

  nav {
    position: absolute;
    display: grid;
    width: 100%;
    margin-top: 1em;
    grid-template-columns: 1fr 2fr 1fr;
    justify-items: center;
    z-index: 2;

    @include breakpoint(lg) {
      margin-top: 3em;
    }
  }

  // .navbar__title {
  //   cursor: pointer;
  // }

  .navbar__link {
    text-decoration: none;
    color: black;
  }

  .navbar__link--bold {
    font-weight: bold;
  }

  .nav__link--animate {
    position: relative;
  }

  .nav__link--animate::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #000;
    transform-origin: center right;
    transform: scaleX(0) translateY(-50%);
    transition: transform 0.3s ease;
  }

  .nav__link--animate:hover::before {
    transform-origin: center left;
    transform: scaleX(1) translateY(-50%);
  }
</style>
