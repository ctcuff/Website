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

  @Component
  export default class Navbar extends Vue {
    $refs!: {
      navbar: HTMLElement
    }

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

    mounted() {
      gsap.set(this.$refs.navbar, {
        opacity: 0,
        y: '-100%'
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/components/navbar';
</style>
