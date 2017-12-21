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
              <v-spacer></v-spacer>
              <v-text-field
                append-icon="search"
                label="Rechercher ..."
                single-line
                hide-details
                v-model="search"
              ></v-text-field>
              <v-subheader>Liste des tâches</v-subheader>
               <v-data-table
                  v-model="selected"
                  v-bind:headers="headers"
                  v-bind:tasks="tasks"
                  select-all
                  item-key="name"
                  class="elevation-1"
                >
                <template slot="headers" slot-scope="props">
                  <tr>
                    <th>
                      <v-checkbox
                        primary
                        hide-details
                        @click.native="toggleAll"
                        :input-value="props.all"
                        :indeterminate="props.indeterminate"
                      ></v-checkbox>
                    </th>
                    <th v-for="header in props.headers" :key="header.text"
                      :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                      @click="changeSort(header.value)"
                    >
                      <v-icon>arrow_upward</v-icon>
                      {{ header.text }}
                    </th>
                  </tr>
                </template>
                <template slot="tasks" slot-scope="props">
                  <tr :active="props.selected" @click="props.selected = !props.selected">
                    <td>
                      <v-checkbox
                        primary
                        hide-details
                        :input-value="props.selected"
                      ></v-checkbox>
                    </td>
                    <td>{{ props.task.created_at }}</td>
                    <td class="text-xs-right">{{ propos.task.name }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-container>
      </main>
    </v-app>
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL, API_PORT } from '../config';

export default {
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
