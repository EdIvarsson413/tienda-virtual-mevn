<template>
    <div v-if="mensaje === ''">
        <div class="text-h2 mt-4 mb-8 mr-5">Resultados para {{ routeNombre }}</div>
        <v-card class="mx-auto mb-5 card--hover" color="grey-darken-4" elevation="5" width="385" height="225">

            <v-row>
                <v-col calls="5">
                    <v-img max-width="200" :src="`/img/${libro.imagen}.jpg`" :alt="`Imagen ${libro.nombre}`" />
                </v-col>
                <v-col calls="7">
                    <v-tooltip :text="libro.nombre">
                        <template v-slot:activator="{ props }">
                            <v-card-title v-bind="props" class="text-center mr-3">{{ libro.nombre }}</v-card-title>
                        </template>
                    </v-tooltip>
                    <div class="d-flex flex-wrap text-grey-darken-1 justify-space-between mt-1">
                        <v-card-subtitle>${{ libro.precio }}</v-card-subtitle>
                        <v-card-subtitle>{{ libro.autor }}</v-card-subtitle>
                    </div>
                    <v-card-actions>
                        <router-link :to="`/libro/${libro.id}`" class="w-100">
                            <v-btn class="w-100 mt-2" color="orange-darken-1" variant="outlined">
                                Comprar
                            </v-btn>
                        </router-link>
                    </v-card-actions>
                </v-col>
            </v-row>
        </v-card>
    </div>
    <div class="text-center text-h2" v-else>{{ mensaje }}</div>
</template>

<script>
// Scrip aplicando Comp API 
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

export default defineComponent({
    name: 'SearchView',
    setup() {
        const router = useRoute();
        const routeNombre = router.params.nombre
        const libro = ref({})
        const mensaje = ref('');
        onMounted(() => {
            axios.get(`http://localhost:2908/api/libros/${routeNombre}`)
                .then((response) => {
                    const { data } = response;
                    libro.value = data
                }).catch(error => {
                    mensaje.value = "Libro no encontrado"
                    console.log(error)
                })
        })

        return {
            routeNombre,
            libro,
            mensaje
        }
    }
})
</script>
