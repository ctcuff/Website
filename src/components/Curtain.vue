<template>
  <div class="curtain">
    <div class="curtain__inner" ref="curtainInner">
      <h1 class="curtain__text">{{ text }}</h1>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'

  @Component
  export default class Curtain extends Vue {
    @Prop({ required: true, type: String }) readonly text!: string
  }
</script>

<style lang="scss" scoped>
  @import '../scss/components/curtain.scss';
</style>
