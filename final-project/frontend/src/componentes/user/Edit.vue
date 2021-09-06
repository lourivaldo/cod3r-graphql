<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-layout column class="ma-3">
          <h1 class="headline">Filtrar Usuário</h1>
          <v-divider class="mb-3"/>
          <div v-if="errors">
            <Errors :erros="errors"/>
          </div>
          <v-text-field label="ID"
                        v-model.number="filter.id"/>
          <v-text-field label="E-mail"
                        v-model="filter.email"/>

          <h1 class="mt-4 headline">Alterar Usuário</h1>
          <v-divider class="mb-3"/>
          <v-text-field label="Nome"
                        v-model="user.name"/>
          <v-text-field label="E-mail"
                        v-model="user.email"/>
          <v-text-field label="Senha"
                        v-model="user.senha" type="password"/>
          <v-select label="Perfis"
                    v-model="user.roles"
                    :items="roles"
                    item-value="id"
                    item-text="label"
                    attach multiple
                    chips deletable-chips/>
          <v-btn class="ml-0 mt-3"
                 @click="getRoles">
            Obter Perfis
          </v-btn>
          <v-btn color="primary" class="ml-0 mt-3"
                 @click="updateUser">
            Alterar Usuário
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
                          :value="rolesLabels"/>
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
  components: {Errors},
  data() {
    return {
      filter: {},
      user: {},
      roles: [],
      data: null,
      errors: null
    }
  },
  computed: {
    rolesLabels() {
      return this.data &&
          this.data.roles &&
          this.data.roles.map(p => p.label).join(', ')
    },
    selectedRoles() {
      if (this.user.roles) {
        return this.user.roles.map(id => ({id}))
      } else {
        return null
      }
    }
  },
  methods: {
    updateUser() {
      // Implementar
    },
    getRoles() {
      this.$api.query({
        query: gql`{ roles { id label } }`
      }).then((result) => {
        this.roles = result.data.roles
        this.errors = null
      }).catch((error) => {
        this.errors = error
      })
    }
  }
}
</script>

<style>

</style>
