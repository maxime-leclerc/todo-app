<template>
  <v-card class="card" color="grey lighten-4" flat>
    <v-list two-line subheader class="p-20" v-if="!isLoading">
      <create-task></create-task>
      <v-subheader>
        Liste des tâches ({{ doneTasks.length }} tâches réalisées sur {{ total }})
        <v-spacer></v-spacer>
        Rechercher
        <v-text-field
          class="m-l-10"
          name="input-1-3"
          single-line
          v-model="search"
         ></v-text-field>
      </v-subheader>
      <v-list class="list-tasks">
        <v-list-tile v-for="(task, index) in tasks" :key="index" class="li-todo" @click="updateTask(task)">
          <v-list-tile-content v-bind:class="[ task.done ? 'crossed': '']" @click="task.done = !task.done">
            <v-list-tile-title>{{ task.name }}</v-list-tile-title>
            <v-list-tile-sub-title>Créée le {{ task.created_at | datetime }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon @click.stop="deleteModal(index, task._id)">delete_forever</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-dialog v-model="showDeleteModal" max-width="500px" lazy>
          <v-card>
            <v-card-title>
              <h2 class="modal-title">Souhaitez-vous vraiment supprimer cette tâche ?</h2>
            </v-card-title>
            <v-card-actions>
              <v-btn color="primary" @click="deleteTask(indexDelete, idDelete)">Oui</v-btn>
              <v-btn color="error" @click="showDeleteModal=false">Non</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-list>
    </v-list>
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex';
  import _ from 'lodash';
  import CreateTask from './create-task';

  export default {
    name: 'ListTasks',
    components: {
      CreateTask
    },
    data: () => ({
      search: '',
      showDeleteModal: false,
      indexDelete: '',
      idDelete: ''
    }),
    computed: {
      ...mapGetters({
        doneTasks: 'doneTasks',
        tasks: 'tasks',
        total: 'total',
        isLoading: 'isLoading'
      })
    },
    watch: {
      search () {
        this.$store.commit('SEARCH_TASK', this.search);
      }
    },
    mounted () {
      this.fetchTasks();
    },
    methods: {
      fetchTasks () {
        this.$store.dispatch('fetchTasks');
      },
      updateTask (task) {
        task.isDone = !task.isDone;
        this.$store.dispatch('updateTask', task);
      },
      deleteTask (index, id) {
        this.showDeleteModal = false;
        this.$store.dispatch('deleteTask', [index, id]);
        this.indexDelete = index;
        this.idDelete = id;
      },
      deleteModal (index, id) {
        this.indexDelete = index;
        this.idDelete = id;
        this.showDeleteModal = true;
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .list-tasks
    height: 600px
    overflow-y: auto
  .m-l-10
    margin-left: 10px
  .p-20
    padding: 20px
  h2.modal-title
    font-size: 20px
    font-weight: 300
  .card
    box-shadow:
      0px 2px 4px -1px rgba(0,0,0,0.2),
      0px 4px 5px 0px rgba(0,0,0,0.14),
      0px 1px 10px 0px rgba(0,0,0,0.12)
  .li-todo
    cursor: pointer
    border-bottom: 1px solid rgba(0, 0, 0, 0.34)
  .crossed
    text-decoration: line-through
</style>
