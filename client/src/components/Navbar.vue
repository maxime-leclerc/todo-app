<template>
  <v-toolbar class="indigo" dark>
    <v-container fill-height>
      <v-layout row wrap align-center>
        <v-flex class="text-md-center">
          <h1 class="title">TODO LIST</h1>
        </v-flex>
      </v-layout>
    </v-container>
  </v-toolbar>
</template>

<script>
  export default {
    name: 'Navbar'
  };
</script>

<style lang="stylus" scoped>
  h1.title
    font-weight: 300
</style>
