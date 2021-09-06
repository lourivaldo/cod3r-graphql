<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Consultar Usuário</h1>
                    <v-divider class="mb-3" />
                        <div v-if="erros">
                            <Erros :erros="erros" />
                        </div>
                        <v-text-field label="ID"
                            v-model.number="filtro.id" />
                        <v-text-field label="E-mail"
                            v-model="filtro.email" />
                        <v-btn color="primary" class="ml-0 mt-3"
                            @click="search">
                            Consultar
                        </v-btn>
                </v-layout>
            </v-flex>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Resultado</h1>
                    <v-divider />
                    <template v-if="dados">
                        <v-text-field label="ID" readonly
                            v-model="dados.id" />
                        <v-text-field label="Nome" readonly
                            v-model="dados.nome" />
                        <v-text-field label="E-mail" readonly
                            v-model="dados.email" />
                        <v-text-field label="Perfis" readonly
                            :value="roleLabels" />
                    </template>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Erros from '../shared/Erros'

export default {
    components: { Erros },
    data() {
        return {
            filtro: {},
            roles: [],
            dados: null,
            erros: null
        }
    },
    computed: {
        roleLabels() {
            return this.dados && this.dados.roles &&
                this.dados.roles.map(p => p.rotulo).join(', ')
        }
    },
    methods: {
        search() {
            // implementar
        }
    }
}
</script>

<style>

</style>
