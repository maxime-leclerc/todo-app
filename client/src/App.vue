<template>
  <div id="app">
    <v-app>
      <navbar></navbar>
      <main>
        <v-container fluid>
          <v-layout row>
            <v-flex md6 offset-md3>
              <create-task></create-task>
              <list-tasks></list-tasks>
            </v-flex>
          </v-layout>
        </v-container>
      </main>
      <footer></footer>
    </v-app>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ListTasks from './app/tasks/list-tasks';
import CreateTask from './app/tasks/create-task';
import { API_URL, API_PORT } from '../config';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    ListTasks,
    CreateTask
  },
  data: () => ({
    search: '',
    pagination: {
      sortBy: 'name'
    },
    selected: [],
    tasks: [],
    newTask: {
      name: '',
      done: false
    },
    headers: [
      { text: 'Date de création', value: 'created_at'},
      { text: 'Titre', value: 'name' }
    ]
  }),
  mounted () {
    this.fetchTasks();
  },
  methods: {
    init () {
      this.newTask = {
        name: '',
        done: false
      }
    },
    fetchTasks () {
      axios.get(`${API_URL}:${API_PORT}/api/tasks`)
        .then((response) => this.tasks = response.data)
        .catch((error) => console.log(error.response));
    },
    storeTask () {
      axios.post(`${API_URL}:${API_PORT}/api/tasks/store`, this.newTask)
        .then((response) => {
          this.tasks.push(response.data);
          this.init();
        })
        .catch((error) => console.log(error.response));
    },
    updateTask (index, task) {
      let id = task._id;
      let params = {
        done: !task.done
      };
      axios.put(`${API_URL}:${API_PORT}/api/tasks/${id}`, params)
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error.response));
    },
    deleteTask (index, id) {
      axios.delete(`${API_URL}:${API_PORT}/api/tasks/${id}`)
        .then((response) => this.tasks.splice(index, 1))
        .catch((error) => console.log(error.response));
    },
    toggleAll () {
      if (this.selected.length) this.selected = []
      else this.selected = this.tasks.slice();
    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    }
  }
};
</script>

<style lang="stylus">
  @import './assets/layout.styl';
</style>
