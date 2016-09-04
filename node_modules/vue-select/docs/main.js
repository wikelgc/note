import 'prismjs'
import Vue from 'vue'
import App from './Docs.vue'
import store from './vuex/store'
import Resource from 'vue-resource'
import vSelect from '../src/components/Select.vue'
import vCode from './components/Code.vue'

Vue.use(Resource)

Vue.component('v-select', vSelect)
Vue.component('v-code', vCode)

Vue.filter('score', function (value) {
  return Math.round(value)
})

Vue.config.debug = true
Vue.config.devtools = true

import { setSelected, toggleMultiple, setPlaceholder, toggleOptionType } from './vuex/actions'


/* eslint-disable no-new */
new Vue({
  el: 'body',
  store,
  components: { App },
  vuex: {
    getters: {
      placeholder (store) {
        return store.placeholder
      },
      selected (store) {
        return store.selected
      },
      type (store) {
        return store.optionType
      },
      options (store) {
        return store.options[store.optionType]
      },
      multiple (store) {
        return store.multiple
      }
    },
    actions: { setSelected, toggleMultiple, setPlaceholder, toggleOptionType }
  }
})
