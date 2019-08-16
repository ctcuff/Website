<template>
  <div id="about">
    <h1 ref="header">About</h1>
    <div id="link-container" ref="linkContainer">
      <router-link to="/" tag="p" class="link">Home</router-link>
    </div>
    <div id="center">
      <div id="image-placeholder" ref="image">
        <img src="../assets/images/avatar.jpg" alt="">
      </div>
      <p ref="aboutText">
        Hey there, my name is Cameron Cuff. I'm a Junior studying Computer
        Science at the University of Central Florida. I enjoy programming in
        Java, Python, and Javascript and I'm currently learning React, Vue,
        Typescript, and a bit of Flask for backend tasks. In my free time, I
        love to play piano and clarinet.
      </p>
    </div>
  </div>
</template>

<script>
  import { TimelineMax, Power3 } from 'gsap/all';

  const enterTimeline = new TimelineMax({ paused: true });
  const exitTimeline = new TimelineMax({ paused: true });

  export default {
    beforeRouteLeave(to, from, next) {
      const duration = 1;
      enterTimeline.clear();
      exitTimeline
        .to(this.$refs.header, duration, { y: 100, opacity: 0 }, 0)
        .to(this.$refs.aboutText, duration, { x: -40, opacity: 0 }, 0)
        .to(this.$refs.image, duration, { x: 40, opacity: 0 }, 0)
        .to(this.$refs.linkContainer, duration, { y: -40, opacity: 0 }, 0)
        .eventCallback('onComplete', next)
        .play();
    },
    mounted() {
      exitTimeline.clear();
      enterTimeline
        .fromTo(this.$refs.aboutText, 2, { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, 0)
        .fromTo(this.$refs.image, 2, { opacity: 0, y: -50 }, { opacity: 1, y: 0 }, 0)
        .fromTo(
          this.$refs.header,
          2,
          { opacity: 0, y: 143 },
          { opacity: 1, y: 22 },
          0.5
        )
        .fromTo(this.$refs.linkContainer, 2, { opacity: 0, x: -50 }, { opacity: 1, x: 0 }, 1.5)
        .to(this.$refs.linkContainer, 1.5, { width: '100%', ease: Power3.easeInOut }, 2)
        .play();
    }
  };
</script>

<style lang="scss" scoped>
  $margin-lg: 200px;
  $margin-md: 100px;

  h1 {
    user-select: none;
    margin: 0;
    font-size: 90px;
    position: fixed;
    bottom: 0;
    right: 0;
    @media screen and (max-width: 630px), screen and (max-height: 600px) {
      display: none;
    }
  }

  img {
    border-radius: 50%;
    width: 200px;
    @media screen and (max-width: 150px) {
      width: 150px;
    }
  }

  p {
    margin-top: 32px;
    line-height: 38px;
    font-size: 20px;
  }

  p.link {
    width: 0;
    margin: 0;
    cursor: pointer;
    transition: color 0.2s ease-in-out;
    &:hover {
      color: red;
    }
  }

  #about {
    margin: 16px $margin-lg 0 $margin-lg;

    @media (max-width: 940px) {
      margin: 16px $margin-md 0 $margin-md;
    }

    @media (max-width: 740px) {
      margin: 16px 32px 0 32px;
    }
  }

  #center {
    margin: 32px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  #image-placeholder {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: #909090;
  }

  #link-container {
    border-bottom: 1px dashed;
    width: 0;
  }
</style>
