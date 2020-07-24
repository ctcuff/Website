<template>
  <div ref="root">
    <div class="project">
      <div class="project__info no-overflow">
        <div class="project__title no-overflow">
          <h1 ref="projectTitle">{{ projects[activeItemIndex].title }}</h1>
        </div>
        <div class="project__description">
          <p ref="projectDescription">{{ projects[activeItemIndex].description }}</p>
        </div>
        <div class="project__link no-overflow" ref="projectLink">
          <a :href="projects[activeItemIndex].link">View details</a>
        </div>
      </div>
      <div class="project__image">
        <div class="project__image--background no-overflow">
          <img
            :src="projects[activeItemIndex].backgroundImage"
            ref="projectImageBackground"
            alt=""
          />
        </div>
        <div class="project__image--foreground no-overflow">
          <img
            :src="projects[activeItemIndex].foregroundImage"
            alt=""
            ref="projectImageForeground"
          />
        </div>
      </div>
    </div>
    <div class="carousel">
      <ul ref="carouselList">
        <li
          class="carousel__item"
          :class="{ 'carousel__item--active': activeItemIndex === i - 1 }"
          v-for="i in projects.length"
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
  import { gsap } from 'gsap'

  export default {
    data: () => ({
      animationDuration: 1,
      scrollEvents: ['DOMMouseScroll', 'mousewheel', 'wheel'],
      lastScrolled: Date.now(),
      activeItemIndex: 0,
      isAnimating: false,
      xDown: null,
      yDown: null,
      projects: [
        {
          title: 'UCF Parking',
          description: 'A website and API to keep track of parking spaces.',
          backgroundImage: require('../assets/images/ucf-parking-fullscreen.png'),
          foregroundImage: require('../assets/images/ucf-parking.png'),
          link: '/#/projects?q=UCF%20Parking'
        },
        {
          title: 'Live Code',
          description: 'A site that lets people code together.',
          backgroundImage: require('../assets/images/livecode-fullscreen.png'),
          foregroundImage: require('../assets/images/livecode.png'),
          link: '/#/projects?q=Live%20Code'
        },
        {
          title: 'Dependency Visualizer',
          description: "View a graph of a JavaScript package's dependencies from npm.",
          backgroundImage: require('../assets/images/dependency-visualizer-fullscreen.png'),
          foregroundImage: require('../assets/images/dependency-visualizer.png'),
          link: '/#/projects?q=Dependency%20Visualizer'
        }
      ]
    }),
    methods: {
      onScroll(event) {
        event.preventDefault()

        // Prevents the scroll animation from firing
        // too many times
        if (Date.now() - this.lastScrolled < 1200 || this.isAnimating) {
          return
        }

        const direction = event.deltaY < 0 ? 'UP' : 'DOWN'

        this.animateTransition(direction)
        this.lastScrolled = Date.now()
      },
      onKeyDown(event) {
        if (event.repeat) {
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
        if (!this.xDown || !this.yDown) {
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
        const duration = 0.7

        this.isAnimating = true

        gsap
          .timeline()
          .to(
            text,
            {
              y: direction === 'UP' ? '-100%' : '100%',
              opacity: 0,
              ease: 'power2.in',
              duration
            },
            0
          )
          .to(projectImageForeground, { opacity: 0, duration }, 0)
          .to(projectImageBackground, { opacity: 0, duration }, 0)
          .add(() => this.changeIndex(direction))
          .to(
            text,
            {
              y: '0%',
              opacity: 1,
              duration
            },
            1
          )
          .to(projectImageForeground, { opacity: 1 }, 1)
          .to(projectImageBackground, { opacity: 1 }, 1)
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
        .fromTo(
          carouselList,
          {
            x: '-100%',
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
            y: '-100%',
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
      const ease = 'Power2.easeIn'

      gsap
        .timeline()
        .eventCallback('onComplete', () => next())
        .to(
          carouselList,
          {
            x: '-100%',
            duration: this.animationDuration,
            opacity: 0,
            ease
          },
          0
        )
        .to(
          text,
          {
            y: '-100%',
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
