import Vue from 'vue'

import { vuetify } from './plugins'
import { router } from './router'
import './registerServiceWorker'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
