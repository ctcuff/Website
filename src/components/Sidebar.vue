<template>
  <nav ref="sidebar">
    <div id="flex" ref="linkContainer">
      <router-link to="/about">About</router-link>
      <router-link to="/projects">Projects</router-link>
      <router-link to="/contact">Contact</router-link>
    </div>
  </nav>
</template>

<script>
  import { TimelineMax } from 'gsap/all';

  const tl = new TimelineMax({ paused: true });

  export default {
    mounted() {
      tl
        .fromTo(
          this.$refs.sidebar,
          1,
          {
            width: 0,
            opacity: 0
          },
          {
            width: 40,
            opacity: 1
          },
          0
        )
        .staggerFromTo(
          this.$refs.linkContainer.children,
          1.5,
          { opacity: 0 },
          { opacity: 1, stagger: 0.5 },
        )
        .delay(0.5)
        .play();
    }
  };
</script>

<style lang="scss" scoped>
  @import "../assets/scss/sidebar";

  nav {
    position: fixed;
    top: 0;
    border-right: 1px solid black;
    left: 0;
    right: 0;
    bottom: 0;
    width: $sidebar-width;
    background-color: #fff;
    z-index: 100;
  }

  a {
    font-size: 20px;
    margin: 70px 0 0 4px;
    transform-origin: 0 0;
    transform: rotate(-90deg);
    text-decoration: none;
    color: black;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: red;
    }
  }

  #flex {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-around;
  }

  .router-link-active {
    color: red
  }
</style>
