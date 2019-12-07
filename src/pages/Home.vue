<template>
  <div>
    <h1 class="header" id="top" ref="headerTop">Cameron</h1>
    <h1 class="header" id="bottom" ref="headerBottom">Cuff</h1>
    <div id="center">
      <div ref="textWrapper">
        <span v-for="(word, index) in landingText.split(' ')" :key="index">
          {{ word }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import { TimelineMax } from 'gsap/all';

  const headerAnimDuration = 1.5;
  const enterTimeline = new TimelineMax({ paused: true });
  const exitTimeline = new TimelineMax({ paused: true });

  export default {
    data() {
      return {
        landingText: 'Hello, welcome to my portfolio.'
      };
    },
    beforeRouteLeave(to, from, next) {
      exitTimeline
        .staggerTo(this.$refs.textWrapper.children, 1, { y: 20, opacity: 0, stagger: -0.2 }, 0)
        .to(this.$refs.headerTop, 1, { y: -70, opacity: 0 }, 0)
        .to(this.$refs.headerBottom, 1, { y: 70, opacity: 0 }, 0)
        .eventCallback('onComplete', next)
        .play();
      // Need to clear the timeline so it restarts on mount
      enterTimeline.clear();
    },
    mounted() {
      exitTimeline.clear();
      enterTimeline
        .fromTo(
          this.$refs.headerTop,
          headerAnimDuration,
          { y: -110, opacity: 0 },
          { y: 0, opacity: 1 },
          0
        )
        .fromTo(
          this.$refs.headerBottom,
          headerAnimDuration,
          { y: 110, opacity: 0 },
          { y: 0, opacity: 1 },
          0
        )
        .fromTo(
          this.$refs.textWrapper.children[0],
          1,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1 },
          headerAnimDuration - 0.5
        )
        .staggerFromTo(
          Array.prototype.slice.call(this.$refs.textWrapper.children, 1),
          0.5,
          { y: -10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.2
          },
          2
        )
        .delay(0.5)
        .play();
    }
  };
</script>

<style lang="scss" scoped>
  .header {
    user-select: none;
    margin: 0;
    font-size: 120px;
    position: fixed;
    line-height: 75%;

    &#top {
      margin-left: 20px;
    }

    &#bottom {
      transform: rotate(180deg);
      right: 0;
      bottom: 0;
      margin-right: 20px;
    }

    @media screen and (max-width: 850px) {
      font-size: 65px;
      &#top {
        margin-top: 16px;
      }
      &#bottom {
        margin-bottom: 16px;
      }
    }

    @media screen and (max-width: 360px) {
      font-size: 50px;
    }
  }

  #center {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    margin: 0 10% 0 10%;
    user-select: none;

    & span {
      font-size: 28px;
      transform-origin: left;
      display: inline-block;
      padding: 0.12em;
    }
  }
</style>
