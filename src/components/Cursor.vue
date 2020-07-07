<template>
  <div>
    <div class="cursor cursor--inner" ref="innerCursor"></div>
    <div class="cursor cursor--outer" ref="outerCursor"></div>
  </div>
</template>

<script>
  import { gsap } from 'gsap'

  export default {
    name: 'CustomCursor',
    data() {
      return {
        // Sets the starting position of the cursor
        // to outside the screen
        clientX: -100,
        clientY: -100,
        isOnLink: false
      }
    },
    mounted() {
      this.initCursor()
      this.initLinkAnimation()
    },
    watch: {
      $route() {
        // Need to grab all links on the page again
        // since changing routes introduces new links
        this.initLinkAnimation()
      }
    },
    methods: {
      onLinkHover() {
        gsap.to(this.$refs.outerCursor, {
          scale: 3,
          ease: 'back'
        })
      },

      onLinkLeave() {
        gsap.to(this.$refs.outerCursor, { scale: 1 })
      },

      initCursor() {
        const innerCursor = document.querySelectorAll('.cursor--inner')
        const outterCursor = document.querySelectorAll('.cursor--outer')

        document.addEventListener('mousemove', event => {
          this.clientX = event.clientX
          this.clientY = event.clientY
        })

        const render = () => {
          gsap.set(innerCursor, {
            x: this.clientX,
            y: this.clientY
          })

          gsap.to(outterCursor, {
            x: this.clientX,
            y: this.clientY,
            duration: 0.5
          })

          requestAnimationFrame(render)
        }
        requestAnimationFrame(render)
      },

      initLinkAnimation() {
        const links = document.querySelectorAll('.cursor__link')
        links.forEach(link => {
          link.removeEventListener('mouseenter', this.onLinkHover)
          link.removeEventListener('mouseleave', this.onLinkLeave)
        })
        links.forEach(link => {
          link.addEventListener('mouseenter', this.onLinkHover)
          link.addEventListener('mouseleave', this.onLinkLeave)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/mixins/breakpoints';

  $inner-size: 6px;
  $outer-size: 20px;

  .cursor {
    position: fixed;
    left: 0;
    top: 0;
    pointer-events: none;
    z-index: 100;
    border-radius: 50%;
    visibility: hidden;

    @include breakpoint(lg) {
      visibility: visible;
    }
  }

  .cursor--inner {
    left: calc(#{-$inner-size} / 2);
    top: calc(#{-$inner-size} / 2);
    background: rgba(0, 0, 0, 0.6);
    width: $inner-size;
    height: $inner-size;
  }

  .cursor--outer {
    left: calc(#{-$outer-size} / 2);
    top: calc(#{-$outer-size} / 2);
    background: rgba(0, 0, 0, 0.2);
    width: $outer-size;
    height: $outer-size;
  }
</style>
