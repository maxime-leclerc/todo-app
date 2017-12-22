<template>
 <v-snackbar
      :color="notify.status"
      :timeout="timeout"
      :top="y === 'top'"
      :bottom="y === 'bottom'"
      :right="x === 'right'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'"
      v-model="notify.show"
    >
      {{ notify.message }}
      <v-btn flat color="white" @click.native="notify.show = false">Fermer</v-btn>
    </v-snackbar>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'Notification',
    data: () => ({
      timeout: 6000,
      y: 'top',
      x: 'right',
      mode: ''
    }),
    computed: {
      ...mapGetters({
        notify: 'notify'
      })
    }
  };
</script>
