<template>
  <div class="content">
    <section class="content__item">
      <p class="content__text content__text--name" data-splitting>Cameron Cuff</p>
      <p class="content__text content__text--message">
        I make things sometimes.
      </p>
    </section>
  </div>
</template>

<script>
  import { gsap } from 'gsap'
  import Splitting from 'splitting'

  export default {
    beforeRouteLeave(to, from, next) {
      const text = document.querySelectorAll(
        '.content__text .word > .char, .content__text--message'
      )
      gsap
        .to(text, {
          opacity: 0,
          duration: 1,
          ease: 'Power2.easeIn',
          y: '-150%',
          stagger: 0.03
        })
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
          duration: 1.2,
          y: '0%',
          stagger: 0.03
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

  .content__item {
    margin: 0 4.3em;
  }
</style>
