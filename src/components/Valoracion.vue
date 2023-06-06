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
                                    :rating="rating" 
                                    :max-stars="5" 
                                    @rating-selected="handleRatingSelected"
                                    :active-color="'#FB8C00'"
                                    :glow="3"
                                />
                            </div>
                        </v-col>

                        <!-- Esapcio del boton para ir a comentar -->
                        <v-col cols="2" class="mt-15">
                            <v-btn class="d-flex justify-center mt-4" color="orange-darken-1" icon="mdi-chevron-right" variant="plain"
                                @click="cambiar = false" />
                        </v-col>
                    </v-row>
                </div>

                <!-- Textarea -->
                <div v-else class="w-100 bg-grey-darken-4 mr-2 py-1 pr-2">
                    <v-row>
                        <!-- Esapcio del boton para volver a las estrellas -->
                        <v-col cols="2" class="d-flex align-center">
                            <v-btn color="orange-darken-1" icon="mdi-chevron-left" variant="plain"
                                @click="cambiar = true" />
                        </v-col>

                        <!-- Textarea para comentar -->
                        <v-col cols="10">
                            <v-textarea rows="3" bg-color="grey-darken-4" color="orange-darken-1" variant="outlined"
                                clearable clear-icon="mdi-close-circle" label="¿Te gustó el libro? Cuentanos"
                                v-value="textoTextArea" />
                            <v-divider class="border-opacity-50 mb-2"></v-divider>
                            <v-btn class="w-100" color="orange-darken-1" variant="outlined" prepend-icon="mdi-comment"
                                @click="comentar">Comentar
                            </v-btn>
                        </v-col>
                    </v-row>
                </div>
            </v-card>
        </v-col>

        <!-- Espacio para mostrar comentarios -->
        <v-col cols="12">
            <v-card class="comentarios" height="253" color="grey-darken-4" elevation="5">
                <v-card v-for="(comentario, index) in comentarios" :key="index" class="my-2 mx-1" color="orange-darken-1" variant="outlined">
                    <v-card-title class="text-white">{{ comentario.nombre }}</v-card-title>
                    <v-divider class="border-opacity-25"></v-divider>
                    <v-card-text class="text-white">{{ comentario.comentario }}</v-card-text>
                </v-card>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref } from 'vue';
import StarRating from 'vue-star-rating'

const comentarios = ref([
    {
        nombre: 'Eduardo',
        comentario: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis asperiores, numquam dignissimos labore tempore id, quos molestias expedita culpa voluptates nihil maxime cum quam! Laborum repellendus veritatis unde delectus itaque.'
    },
    {
        nombre: 'Karla',
        comentario: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis asperiores, numquam dignissimos labore tempore id, quos molestias expedita culpa voluptates nihil maxime cum quam! Laborum repellendus veritatis unde delectus itaque.'
    },
    {
        nombre: 'Dayan',
        comentario: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis asperiores, numquam dignissimos labore tempore id, quos molestias expedita culpa voluptates nihil maxime cum quam! Laborum repellendus veritatis unde delectus itaque.'
    },
    {
        nombre: 'Castorena',
        comentario: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis asperiores, numquam dignissimos labore tempore id, quos molestias expedita culpa voluptates nihil maxime cum quam! Laborum repellendus veritatis unde delectus itaque.'
    },
])

const cambiar = ref(true)
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