<template>
    <v-container>
        <div v-if="mensaje === ''">
            <div class="text-h2 mt-4 mb-8 mr-5">Resultados para {{ routeNombre }}</div>
                <!-- Carta horizontal -->
                <v-card
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
                            :src="`https://firebasestorage.googleapis.com/v0/b/libreriascastor-ecffa.appspot.com/o/folder%2F${libro.imagen}?alt=media`"
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
        </div>
        <div class="text-center text-h2" v-else>
            <v-card class="w-75 mt-16 mx-auto" color="grey-darken-4" height="123">
                <div class="text-h2 text-center text-red mt-8">{{ mensaje }}</div>
            </v-card>
        </div>
    </v-container>
</template>

<script>
// Scrip aplicando Comp API 
import { defineComponent, ref} from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

export default defineComponent({
    name: 'SearchView',
    setup() {
        const router = useRoute();
        const routeNombre = router.params.nombre
        const libro = ref(false)
        const mensaje = ref('');

        // Función para obtener el libro
        const obtenerLibro = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/libros/${routeNombre}`);
                libro.value = data
                console.log(data._id)
            } catch (error) {
                mensaje.value = error.response.data.msg
            }
        };
        obtenerLibro();

        return {
            routeNombre,
            libro,
            mensaje
        }
    }
})
</script>
