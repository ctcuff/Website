<template>
  <div class="root">
    <header class="project-header">
      <h1>{{ projectData.title }}</h1>
    </header>
    <div class="project-image">
      <img :src="projectData.image.src" :alt="projectData.image.alt" />
    </div>
    <section
      class="project-info"
      v-for="(section, index) in projectData.sections"
      :key="index"
    >
      <p class="heading">{{ section.heading }}</p>
      <p class="details">{{ section.text }}</p>
    </section>
    <section class="project-info">
      <p class="heading">Feeding your curiosity</p>
      <div class="project-links">
        <a :href="projectData.links.github" target="_blank" rel="noopener noreferrer">
          Show me the code
        </a>
        <a :href="projectData.links.website" target="_blank" rel="noopener noreferrer">
          Take me to the project
        </a>
      </div>
    </section>
  </div>
</template>

<script>
  import { projectData } from '@/project-info'

  export default {
    data() {
      let index = this.$route.query && this.$route.query.index

      if (index) {
        index = parseInt(this.$route.query.index)
      }

      return {
        projectData: projectData[index] || projectData[0]
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/components/project-info';
</style>
