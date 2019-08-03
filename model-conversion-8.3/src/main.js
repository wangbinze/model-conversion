import Vue from 'vue'

import ElenentUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'

Vue.config.productionTip = false
Vue.use(ElenentUI);


new Vue({
  render: h => h(App),
}).$mount('#app')
