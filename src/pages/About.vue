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
      <section class="content content--experience" ref="experienceSection">
        <h2 class="content__title">Work Experience</h2>
        <div class="svg-container" ref="svgContainer">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 628 1044"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              ref="svgPath"
              d="M415 3.5C415 3.5 949.617 253.396 310.498 323.5C-328.62 393.604 215.999 608 299.998 653.5C383.998 699 906.659 948.984 155.998 1040.5"
              stroke-linecap="round"
              class="squiggle"
              :stroke-dashoffset="strokeDashOffset"
              :stroke-dasharray="svgPathLength"
            />
            <path
              d="M415 3.5C415 3.5 949.617 253.396 310.498 323.5C-328.62 393.604 215.999 608 299.998 653.5C383.998 699 906.659 948.984 155.998 1040.5"
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
            I worked under the Office Voice team to make improvements to dictation in
            Microsoft Word. I implemented a proof-of-concept project that aimed to make
            speech-to-text functionality more accessible, less resource heavy, and cost
            efficient. I also worked on a hackathon project that won second place which
            brought speech-to-text into VS Code using native C++ modules, you can check
            out the code on my GitHub profile!
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
  /* eslint-disable */
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
    @Ref() private readonly experienceSection!: HTMLElement
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
        duration: this.experienceSection.offsetHeight * 0.95
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
