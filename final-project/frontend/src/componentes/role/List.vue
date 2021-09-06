<template>
  <v-container fluid>
    <v-layout column>
      <v-flex>
        <v-btn color="primary" class="ml-0 mb-4"
               @click="gerRoles">
          Obter Perfis
        </v-btn>
      </v-flex>
      <v-flex>
        <div v-if="errors" class="mb-4">
          <Errors :errors="errors"/>
        </div>
      </v-flex>
      <v-flex>
        <v-data-table :headers="headers" :items="roles"
                      hide-actions class="elevation-1">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.label }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import Errors from '../shared/Erros'

export default {
  components: {
    Errors
  },
  data() {
    return {
      errors: null,
      roles: [],
      headers: [
        {text: 'ID', value: 'id'},
        {text: 'Nome', value: 'name'},
        {text: 'Rótulo', value: 'label'},
      ],
    }
  },
  methods: {
    gerRoles() {
      this.$api.query({
        query: gql`
          query {
            roles { id label name }  
          }    
        `   
      }).then(result => {
        this.roles = result.data.roles
      }).catch(err => {
        this.errors = err
      })
    }
  }
}
</script>

<style>

</style>
