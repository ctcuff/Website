import { Route, NavigationGuardNext } from 'vue-router'

// Augment Vue component instance type to allow auto-complete
declare module 'vue/types/vue' {
  interface Vue {
    beforeRouteEnter?(to: Route, from: Route, next: NavigationGuardNext): void
    beforeRouteLeave?(to: Route, from: Route, next: NavigationGuardNext): void
    beforeRouteUpdate?(to: Route, from: Route, next: NavigationGuardNext): void
  }
}
