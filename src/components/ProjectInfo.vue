<template>
  <div class="root">
    <header class="project-header">
      <div class="no-overflow">
        <h1 ref="header">{{ projectData.title }}</h1>
      </div>
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
  import { projectData } from '@/project-info'

  export default {
    data() {
      let index = this.$route.query && this.$route.query.index

      if (index) {
        index = parseInt(this.$route.query.index)
      }

      return {
        projectData: projectData[index] || projectData[0],
        animationDuration: 0.8,
        index
      }
    },
    beforeRouteLeave(to, from, next) {
      gsap
        .timeline()
        .eventCallback('onComplete', () => next())
        .to(
          this.$refs.header,
          {
            y: '100%',
            opacity: 0,
            ease: 'Power2.easeIn',
            duration: this.animationDuration
          },
          0.3
        )
        .to(
          this.$refs.image,
          {
            y: '15%',
            opacity: 0,
            ease: 'Power2.easeIn',
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
      this.targetElements = document.querySelectorAll('[data-animate]')

      gsap.fromTo(
        this.$refs.header,
        {
          y: '100%',
          opacity: 0
        },
        {
          y: '0%',
          opacity: 1,
          duration: 1.4
        }
      )

      gsap.fromTo(
        this.$refs.image,
        {
          y: '15%',
          opacity: 0
        },
        {
          y: '0%',
          opacity: 1,
          delay: 0.3,
          duration: 1.2
        }
      )

      this.initObserver()
    },
    methods: {
      initObserver() {
        const opts = {
          root: this.$refs.root,
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
