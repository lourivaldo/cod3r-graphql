<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-layout column class="ma-3">
          <h1 class="headline">Filtrar Perfil</h1>
          <v-divider class="mb-3"/>
          <div v-if="errors">
            <Errors :errors="errors"/>
          </div>
          <v-text-field label="ID"
                        v-model.number="filter.id"/>
          <v-text-field label="Nome"
                        v-model="filter.name"/>

          <h1 class="mt-4 headline">Alterar Perfil</h1>
          <v-divider class="mb-3"/>
          <v-text-field label="Nome"
                        v-model="role.name"/>
          <v-text-field label="Rótulo"
                        v-model="role.label"/>

          <v-btn color="primary" class="ml-0 mt-3"
                 @click="updateRole">
            Alterar Perfil
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
import Errors from '../shared/Errors.vue'

export default {
  components: {
    Errors,
  },
  data() {
    return {
      filter: {},
      role: {},
      data: null,
      errors: null,
    }
  },
  methods: {
    updateRole() {
      this.$api.mutate({
        mutation: gql`
          mutation (
            $idFilter: Int
            $nameFilter: String
            $name: String
            $label: String
          ) {
            role: updateRole(
              filter: {
                id: $idFilter
                name: $nameFilter
              } 
              data: {
                name: $name
                label: $label
              }
            ) { id label name }
          }      
        `,
        variables: {
          idFilter: this.filter.id,
          nameFilter: this.filter.name,
          name: this.role.name,
          label: this.role.label,
        },
      }).then((result) => {
        this.data = result.data.role
        this.filter = {}
        this.errors = null
      }).catch((err) => {
        this.errors = err
      })
    },
  },
}
</script>

<style>

</style>
