<template>
  <div class="contact">
    <div>
      <div v-for="link in links" :key="link.url">
        <div class="no-overflow">
          <div class="contact__row">
            <div class="circle--outer no-overflow">
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
      textAnimationDuration: 0.8,
      animationStagger: 0.1,
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
      const rows = document.querySelectorAll('.contact__row')

      gsap
        .to(rows, {
          y: '150%',
          stagger: -this.animationStagger,
          duration: this.textAnimationDuration,
          ease: 'power2.in'
        })
        .eventCallback('onComplete', () => next())
    },
    mounted() {
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
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/components/contact';
</style>
