<template>
  <v-app>
    <v-toolbar app color="blue" dark>
      <v-toolbar-title class="headline text-uppercase">
        <span>GraphQL</span>
        <span class="font-weight-light">Client</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <AppContent />
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import AppContent from './componentes/Content.vue'

export default {
  name: 'App',
  components: { AppContent },
  methods: mapActions(['setUser']),
  created() {
    this.setUser(null)
  },
}
</script>
