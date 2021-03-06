// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import AudioRecorder from 'vue-audio-recorder'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Axios from 'axios'
import store from './store/index.js'

Vue.prototype.$http = Axios;

Vue.config.productionTip = false
Vue.use(ElementUI);//{ size: 'small', zIndex: 3000 }
Vue.use(AudioRecorder)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  // components: { App },
  store,
  // template: '<App/>'
})
