<template>
  <div class="content">
    <section class="content__item">
      <p class="content__text content__text--name" data-splitting>Cameron Cuff</p>
      <p class="content__text content__text--message">
        I make things sometimes.
      </p>
    </section>
    <router-link
      to="/contact"
      class="content__text--contact cursor__link"
      ref="contactLink"
    >
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
  @import '../scss/mixins/height';

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    flex-direction: column;

    @include full-height;
  }

  .content__text {
    margin: 0;
    overflow: hidden;
    width: 100%;
  }

  .content__text--name {
    text-align: start;
    font-size: 9vw;
  }

  .content__text--message {
    text-align: center;
    font-style: italic;
  }

  .content__text--contact {
    font-weight: bold;
    position: absolute;
    text-align: center;
    bottom: 0;
    margin-bottom: 1em;
    color: black;
    text-decoration: none;
  }

  .content__item {
    margin: 0 4.3em;
  }
</style>
