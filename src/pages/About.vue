<template>
  <div id="about">
    <h1 ref="header">About</h1>
    <div id="link-container" ref="linkContainer">
      <router-link to="/" tag="p" class="link">Home</router-link>
    </div>
    <div id="center">
      <div id="image-placeholder" ref="image">
        <img src="../assets/images/avatar.jpg" alt="profile image">
      </div>
      <p ref="aboutText">
        Hey there, my name is Cameron Cuff. I'm a Junior studying Computer
        Science at the University of Central Florida. I originally started at
        the University of North Florida in 2017 majoring in music performance,
        but I decided to take a risk and change my major to computer science.
        After finding out that I actually enjoyed it, I decided to transfer to
        UCF in the fall of 2018. I currently work as a Web Applications Developer
        for the
        <a href="https://cdl.ucf.edu/" target="_blank">
          Center for Distributed Learning at UCF
        </a>.
        I enjoy programming in Java, Python, and Javascript and I'm learning
        about React, Vue, and Go for backend tasks. In my free time,
        I love to play piano and clarinet.
      </p>
    </div>
  </div>
</template>

<script>
  import { TimelineMax, Power3 } from 'gsap/all';
  import VanillaTilt from 'vanilla-tilt';

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
      VanillaTilt.init(this.$refs.image, {
        speed: 1000,
        scale: 1.1,
        gyroscope: true
      });

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

    @media screen and (max-width: 900px), screen and (max-height: 600px) {
      display: none;
    }

    @media screen and (max-width: 1200px) {
      font-size: 65px;
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
    font-size: 16px;

    @media screen and (max-width: 900px) {
      font-size: 20px;
    }
  }

  p.link {
    width: 0;
    margin: 0;
    font-size: 20px;
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
