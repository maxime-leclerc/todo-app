import Vue from 'vue';
import axios from 'axios';
import { API_URL, API_PORT } from '../../config';

export const TasksService = {
  getTasks () {
    return axios.get(`${API_URL}:${API_PORT}/api/tasks`);
  },
  storeTask (task) {
    return axios.post(`${API_URL}:${API_PORT}/api/tasks/store`, task);
  },
  deleteTask (id) {
    return axios.delete(`${API_URL}:${API_PORT}/api/tasks/${id}`);
  }
}
