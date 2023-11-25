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

<script>
  import Navbar from '@/components/Navbar'
  import debounce from '@/util/debounce'
  import { projects } from '@/project-info'
  import profileImage from '@/assets/images/profile.svg'

  export default {
    components: {
      Navbar
    },
    data: () => ({
      fonts: ['AvenirNext', 'AvenirNext-Bold', 'Montserrat']
    }),
    mounted() {
      this.updateViewport()
      window.addEventListener('resize', debounce(this.updateViewport, 250))

      // Preload images so the browser can cache them
      const projectImages = projects.reduce(
        (acc, curr) =>
          acc.concat(curr.backgroundImage, curr.foregroundImage, curr.data.image.src),
        []
      )

      const allImages = [...projectImages, profileImage]

      allImages.forEach(path => {
        const image = new Image()
        image.src = path
      })
    },
    destroyed() {
      window.removeEventListener('resize', this.updateViewport)
    },
    methods: {
      updateViewport() {
        // Updates the --vh variable used in the height mixin
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './scss/components/app';
</style>
