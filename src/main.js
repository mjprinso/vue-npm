import Vue from 'vue'
import App from './App'
import router from './router'
import CxltToastr from 'cxlt-vue2-toastr'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
import Validity from 'vue-validity'
// import axios from 'axios'
// import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(CxltToastr)
// Vue.use(VueAxios, axios)
// Vue.use(axios)
Vue.use(Validity, {})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
