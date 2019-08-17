<template>
  <div id="projects">
    <div ref="homeLink">
      <router-link to="/" tag="p" class="router-link">Home</router-link>
    </div>
    <section id="motion-py" class="flex" ref="motionPy">
      <div class="flex">
        <div>
          <h1>MotionPy</h1>
          <p class="link">
            <a target=_blank href="https://github.com/ctcuff/MotionPy">View Code</a>
          </p>
        </div>
        <p class="description">
          A motion detection system using a Raspberry Pi 3, camera module, breadboard, some paper
          clips and a top-of-the-line cardboard box. A Python server (surprise surprise, it's Flask again)
          running on the Raspberry Pi sends an Android app, written in Java and Kotlin, a notification
          and a picture when movement is detected. Images are saved online using Firebase database.
        </p>
      </div>
    </section>
    <section ref="ucfParking">
      <div class="flex" id="ucf-parking">
        <p class="description">
          A website along with an api that tracks how full each parking garage is.
          Every hour, a scrapper scraps UCF's parking site and saves it to a MongoDB database.
          The backend was created using Python (Flask, again) and the frontend, Vue.js.
        </p>
        <div>
          <h1>UCFParking</h1>
          <div class="link-wrapper">
            <p class="link">
              <a target=_blank href="https://github.com/ctcuff/UCFParking-Web">View Code</a>
            </p>
            <p class="link">
              <a target=_blank href="https://ucfparking.herokuapp.com/">View Site</a>
            </p>
          </div>
        </div>
      </div>
    </section>
    <section ref="tweetTracker">
      <div class="flex" id="tweet-tracker">
        <div>
          <h1>Tweet-Tracker</h1>
          <div class="link-wrapper">
            <p class="link tweet-tracker-link">
              <a target=_blank href="https://github.com/ctcuff/Tweet-Tracker">View Code</a>
            </p>
            <p class="link tweet-tracker-link">
              <a target=_blank href="https://tweeter-tracker.herokuapp.com/">View Site</a>
            </p>
          </div>
        </div>
        <p class="description">
          A website to track the occurrences of a given keyword on Twitter in real time.
          This project was built using Python (Flask) with web sockets as a backend,
          and React.js with Redux on the frontend.
        </p>
      </div>
    </section>
  </div>
</template>

<script>
  import { TimelineMax } from 'gsap/all';

  const enterTimeline = new TimelineMax({ paused: true });
  const exitTimeline = new TimelineMax({ paused: true });

  export default {
    beforeRouteLeave(to, from, next) {
      enterTimeline.clear();
      exitTimeline
        .to(this.$refs.homeLink, 1.5, { y: -70, opacity: 0 }, 0)
        .to(this.$refs.motionPy, 1.5, { y: -70, opacity: 0 }, 0)
        .to(this.$refs.ucfParking, 1.5, { x: 70, opacity: 0 }, 0)
        .to(this.$refs.tweetTracker, 1.5, { y: 70, opacity: 0 }, 0)
        .eventCallback('onComplete', next)
        .play();
    },
    mounted() {
      exitTimeline.clear();
      enterTimeline
        .fromTo(this.$refs.homeLink, 2, { y: -70, opacity: 0 }, { y: 0, opacity: 1 }, 0)
        .fromTo(this.$refs.motionPy, 2, { x: 70, opacity: 0 }, { x: 0, opacity: 1 }, 0)
        .fromTo(this.$refs.ucfParking, 2, { y: 70, opacity: 0 }, { y: 0, opacity: 1 }, 0)
        .fromTo(this.$refs.tweetTracker, 2, { x: -70, opacity: 0 }, { x: 0, opacity: 1 }, 0)
        .delay(0.5)
        .play();
    }
  };
</script>

<style lang="scss" scoped>

  .flex {
    display: flex;
    width: 100%;

    & h1 {
      padding-top: 40px;
    }

    &#tweet-tracker {
      flex-direction: column;
    }

    @media screen and (max-width: 760px) {
      & {
        flex-direction: column;
      }
      &#ucf-parking {
        flex-direction: column-reverse;
      }
    }
  }

  h1 {
    margin: 0;
    font-size: 50px;

    @media screen and (max-width: 760px) {
      font-size: 42px;
    }
  }

  h2 {
    cursor: pointer;
  }

  p {
    font-size: 22px;
    line-height: 1.5em;

    @media screen and (max-width: 760px) {
      font-size: 20px;
      line-height: 1.7em;
    }
  }

  .description {
    padding: 0 26px 0 26px;
  }

  .center {
    display: flex;
    width: 100%;
    justify-content: center;
  }

  .link {
    margin: 0;
    padding: 16px 26px 0 0;

    &.tweet-tracker-link {
      padding: 16px 0 0 26px;
    }

    @media screen and (max-width: 760px) {
      padding: 16px 0 0 26px;
    }
  }

  .router-link {
    margin-bottom: -8px;
    cursor: pointer;
    transition: color 0.2s ease-in-out;
    text-decoration: underline;

    &:hover {
      color: red;
    }
  }

  .link-wrapper {
    display: flex;
  }

  #projects {
    margin: 0 64px 16px 64px;

    @media screen and (max-width: 900px) {
      margin: 0 32px 16px 32px;
    }

    @media screen and (max-width: 700px) {
      margin: 0 16px 16px 16px;
    }
  }
</style>