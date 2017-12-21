<template>
  <div id="app">
    <form @submit.prevent="storeTask">
      <input type="checkbox" v-model="task.done"/>
      <input type="text" placeholder="Nom" v-model="task.name"/>
      <input type="submit" value="enregistrer">
    </form>
    <table>
      <thead>
        <tr>
          <td>Réalisée</td>
          <td>Nom</td>
          <td>Date de création</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks">
          <td><input type="checkbox" :checked="task.done" @change="updateTask(index, task)"></td>
          <td><input type="text" v-model="task.name"></td>
          <td>{{ task.created_at }}</td>
          <td>
            <button @click="updateTask(index, task)">Mettre à jour</button>
            <button @click="deleteTask(index, task._id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL, API_PORT } from '../config';

export default {
  data: () => ({
    tasks: [],
    task: {
      name: '',
      done: false
    }
  }),
  mounted () {
    this.fetchTasks();
  },
  methods: {
    init () {
      this.task = {
        name: '',
        done: false
      }
    },
    fetchTasks () {
      axios.get(`${API_URL}:${API_PORT}/api/tasks`)
        .then((response) => this.tasks = response.data)
        .catch((error) => alert(error.response.data));
    },
    storeTask () {
      axios.post(`${API_URL}:${API_PORT}/api/tasks/store`, this.task)
        .then((response) => {
          this.tasks.push(response.data);
          this.init();
        })
        .catch((error) => alert(error.response.data));
    },
    updateTask (index, task) {
      let id = task._id;
      let params = {
        done: task.done,
        name: task.name
      };
      axios.put(`${API_URL}:${API_PORT}/api/tasks/${id}`, params)
        .then((response) => this.tasks.splice(index, 1, response.data))
        .catch((error) => alert(error.response.data));
    },
    deleteTask (index, id) {
      axios.delete(`${API_URL}:${API_PORT}/api/tasks/${id}`)
        .then((response) => this.tasks.splice(index, 1))
        .catch((error) => alert(error.response.data));
    }
  }
};
</script>
