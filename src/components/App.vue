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
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Navbar from '@/components/Navbar.vue'
  import debounce from '@/util/debounce'
  import { projects } from '@/project-info'
  import profileImage from '@/assets/images/profile.svg'
  import { Component } from 'vue-property-decorator'

  @Component({
    components: {
      Navbar
    }
  })
  export default class App extends Vue {
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

      const allImages = [...projectImages, profileImage]

      allImages.forEach((path: string) => {
        const image = new Image()
        image.src = path
      })
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
