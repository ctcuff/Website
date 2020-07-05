<template>
  <div>
    <div class="cursor cursor--inner" ref="innerCursor"></div>
    <div class="cursor cursor--outter" ref="outterCursor"></div>
  </div>
</template>

<script>
  import gsap from 'gsap'

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
        gsap.to(this.$refs.outterCursor, {
          scale: 3,
          ease: 'back'
        })
      },

      onLinkLeave() {
        gsap.to(this.$refs.outterCursor, { scale: 1 })
      },

      initCursor() {
        const innerCursor = document.querySelectorAll('.cursor--inner')
        const outterCursor = document.querySelectorAll('.cursor--outter')

        document.addEventListener('mousemove', event => {
          this.clientX = event.clientX
          this.clientY = event.clientY
        })

        const render = () => {
          gsap.set(innerCursor, {
            x: this.clientX,
            y: this.clientY
          })

          gsap.to(outterCursor, 0.5, {
            x: this.clientX,
            y: this.clientY
          })

          requestAnimationFrame(render)
        }
        requestAnimationFrame(render)
      },

      initLinkAnimation() {
        const links = document.querySelectorAll('.link--no-cursor')
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
  $outter-size: 20px;

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

  .cursor--outter {
    left: calc(#{-$outter-size} / 2);
    top: calc(#{-$outter-size} / 2);
    background: rgba(0, 0, 0, 0.2);
    width: $outter-size;
    height: $outter-size;
  }
</style>
