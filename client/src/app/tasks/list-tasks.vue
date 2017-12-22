<template>
  <v-card color="grey lighten-4" flat>
    <v-list two-line subheader class="p-20" v-if="!isLoading">
      <create-task></create-task>
      <v-subheader>Liste des tâches ({{ total }} tâches)</v-subheader>
      <v-list-tile v-for="(task, index) in tasks" :key="index" :data="task">
        <v-list-tile-action>
          <v-checkbox v-model="task.done"></v-checkbox>
        </v-list-tile-action>
        <v-list-tile-content @click="task.done = !task.done">
          <v-list-tile-title>{{ task.name }}</v-list-tile-title>
          <v-list-tile-sub-title>Créée le {{ task.created_at | datetime }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon @click="deleteTask(index, task._id)">delete_forever</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex';
  import CreateTask from './create-task';

  export default {
    name: 'ListTasks',
    components: {
      CreateTask
    },
    data: () => ({
      search: ''
    }),
    computed: {
      ...mapGetters({
        tasks: 'tasks',
        total: 'total',
        isLoading: 'isLoading'
      })
    },
    mounted () {
      this.fetchTasks();
    },
    methods: {
      fetchTasks () {
        this.$store.dispatch('fetchTasks');
      },
      deleteTask (index, id) {
        this.$store.dispatch('deleteTask', [index, id]);
      }
    }
  };
</script>

<style lang="stylus">
  .p-20
    padding: 20px
</style>
