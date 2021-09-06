<template>
    <div v-if="items">
        <v-alert v-for="i in items"
            :key="i.message" :value="true" type="error">
            {{ i.message }}
        </v-alert>
    </div>
</template>

<script>
export default {
    props: ['errors'],
    computed: {
        items() {
            if(!this.errors) return null
            const e = this.errors

            const items = []
            
            if(e.graphQLErrors) {
                items.push(...e.graphQLErrors)
            }
            
            // if(e.networkError) {
            //     items.push(e.networkError)
            // }

            if(items.length === 0) {
                items.push({
                    message: 'Erro! Preencheu o formulário?'
                })
            }

            return items
        }
    }
}
</script>

<style>

</style>
