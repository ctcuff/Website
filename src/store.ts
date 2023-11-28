import Vuex from 'vuex'
import Vue from 'vue'

type AppState = {
  /**
   * Controls whether the curtain animation on the home page has finished
   */
  isLandingAnimationFinished: boolean
}

Vue.use(Vuex)

const store = new Vuex.Store<AppState>({
  state: {
    isLandingAnimationFinished: false
  },
  mutations: {
    setLandingAnimationFinished(state: AppState, finished: boolean) {
      state.isLandingAnimationFinished = finished
    }
  }
})

export { store as default, AppState }
