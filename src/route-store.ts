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
    fromPath: null
  },
  mutations: {
    setFromPath(state: RouterState, route: RouterState['fromPath']) {
      state.fromPath = route
    }
  }
})

export type RouterState = {
  fromPath: null | 'home' | 'about'
}

export default store
