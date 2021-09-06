<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-layout column class="ma-3">
          <h1 class="headline">Consultar Perfis</h1>
          <v-divider class="mb-3"/>
          <div v-if="errors">
            <Errors :errors="errors"/>
          </div>
          <v-text-field label="ID"
                        v-model.number="filter.id"/>
          <v-text-field label="Nome"
                        v-model="filter.name"/>
          <v-btn color="primary" class="ml-0 mt-3"
                 @click="search">
            Consultar
          </v-btn>
        </v-layout>
      </v-flex>
      <v-flex>
        <v-layout column class="ma-3">
          <h1 class="headline">Resultado</h1>
          <v-divider/>
          <template v-if="data">
            <v-text-field label="ID" readonly
                          v-model="data.id"/>
            <v-text-field label="Nome" readonly
                          v-model="data.name"/>
            <v-text-field label="Rótulo" readonly
                          v-model="data.label"/>
          </template>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import Errors from '../shared/Errors'

export default {
  components: {
    Errors
  },
  data() {
    return {
      filter: {},
      roles: [],
      data: null,
      errors: null
    }
  },
  computed: {
    rolesLabels() {
      return this.data && this.data.roles &&
          this.data.roles.map(p => p.label).join(', ')
    }
  },
  methods: {
    search() {
      this.$api.query({
        query: gql`
          query Query(
            $id: Int
            $name: String
          ) {
            role(filter: {
              id: $id 
              name: $name
            }) { id label name }
          }
        `,
        variables: {
          id: this.filter.id,
          name: this.filter.name,
        }
      }).then(result => {
        this.data = result.data.role
        this.filter = {}
        this.errors = null
      }).catch(err => {
        this.errors = err
      })
    }
  }
}
</script>

<style>

</style>
