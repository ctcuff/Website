<template>
  <div class="content">
    <section class="content__item">
      <p class="content__text content__text--name" data-splitting>Cameron Cuff</p>
      <p class="content__text content__text--message">
        I make things sometimes.
      </p>
    </section>
    <router-link to="/contact" class="content__text--contact" ref="contactLink">
      Contact
    </router-link>
  </div>
</template>

<script>
  import { gsap } from 'gsap'
  import Splitting from 'splitting'

  export default {
    data: () => ({
      animationDuration: 1,
      animationStagger: 0.03
    }),
    beforeRouteLeave(to, from, next) {
      const text = document.querySelectorAll(
        '.content__text .word > .char, .content__text--message'
      )
      gsap
        .timeline()
        .to(
          text,
          {
            opacity: 0,
            duration: this.animationDuration,
            ease: 'Power2.easeIn',
            y: '-150%',
            stagger: this.animationStagger
          },
          0
        )
        .to(
          this.$refs.contactLink.$el,
          {
            opacity: 0,
            duration: this.animationDuration,
            y: '150%',
            ease: 'Power2.easeIn'
          },
          0
        )
        .eventCallback('onComplete', () => next())
        .play()
    },
    mounted() {
      Splitting()
      const text = document.querySelectorAll(
        '.content__text .word > .char, .content__text--message'
      )

      gsap.fromTo(
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
        }
      )

      gsap.fromTo(
        this.$refs.contactLink.$el,
        {
          opacity: 0,
          y: '150%'
        },
        {
          opacity: 1,
          y: '0%',
          duration: this.animationDuration
        }
      )
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/components/home';
</style>
