<template>
  <div class="root" ref="root" data-simplebar>
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
      <router-link :to="`/projects?index=${projectIndex}`">
        Back to all projects
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
  // Polyfill
  import 'intersection-observer'
  import { gsap } from 'gsap'
  import { projects } from '@/project-info'
  import splitting from 'splitting'
  import Component from 'vue-class-component'
  import Vue from 'vue'
  import { NavigationGuardNext, Route } from 'vue-router'

  @Component
  export default class ProjectInfo extends Vue {
    $refs!: {
      header: HTMLHeadingElement
      image: HTMLImageElement
      links: HTMLElement
      root: HTMLDivElement
    }

    /**
     * Used to apply a fade transition to any element with the [data-animate] attribute
     */
    targetElements: Element[] = []
    animationDuration = 0.8
    projectIndex = parseInt((this.$route.query.index as string | null) || '') || 0
    projectData = projects[this.projectIndex].data

    beforeRouteLeave(_to: Route, _from: Route, next: NavigationGuardNext) {
      const headerText = this.$refs.header.querySelectorAll('.word > .char')

      gsap
        .timeline()
        .eventCallback('onComplete', () => next())
        .to(
          headerText,
          {
            y: '-100%',
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
    }

    initObserver() {
      const opts = {
        margin: '0px',
        threshold: 0.5
      }

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(({ intersectionRatio, target }) => {
          if (intersectionRatio > 0) {
            gsap.to(target, {
              opacity: 1,
              duration: this.animationDuration
            })
            observer.unobserve(target)
          }
        })
      }, opts)

      this.targetElements.forEach(element => observer.observe(element))
    }

    mounted() {
      splitting()
      this.targetElements = Array.from(document.querySelectorAll('[data-animate]'))

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
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/components/project-info';
</style>
