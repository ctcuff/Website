import 'vue-class-component/hooks'
import './class-component-hooks'
import 'simplebar'
import 'simplebar/dist/simplebar.css'
import './scss/global.scss'
import 'splitting/dist/splitting.css'
import 'splitting/dist/splitting-cells.css'
import Vue from 'vue'
import App from './components/App.vue'
import router from './router'
// @ts-ignore
import CSSPlugin from 'gsap/CSSPlugin'

// Needed to make sure animations work in production
// see https://github.com/greensock/GreenSock-JS/issues/285#issuecomment-433729632
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _ = CSSPlugin

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
