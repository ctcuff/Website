<template>
  <div class="container">
    <div class="name-container">
      <h1 class="name">Cameron Cuff</h1>
    </div>
    <div class="links">
      <div class="link-container no-overflow">
        <h2 class="link">About</h2>
      </div>
      <div class="link-container no-overflow">
        <h2 class="link">Projects</h2>
      </div>
      <div class="link-container no-overflow">
        <h2 class="link">Contact</h2>
      </div>
    </div>
    <Curtain text="Welcome to my portfolio." />
    <Curtain text="Hello." />
  </div>
</template>

<script>
  import gsap from 'gsap'
  import Curtain from '../components/Curtain.vue'

  export default {
    components: {
      Curtain
    },
    mounted() {
      const animationOpts = {
        duration: 1,
        stagger: -2,
        delay: 2,
        ease: 'expo.out'
      }

      gsap
        .timeline()
        .to(
          '.curtain',
          {
            y: '-100%',
            ...animationOpts
          },
          0
        )
        .to(
          '.curtain__inner',
          {
            y: '100%',
            ...animationOpts
          },
          0
        )
        .fromTo(
          '.link',
          {
            y: '100%'
          },
          {
            y: '0%',
            ease: 'expo.out',
            duration: 2,
            stagger: 0.2
          }
        )
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/pages/home.scss';
</style>
