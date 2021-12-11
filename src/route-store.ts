import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

/**
 * A really simple store who's only purpose is to keep track
 * of what page we're coming from when a new route is entered.
 * This enables different animations depending on `fromPath`.
 */
const store = new Vuex.Store<RouterState>({
  state: {
    fromPath: null,
    transitionText: ''
  },
  mutations: {
    setFromPath(state: RouterState, route: RouterState['fromPath']) {
      state.fromPath = route
    },
    setTransitionText(state: RouterState, text: string) {
      state.transitionText = text
    }
  }
})

export type RouterState = {
  /**
   * The path the current route previously came from
   */
  fromPath: null | 'home' | 'about'
  /**
   * Mostly used between transitions. Keeps track of the text that shows
   * on the curtains between route transitions
   */
  transitionText: string
}

export default store
