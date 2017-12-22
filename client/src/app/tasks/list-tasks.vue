<template>
  <v-list dense dark two-line subheader v-if="!isLoading">
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
        <v-icon>delete_forever</v-icon>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'ListTasks',
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
