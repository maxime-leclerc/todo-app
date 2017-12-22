<template>
  <div id="app">
    <v-app>
      <navbar></navbar>
      <main>
        <v-container fluid>
          <v-layout row>
            <v-flex md8 offset-md2>
              <list-tasks></list-tasks>
            </v-flex>
          </v-layout>
        </v-container>
      </main>
      <notification></notification>
      <footer></footer>
    </v-app>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Notification from './components/Notification';
import ListTasks from './app/tasks/list-tasks';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    Notification,
    ListTasks
  }
};
</script>

<style lang="stylus">
  @import './assets/layout.styl';
</style>
