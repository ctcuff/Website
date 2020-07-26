<template>
  <div class="content">
    <div class="content__left">
      <img
        src="../assets/images/profile-pixel.png"
        alt="pixelated profile"
        ref="profileImage"
        class="content__image"
      />
    </div>
    <div class="content__right">
      <section>
        <div class="no-overflow">
          <h1 class="content__about-header" ref="aboutHeader">About Me</h1>
        </div>
        <div class="no-overflow">
          <p class="content__about-text" ref="aboutText">
            I won't bore you with my life story so here's the jist: I'm a senior at UCF
            studying Computer Science. I currently work as a Web Applications Developer
            for the
            <a
              href="https://techrangers.cdl.ucf.edu/about.html"
              target="_blank"
              class="content__link"
              rel="noopener noreferrer"
            >
              Center for Distributed Learning.
            </a>
            In my free time, I like to play piano and work on side projects.
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import { gsap } from 'gsap'

  const timeline = gsap.timeline({ paused: true })

  export default {
    data: () => ({
      animationDuration: 0.8
    }),
    beforeRouteLeave(to, from, next) {
      const timelineOpts = {
        opacity: 0,
        ease: 'Power2.easeIn',
        duration: this.animationDuration,
        y: '100%'
      }

      timeline
        .to(this.$refs.aboutText, timelineOpts, 0)
        .to(this.$refs.aboutHeader, timelineOpts, 0)
        .to(
          this.$refs.profileImage,
          {
            opacity: 0,
            scale: 0.9,
            duration: this.animationDuration,
            delay: 0.2
          },
          0
        )
        .eventCallback('onComplete', () => next())
        .play(0)
    },
    mounted() {
      const aboutContent = document.querySelectorAll(
        '.content__about-header, .content__about-text'
      )

      gsap.fromTo(
        aboutContent,
        {
          opacity: 0,
          y: '100%'
        },
        {
          opacity: 1,
          duration: this.animationDuration,
          y: '0%',
          stagger: 0.2
        }
      )

      gsap.fromTo(
        this.$refs.profileImage,
        {
          opacity: 0,
          scale: 0.9
        },
        {
          opacity: 1,
          scale: 1,
          duration: this.animationDuration
        }
      )
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/components/about';
</style>
