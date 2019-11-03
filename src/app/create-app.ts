import Vue from 'vue'
import App from '../App.vue'
import router from '../router'
import { DateUtil } from "@/utils/static/date-util";

import Vuex from 'vuex'
Vue.use(Vuex);
import createStore from '../store'
const store = createStore();

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

import 'animate.css/animate.min.css'

Vue.config.productionTip = false;

Vue.filter('filterDate', (date: Date) => {
  return new DateUtil(date, 'yyyy/MM/dd').format()
});
export default (): Vue => new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
