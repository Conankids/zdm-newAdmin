// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'base/theme/index.css'
import ElementUI from 'element-ui'
import layer from 'vue-layer'
import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VuePreview from 'vue2-preview'
import 'swiper/dist/css/swiper.css'

Vue.prototype.$layer = layer(Vue)
Vue.prototype.$http = axios

Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.use(VuePreview)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#vipFormInit',
  template: '<App/>',
  components: { App }
})
