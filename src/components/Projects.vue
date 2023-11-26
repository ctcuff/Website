<template>
  <div ref="root">
    <div class="project no-overflow">
      <div class="project__info">
        <div class="project__title no-overflow">
          <h1 ref="projectTitle">{{ projects[activeItemIndex].title }}</h1>
        </div>
        <div class="project__description no-overflow">
          <p ref="projectDescription">{{ projects[activeItemIndex].description }}</p>
        </div>
        <div class="project__link no-overflow">
          <div ref="projectLink">
            <router-link :to="projects[activeItemIndex].link">
              Read case study
            </router-link>
          </div>
        </div>
      </div>
      <div class="project__image">
        <div class="project__image--background" ref="projectImageBackground">
          <img
            v-for="(project, index) in projects"
            :key="index"
            :src="project.backgroundImage"
            :alt="project.imageAlt"
            v-show="activeItemIndex === index"
          />
        </div>
        <div class="project__image--foreground" ref="projectImageForeground">
          <img
            v-for="(project, index) in projects"
            :key="index"
            :src="project.foregroundImage"
            :alt="project.imageAlt"
            v-show="activeItemIndex === index"
          />
        </div>
      </div>
    </div>
    <div class="carousel">
      <ul ref="carouselList">
        <li
          v-for="i in projects.length"
          class="carousel__item"
          :class="{ 'carousel__item--active': activeItemIndex === i - 1 }"
          :key="i"
          :title="projects[i - 1].title"
          :data-position="i - 1"
        >
          <span>{{ `${i}`.padStart(2, 0) }}</span>
        </li>
        <p class="carousel__scroll-indicator" ref="scrollIndicator">
          {{ isMobile ? 'Swipe' : 'Scroll' }}
        </p>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import { projects } from '@/project-info'
  import { gsap } from 'gsap'
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { NavigationGuardNext, Route } from 'vue-router'
  import debounce from '../util/debounce'

  type Direction = 'UP' | 'DOWN'

  const MOBILE_BREAKPOINT = 600

  @Component
  export default class Projects extends Vue {
    $refs!: {
      root: HTMLDivElement
      projectTitle: HTMLHeadingElement
      projectDescription: HTMLParagraphElement
      projectLink: HTMLDivElement
      projectImageBackground: HTMLDivElement
      projectImageForeground: HTMLDivElement
      carouselList: HTMLUListElement
      scrollIndicator: HTMLParagraphElement
    }

    /**
     * Used to prevent further animations if an animation is already in progress
     */
    isAnimating = false
    isMobile = window.innerWidth <= MOBILE_BREAKPOINT
    animationDuration = 0.8
    lastScrolled = Date.now()
    xDown = NaN
    yDown = NaN
    projects = projects
    activeItemIndex = this.getActiveItemIndex()

    getActiveItemIndex() {
      const index = (this.$route.query && this.$route.query.index) as string | null
      return parseInt(index || '') || 0
    }

    onScroll(event: WheelEvent) {
      event.preventDefault()

      // Prevents the scroll animation from firing too many times
      if (Date.now() - this.lastScrolled < 1200 || this.isAnimating) {
        return
      }

      const direction = event.deltaY < 0 ? 'UP' : 'DOWN'

      this.animateTransition(direction)
      this.hideScrollIndicator()
      this.lastScrolled = Date.now()
    }

    onKeyDown(event: KeyboardEvent) {
      if (event.repeat || this.isAnimating) {
        return
      }

      // Keyboard arrow keys: up && left or down && right
      if (event.code === 'ArrowUp' || event.code === 'ArrowLeft') {
        this.animateTransition('UP')
      } else if (event.code === 'ArrowDown' || event.code === 'ArrowRight') {
        this.animateTransition('DOWN')
      }
    }

    onResize() {
      debounce(() => (this.isMobile = window.innerWidth <= MOBILE_BREAKPOINT), 200)()
    }

    handleTouchStart(event: TouchEvent) {
      const firstTouch = event.touches[0]

      this.xDown = firstTouch.clientX
      this.yDown = firstTouch.clientY
    }

    handleTouchMove(event: TouchEvent) {
      if (this.isAnimating || Number.isNaN(this.xDown) || Number.isNaN(this.yDown)) {
        return
      }

      const xUp = event.touches[0].clientX
      const yUp = event.touches[0].clientY
      const xDiff = this.xDown - xUp
      const yDiff = this.yDown - yUp

      // yDiff > 0 is a swipe up
      // yDiff < 0 is a swipe down
      if (Math.abs(xDiff) < Math.abs(yDiff)) {
        const direction: Direction = yDiff > 0 ? 'DOWN' : 'UP'
        this.animateTransition(direction)
        this.hideScrollIndicator()
      }

      this.xDown = NaN
      this.yDown = NaN
    }

    changeIndex(direction: Direction) {
      if (direction === 'UP') {
        this.activeItemIndex -= 1
      } else {
        this.activeItemIndex += 1
      }

      // Ensures the carousel can wrap around back to the beginning
      if (this.activeItemIndex === -1) {
        this.activeItemIndex = this.projects.length - 1
      }

      this.activeItemIndex %= this.projects.length
    }

    hideScrollIndicator() {
      gsap.to(this.$refs.scrollIndicator, {
        x: this.isMobile ? '100%' : '-100%',
        opacity: 0,
        ease: 'power2.in',
        duration: 1
      })
    }

    animateTransition(direction: Direction) {
      const {
        projectTitle,
        projectDescription,
        projectImageForeground,
        projectImageBackground,
        projectLink
      } = this.$refs

      const text = gsap.utils.toArray([projectTitle, projectDescription, projectLink])
      const images = gsap.utils.toArray([projectImageForeground, projectImageBackground])
      const duration = 0.5

      this.isAnimating = true

      // Adding will-change to the images before animation
      // improves animation performance in other browsers
      gsap
        .timeline()
        .add(() => gsap.set(images, { willChange: 'opacity' }))
        .to(
          text,
          {
            y: direction === 'UP' ? '-100%' : '100%',
            ease: 'power2.in',
            duration
          },
          0
        )
        .to(
          images,
          {
            opacity: 0,
            duration
          },
          0
        )
        .add(() => this.changeIndex(direction))
        .to(
          text,
          {
            y: '0%',
            duration,
            ease: 'power1.out'
          },
          1
        )
        .to(
          images,
          {
            opacity: 1,
            duration
          },
          1
        )
        .add(() => gsap.set(images, { willChange: 'auto' }))
        .add(() => (this.isAnimating = false))
    }

    beforeRouteLeave(_to: Route, _from: Route, next: NavigationGuardNext) {
      const {
        projectTitle,
        projectDescription,
        projectImageForeground,
        projectImageBackground,
        projectLink,
        carouselList
      } = this.$refs

      const text = gsap.utils.toArray([projectTitle, projectDescription, projectLink])
      const images = gsap.utils.toArray([projectImageBackground, projectImageForeground])
      const ease = 'power2.in'

      gsap
        .timeline()
        .eventCallback('onComplete', () => next())
        .add(() => gsap.set(images, { willChange: 'opacity' }))
        .to(
          carouselList,
          {
            x: this.isMobile ? '100%' : '-100%',
            duration: this.animationDuration,
            opacity: 0,
            ease
          },
          0
        )
        .to(
          text,
          {
            y: '100%',
            duration: this.animationDuration,
            opacity: 0,
            ease
          },
          0
        )
        .to(
          images,
          {
            duration: this.animationDuration,
            opacity: 0,
            ease
          },
          0
        )
        .add(() => gsap.set(images, { willChange: 'auto' }))
    }

    beforeDestroy() {
      const root = this.$refs.root

      window.removeEventListener('keydown', this.onKeyDown)
      window.removeEventListener('resize', this.onResize)
      root.removeEventListener('touchstart', this.handleTouchStart)
      root.removeEventListener('touchmove', this.handleTouchMove)
      root.removeEventListener('wheel', this.onScroll)
    }

    mounted() {
      const {
        projectTitle,
        projectDescription,
        projectImageForeground,
        projectImageBackground,
        projectLink,
        carouselList,
        root
      } = this.$refs

      const text = gsap.utils.toArray([projectTitle, projectDescription, projectLink])
      const images = gsap.utils.toArray([projectImageBackground, projectImageForeground])

      window.addEventListener('keydown', this.onKeyDown)
      window.addEventListener('resize', this.onResize)
      root.addEventListener('touchstart', this.handleTouchStart)
      root.addEventListener('touchmove', this.handleTouchMove)
      root.addEventListener('wheel', this.onScroll)

      Array.from(carouselList.children).forEach(child => {
        child.addEventListener('click', () => {
          this.activeItemIndex = parseInt((child as HTMLLIElement).dataset.position || '')
        })
      })

      gsap
        .timeline()
        .add(() => gsap.set(images, { willChange: 'opacity' }))
        .fromTo(
          carouselList,
          {
            x: this.isMobile ? '100%' : '-100%',
            opacity: 0
          },
          {
            x: '0%',
            opacity: 1,
            duration: this.animationDuration
          },
          0
        )
        .fromTo(
          text,
          {
            y: '100%',
            opacity: 0
          },
          {
            y: '0%',
            opacity: 1,
            duration: this.animationDuration
          },
          0
        )
        .fromTo(
          images,
          {
            opacity: 0
          },
          {
            opacity: 1,
            duration: this.animationDuration
          },
          0
        )
        .add(() => gsap.set(images, { willChange: 'auto' }))
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/components/projects';
</style>
