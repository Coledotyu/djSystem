/* eslint-disable */
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import axios from 'axios';
import 'normalize.css';
import '@/assets/icons';
import '@/assets/scss/index.scss';
import '@/assets/scss/element';
import components from '@/components';
import element from 'element-ui';

Vue.use(element);
Vue.use(components);

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
