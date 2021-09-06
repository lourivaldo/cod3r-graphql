<template>
    <v-container fluid>
        <v-tabs color="grey lighten-3"
            slider-color="blue">
            <v-tab ripple>
                Lista
            </v-tab>
            
            <v-tab ripple>
                Consulta
            </v-tab>

            <v-tab ripple>
                Novo
            </v-tab>

            <v-tab ripple>
                Alterar
            </v-tab>

            <v-tab ripple>
                Excluir
            </v-tab>

            <v-tab-item>
                <List />
            </v-tab-item>

            <v-tab-item>
                <Search />
            </v-tab-item>

            <v-tab-item>
                <New />
            </v-tab-item>
            
            <v-tab-item>
                <Edit />
            </v-tab-item>
            
            <v-tab-item>
                <Remove />
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>

<script>
import List from './List'
import Search from './Search'
import New from './New'
import Edit from './Edit'
import Remove from './Remove'

export default {
    components: { List, Search, New, Edit, Remove }
}
</script>

<style>

</style>
