import Vue from 'vue';
import App from './App.vue';
import router from './router';
import  CSSPlugin from 'gsap/CSSPlugin';
import '@/assets/scss/global.scss';

// Needed to make sure animations work in production
// see https://github.com/greensock/GreenSock-JS/issues/285#issuecomment-433729632
const _ = CSSPlugin;

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
