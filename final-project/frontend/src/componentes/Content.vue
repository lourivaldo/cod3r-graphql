<template>
  <v-layout column>
    <v-flex>
      <UserLogged/>
    </v-flex>
    <v-flex>
      <v-tabs centered dark icons-and-text>
        <v-tabs-slider color="white"></v-tabs-slider>

        <v-tab>
          Autenticação
          <v-icon>fingerprint</v-icon>
        </v-tab>

        <v-tab>
          Usuários
          <v-icon>people</v-icon>
        </v-tab>

        <v-tab>
          Perfis
          <v-icon>how_to_reg</v-icon>
        </v-tab>

        <v-tab-item>
          <AuthTabs/>
        </v-tab-item>

        <v-tab-item>
          <UserTabs/>
        </v-tab-item>

        <v-tab-item>
          <RoleTabs/>
        </v-tab-item>
      </v-tabs>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthTabs from './auth/Tabs.vue'
import UserLogged from './auth/UserLogged.vue'
import UserTabs from './user/Tabs.vue'
import RoleTabs from './role/Tabs.vue'

export default {
  components: {
    AuthTabs,
    UserLogged,
    UserTabs,
    RoleTabs,
  },
}
</script>

<style>

</style>
