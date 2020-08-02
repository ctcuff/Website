<template>
  <div ref="root">
    <div class="project">
      <div class="project__info no-overflow">
        <div class="project__title no-overflow">
          <h1 ref="projectTitle">{{ projects[activeItemIndex].title }}</h1>
        </div>
        <div class="project__description no-overflow">
          <p ref="projectDescription">{{ projects[activeItemIndex].description }}</p>
        </div>
        <div class="project__link no-overflow">
          <div ref="projectLink">
            <router-link :to="projects[activeItemIndex].link">
              View details
            </router-link>
          </div>
        </div>
      </div>
      <div class="project__image">
        <div class="project__image--background no-overflow" ref="projectImageBackground">
          <img
            v-for="(project, index) in projects"
            :key="index"
            :src="project.backgroundImage"
            :alt="project.imageAlt"
            v-show="activeItemIndex === index"
          />
        </div>
        <div class="project__image--foreground no-overflow" ref="projectImageForeground">
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
      </ul>
    </div>
  </div>
</template>

<script>
  import { projects } from '@/project-info'
  import { gsap } from 'gsap'

  export default {
    data() {
      // Grab the current project index that may have been
      // passed from the '/projects' route
      const index = this.$route.query && this.$route.query.index

      return {
        // Used to determine the animation direction of the carousel
        isMobile: window.innerWidth <= 600,
        animationDuration: 0.8,
        scrollEvents: ['DOMMouseScroll', 'mousewheel', 'wheel'],
        lastScrolled: Date.now(),
        activeItemIndex: parseInt(index) || 0,
        isAnimating: false,
        xDown: null,
        yDown: null,
        projects
      }
    },
    methods: {
      onScroll(event) {
        event.preventDefault()

        // Prevents the scroll animation from firing too many times
        if (Date.now() - this.lastScrolled < 1200 || this.isAnimating) {
          return
        }

        const direction = event.deltaY < 0 ? 'UP' : 'DOWN'

        this.animateTransition(direction)
        this.lastScrolled = Date.now()
      },
      onKeyDown(event) {
        if (event.repeat || this.isAnimating) {
          return
        }

        // Keyboard arrow keys: up && left or down && right
        if (event.keyCode === 38 || event.keyCode === 37) {
          this.animateTransition('UP')
        } else if (event.keyCode === 40 || event.keyCode === 39) {
          this.animateTransition('DOWN')
        }
      },
      handleTouchStart(event) {
        const firstTouch = event.touches[0]

        this.xDown = firstTouch.clientX
        this.yDown = firstTouch.clientY
      },
      handleTouchMove(event) {
        if (this.isAnimating || !this.xDown || !this.yDown) {
          return
        }

        const xUp = event.touches[0].clientX
        const yUp = event.touches[0].clientY
        const xDiff = this.xDown - xUp
        const yDiff = this.yDown - yUp

        if (Math.abs(xDiff) < Math.abs(yDiff)) {
          // yDiff > 0 is a swipe up
          // yDiff < 0 is a swipe down
          const direction = yDiff > 0 ? 'DOWN' : 'UP'
          this.animateTransition(direction)
        }

        this.xDown = null
        this.yDown = null
      },
      changeIndex(direction) {
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
      },
      animateTransition(direction) {
        const {
          projectTitle,
          projectDescription,
          projectImageForeground,
          projectImageBackground,
          projectLink
        } = this.$refs

        const text = gsap.utils.toArray([projectTitle, projectDescription, projectLink])
        const images = gsap.utils.toArray([
          projectImageForeground,
          projectImageBackground
        ])
        const duration = 0.5

        // Used to prevent further animations if an
        // animation is already in progress
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
    },
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
      root.addEventListener('touchstart', this.handleTouchStart)
      root.addEventListener('touchmove', this.handleTouchMove)

      this.scrollEvents.forEach(event => root.addEventListener(event, this.onScroll))

      Array.prototype.forEach.call(carouselList.children, child => {
        child.addEventListener('click', () => {
          this.activeItemIndex = parseInt(child.dataset.position)
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
    },
    beforeRouteLeave(to, from, next) {
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
    },
    beforeDestroy() {
      const root = this.$refs.root

      window.removeEventListener('keydown', this.onKeyDown)
      root.removeEventListener('touchstart', this.handleTouchStart)
      root.removeEventListener('touchmove', this.handleTouchMove)

      this.scrollEvents.forEach(event => {
        root.removeEventListener(event, this.onScroll)
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/components/projects';
</style>
