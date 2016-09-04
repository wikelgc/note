import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.debug = true

const state = {
  selected: null,
  placeholder: 'Select a Country',
  multiple: true,
  maxHeight: '400px',
  options: {
    advanced: require('../data/advanced.js'),
    simple: require('../data/simple.js'),
  },
  optionType: 'advanced'
}

const mutations = {
  SET_SELECTED (state, selected) {
    state.selected = selected
  },

  TOGGLE_OPTION_TYPE (state) {
    if( state.optionType === 'advanced' ) {
      state.optionType = 'simple'
    } else {
      state.optionType = 'advanced'
    }
  },

  SET_PLACEHOLDER (state, placeholder) {
    state.placeholder = placeholder
  },

  TOGGLE_MULTIPLE (state) {
    state.multiple = ! state.multiple
  },

  SET_MAX_HEIGHT (state, maxHeight) {
    state.maxHeight = maxHeight
  }
}

export default new Vuex.Store({
  state,
  mutations
})
