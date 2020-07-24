<template>
  <div ref="root">
    <div class="project">
      <div class="project__info">
        <div class="project__title no-overflow">
          <h1 ref="projectTitle">{{ projects[activeItemIndex].title }}</h1>
        </div>
        <div class="project__description no-overflow">
          <p ref="projectDescription">{{ projects[activeItemIndex].description }}</p>
        </div>
        <div class="project__link no-overflow">
          <a :href="projects[activeItemIndex].link" ref="projectLink">View details</a>
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
      animationStagger: 0.03,
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
          description: "View a graph of a package's dependencies.",
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

        if (event.keyCode === 38) {
          this.animateTransition('UP')
        } else if (event.keyCode === 40) {
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

        this.isAnimating = true

        gsap
          .timeline()
          .to(
            text,
            {
              y: direction === 'UP' ? '-100%' : '100%',
              opacity: 0,
              ease: 'power2.in'
            },
            0
          )
          .to(projectImageForeground, { opacity: 0 }, 0)
          .to(projectImageBackground, { opacity: 0 }, 0)
          .add(() => this.changeIndex(direction))
          .to(
            text,
            {
              y: '0%',
              opacity: 1,
              ease: 'power2.out'
            },
            1
          )
          .to(projectImageForeground, { opacity: 1 }, 1)
          .to(projectImageBackground, { opacity: 1 }, 1)
          .add(() => (this.isAnimating = false))
      }
    },
    mounted() {
      window.addEventListener('keydown', this.onKeyDown)

      this.scrollEvents.forEach(event => {
        this.$refs.root.addEventListener(event, this.onScroll)
      })

      this.$refs.root.addEventListener('touchstart', this.handleTouchStart)
      this.$refs.root.addEventListener('touchmove', this.handleTouchMove)

      Array.prototype.forEach.call(this.$refs.carouselList.children, child => {
        child.addEventListener('click', () => {
          this.activeItemIndex = parseInt(child.dataset.position)
        })
      })
    },
    beforeDestroy() {
      window.removeEventListener('keydown', this.onKeyDown)
      this.scrollEvents.forEach(event => {
        this.$refs.root.removeEventListener(event, this.onScroll)
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/components/projects';
</style>
