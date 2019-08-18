<template>
  <div id="contact">
    <div id="link-container" ref="linkContainer">
      <router-link to="/" tag="span">Home</router-link>
    </div>
    <div id="container" ref="imgContainer">
      <a target="_blank" href="https://github.com/ctcuff">
        <img src="../assets/images/github.svg" alt="Github" title="Github">
      </a>
      <a href="mailto:dev.ctcuff@gmail.com">
        <img src="../assets/images/email.svg" alt="Email" title="Email">
      </a>
      <a href="https://www.linkedin.com/in/cameron-cuff-126405161/" target="_blank">
        <img src="../assets/images/linked-in.svg" alt="linkedin" title="linkedin">
      </a>
      <a href="../cuff_resume.pdf" target="_blank">
        <img src="../assets/images/resume.svg" alt="Resume" title="Resume">
      </a>
    </div>
  </div>
</template>

<script>
  import { TimelineMax } from 'gsap/all';

  const enterTimeline = new TimelineMax({ paused: true });
  const exitTimeline = new TimelineMax({ paused: true });

  export default {
    data() {
      return {
        linkChildren: [],
        isMobile: window.innerWidth <= 500
      };
    },
    beforeRouteLeave(to, from, next) {
      const { linkChildren, isMobile } = this;
      enterTimeline.clear();
      exitTimeline
        .fromTo(this.$refs.linkContainer, 2, { y: 0, opacity: 1 }, { y: -40, opacity: 0 }, 0);

      if (isMobile) {
        exitTimeline
          .fromTo(linkChildren[0], 2, { y: 0, opacity: 1 }, { y: -70, opacity: 0 }, 0)
          .fromTo(linkChildren[1], 2, { x: 0, opacity: 1 }, { x: -70, opacity: 0 }, 0)
          .fromTo(linkChildren[2], 2, { x: 0, opacity: 1 }, { x: 70, opacity: 0 }, 0)
          .fromTo(linkChildren[3], 2, { y: 0, opacity: 1 }, { y: 70, opacity: 0 }, 0);
      } else {
        exitTimeline
          .fromTo(linkChildren[0], 2, { x: 0, opacity: 1 }, { x: -70, opacity: 0 }, 0)
          .fromTo(linkChildren[1], 2, { y: 0, opacity: 1 }, { y: -70, opacity: 0 }, 0)
          .fromTo(linkChildren[2], 2, { y: 0, opacity: 1 }, { y: 70, opacity: 0 }, 0)
          .fromTo(linkChildren[3], 2, { x: 0, opacity: 1 }, { x: 70, opacity: 0 }, 0);
      }

      exitTimeline
        .to(this.$refs.linkContainer, 1.5, { y: -40, opacity: 0 }, 0)
        .eventCallback('onComplete', next)
        .play();
    },
    mounted() {
      const { linkChildren, isMobile } = this;
      exitTimeline.clear();

      Array.prototype.forEach.call(this.$refs.imgContainer.children, child => {
        linkChildren.push(child.firstElementChild);
      });

      if (isMobile) {
        enterTimeline
          .fromTo(this.$refs.linkContainer, 2, { y: -40, opacity: 0 }, { y: 0, opacity: 1 }, 0)
          .fromTo(linkChildren[0], 2, { y: -70, opacity: 0 }, { y: 0, opacity: 1 }, 0)
          .fromTo(linkChildren[1], 2, { x: -70, opacity: 0 }, { x: 0, opacity: 1 }, 0.4)
          .fromTo(linkChildren[2], 2, { x: 70, opacity: 0 }, { x: 0, opacity: 1 }, 0.8)
          .fromTo(linkChildren[3], 2, { y: 70, opacity: 0 }, { y: 0, opacity: 1 }, 1.2);
      } else {
        enterTimeline
          .fromTo(this.$refs.linkContainer, 2, { y: -40, opacity: 0 }, { y: 0, opacity: 1 }, 0)
          .fromTo(linkChildren[0], 2, { x: -70, opacity: 0 }, { x: 0, opacity: 1 }, 0)
          .fromTo(linkChildren[1], 2, { y: -70, opacity: 0 }, { y: 0, opacity: 1 }, 0.4)
          .fromTo(linkChildren[2], 2, { y: 70, opacity: 0 }, { y: 0, opacity: 1 }, 0.8)
          .fromTo(linkChildren[3], 2, { x: 70, opacity: 0 }, { x: 0, opacity: 1 }, 1.2);
      }

      enterTimeline.delay(0.5).play();
    }
  };
</script>

<style lang="scss" scoped>
  #contact {
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    text-align: center;
  }

  #container {
    margin: auto;
    @media screen and (max-width: 500px) {
      display: grid;
    }
  }

  #link-container {
    margin: 16px;
    right: 0;
    position: fixed;
  }

  img {
    width: 64px;
    margin: 16px;
  }

  span {
    user-select: none;
    font-size: 25px;
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: #000;
      transform-origin: bottom right;
      transform: scaleX(0);
      transition: transform 0.5s ease;
    }

    &:hover::before {
      transform-origin: bottom left;
      transform: scaleX(1);
    }
  }
</style>