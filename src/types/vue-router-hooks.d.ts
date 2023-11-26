/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Route, NavigationGuardNext } from 'vue-router'
import Vue from 'vue'

// Augment Vue component instance type to allow auto-complete
declare module 'vue/types/vue' {
  interface Vue {
    beforeRouteEnter?(to: Route, from: Route, next: NavigationGuardNext): void
    beforeRouteLeave?(to: Route, from: Route, next: NavigationGuardNext): void
    beforeRouteUpdate?(to: Route, from: Route, next: NavigationGuardNext): void
  }
}
