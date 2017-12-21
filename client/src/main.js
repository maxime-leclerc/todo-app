require('babel-polyfill');

import Vue from 'vue';
import Vuetify from 'vuetify';
import moment from 'moment';
import App from './App.vue';
import store from './store';

Vue.use(Vuetify);

// Filter to correctly format date
Vue.filter('datetime', function (date) {
  return moment(date).format('DD/MM/YYYY HH:mm:ss', 'fr');
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
