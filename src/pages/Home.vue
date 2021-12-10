<template>
  <div class="container">
    <div class="name-container no-overflow">
      <h1 class="name">Cameron Cuff</h1>
    </div>
    <div class="tagline no-overflow">
      <p class="tagline__text">Software Engineer</p>
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

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import gsap from 'gsap'
  import Curtain from '../components/Curtain.vue'

  @Component({
    components: {
      Curtain
    }
  })
  export default class Home extends Vue {
    mounted() {
      const animationOpts: gsap.TweenVars = {
        duration: 1,
        // Controls how long the first curtain shows
        delay: 1.2,
        // Controls how long other curtains show
        stagger: -2.7,
        ease: 'expo.out'
      }

      const curtainTimeline = gsap
        .timeline({ paused: true })
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

      const textTimeline = gsap
        .timeline({ paused: true })
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
          },
          0
        )
        .fromTo(
          '.name',
          {
            y: '-100%'
          },
          {
            y: '0%',
            ease: 'expo.out',
            duration: 2
          },
          0
        )
        .fromTo(
          '.tagline__text',
          {
            y: '100%',
            opacity: 0
          },
          {
            y: '0%',
            opacity: 1,
            ease: 'expo.out',
            duration: 2
          },
          0.8
        )

      curtainTimeline.play()
      textTimeline.play().delay(curtainTimeline.duration() - 0.5)
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/pages/home.scss';
</style>
