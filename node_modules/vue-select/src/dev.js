import Vue from 'vue'
import vSelect from '../src/components/Select.vue'

Vue.component('v-select', vSelect)

Vue.config.debug = true
Vue.config.devtools = true

/* eslint-disable no-new */
new Vue({
  el: 'body'
})
