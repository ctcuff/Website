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

<script lang="ts">
  import { gsap } from 'gsap'
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { NavigationGuardNext, Route } from 'vue-router'

  type Link = {
    text: string
    url: string
  }

  @Component
  export default class Contact extends Vue {
    textAnimationDuration = 0.8
    animationStagger = 0.1
    links: Link[] = [
      {
        text: 'GitHub',
        url: 'https://github.com/ctcuff'
      },
      {
        text: 'LinkedIn',
        url: 'https://www.linkedin.com/in/~cameron/'
      },
      {
        text: 'Resume',
        url: '../cameron_cuff_resume.pdf'
      },
      {
        text: 'Email',
        url: 'mailto:dev.ctcuff@gmail.com'
      }
    ]

    beforeRouteLeave(_to: Route, _from: Route, next: NavigationGuardNext) {
      const rows = document.querySelectorAll('.contact__row')

      gsap
        .to(rows, {
          y: '150%',
          stagger: -this.animationStagger,
          duration: this.textAnimationDuration,
          ease: 'power2.in'
        })
        .eventCallback('onComplete', () => next())
    }

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
