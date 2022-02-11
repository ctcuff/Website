<template>
  <div class="root">
    <div class="item-container" v-for="link in links" :key="link.url">
      <a class="link" :href="link.url" target="_blank" rel="noopener noreferrer">
        {{ link.text }}
      </a>
      <div class="marquee">
        <div class="marquee__inner">
          <a
            class="marquee__link"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            v-for="index in 8"
            :key="index"
          >
            {{ link.text }}
          </a>
        </div>
      </div>
    </div>
    <Curtain class="blank-curtain" />
    <Curtain class="transition-curtain" />
    <Curtain :text="transitionText" class="contact-curtain" />
  </div>
</template>

<script lang="ts">
  import gsap, { Expo } from 'gsap'
  import { Component, Vue } from 'vue-property-decorator'
  import { NavigationGuardNext, Route } from 'vue-router'
  import Curtain from '../components/Curtain.vue'
  import { State, Mutation } from 'vuex-class'
  import { RouterState } from '../route-store'

  type Link = {
    text: string
    url: string
  }

  @Component({
    components: {
      Curtain
    }
  })
  export default class Contact extends Vue {
    @State private fromPath!: RouterState['fromPath']
    @State private transitionText!: RouterState['transitionText']
    @Mutation private setFromPath!: (route: RouterState['fromPath']) => void

    private links: Link[] = [
      {
        text: 'GitHub',
        url: 'https://github.com/ctcuff'
      },
      {
        text: 'LinkedIn',
        url: 'https://www.linkedin.com/in/~cam/'
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

    beforeRouteLeave(to: Route, from: Route, next: NavigationGuardNext) {
      gsap
        .timeline()
        .to('.transition-curtain, .blank-curtain', {
          y: '0%',
          duration: 1,
          ease: Expo.easeOut
        })
        .to('.transition-curtain', {
          y: '-100%',
          duration: 1,
          ease: Expo.easeOut
        })
        .eventCallback('onComplete', () => {
          this.setFromPath('contact')
          next()
        })
    }

    mounted() {
      const curtainTimeline = gsap
        .timeline({ paused: true })
        .to(
          '.contact-curtain',
          {
            y: '-100%',
            duration: 1.2,
            ease: Expo.easeOut
          },
          0
        )
        .to(
          '.contact-curtain .curtain__inner',
          {
            y: '100%',
            duration: 1.2,
            ease: Expo.easeOut
          },
          0
        )
        .fromTo(
          '.item-container > .link',
          {
            y: '100%'
          },
          {
            y: '0%',
            duration: 1.5,
            ease: Expo.easeOut,
            stagger: 0.1
          },
          0.5
        )

      if (!this.fromPath) {
        curtainTimeline.totalProgress(1).kill()
      } else {
        curtainTimeline.play()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/pages/contact.scss';
</style>
