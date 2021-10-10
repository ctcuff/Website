<template>
  <div class="slider">
    <div class="card-container" ref="cardContainer" :style="translateX">
      <div class="card" v-for="(src, index) in images" :key="index">
        <img :src="src" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
  import VirtualScroll from 'virtual-scroll'
  import gsap from 'gsap'
  import { projects } from '@/project-info'

  // eslint-disable-next-line no-unused-vars
  const images = [
    'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80&ar=0.8',
    'https://images.unsplash.com/photo-1566688342604-dbe3e7357104?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80&ar=0.8',
    'https://images.unsplash.com/photo-1472835560847-37d024ebacdc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80&ar=0.8',
    'https://images.unsplash.com/photo-1541320823636-40247af897bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80&ar=0.8',
    'https://images.unsplash.com/photo-1566787020216-3e4f973ec5ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80&ar=0.8',
    'https://images.unsplash.com/photo-1523181729404-8a3b7b6f918d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80&ar=0.8'
  ]

  export default {
    data() {
      return {
        images: projects.map(project => project.foregroundImage),
        prevTranslation: 0,
        translation: 0,
        padding: 200,
        scroller: null
      }
    },

    computed: {
      translateX() {
        return `transform: translateX(${this.prevTranslation}px)`
      }
    },

    methods: {
      lerp(a, b, n) {
        return (1 - n) * a + n * b
      },

      tick() {
        // Fixes the translation value to at most 2 decimal points. Having
        // more precision causes the translation value to constantly update
        // by very small amounts.
        // https://stackoverflow.com/a/11832950/9124220
        const value = this.lerp(this.prevTranslation, this.translation, 0.1)
        this.prevTranslation = Math.round((value + Number.EPSILON) * 100) / 100
      }
    },

    beforeMount() {
      document.documentElement.style.setProperty('--image-padding', `${this.padding}px`)
    },

    mounted() {
      const container = this.$refs.cardContainer
      const containerWidth = container.scrollWidth + this.padding
      let delta = 0

      this.scroller = new VirtualScroll({
        mouseMultiplier: 0.45
      })

      this.scroller.on(event => {
        delta += event.deltaY
        delta = Math.max((containerWidth - window.innerWidth) * -1, delta)
        delta = Math.min(0, delta)

        this.translation = delta
      })

      gsap.ticker.add(this.tick)
    },

    destroyed() {
      if (this.scroller) {
        this.scroller.destroy()
      }

      gsap.ticker.remove(this.tick)
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/projects.scss';
</style>
