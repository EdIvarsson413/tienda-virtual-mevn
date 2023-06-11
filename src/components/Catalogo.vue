<script setup>
import { ref, onMounted } from 'vue'
import Filtro from '@/components/Filtro.vue';
import axios from 'axios';

// Recibe el arreglo de los libros
const libros = ref( false );

onMounted(() => {
    const obtenerLibros = async () => {
        try {
            const { data } = await axios( `${import.meta.env.VITE_BACKEND_URL}/api/libros` );
            libros.value = data
        }catch(error) { console.log (error ) }
    }
    obtenerLibros();
})

// Por defecto esta el estado de todos los libros y sets se mostraran
const filtro = ref( 'todos' );

// Cambia si se quieren ver solo libros o sets
const changeFiltro = ( nuevoFiltro ) => { filtro.value = nuevoFiltro }

// Con el filtro nuevo se retornan solo los productos a base de su tipo
const filtrarCatalogo = () => {
    switch ( filtro.value ) {
        case 'todos': return libros.value;
        case 'libro': return libros.value.filter( libro => libro.tipo === 'libro' );
        case 'boxset': return libros.value.filter( libro => libro.tipo === 'boxset' );
        default: return libros.value;
    }
}
</script>

<template>
    <v-container>
        <!-- Componente para hacer el filtrado -->
        <Filtro :filtro="filtro" :changeFiltro="changeFiltro"/>

        <v-row>
            <v-col cols="4" v-for="libro in filtrarCatalogo()" :key="libro.id">
                <!-- Carta horizontal -->
                <v-card
                    class="card--hover"
                    color="grey-darken-4"
                    elevation="5"
                    width="379" 
                    height="220"
                >   
                    <v-row>
                        <!-- Espacio para la portada -->
                        <v-col md="5">
                            <v-img
                                max-width="205"
                                :src="`https://firebasestorage.googleapis.com/v0/b/libreriascastor-ecffa.appspot.com/o/folder%2F${libro.imagen}?alt=media&token=d4359645-f199-48c6-b6ee-0c9e2a163fd4&_gl=1*wzhjyg*_ga*NjM3MTQwODIwLjE2Njk0MjQwMDA.*_ga_CW55HF8NVT*MTY4NjM2MDc2Ni4xMS4xLjE2ODYzNjE2ODQuMC4wLjA.`"
                                :alt="`imagen ${libro.nombre}`"
                            />
                        </v-col>

                        <!-- Espacio para detalles -->
                        <v-col class="mt-6" cols="7">
                            <!-- Titulo con tooltip -->
                            <v-tooltip :text="libro.nombre">
                                <template v-slot:activator="{ props }">
                                    <v-card-title v-bind="props" class="text-center mr-3">
                                        {{ libro.nombre }}
                                    </v-card-title>
                                </template>
                            </v-tooltip>

                            <!-- Precio y autor -->
                            <div class="d-flex flex-wrap text-grey-darken-1 justify-space-between mt-1">
                                <v-card-subtitle>${{ libro.precio }}</v-card-subtitle>
                                <v-card-subtitle>{{ libro.autor }}</v-card-subtitle>
                            </div>

                            <!-- Acciones del card -->
                            <v-card-actions>
                                <router-link :to="`/libro/${libro._id}`" class="w-100">
                                    <v-btn 
                                        class="w-100 mt-2"
                                        color="orange-darken-1"
                                        variant="outlined"
                                    >
                                        Ver o comprar
                                    </v-btn>
                                </router-link>
                            </v-card-actions>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style>
.card--hover:hover{
    transform: scale(1.1);
    transition: transform 0.3s ease-in-out;
}
</style>