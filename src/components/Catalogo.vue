<script setup>
import { ref, computed } from 'vue'
import { catalogo } from '@/Javascript/catalogo.js'
import Filtro from '@/components/Filtro.vue';
import axios from 'axios';

axios.get('http://localhost:2908/api/libros')
    .then((response) => {
        const { data } = response;
        console.log(data)
    }).catch(error => console.log(error))

// Recibe el arreglo de los libros
const libros = computed(() => {return catalogo});

// Por defecto esta el estado de todos los libros y sets se mostraran
const filtro = ref('todos');

// Cambia si se quieren ver solo libros o sets
const changeFiltro = (nuevoFiltro) => { filtro.value = nuevoFiltro }

// Con el filtro nuevo se retornan solo los productos a base de su tipo
const filtrarCatalogo = () => {
    switch (filtro.value) {
        case 'todos': return libros.value;
        case 'libro': return libros.value.filter(libro => libro.tipo === 'libro');
        case 'boxset': return libros.value.filter(libro => libro.tipo === 'boxset');
        default: return libros.value;
    }
}
</script>

<template>
    <v-container class="d-flex flex-wrap">
        <!-- Componente para hacer el filtrado -->
        <Filtro :filtro="filtro" :changeFiltro="changeFiltro"/>

        <!-- Carta horizontal -->
        <v-card 
            v-for="libro in filtrarCatalogo()" 
            :key="libro.id"
            class="mx-auto mb-7 card--hover"
            color="grey-darken-4"
            elevation="5"
            width="385" 
            height="225"
        >   
            <v-row>
                <!-- Espacio para la portada -->
                <v-col cols="5">
                    <v-img
                        max-width="200"
                        :src="`/img/${libro.imagen}.jpg`"
                        :alt="`imagen ${libro.nombre}`"
                    />
                </v-col>

                <!-- Espacio para detalles -->
                <v-col class="mt-6" cols="7">
                    <!-- Titulo con tooltip -->
                    <v-tooltip :text="libro.nombre">
                        <template v-slot:activator="{ props }">
                            <v-card-title v-bind="props" class="text-center mr-3">{{ libro.nombre }}</v-card-title>
                        </template>
                    </v-tooltip>

                    <!-- Precio y autor -->
                    <div class="d-flex flex-wrap text-grey-darken-1 justify-space-between mt-1">
                        <v-card-subtitle>${{ libro.precio }}</v-card-subtitle>
                        <v-card-subtitle>{{ libro.autor }}</v-card-subtitle>
                    </div>

                    <!-- Acciones del card -->
                    <v-card-actions>
                        <router-link :to="`/libro/${libro.id}`" class="w-100">
                            <v-btn 
                                class="w-100 mt-2"
                                color="orange-darken-1"
                                variant="outlined"
                            >
                                Comprar
                            </v-btn>
                        </router-link>
                    </v-card-actions>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<style>
.card--hover:hover{
    transform: scale(1.1);
    transition: transform 0.3s ease-in-out;
}
</style>