import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: 'Box Breathing'
  },
  mutations: {
    SET_TITLE(state, title) {
      state.title = title
    }
  },
  actions: {
    setTitle({ commit }, title) {
      commit('SET_TITLE', title)
    }
  },
  modules: {}
})
