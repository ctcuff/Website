<template>
  <div ref="root" class="app">
    <!--
      Preload fonts to prevent the flicker that can occur
      when other pages are visited
    -->
    <div class="preload-fonts">
      <span v-for="(font, index) in fonts" :key="index" :style="{ fontFamily: font }">
      </span>
    </div>
    <router-view v-if="preloadFinished"></router-view>
    <Navbar v-if="preloadFinished" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Navbar from '@/components/Navbar.vue'
  import debounce from '@/util/debounce'
  import { projects } from '@/project-info'
  import profileImage from '@/assets/images/profile.svg'
  import { Component } from 'vue-property-decorator'
  import { Mutation } from 'vuex-class'

  @Component({
    components: {
      Navbar
    }
  })
  export default class App extends Vue {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Mutation setLandingAnimationFinished!: (finished: boolean) => void

    preloadFinished = true
    fonts = ['AvenirNext', 'AvenirNext-Bold', 'Montserrat']

    mounted() {
      this.updateViewport()
      window.addEventListener('resize', this.updateViewport)

      // Preload images so the browser can cache them
      const projectImages = projects.reduce(
        (acc, curr) =>
          acc.concat(curr.backgroundImage, curr.foregroundImage, curr.data.image.src),
        [] as string[]
      )

      Array.from([...projectImages, profileImage]).forEach((path: string) => {
        const image = new Image()
        image.src = path
      })

      this.preloadFinished = true

      // If the user starts the site on a route other than the home page,
      // cancel the initial landing animation
      if (this.$route.path !== '/') {
        this.setLandingAnimationFinished(true)
      }
    }

    destroyed() {
      window.removeEventListener('resize', this.updateViewport)
    }

    /**
     * Updates the --vh variable used in the height mixin
     */
    updateViewport() {
      const debouncedUpdateViewport = debounce(() => {
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      }, 250)

      debouncedUpdateViewport()
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/components/app';
</style>
