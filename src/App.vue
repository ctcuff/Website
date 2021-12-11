<template>
  <div>
    <!--
      Preload fonts to prevent the flicker that can occur
      when other pages are visited
    -->
    <div class="preload-fonts">
      <span v-for="(font, index) in fonts" :key="index" :style="{ fontFamily: font }">
      </span>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class App extends Vue {
    private fonts = ['Anybody', 'Epilogue', 'Epilogue-Italic', 'Imbue']

    debounce(callback: Function, wait = 20) {
      let timeout = 0

      let func = (...args: any) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => callback(...args), wait)
      }

      return func
    }

    /**
     * Updates the --vh variable used in the height mixin
     */
    updateViewport() {
      this.debounce(() => {
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      }, 250)()
    }

    mounted() {
      window.addEventListener('resize', this.updateViewport)
    }

    destroyed() {
      window.removeEventListener('resize', this.updateViewport)
    }
  }
</script>
