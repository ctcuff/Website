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
          y: '150%',
          stagger: -this.animationStagger,
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
  @import '../scss/components/contact';
</style>
