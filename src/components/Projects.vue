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
          .to(projectImageBackground, { opacity: 0 }, 0.4)
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
          .to(projectImageBackground, { opacity: 1 }, 1.2)
          .add(() => (this.isAnimating = false))
      }
    },
    mounted() {
      window.addEventListener('keydown', this.onKeyDown)

      this.scrollEvents.forEach(event => {
        this.$refs.root.addEventListener(event, this.onScroll)
      })

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
  @import '../scss/mixins/height';
  @import '../scss/mixins/fonts';

  .project {
    display: flex;
    flex-direction: row;
    width: 100%;
    @include font('Avenir');
    @include full-height;

    &__title {
      position: absolute;
      bottom: 300px;
      color: #353535;
      line-height: 52px;
      max-width: 300px;

      h1 {
        font-size: 45px;
        margin: 0;
      }

      @include font('AvenirNext-Bold');
    }

    &__description {
      position: absolute;
      bottom: 224px;
      height: 60px;
      color: #8e9093;

      & p {
        margin: 0;
      }
    }

    &__link {
      position: absolute;
      bottom: 190px;

      a {
        color: #353535;
        font-weight: bold;
        text-decoration: none;
        font-size: 14px;
        position: relative;

        &::before {
          content: '';
          width: 20px;
          height: 1px;
          background-color: #000;
          vertical-align: middle;
          display: inline-block;
          margin-right: 16px;
          transition: width 0.3s ease-in-out;
        }

        &:hover::before {
          width: 60px;
        }
      }
    }
  }

  .project__info {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 0 35% 0% 100px;
  }

  .project__image {
    width: 43%;
    height: 100%;
  }

  .project__image--background {
    width: 90%;
    height: 100vh;
    position: relative;
    display: flex;

    img {
      width: auto;
      filter: brightness(90%);
      user-select: none;

      @include full-height;
    }

    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.6);
      z-index: 1;
    }
  }

  .project__image--foreground {
    position: absolute;
    width: 680px;
    height: 450px;
    left: 580px;
    top: 20%;

    img {
      position: absolute;
      width: inherit;
      height: inherit;
      z-index: 1;
      user-select: none;
    }
  }

  .carousel {
    position: fixed;
    right: 10px;
    top: 0;
    display: flex;
    align-items: center;
    height: 100%;
    margin-right: 5px;
    @include font('Avenir');

    ul {
      list-style: none;
    }
  }

  .carousel__item {
    $transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    line-height: 3;
    font-size: 12px;
    text-align: left;
    cursor: pointer;
    user-select: none;

    span {
      opacity: 0;
      display: inline-block;
      transition: $transition;
    }

    &::after {
      content: '';
      width: 13px;
      background-color: #353535;
      height: 1px;
      transform-origin: right;
      display: inline-block;
      vertical-align: middle;
      transition: $transition;
    }

    &:hover {
      span {
        opacity: 1;
        transform: translateX(13px);
      }

      &::after {
        opacity: 0;
        transform: translateX(13px);
      }
    }
  }

  .carousel__item--active {
    span {
      opacity: 1;
      transform: translateX(13px);
    }

    &::after {
      opacity: 0;
      transform: translateX(13px);
    }
  }
</style>
