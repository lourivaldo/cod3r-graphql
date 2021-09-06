<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-layout column class="ma-3">
          <h1 class="headline">Novo Usuário</h1>
          <v-divider class="mb-3"/>
          <div v-if="errors">
            <Errors :errors="errors"/>
          </div>
          <v-text-field label="Nome"
                        v-model="user.name"/>
          <v-text-field label="E-mail"
                        v-model="user.email"/>
          <v-text-field label="Senha"
                        v-model="user.password"
                        type="password"/>
          <v-select label="Roles"
                    v-model="user.roles"
                    :items="roles"
                    item-value="id"
                    item-text="label"
                    attach 
                    multiple
                    chips
                    deletable-chips/>
          <v-btn class="ml-0 mt-3"
                 @click="getRoles">
            Obter Roles
          </v-btn>
          <v-btn color="primary" class="ml-0 mt-3"
                 @click="newUser">
            Novo Usuário
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
            <v-text-field label="Email" readonly
                          v-model="data.email"/>
            <v-text-field label="Roles" readonly
                          :value="rolesLabels"/>
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
      user: {},
      roles: [],
      data: null,
      errors: null
    }
  },
  computed: {
    rolesLabels() {
      return this.data && this.data.roles &&
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
    newUser() {
      this.$api.mutate({
        mutation: gql`
          mutation Mutation(
            $name: String!
            $email: String!
            $password: String!
            $roles: [RoleFilter]
          ) {
            user: createUser(data: {
                name: $name
                email: $email
                password: $password
                roles: $roles
            }) {
                id name email roles { label }
            }
          }
          `,
        variables: {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          roles: this.selectedRoles,
        },
      }).then((result) => {
        this.data = result.data.user
        this.user = {}
        this.errors = null
      }).catch(err => {
        console.log(err)
        this.data = null
        this.errors = err
      })
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
