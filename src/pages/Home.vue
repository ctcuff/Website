<template>
  <div class="container">
    <div class="heading-container first-name">
      <h1>Cameron</h1>
      <div class="curtain" />
    </div>
    <div class="heading-container last-name" :data-hover-enabled="isAnimationFinished">
      <h1>Cuff</h1>
      <div class="curtain" />
    </div>
    <router-link
      tag="div"
      to="/about"
      class="text-container about"
      :data-hover-enabled="isAnimationFinished"
    >
      <div class="no-overflow">
        <p class="text">About</p>
        <p class="text-secondary">About</p>
      </div>
      <div class="curtain" />
    </router-link>
    <router-link
      tag="div"
      to="/projects"
      class="text-container projects"
      :data-hover-enabled="isAnimationFinished"
    >
      <div class="no-overflow">
        <p class="text">Projects</p>
        <p class="text-secondary">Projects</p>
      </div>
      <div class="curtain" />
    </router-link>
    <router-link
      tag="div"
      to="/contact"
      class="text-container contacts"
      :data-hover-enabled="isAnimationFinished"
    >
      <div class="no-overflow">
        <p class="text">Contact</p>
        <p class="text-secondary">Contact</p>
      </div>
      <div class="curtain" />
    </router-link>
    <div class="text-container welcome-message">
      <p>Welcome to my portfolio <span class="emoji">&#128075;</span></p>
    </div>
    <div class="grid-line" data-top />
    <div class="grid-line" data-bottom />
    <div class="grid-line" data-right />
  </div>
</template>

<script>
  import gsap from 'gsap'

  export default {
    data() {
      return {
        isAnimationFinished: false
      }
    },

    mounted() {
      const lineDuration = 1.5
      const curtainDuration = 0.7

      gsap
        .timeline({ delay: 0.4 })
        .to(['[data-top]', '[data-bottom]'], {
          scaleX: 1,
          duration: lineDuration,
          ease: 'expo.out'
        })
        .to(
          '[data-right]',
          {
            scaleY: 1,
            duration: lineDuration,
            ease: 'expo.out'
          },
          0
        )

      gsap.set(['.first-name > h1', '.last-name > h1'], { opacity: 0 })

      gsap
        .timeline({ delay: lineDuration - 0.4 })
        .fromTo(
          '.first-name > .curtain',
          {
            translateY: '-100%'
          },
          {
            translateY: '0%',
            duration: curtainDuration,
            ease: 'expo.out'
          }
        )
        .add(() => gsap.set('.first-name > h1', { opacity: 1 }))
        .to('.first-name > .curtain', {
          translateY: '100%',
          duration: curtainDuration,
          ease: 'expo.out'
        })
        .fromTo(
          '.last-name > .curtain',
          {
            translateY: '100%'
          },
          {
            translateY: '0%',
            duration: curtainDuration,
            ease: 'expo.out'
          },
          0
        )
        .add(() => gsap.set('.last-name > h1', { opacity: 1 }), curtainDuration)
        .to(
          '.last-name > .curtain',
          {
            translateY: '-100%',
            duration: curtainDuration,
            ease: 'expo.out'
          },
          curtainDuration
        )

      gsap
        .timeline()
        .fromTo(
          ['.text-container > div > p:not(.text-secondary)', '.welcome-message > p'],
          {
            translateY: '100%',
            opacity: 0
          },
          {
            translateY: '0%',
            opacity: 1,
            ease: 'expo.out',
            duration: 1.6,
            stagger: 0.2,
            delay: curtainDuration + 1.2
          }
        )
        .add(() => (this.isAnimationFinished = true), curtainDuration + 1)
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/home.scss';
</style>
