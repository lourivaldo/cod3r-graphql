<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-layout column class="ma-3">
          <h1 class="headline">Login</h1>
          <v-divider class="mb-3"/>
          <div v-if="errors">
            <Errors :errors="errors"/>
          </div>
          <v-text-field label="E-mail"
                        v-model="user.email"/>
          <v-text-field label="Senha"
                        v-model="user.password" type="password"/>
          <v-btn color="primary" class="ml-0 mt-3"
                 @click="login">
            Logar
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
            <v-text-field label="Token" readonly
                          v-model="data.token"/>
          </template>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapActions} from 'vuex'
import gql from 'graphql-tag'
import Errors from '../shared/Errors'

export default {
  components: {Errors},
  data() {
    return {
      user: {
        email: 'admin@mail.com',
        // email: 'comum@mail.com',
        password: '1234'
      },
      data: null,
      errors: null
    }
  },
  computed: {
    roles() {
      return this.data && this.data.roles &&
          this.data.roles.map(p => p.name).join(',')
    }
  },
  methods: {
    ...mapActions(['setUser']),
    login() {
      this.$api.query({
        query: gql`
            query (
                $email: String!
                $password: String!
            ) {
               user: login(data: { 
                 email: $email
                 password: $password 
               }) {
                id name email token roles { name label }
               }
            }
        `,
        variables: {
          email: this.user.email,
          password: this.user.password,
        }
      }).then((result) => {
        this.data = result.data.user
        this.user = {}
        this.errors = null
        this.setUser(result.data.user)
      }).catch((err) => {
        this.errors = err
      })
    }
  }
}
</script>

<style>

</style>
