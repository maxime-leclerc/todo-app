<template>
  <v-layout grid>
    <v-text-field label="Ajouter une tâche ..." v-model="task.name"></v-text-field>
    <v-btn @click="storeTask" small primary fab dark>
      <v-icon>add</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'CreateTask',
    computed: {
      ...mapGetters({
        task: 'task'
      })
    },
    methods: {
      storeTask () {
        this.$store.dispatch('storeTask', this.task);
      }
    }
  }
</script>
