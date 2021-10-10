<template>
  <!-- <div
    class="container"
    ref="scrollContainer"
    data-scroll-container
    data-scroll-direction="horizontal"
  >
    <img class="card" v-for="(imgSrc, index) in images" :key="index" :src="imgSrc" />
  </div> -->
  <section class="container">
    <div class="space-holder" data-scroll-container data-scroll-speed="0.1">
      <div class="sticky">
        <div class="horizontal" ref="scrollContainer">
          <div role="feed" class="cards">
            <div class="sample-card" v-for="(src, index) in images" :key="index">
              <img :src="src" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  // import LocomotiveScroll from 'locomotive-scroll'
  import VirtualScroll from 'virtual-scroll'

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
        images
      }
    },

    mounted() {
      const scroller = new VirtualScroll()

      const spaceHolder = document.querySelector('.space-holder')
      const horizontal = document.querySelector('.horizontal')
      const sticky = document.querySelector('.sticky')
      const height = this.calcDynamicHeight(horizontal)

      spaceHolder.style.height = `${height}px`
      let delta = 0

      scroller.on(event => {
        delta += event.deltaY
        delta = Math.max((height - window.innerWidth) * -1, delta)
        delta = Math.min(0, delta)
        horizontal.style.transform = `translateX(${delta}px)`
      })

      // window.addEventListener('scroll', () => {
      //   horizontal.style.transform = `translateX(-${sticky.offsetTop}px)`
      // })

      window.addEventListener('resize', () => {
        spaceHolder.style.height = `${this.calcDynamicHeight(horizontal)}px`
      })
    },

    methods: {
      calcDynamicHeight(ref) {
        const vw = window.innerWidth
        const vh = window.innerHeight
        const objectWidth = ref.scrollWidth
        // 150 is the padding (in pixels) desired on the right side of the .cards container. This can be set to whatever your styles dictate
        return objectWidth
      },

      clamp(min, value, max) {
        return Math.max(min, Math.min(value, max))
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/projects.scss';
</style>
