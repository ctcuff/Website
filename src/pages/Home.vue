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
    <Curtain text="Hello." class="start-curtain" />
    <Curtain :text="transitionText" class="transition-curtain" />
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
    @State private transitionText!: RouterState['transitionText']
    @Mutation private setFromPath!: (route: RouterState['fromPath']) => void
    @Mutation private setTransitionText!: (route: RouterState['transitionText']) => void

    beforeRouteLeave(to: Route, from: Route, next: NavigationGuardNext) {
      const duration = 1.1

      switch (to.path) {
        case '/about':
          this.setTransitionText('The about section.')
          break
        case '/projects':
          this.setTransitionText('So you wanna see some code?')
          break
        case '/contact':
          this.setTransitionText('The contact section.')
          break
        default:
          throw new Error(`Unregistered route transition ${to.path}`)
      }

      gsap
        .timeline()
        .fromTo(
          '.transition-curtain',
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
        .fromTo(
          '.transition-curtain .curtain__inner',
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
        // Slight hack to delay the timeline for a bit
        .to({}, { duration: 0.35 })
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
        stagger: -2.2,
        ease: Expo.easeOut
      }

      const curtainTimeline = gsap
        .timeline({ paused: true })
        .fromTo(
          '.start-curtain .curtain__text',
          {
            opacity: 0
          },
          {
            opacity: 1,
            duration: 1.2,
            delay: 0.5
          }
        )
        .to(
          '.curtain:not(.transition-curtain)',
          {
            y: '-100%',
            ...animationOpts
          },
          0.5
        )
        .to(
          '.curtain:not(.transition-curtain) .curtain__inner',
          {
            y: '100%',
            ...animationOpts
          },
          0.5
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
        textTimeline.play().delay(0.2)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/pages/home.scss';
</style>
