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
    <Curtain :text="transitionCurtainText" class="about-curtain transition-curtain" />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import gsap, { Expo } from 'gsap'
  import Curtain from '../components/Curtain.vue'
  import { NavigationGuardNext, Route } from 'vue-router'
  import { Mutation, State } from 'vuex-class'
  import { RouterState } from '@/route-store'

  @Component({
    components: {
      Curtain
    }
  })
  export default class Home extends Vue {
    @State private fromPath!: RouterState['fromPath']
    @Mutation private setFromPath!: (route: RouterState['fromPath']) => void
    private transitionCurtainText = ''

    beforeRouteLeave(to: Route, from: Route, next: NavigationGuardNext) {
      const duration = 1.1
      const toPath = to.path.replace('/', '')

      this.transitionCurtainText = `This is the ${toPath} section.`

      gsap
        .timeline()
        .fromTo(
          '.about-curtain',
          {
            y: '-100%'
          },
          {
            y: '0%',
            duration,
            ease: Expo.easeOut
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
            ease: Expo.easeOut
          },
          0
        )
        .eventCallback('onComplete', () => {
          this.setFromPath('home')
          next()
        })
    }

    mounted() {
      const animationOpts: gsap.TweenVars = {
        duration: 1,
        // Controls how long the first curtain shows
        delay: 1.5,
        // Controls how long other curtains show
        stagger: -2.5,
        ease: Expo.easeOut
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
            ease: Expo.easeOut,
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
            ease: Expo.easeOut,
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
            ease: Expo.easeOut,
            duration: 2
          },
          0.8
        )

      // Only play the opening curtain transitions if the user
      // is visiting the site from the root route
      if (!this.fromPath || this.fromPath === 'home') {
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
