<template>
  <div class="root">
    <header class="project-header">
      <h1 class="no-overflow" ref="header" data-splitting>{{ projectData.title }}</h1>
    </header>
    <div class="project-image no-overflow">
      <img :src="projectData.image.src" :alt="projectData.image.alt" ref="image" />
    </div>
    <section
      class="project-info no-overflow"
      v-for="(section, index) in projectData.sections"
      :key="index"
    >
      <div data-animate>
        <p class="heading">{{ section.heading }}</p>
        <p class="details">{{ section.text }}</p>
      </div>
    </section>
    <section class="project-info no-overflow" ref="links">
      <div data-animate>
        <p class="heading">Feed your curiosity</p>
        <div class="project-links">
          <a :href="projectData.links.github" target="_blank" rel="noopener noreferrer">
            Show me the code
          </a>
          <a
            v-if="projectData.links.website"
            :href="projectData.links.website"
            target="_blank"
            rel="noopener noreferrer"
          >
            Take me to the project
          </a>
        </div>
      </div>
    </section>
    <div class="all-projects-link" data-animate>
      <router-link :to="`/projects?index=${index}`">
        Back to all projects
      </router-link>
    </div>
  </div>
</template>

<script>
  // Polyfill
  import 'intersection-observer'
  import { gsap } from 'gsap'
  import { projects } from '@/project-info'
  import ScrollBar from 'smooth-scrollbar'
  import splitting from 'splitting'

  export default {
    data() {
      let index = this.$route.query && this.$route.query.index

      if (index) {
        index = parseInt(this.$route.query.index)
      }

      return {
        projectData: projects[index].data || projects[0].data,
        animationDuration: 0.8,
        index
      }
    },
    beforeRouteLeave(_to, _from, next) {
      const headerText = this.$refs.header.querySelectorAll('.word > .char')

      gsap
        .timeline()
        .eventCallback('onComplete', () => {
          ScrollBar.destroyAll()
          next()
        })
        .to(
          headerText,
          {
            y: '100%',
            opacity: 0,
            ease: 'power2.in',
            duration: 1,
            stagger: 0.06
          },
          0
        )
        .to(
          this.$refs.image,
          {
            y: '15%',
            opacity: 0,
            ease: 'power2.in',
            duration: this.animationDuration
          },
          0
        )
        .to(
          this.targetElements,
          {
            opacity: 0,
            duration: this.animationDuration
          },
          0
        )
    },
    mounted() {
      splitting()
      this.targetElements = document.querySelectorAll('[data-animate]')

      // Value comes from _breakpoints.scss
      if (window.innerWidth >= 992) {
        ScrollBar.init(document.querySelector('.app'))
      }

      const headerText = this.$refs.header.querySelectorAll('.word > .char')

      gsap
        .timeline()
        .fromTo(
          headerText,
          {
            y: '100%',
            opacity: 0
          },
          {
            y: '0%',
            opacity: 1,
            duration: 1.4,
            ease: 'power2.out',
            stagger: 0.06
          },
          0
        )
        .fromTo(
          this.$refs.image,
          {
            y: '15%',
            opacity: 0
          },
          {
            y: '0%',
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out'
          },
          0.3
        )

      this.initObserver()
    },
    methods: {
      initObserver() {
        const opts = {
          margin: '0px',
          threshold: 0.5
        }

        const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
              this.animateElement(entry.target)
              observer.unobserve(entry.target)
            }
          })
        }, opts)

        this.targetElements.forEach(element => observer.observe(element))
      },
      animateElement(target) {
        gsap.to(target, {
          opacity: 1,
          duration: this.animationDuration
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/components/project-info';
</style>
