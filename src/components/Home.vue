<template>
  <div class="content">
    <h1 class="content__text content__text--name no-overflow" data-splitting>
      Cameron Cuff
    </h1>
    <div class="no-overflow">
      <p class="content__text" ref="message">
        I write code sometimes.
      </p>
    </div>
    <router-link to="/contact" class="content__link" ref="contactLink">
      Contact
    </router-link>
    <Curtain text="Welcome to my portfolio." v-if="!isLandingAnimationFinished" />
    <Curtain text="Hello." class="start-curtain" v-if="!isLandingAnimationFinished" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import splitting from 'splitting'
  import { gsap, Expo, Power2 } from 'gsap'
  import Component from 'vue-class-component'
  import { Mutation, State } from 'vuex-class'
  import { NavigationGuardNext, Route } from 'vue-router'
  import Curtain from '@/components/Curtain.vue'

  @Component({
    components: {
      Curtain
    }
  })
  export default class Home extends Vue {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Mutation setLandingAnimationFinished!: (finished: boolean) => void
    @State isLandingAnimationFinished!: boolean

    $refs!: {
      contactLink: Vue
      message: HTMLParagraphElement
    }

    animationDuration = 1
    animationStagger = 0.06

    beforeRouteLeave(_to: Route, _from: Route, next: NavigationGuardNext) {
      const text = document.querySelectorAll('.content__text .word > .char')

      gsap
        .timeline()
        .to(
          text,
          {
            opacity: 0,
            duration: this.animationDuration,
            ease: Power2.easeIn,
            y: '-150%',
            stagger: this.animationStagger
          },
          0
        )
        .to(
          this.$refs.message,
          {
            opacity: 0,
            duration: this.animationDuration,
            ease: Power2.easeIn,
            y: '100%'
          },
          0
        )
        .to(
          this.$refs.contactLink.$el,
          {
            opacity: 0,
            duration: this.animationDuration,
            y: '150%',
            ease: Power2.easeIn
          },
          0
        )
        .eventCallback('onComplete', () => next())
    }

    mounted() {
      splitting()
      const text = document.querySelectorAll('.content__text .word > .char')

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
        .fromTo(
          '.start-curtain .curtain__text',
          {
            y: '20%',
            opacity: 0
          },
          {
            y: '0%',
            opacity: 1,
            duration: 1.5,
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

      const homepageTimeline = gsap
        .timeline({ paused: true })
        .fromTo(
          text,
          {
            opacity: 0,
            y: '-100%'
          },
          {
            opacity: 1,
            duration: this.animationDuration,
            y: '0%',
            stagger: this.animationStagger
          },
          0
        )
        .fromTo(
          this.$refs.message,
          {
            opacity: 0,
            y: '100%'
          },
          {
            opacity: 1,
            duration: this.animationDuration,
            y: '0%',
            ease: Power2.easeOut
          },
          0.5
        )
        .fromTo(
          this.$refs.contactLink.$el,
          {
            opacity: 0,
            y: '150%'
          },
          {
            opacity: 1,
            y: '0%',
            duration: this.animationDuration
          },
          0
        )

      if (!this.isLandingAnimationFinished) {
        curtainTimeline
          .delay(2)
          .play()
          .then(() => {
            this.setLandingAnimationFinished(true)
            homepageTimeline.play()
          })
      } else {
        homepageTimeline.play()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/components/home';
</style>
