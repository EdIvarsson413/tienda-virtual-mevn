<template>
    <v-row>
        <!-- Espacio para mostrar las estrellas y escribir comentario, se un solo card-->
        <v-col cols="12">
            <v-card color="grey-darken-4" height="200" elevation="5">
                <!-- Div que contiene las estrellas en el card -->
                <div v-if="cambiar" class="w-100" variant="outlined">
                    <v-row>
                        <!-- Esapcio para el componente de las estrellas -->
                        <v-col cols="10" class="d-flex flex-column align-center">
                            <v-card-title variant="outlined">Califica este libro</v-card-title>
                            <div class="d-flex justify-center mt-3">
                                <star-rating 
                                    :rating="estrellas !== undefined? estrellas : 0" 
                                    :max-stars="5" 
                                    @update:rating="agregarEstrellas"
                                    :active-color="'#FB8C00'"
                                    :glow="3"
                                    :read-only="nombreUSuario.includes('Admin')"
                                />
                            </div>
                        </v-col>

                        <!-- Esapcio del boton para ir a comentar -->
                        <v-col cols="2" class="mt-15">
                            <v-btn 
                                class="d-flex justify-center mt-4" 
                                color="orange-darken-1" 
                                icon="mdi-chevron-right" 
                                variant="plain"
                                @click="cambiar = false" 
                            />
                        </v-col>
                    </v-row>
                </div>

                <!-- Textarea -->
                <div v-else class="w-100 bg-grey-darken-4 mr-2 py-1 pr-2">
                    <v-row>
                        <!-- Esapcio del boton para volver a las estrellas -->
                        <v-col cols="2" class="d-flex align-center">
                            <v-btn 
                                color="orange-darken-1" 
                                icon="mdi-chevron-left" 
                                variant="plain"
                                @click="cambiar = true"
                            />
                        </v-col>

                        <!-- Textarea para comentar -->
                        <v-col cols="10">
                            <v-textarea 
                                rows="3" 
                                bg-color="grey-darken-4" 
                                color="orange-darken-1" 
                                variant="outlined"
                                clearable 
                                clear-icon="mdi-close-circle" 
                                label="¿Te gustó el libro? Cuentanos"
                                v-model="textoTextArea"
                                :disabled="nombreUSuario.includes('Admin')"
                            />
                            <v-divider class="border-opacity-50 mb-2"></v-divider>
                            <v-btn c
                                class="w-100" 
                                color="orange-darken-1" 
                                variant="outlined" 
                                prepend-icon="mdi-comment"
                                @click="comentar"
                                :disabled="nombreUSuario.includes('Admin')">Comentar
                            </v-btn>
                        </v-col>
                    </v-row>
                </div>
            </v-card>
        </v-col>

        <!-- Espacio para mostrar comentarios -->
        <v-col cols="12">
            <v-card class="comentarios" height="253" color="grey-darken-4" elevation="5">
                <!-- Si no hay comentarios -->
                <div v-if="comentarios.length === 0" class="text-h4 d-flex justify-center mt-16">No hay comentarios aún</div>
                <!-- Si al menos un comentario -->
                <v-card 
                    v-else 
                    v-for="(comentario) in comentarios" 
                    :key="comentario._id" 
                    class="my-2 mx-1" 
                    color="orange-darken-1" 
                    variant="outlined"
                >
                    <v-card-title class="text-white">{{ comentario.nombre }}</v-card-title>
                    <v-divider class="border-opacity-25"></v-divider>
                    <v-card-text class="text-white" v-html="comentario.comentario.replace(/\n/g, '<br>')"/>
                </v-card>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import StarRating from 'vue-star-rating'
import { ok } from './Notificacion'

const props = defineProps({
    nombreLibro: String
})

const comentarios = ref([]);
const estrellas = ref();
const cambiar = ref(true);
const textoTextArea = ref('')
const nombreUSuario = ref(localStorage.getItem('nombre'))

// Traer comentarios
const obtenerComentarios = async () => {
    try {
        const { data } = await axios( `${import.meta.env.VITE_BACKEND_URL}/api/comentarios/${props.nombreLibro}` );
        comentarios.value = data;
    } catch (error) {
        console.log(error)
    }
};

onMounted(() => {
    obtenerComentarios();
});


// Traer estrellas
const obtenerEstrellas = async () => {
    try {
        const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/estrellas/${props.nombreLibro}`);
        estrellas.value = data[0].estrellas;
    } catch (error) {
        //console.log(error)
    }
};

onMounted(() => {
    obtenerEstrellas();
});

const comentar = async () => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/comentarios`, 
        {
            nombre: localStorage.getItem('nombre'),
            comentario: textoTextArea.value,
            libro: props.nombreLibro
        })

        ok( 'Ok ;)' , data.msg)
        comentarios.value.push({ 
            nombre: localStorage.getItem('nombre'),
            comentario: textoTextArea.value,
            libro: props.nombreLibro
        })
    } catch (error) {
        console.log(error)
    }
}

const agregarEstrellas = async (event) => {
    estrellas.value = event;
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/estrellas`, 
        {
            nombre: localStorage.getItem('nombre'),
            estrellas: estrellas.value,
            libro: props.nombreLibro
        })

        ok( 'Ok ;)', data.msg);
    } catch (error) {
        
    }
}

</script>

<style>
.comentarios {
    max-height: 471px;
    overflow-y: hidden;
}

.comentarios:hover {
    overflow-y: auto;
}
</style>