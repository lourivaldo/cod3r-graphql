<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-layout column class="ma-3">
          <h1 class="headline">Consultar Usuário</h1>
          <v-divider class="mb-3"/>
          <div v-if="errors">
            <Errors :errors="errors"/>
          </div>
          <v-text-field label="ID"
                        v-model.number="filter.id"/>
          <v-text-field label="E-mail"
                        v-model="filter.email"/>
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
            <v-text-field label="E-mail" readonly
                          v-model="data.email"/>
            <v-text-field label="Perfis" readonly
                          :value="roleLabels"/>
          </template>
        </v-layout>
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
      filter: {},
      roles: [],
      data: null,
      errors: null
    }
  },
  computed: {
    roleLabels() {
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
            $email: String
          ) {
            user(filter: {
                id: $id 
                email: $email
            }) { id name email roles { label } }
          }
        `,
        variables: {
          id: this.filter.id,
          email: this.filter.email,
        },
        fetchPolicy: 'network-only',
      }).then((result) => {
        this.data = result.data.user
        this.filter = {}
        this.errors = null
      }).catch(err => {
        this.data = null
        this.errors = err
      })
    }
  }
}
</script>

<style>

</style>
