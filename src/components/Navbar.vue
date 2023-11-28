<template>
  <nav class="navbar" ref="navbar">
    <router-link to="/projects" class="navbar__link">
      Projects
    </router-link>
    <router-link to="/" class="navbar__link">
      Home
    </router-link>
    <router-link to="/about" class="navbar__link">
      About
    </router-link>
  </nav>
</template>

<script lang="ts">
  import { gsap } from 'gsap'
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Watch } from 'vue-property-decorator'
  import { Route } from 'vue-router'

  @Component
  export default class Navbar extends Vue {
    $refs!: {
      navbar: HTMLElement
    }

    observer: IntersectionObserver | null = null

    @Watch('$store.state.isLandingAnimationFinished')
    onLandingAnimationFinishedChange(finished: boolean) {
      if (finished) {
        gsap.to(this.$refs.navbar, {
          opacity: 1,
          duration: 1,
          y: '0%'
        })
      }
    }

    @Watch('$route')
    onRouteChange(route: Route) {
      if (route.path === '/project' && !this.observer) {
        this.initObserver()
      } else {
        this.toggleNavbar(true)
        this.observer?.disconnect()
        this.observer = null
      }
    }

    toggleNavbar(show: boolean) {
      gsap.to(this.$refs.navbar, {
        opacity: show ? 1 : 0,
        duration: 0.75,
        y: show ? '0%' : '-100%'
      })
    }

    initObserver() {
      const element = document.querySelector('[data-observer-element]')

      if (!element) {
        return
      }

      const {
        top: navbarMarginTop,
        height: navbarHeight
      } = this.$refs.navbar.getBoundingClientRect()

      const { height: elementHeight } = element.getBoundingClientRect()

      const rootMargin = (elementHeight - navbarMarginTop + navbarHeight) * -1

      // Using timeout so that the layout has time to calculate, otherwise
      // the intersection event will first and cause the navbar to flicker
      setTimeout(() => {
        this.observer = new IntersectionObserver(
          ([entry]) => this.toggleNavbar(entry.isIntersecting),
          { rootMargin: `${rootMargin}px` }
        )

        if (element) {
          this.observer.observe(element)
        }
      }, 200)
    }

    mounted() {
      // Need to set the initial state of the navbar to hidden so that
      // it can properly animate once it mounts
      gsap.set(this.$refs.navbar, {
        opacity: 0,
        y: '-100%'
      })

      if (this.$route.path === '/project') {
        this.initObserver()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/components/navbar';
</style>
