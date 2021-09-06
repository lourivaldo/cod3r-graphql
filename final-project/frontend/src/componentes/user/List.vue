<template>
  <v-container fluid>
    <v-layout column>
      <v-flex>
        <v-btn
            color="primary"
            class="ml-0 mb-4"
            @click="getUsers"
        >
          Obter Usuários
        </v-btn>
      </v-flex>
      <v-flex>
        <div v-if="errors" class="mb-4">
          <Errors :errors="errors"/>
        </div>
      </v-flex>
      <v-flex>
        <v-data-table :headers="headers" :items="users"
                      hide-actions class="elevation-1">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.email }}</td>
            <td>{{
                props.item.roles
                    .map(p => p.name)
                    .join(', ')
              }}
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import Errors from '../shared/Errors.vue'

export default {
  components: { Errors },
  data() {
    return {
      errors: null,
      users: [],
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Nome', value: 'name' },
        { text: 'E-mail', value: 'email' },
        { text: 'Perfis', value: 'roles' },
      ],
    }
  },
  methods: {
    getUsers() {
      this.$api.query({
        query: gql`
          query {
            users {
             id name email roles { name label }   
            }
          }  
        `,
        fetchPolicy: 'network-only',
      }).then((result) => {
        this.users = result.data.users
        this.errors = null
      }).catch((err) => {
        this.users = []
        this.errors = err
      })
    },
  },
}
</script>

<style>

</style>
