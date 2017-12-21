<template>
  <v-list v-if="isLoading">
    <v-spacer></v-spacer>
    <v-text-field
      append-icon="search"
      label="Rechercher ..."
      single-line
      hide-details
      v-model="search"
    ></v-text-field>
    <v-subheader>Liste des tâches ({{ total }} résultats)</v-subheader>
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
  </v-list>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'ListTasks',
    data: () => ({
      search: '',
      pagination: {
        sortBy: 'name'
      },
      selected: [],
      headers: [
        { text: 'Date de création', value: 'created_at'},
        { text: 'Titre', value: 'name' }
      ]
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
      }
    }
  };
</script>
