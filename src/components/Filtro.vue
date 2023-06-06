<script setup>
// Definir props
const props = defineProps({
    filtro: String,
    changeFiltro: Function,
})
</script>

<template>
    <v-container>
        <v-btn-group 
            class="d-flex justify-center mb-4" 
            color="orange-darken-1" 
            density="comfortable" 
            divided
        >
            <v-btn 
                :color="filtro == 'todos'? 'orange-darken-3' : 'orange-darken-1'"
                @click="() => changeFiltro('todos')"
            >Todos</v-btn>
            <v-btn 
                :color="filtro == 'libro'? 'orange-darken-3' : 'orange-darken-1'"
                @click="() => changeFiltro('libro')"
            >Libros</v-btn>
            <v-btn 
                :color="filtro == 'boxset'? 'orange-darken-3' : 'orange-darken-1'"
                @click="() => changeFiltro('boxset')"
            >Box Sets</v-btn>
        </v-btn-group>
    </v-container>
</template>