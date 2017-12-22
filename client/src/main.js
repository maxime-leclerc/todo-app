// Polyfill es6 for older browsers
require('babel-polyfill');

// Imports
import Vue from 'vue';
import Vuetify from 'vuetify';
import moment from 'moment';
import App from './App.vue';
import store from './store';
import ApiService from './services/api';

// Add vuetify
Vue.use(Vuetify);

// Main config for axios
ApiService.init();

// Filter to correctly format date
Vue.filter('datetime', function (date) {
  return moment(date).format('DD/MM/YYYY HH:mm:ss', 'fr');
})

// Create Vue instance
new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
