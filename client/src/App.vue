<template>
  <div id="app">
   <v-app>
    <v-toolbar class="indigo" dark>
      <v-toolbar-title>Ma todo list</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <v-layout row>
          <v-flex md6 offset-md3>
            <v-layout grid>
              <v-text-field label="Ajouter une tâche ..." v-model="newTask.name"></v-text-field>
              <v-btn @click="storeTask" small primary fab dark>
                <v-icon>add</v-icon>
              </v-btn>
            </v-layout>
            <v-list v-if="tasks.length > 0">
              <v-subheader>Tâches restantes</v-subheader>
              <v-list-tile v-for="(task, i) in tasks" :key="i">
                <v-list-tile-action>
                  <v-checkbox v-model="task.done" @change="updateTask(task, i)"></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{task.name}} (Créée le {{ task.created_at | datetime }})</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-card-text v-else>
              <span class="grey--text">Aucune tâche restante</span>
            </v-card-text>
          </v-flex>
          </v-layout>
        </v-container>
      </main>
    </v-app>
    <form @submit.prevent="storeTask">
      <input type="checkbox" v-model="newTask.done"/>
      <input type="text" placeholder="Nom" v-model="newTask.name"/>
      <input type="submit" value="enregistrer">
    </form>
    <ul>
      <li v-for="(task, index) in tasks" v-bind:class="[task.done ? 'done' : '']" @click="updateTask(index, task)">
        {{ task.name }}
        {{ task.created_at | datetime }}
        <span class="close" @click="deleteTask(index, task._id)"></span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL, API_PORT } from '../config';

export default {
  data: () => ({
    tasks: [],
    newTask: {
      name: '',
      done: false
    }
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
        .then((response) => this.tasks[index].updated_at = response.data.updated_at)
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
