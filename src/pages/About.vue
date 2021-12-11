<template>
  <div>
    <div class="container" ref="rootContainer">
      <section class="content">
        <h2 class="content__title">The TLDR About Section</h2>
        <p class="content__description">
          I won't bore you so here's the jist: I'm a senior at UCF studying Computer
          Science who will be working at Microsoft after I graduate. In my free time, I
          like to play piano and work on side projects. I love to experiment with anything
          involving layouts, animations, typography and color. Fun fact: I used to major
          in music performance but switched to CS after my freshman year.
        </p>
      </section>
      <section class="content content--experience">
        <h2 class="content__title">Work Experience</h2>
        <div class="svg-container" ref="svgContainer">
          <svg
            width="147"
            height="725"
            viewBox="0 0 147 725"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              ref="svgPath"
              d="M11.5994 3C11.5994 3 198.145 125.972 70.0511 229.003C-58.0424 332.034 76.2678 390.75 76.2678 390.75C76.2678 390.75 230.478 476.055 70.0511 512.338C-90.3755 548.62 87.4605 722 87.4605 722"
              stroke="currentColor"
              stroke-width="4"
              stroke-linecap="round"
              class="squiggle"
              :stroke-dashoffset="strokeDashOffset"
              :stroke-dasharray="svgPathLength"
            />
          </svg>
        </div>
      </section>
    </div>
    <Curtain class="blank-curtain" />
    <Curtain class="transition-curtain" />
    <Curtain :text="transitionText" class="about-curtain" />
  </div>
</template>

<script lang="ts">
  import gsap, { Expo } from 'gsap'
  import { Component, Ref, Vue } from 'vue-property-decorator'
  import Curtain from '../components/Curtain.vue'
  import { NavigationGuardNext, Route } from 'vue-router'
  import { RouterState } from '../route-store'
  import { State, Mutation } from 'vuex-class'
  import ScrollBar from 'smooth-scrollbar'
  import ScrollMagic from 'scrollmagic'
  import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators'

  @Component({
    components: {
      Curtain
    }
  })
  export default class About extends Vue {
    @State private fromPath!: RouterState['fromPath']
    @State private transitionText!: RouterState['transitionText']
    @Mutation private setFromPath!: (route: RouterState['fromPath']) => void
    @Ref() private readonly svgPath!: SVGPathElement
    @Ref() private readonly svgContainer!: HTMLDivElement
    @Ref() private readonly rootContainer!: HTMLDivElement
    private svgPathLength: number = 0
    private strokeDashOffset: number = 0
    private controller!: ScrollMagic.Controller

    beforeRouteLeave(to: Route, from: Route, next: NavigationGuardNext) {
      const duration = 1

      // Temporarily disable the scrollbar so the browser's default
      // scrollbar doesn't show during the gsap transition
      document.body.style.overflow = 'hidden'

      this.controller.destroy(true)

      gsap
        .timeline()
        .to('.transition-curtain, .blank-curtain', {
          y: '0%',
          duration,
          ease: Expo.easeOut
        })
        .to('.transition-curtain', {
          y: '-100%',
          duration,
          ease: Expo.easeOut
        })
        .eventCallback('onComplete', () => {
          this.setFromPath('about')
          document.body.style.overflow = 'auto'
          next()
        })
    }

    initSVGPath() {
      this.svgPathLength = this.svgPath.getTotalLength()
      this.strokeDashOffset = this.svgPath.getTotalLength()
    }

    destroyed() {
      this.controller.destroy(true)
    }

    initScrollTrigger() {
      const scrollbar = ScrollBar.init(this.rootContainer)

      this.controller = new ScrollMagic.Controller()

      const scene = new ScrollMagic.Scene({
        triggerElement: this.svgContainer,
        duration: '50%'
      })
        .on('progress', event => {
          const progress = event.target.progress()
          this.strokeDashOffset = this.svgPathLength - this.svgPathLength * progress
        })
        .addTo(this.controller)

      // Fixes the jumpy animations that occur because of smooth scrolling
      scrollbar.addListener(() => scene.refresh())
    }

    mounted() {
      this.initSVGPath()
      this.initScrollTrigger()

      const curtainTimeline = gsap
        .timeline({ paused: true })
        .to(
          '.about-curtain',
          {
            y: '-100%',
            duration: 1.2,
            ease: Expo.easeOut
          },
          0
        )
        .to(
          '.about-curtain .curtain__inner',
          {
            y: '100%',
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
