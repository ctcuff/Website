<template>
  <div class="content">
    <h1 class="content__text content__text--name no-overflow" data-splitting>
      Cameron Cuff
    </h1>
    <div class="no-overflow">
      <p class="content__text" ref="message">
        I make things sometimes.
      </p>
    </div>
    <router-link to="/contact" class="content__link" ref="contactLink">
      Contact
    </router-link>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import splitting from 'splitting'
  import { gsap } from 'gsap'
  import Component from 'vue-class-component'
  import { NavigationGuardNext, Route } from 'vue-router'

  @Component
  export default class Home extends Vue {
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
            ease: 'power2.in',
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
            ease: 'power2.in',
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
            ease: 'power2.in'
          },
          0
        )
        .eventCallback('onComplete', () => next())
    }

    mounted() {
      splitting()
      const text = document.querySelectorAll('.content__text .word > .char')

      gsap
        .timeline()
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
            ease: 'power2.out'
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
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/components/home';
</style>
