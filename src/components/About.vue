<template>
  <div class="content">
    <div class="content__left">
      <img
        src="../assets/images/profile.svg"
        alt="profile"
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
            I was born at a very young age... Ok, I won't bore you with
            my life story so here's the jist: I'm a Florida native currently working as a
            software engineer at Microsoft. In my free time, I like to play piano and tenor
            sax and occasionally bake.
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import { gsap } from 'gsap'

  export default {
    data: () => ({
      animationDuration: 0.8
    }),
    beforeRouteLeave(to, from, next) {
      const timelineOpts = {
        opacity: 0,
        ease: 'power1.in',
        duration: this.animationDuration,
        y: '100%'
      }

      gsap
        .timeline()
        .to(this.$refs.aboutText, timelineOpts, 0)
        .to(this.$refs.aboutHeader, timelineOpts, 0)
        .to(
          this.$refs.profileImage,
          {
            opacity: 0,
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
          ease: 'power1.out',
          stagger: 0.2
        }
      )

      gsap.fromTo(
        this.$refs.profileImage,
        {
          opacity: 0
        },
        {
          opacity: 1,
          duration: this.animationDuration
        }
      )
    }
  }
</script>

<style lang="scss" scoped>
  @import '../scss/components/about';
</style>
