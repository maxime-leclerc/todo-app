import axios from 'axios';
import Vue from 'vue';
import VueAxios from 'vue-axios';
import { API_URL, REQUEST_TIMEOUT } from '../../config';

const ApiService = {
  init () {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
    Vue.axios.defaults.timeout = REQUEST_TIMEOUT;
  }
};

export default ApiService;
