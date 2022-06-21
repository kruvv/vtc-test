import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import useVuelidate from '@vuelidate/core'

import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueCompositionAPI, useVuelidate)

new Vue({
  render: h => h(App),
}).$mount('#app')
