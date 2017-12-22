import Vue from 'vue';

export const TasksService = {
  getTasks () {
    return Vue.axios.get(`/api/tasks`);
  },
  storeTask (task) {
    return Vue.axios.post(`/api/tasks/store`, task);
  },
  updateTask (id, task) {
    return Vue.axios.put(`/api/tasks/${id}`, task);
  },
  deleteTask (id) {
    return Vue.axios.delete(`/api/tasks/${id}`);
  }
}
