<template>
  <div class="contact">
    <div>
      <div class="contact__row-wrapper">
        <div class="contact__row" data-link="https://github.com/ctcuff">
          <div class="circle--outer">
            <div class="circle--inner"></div>
          </div>
          <p class="contact__row__text contact__row__text--stroke">GitHub</p>
        </div>
      </div>

      <div class="contact__row-wrapper">
        <div
          class="contact__row"
          data-link="https://www.linkedin.com/in/cameron-cuff-126405161/"
        >
          <div class="circle--outer">
            <div class="circle--inner"></div>
          </div>
          <p class="contact__row__text contact__row__text--stroke">LinkedIn</p>
        </div>
      </div>

      <div class="contact__row-wrapper">
        <div class="contact__row" data-link="../cuff_resume.pdf">
          <div class="circle--outer">
            <div class="circle--inner"></div>
          </div>
          <p class="contact__row__text contact__row__text--stroke">Resume</p>
        </div>
      </div>

      <div class="contact__row-wrapper">
        <div class="contact__row" data-link="mailto:dev.ctcuff@gmail.com">
          <div class="circle--outer">
            <div class="circle--inner"></div>
          </div>
          <p class="contact__row__text contact__row__text--stroke">Email</p>
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
      animationStagger: 0.15
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
        .play()
    },
    mounted() {
      const rows = document.querySelectorAll('.contact__row')

      rows.forEach(row => {
        row.addEventListener('mouseenter', this.onRowMouseEnter)
        row.addEventListener('mouseleave', this.onRowMouseLeave)
        row.addEventListener('click', this.onRowItemClick)
      })

      this.mounted = true

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

        const rowElement = event.target
        const innerCircle = rowElement.children[0].firstElementChild
        const rowText = rowElement.children[1]

        gsap
          .to(innerCircle, {
            x: '0%',
            duration: 0.25
          })
          .eventCallback('onStart', () => {
            rowText.classList.remove('contact__row__text--stroke')
          })
      },
      onRowMouseLeave(event) {
        if (!this.mounted) {
          return
        }

        const rowElement = event.target
        const innerCircle = rowElement.children[0].firstElementChild
        const rowText = rowElement.children[1]

        gsap
          .to(innerCircle, {
            x: '-150%',
            duration: 0.5,
            ease: 'Power2.easeIn'
          })
          .eventCallback('onStart', () => {
            rowText.classList.add('contact__row__text--stroke')
          })
      },
      onRowItemClick(event) {
        window.open(event.target.dataset.link, '_blank')
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

  .contact__row__text {
    font-size: 2.5em;
    font-family: 'Avenir';
    font-weight: bold;
    margin: 0;

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

  .contact__row__text--stroke {
    @supports (-webkit-text-stroke: 1px black) {
      -webkit-text-stroke: 1px black;
      -webkit-text-fill-color: white;
    }
  }

  // Prevents these elements from becoming the
  // target element when a contact__row item is
  // clicked or hovered
  .circle--inner,
  .circle--outer,
  .contact__row__text {
    pointer-events: none;
  }
</style>
