<template>
  <div class="contact">
    <div>
      <div v-for="link in links" :key="link.url">
        <div class="contact__row-wrapper">
          <div
            class="contact__row"
            @mouseenter="onRowMouseEnter"
            @mouseleave="onRowMouseLeave"
          >
            <div class="circle--outer">
              <div class="circle--inner"></div>
            </div>
            <a
              class="contact__link"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ link.text }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { gsap } from 'gsap'

  export default {
    data: () => ({
      mounted: false,
      textAnimationDuration: 1,
      animationStagger: 0.15,
      links: [
        {
          text: 'GitHub',
          url: 'https://github.com/ctcuff'
        },
        {
          text: 'LinkedIn',
          url: 'https://www.linkedin.com/in/cameron-cuff-126405161/'
        },
        {
          text: 'Resume',
          url: '../cuff_resume.pdf'
        },
        {
          text: 'Email',
          url: 'mailto:dev.ctcuff@gmail.com'
        }
      ]
    }),
    beforeRouteLeave(to, from, next) {
      this.mounted = false
      const rows = document.querySelectorAll('.contact__row')

      gsap
        .to(rows, {
          y: '-150%',
          stagger: this.animationStagger,
          duration: this.textAnimationDuration,
          ease: 'Power2.easeIn'
        })
        .eventCallback('onComplete', () => next())
    },
    mounted() {
      this.mounted = true
      const rows = document.querySelectorAll('.contact__row')

      gsap.fromTo(
        rows,
        {
          y: '150%'
        },
        {
          y: '0%',
          stagger: this.animationStagger,
          duration: this.textAnimationDuration
        }
      )
    },
    methods: {
      onRowMouseEnter(event) {
        // Prevents the hover animation when this component is exiting
        if (!this.mounted) {
          return
        }

        // Animates the inner circle
        gsap.to(event.target.children[0].firstElementChild, {
          x: '0%',
          duration: 0.25
        })
      },
      onRowMouseLeave(event) {
        if (!this.mounted) {
          return
        }
        gsap.to(event.target.children[0].firstElementChild, {
          x: '-150%',
          duration: 0.5,
          ease: 'Power2.easeIn'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/mixins/breakpoints';

  .contact {
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;
    position: absolute;
    align-items: center;
  }

  .contact__row {
    display: flex;
    align-items: center;
    margin: 0.5em 0;

    @supports (-webkit-text-stroke: 1px black) {
      &:hover {
        .contact__link {
          color: black;
        }
      }
    }
  }

  .circle--outer {
    width: 2em;
    height: 2em;
    border: 1px solid black;
    border-radius: 50%;
    margin-right: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    // Prevents the inner circle from clipping
    // the outer circle's bounds in Safari
    z-index: 1;

    @include breakpoint(md) {
      width: 2.5em;
      height: 2.5em;
    }
  }

  .circle--inner {
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    background-color: black;
    transform: translatex(-150%);

    @include breakpoint(md) {
      width: 2em;
      height: 2em;
    }
  }

  .contact__row-wrapper {
    overflow: hidden;
  }

  .contact__link {
    font-size: 2.5em;
    font-family: 'AvenirNextLTPro-Bold';
    margin: 0;
    color: black;
    text-decoration: none;

    @supports (-webkit-text-stroke: 1px black) {
      -webkit-text-stroke: 1px black;
      transition: color 0.5s ease-in-out;
      color: transparent;
      text-decoration: none;
    }

    @include breakpoint(sm) {
      font-size: 2.3em;
    }

    @include breakpoint(md) {
      font-size: 2.3em;
    }

    @include breakpoint(lg) {
      font-size: 4em;
    }
  }
</style>
