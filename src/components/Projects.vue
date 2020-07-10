<template>
  <div class="projects">
    <p data-splitting>My</p>
    <p data-splitting>Projects</p>
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
      const words = document.querySelectorAll('.char')

      gsap
        .to(words, {
          y: '-100%',
          opacity: 1,
          duration: this.animationDuration,
          stagger: this.animationStagger,
          ease: 'Power2.easeIn'
        })
        .eventCallback('onComplete', () => next())
    },
    mounted() {
      Splitting()
      const words = document.querySelectorAll('.char')

      gsap.fromTo(
        words,
        {
          opacity: 0,
          y: '100%'
        },
        {
          opacity: 1,
          y: '0%',
          stagger: this.animationStagger,
          duration: this.animationDuration
        }
      )
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/mixins/height';
  @import '../scss/mixins/fonts';

  .projects {
    font-size: 10vw;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-transform: uppercase;

    @include full-height;
  }

  p {
    margin: 0;
    cursor: default;
    user-select: none;
    overflow: hidden;

    @include font('Montserrat');
  }

  p:first-child {
    margin-right: 0.35em;
  }

  p:last-child {
    @supports (-webkit-text-stroke: 1px black) {
      -webkit-text-stroke: 1px black;
      transition: color 0.5s ease-in-out;
      color: transparent;
      text-decoration: none;
    }
  }
</style>
