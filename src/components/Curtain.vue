<template>
  <div class="curtain">
    <div class="curtain__inner" ref="curtainInner">
      <h1 class="curtain__text">{{ text }}</h1>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/variables';

  .curtain {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: $text-color;
    align-items: center;
    overflow: hidden;

    &:nth-child(even) {
      background-color: $bg-color;
      h1 {
        color: $text-color;
      }
    }
  }

  .curtain__inner {
    color: $bg-color;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .curtain__text {
    font-size: 10vw;
    font-variation-settings: 'wght' 600, 'wdth' 100, 'slnt' 0;
    margin: 0 1em;
    user-select: none;
  }
</style>
