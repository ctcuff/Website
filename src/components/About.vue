<template>
  <div class="content">
    <div class="content__image">
      <img src="../assets/images/profile-pixel.png" alt="" ref="profileImage" />
    </div>
    <div class="content__about">
      <section>
        <div class="content__wrapper">
          <h1 class="content__about-header">About Me</h1>
        </div>
        <div class="content__wrapper">
          <p class="content__about-text">
            I won't bore you with my life story so here's the jist: I'm a senior at UCF
            studying Computer Science. I currently work as a Web Applications Developer
            for the
            <a
              href="https://techrangers.cdl.ucf.edu/about.html"
              target="_blank"
              class="link content__link"
            >
              <mark>Center for Distributed Learning.</mark>
            </a>
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import { gsap } from 'gsap'

  const timeline = gsap.timeline({ paused: true })

  export default {
    beforeRouteLeave(to, from, next) {
      const aboutText = document.querySelectorAll(
        '.content__about-header, .content__about-text'
      )

      timeline
        .to(
          aboutText,
          {
            opacity: 0,
            ease: 'Power2.easeIn',
            duration: 1,
            y: '-100%',
            stagger: 0.2
          },
          0
        )
        .to(
          this.$refs.profileImage,
          {
            opacity: 0,
            scale: 0.9,
            duration: 1.5,
            delay: 0.2
          },
          0
        )
        .eventCallback('onComplete', () => next())
        .play(0)
    },
    mounted() {
      const aboutText = document.querySelectorAll(
        '.content__about-header, .content__about-text'
      )
      gsap.fromTo(
        aboutText,
        {
          opacity: 0,
          y: '100%'
        },
        {
          opacity: 1,
          duration: 1,
          y: '0%',
          stagger: 0.2
        }
      )
      gsap.fromTo(
        this.$refs.profileImage,
        {
          opacity: 0,
          scale: 0.9
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5
        }
      )
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/mixins/breakpoints';
  @import '../scss/mixins/height';

  $link-highlight-color: rgba(0, 0, 255, 0.2);

  .content {
    display: flex;
    flex-direction: column;
    height: 100vh;

    @include full-height;
    @include breakpoint(sm) {
      flex-direction: row;
    }
  }

  .content__image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 55%;
      height: auto;
      align-self: center;
      user-select: none;
      pointer-events: none;

      @include breakpoint(sm) {
        width: 70%;
      }

      @include breakpoint(lg) {
        width: 80%;
      }
    }
  }

  .content__about {
    flex: 1;
    display: flex;
    justify-content: center;

    @include breakpoint(sm) {
      align-items: center;
    }
  }

  .content__about-header {
    font-size: 2em;
    margin: 0;
    font-family: 'AvenirNextLTPro-Bold', monospace;

    @include breakpoint(lg) {
      font-size: 3em;
    }
  }

  // Utility class to give elements the effect
  // of coming out of a container when animating
  .content__wrapper {
    overflow: hidden;
  }

  section {
    margin: 0 15%;
  }

  p {
    font-size: 0.9em;
    line-height: 1.8em;

    @include breakpoint(md) {
      font-size: 1em;
    }
  }

  .content__link {
    text-decoration: none;
    color: black;

    mark {
      background-color: rgba(255, 0, 0, 0.15);
    }
  }
</style>
