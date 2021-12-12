<template>
  <div>
    <div class="container" ref="rootContainer">
      <section class="content content--about">
        <h2 class="content__title">The TLDR About Section</h2>
        <p class="content__description">
          I won't bore you so here's the jist: I'm a senior at UCF studying Computer
          Science who will be working at Microsoft after I graduate. In my free time, I
          like to play piano and work on side projects (all of which are open-source). I
          love to experiment with anything involving layouts, animations, typography and
          color. Fun fact: I used to major in music performance but switched to CS after
          my freshman year.
        </p>
      </section>
      <section class="content content--experience">
        <h2 class="content__title">Work Experience</h2>
        <div class="svg-container" ref="svgContainer">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 812 2437"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              ref="svgPath"
              d="M55.9963 3C55.9963 3 1208.71 692.436 417.184 805C-374.339 917.564 330.36 1229 330.36 1229C330.36 1229 803.664 1382.68 808.955 1527C811.418 1594.18 712.474 1659.33 417.184 1706C-512.48 1852.95 417.184 2434 417.184 2434"
              stroke="currentColor"
              stroke-linecap="round"
              class="squiggle"
              :stroke-dashoffset="strokeDashOffset"
              :stroke-dasharray="svgPathLength"
            />
            <path
              d="M55.9963 3C55.9963 3 1208.71 692.436 417.184 805C-374.339 917.564 330.36 1229 330.36 1229C330.36 1229 803.664 1382.68 808.955 1527C811.418 1594.18 712.474 1659.33 417.184 1706C-512.48 1852.95 417.184 2434 417.184 2434"
              stroke="currentColor"
              stroke-linecap="round"
              class="squiggle--background"
            />
          </svg>
        </div>
        <div class="job">
          <h3 class="job__title">UCF Center for Distributed Learning</h3>
          <p class="job__role">
            Web Applications Developer | September 2019 - February 2021
          </p>
          <p class="job__description">
            I worked with a team of developers on projects such as adding new endpoints to
            a Python API that lets faculty and staff programmatically access information
            about their courses. I spent most of my time here working on an open-source
            Learning Management System called Obojobo. Created in React, it helps
            instructors develop accessible and interactive content for their students.
          </p>
        </div>
        <div class="job">
          <h3 class="job__title">Visa</h3>
          <p class="job__role">Software Engineering Intern | May 2020 - July 2020</p>
          <p class="job__description">
            I worked in a team to pitch a business proposal to executives that
            incentivizes online shopping, encouraging contactless payments. I also worked
            in a team to build a website using the MERN stack that helps merchants
            transition their businesses online. We incorporated Visa's payment API to
            complete transactions online effortlessly and Visa's Merchant Locator API to
            find merchants within a specific radius.
          </p>
        </div>
        <div class="job">
          <h3 class="job__title">Microsoft</h3>
          <p class="job__role">Software Engineering Intern | May 2021 - August 2021</p>
          <p class="job__description">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ratione
            neque, soluta minima, quia recusandae eaque quis porro blanditiis
            exercitationem iusto, odit eius! Corporis distinctio saepe quibusdam
            temporibus dolor! Modi commodi asperiores dolor, quae tempore beatae velit
            unde laboriosam magnam. Soluta deleniti consectetur iure nesciunt illum? Aut,
            esse! Beatae, illo.
          </p>
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
    private controller!: ScrollMagic.Controller
    private svgPathLength: number = 0
    private strokeDashOffset: number = 0

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
          document.body.style.overflow = 'auto'
          this.setFromPath('about')
          next()
        })
    }

    destroyed() {
      this.controller.destroy(true)
    }

    initScrollTrigger() {
      const scrollbar = ScrollBar.init(this.rootContainer)

      this.controller = new ScrollMagic.Controller()

      const scene = new ScrollMagic.Scene({
        triggerElement: this.svgContainer,
        duration: '240%'
      })
        .on('progress', (event: ScrollMagic.Event<ScrollMagic.EventType>) => {
          const progress = event.target.progress()
          this.strokeDashOffset = this.svgPathLength - this.svgPathLength * progress
        })
        .addTo(this.controller)

      // Fixes the jumpy animations that occur because of smooth scrolling
      scrollbar.addListener(() => scene.refresh())
    }

    mounted() {
      this.svgPathLength = this.svgPath.getTotalLength()
      this.strokeDashOffset = this.svgPath.getTotalLength()

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
