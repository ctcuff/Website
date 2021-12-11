<template>
  <div class="container">
    <section>
      <h1 class="title">A TLDR About Section</h1>
      <p class="description">
        I won't bore you so here's the jist: I'm a senior at UCF studying Computer Science
        who will be working at Microsoft after I graduate. In my free time, I like to play
        piano and work on side projects. Fun fact: I used to major in music performance
        but switched to CS after my freshman year.
      </p>
    </section>
    <Curtain text="This is the about section." class="about-curtain" />
  </div>
</template>

<script lang="ts">
  import gsap, { Expo } from 'gsap'
  import { Component, Vue } from 'vue-property-decorator'
  import Curtain from '../components/Curtain.vue'
  import { NavigationGuardNext, Route } from 'vue-router'
  import { RouterState } from '../route-store'
  import { State, Mutation } from 'vuex-class'

  @Component({
    components: {
      Curtain
    }
  })
  export default class About extends Vue {
    @State fromPath!: RouterState['fromPath']
    @Mutation private setFromPath!: (route: RouterState['fromPath']) => void

    beforeRouteLeave(to: Route, from: Route, next: NavigationGuardNext) {
      this.setFromPath('about')
      next()
    }

    mounted() {
      const curtainTimeline = gsap
        .timeline({ paused: true })
        .to(
          '.about-curtain',
          {
            y: '100%',
            duration: 1.2,
            ease: Expo.easeOut
          },
          0
        )
        .to(
          '.about-curtain .curtain__inner',
          {
            y: '-100%',
            duration: 1.2,
            ease: Expo.easeOut
          },
          0
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
  @import '../scss/pages/about.scss';
</style>
