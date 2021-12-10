<template>
  <div class="container">
    <div class="name-container no-overflow">
      <h1 class="name">Cameron Cuff</h1>
    </div>
    <div class="tagline no-overflow">
      <p class="tagline__text">&lt;Software Engineer /&gt;</p>
    </div>
    <div class="links">
      <div class="link-container no-overflow">
        <router-link to="/about" class="link">About</router-link>
      </div>
      <div class="link-container no-overflow">
        <router-link to="/projects" class="link">Projects</router-link>
      </div>
      <div class="link-container no-overflow">
        <router-link to="/contact" class="link">contact</router-link>
      </div>
    </div>
    <Curtain text="Welcome to my portfolio." />
    <Curtain text="Hello." />
    <!--
      The blank curtain renders behind the about section transition curtain
      so it can hide the main content with the about section transition curtain
      slides upwards.
     -->
    <Curtain class="blank-curtain transition-curtain" />
    <Curtain :text="transitionCurtainText" class="about-curtain transition-curtain" />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import gsap from 'gsap'
  import Curtain from '../components/Curtain.vue'
  import { NavigationGuardNext, Route } from 'vue-router'

  @Component({
    components: {
      Curtain
    }
  })
  export default class Home extends Vue {
    private transitionCurtainText = ''

    beforeRouteLeave(to: Route, from: Route, next: NavigationGuardNext) {
      const duration = 1.1
      const timelinePositionModifier = 0.3
      const toPath = to.path.replace('/', '')

      this.transitionCurtainText = `This s the ${toPath} section.`

      gsap
        .timeline()
        .fromTo(
          '.about-curtain, .blank-curtain',
          {
            y: '-100%'
          },
          {
            y: '0%',
            duration,
            ease: 'expo.out'
          },
          0
        )
        .fromTo(
          '.about-curtain .curtain__inner',
          {
            y: '100%'
          },
          {
            y: '0%',
            duration,
            ease: 'expo.out'
          },
          0
        )
        .to(
          '.about-curtain',
          {
            y: '100%',
            duration,
            ease: 'expo.out'
          },
          duration + timelinePositionModifier
        )
        .to(
          '.about-curtain .curtain__inner',
          {
            y: '-100%',
            duration,
            ease: 'expo.out'
          },
          duration + timelinePositionModifier
        )
        .eventCallback('onComplete', () => next())
    }

    beforeRouteEnter(to: Route, from: Route, next: NavigationGuardNext) {
      // Slight hack: 'this' is undefined in beforeRouteEnter so we
      // can't set class variables. Instead we'll have to set data
      // on the global Vue instance to access it.
      next((vm: Vue) => {
        vm.$data.fromPath = from.path
      })
    }

    mounted() {
      const fromPath = this.$data.fromPath

      const animationOpts: gsap.TweenVars = {
        duration: 1,
        // Controls how long the first curtain shows
        delay: 1.5,
        // Controls how long other curtains show
        stagger: -2.5,
        ease: 'expo.out'
      }

      const curtainTimeline = gsap
        .timeline({ paused: true })
        .to(
          '.curtain:not(.transition-curtain)',
          {
            y: '-100%',
            ...animationOpts
          },
          0
        )
        .to(
          '.curtain:not(.transition-curtain) .curtain__inner',
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
            opacity: 0,
            y: '-100%'
          },
          {
            opacity: 1,
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

      // Only play the opening curtain transitions if the user
      // is visiting the site from the root route
      if (fromPath === '/') {
        curtainTimeline.play()
        textTimeline.play().delay(curtainTimeline.duration() - 0.5)
      } else {
        curtainTimeline.totalProgress(1).kill()
        textTimeline.play().delay(0.5)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/pages/home.scss';
</style>
