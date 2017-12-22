<template>
  <div id="app">
    <v-app>
      <navbar></navbar>
      <main>
        <v-container fluid>
          <v-layout row>
            <v-flex md6 offset-md3>
              <list-tasks></list-tasks>
              <create-task></create-task>
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
  methods: {
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
    }
  }
};
</script>

<style lang="stylus">
  @import './assets/layout.styl';
</style>
