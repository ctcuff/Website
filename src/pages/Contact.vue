<template>
  <div>
    <div class="container">
      <router-link
        class="close-btn"
        tag="button"
        to="/"
        :class="{ hovered: isButtonCovered }"
      >
        <svg viewBox="0 0 16 16">
          <line x1="1" y1="1" x2="15" y2="15" />
          <line x1="15" y1="1" x2="1" y2="15" />
        </svg>
      </router-link>
      <div class="text-container" v-for="(link, index) in links" :key="link.title">
        <a
          class="link"
          target="_blank"
          rel="noopener noreferrer"
          @mouseenter="onMouseEnter"
          @mouseleave="onMouseLeave"
          :href="link.href"
          :data-hover-enabled="isAnimationFinished"
          :data-index="index"
        >
          {{ link.title }}
        </a>
        <div class="curtain curtain--left"></div>
        <div class="curtain curtain--right"></div>
        <div class="curtain curtain--bottom"></div>
      </div>
    </div>
    <div
      class="grid-line"
      v-for="(_, index) in gridLines"
      :key="index"
      :data-index="index"
    />
  </div>
</template>

<script>
  import gsap from 'gsap'

  export default {
    data() {
      return {
        gridLines: 3,
        isAnimationFinished: false,
        isButtonCovered: false,
        links: [
          {
            title: 'GitHub',
            href: 'https://github.com/ctcuff'
          },
          {
            title: 'LinkedIn',
            href: 'https://linkedin.com/in/~cameron/'
          },
          {
            title: 'Resume',
            href: '../cameron_cuff_resume.pdf'
          },
          {
            title: 'Email',
            href: 'mailto:dev.ctcuff@gmail.com'
          }
        ]
      }
    },
    methods: {
      onMouseEnter({ target }) {
        if (!this.isAnimationFinished) {
          return
        }

        const curtains = target.parentElement.querySelectorAll(
          '.curtain:not(.curtain--bottom)'
        )

        gsap.to(curtains, {
          scaleX: 0.5,
          duration: 0.6,
          ease: 'expo.out'
        })

        if (parseInt(target.dataset.index) === this.links.length - 1) {
          this.isButtonCovered = true
        }
      },
      onMouseLeave({ target }) {
        if (!this.isAnimationFinished) {
          return
        }

        const curtains = target.parentElement.querySelectorAll(
          '.curtain:not(.curtain--bottom)'
        )

        gsap
          .to(curtains, {
            scaleX: 0,
            duration: 0.6,
            ease: 'expo.out'
          })
          .eventCallback('onStart', () => (this.isButtonCovered = false))
      }
    },
    mounted() {
      gsap
        .timeline()
        .fromTo(
          '.grid-line',
          {
            scaleY: 0
          },
          {
            scaleY: 1,
            stagger: 0.3,
            duration: 1.3,
            ease: 'expo.out'
          }
        )
        .fromTo(
          '.link',
          {
            rotate: '180deg',
            translateX: '25%',
            opacity: 0
          },
          {
            rotate: '180deg',
            translateX: '0%',
            stagger: 0.2,
            duration: 1,
            opacity: 1
          },
          0.5
        )
        .add(() => (this.isAnimationFinished = true), 1.5)
        .fromTo(
          '.close-btn',
          {
            opacity: 0,
            translateY: '-50%'
          },
          {
            opacity: 1,
            translateY: '0%',
            duration: 1
          },
          1
        )
    },

    beforeRouteLeave(to, from, next) {
      gsap
        .timeline()
        .to('.curtain--bottom', {
          scaleY: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out'
        })
        .set(['.link', '.close-btn', '.grid-line'], { opacity: 0 })
        .set('.curtain--bottom', { transformOrigin: 'top' })
        .to('.curtain--bottom', {
          scaleY: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out'
        })
        .eventCallback('onComplete', next)
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/contact.scss';
</style>
