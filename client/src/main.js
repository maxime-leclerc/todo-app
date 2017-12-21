require('babel-polyfill');

import Vue from 'vue';
import moment from 'moment';
import App from './App.vue';

// Filter to correctly format date
Vue.filter('datetime', function (date) {
  return moment(date).format('DD/MM/YYYY hh:mm:ss');
})

new Vue({
  render: h => h(App)
}).$mount('#app');
