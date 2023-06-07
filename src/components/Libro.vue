//SECTION - Inicio Script
<script setup>
import { ref, onBeforeMount, onMounted } from 'vue'
import Valoracion from './Valoracion.vue';
import { obtenerUsuario } from '../Javascript/auth.js';
import { pedidos } from '@/Javascript/carrito';
import { ok, advertencia } from './Notificacion';
import axios from 'axios';

// Defincion de props
const props = defineProps({
    libroId: String
})

// Variable para cuando se este cargando el usuario
const cargando = ref(true);

// Si no hay autenticacion usuario queda como false
const usuario = ref(false);
const err = ref('');
// Antes de que incie el montaje del componente
onBeforeMount(async () => {
    try {
        // Extraen los datos de decifrado del jwt
        usuario.value = await obtenerUsuario();

        // Termina la carga de datos
        cargando.value = false;

        // console.log(usuario.value);
    } catch (error) {
        err.value = error.response.data.msg
    }
});

// Se extrae un solo libro dependiendo del id, si no lo encuentra devuelve un false y se usa en la directiva vIf
const libro = ref({});

const mensaje = ref('');

// Obtener libro desde servidor
const obtenerLibro = async () => {
    try {
        const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/libros/id/${props.libroId}`);
        libro.value = data;
    } catch (error) {
        mensaje.value = error.response.data.msg
    }
};

onMounted(() => {
    obtenerLibro();
});

// Contador de las unidades a comprar
const cantidad = ref(0);
const aumentar = () => { cantidad.value++ };
const decrementar = () => { if (cantidad.value > 0) cantidad.value--; }

// Bool para cambair a la sinopsis
const cambiar = ref(false);

// Arreglo de pedidos para mostrar en el carrito
const carrito = ref(pedidos);

// Generador de id para un pedido
const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
}

// Evento de agregar al carrito
const agregarCarrito = () => {
    // Si hay unidades seleccionadas
    if (cantidad.value !== 0) {
        // Se crea un nuevo pedido con sus datos
        const pedido = {
            id: generarId(),
            nombre: libro.value.nombre,
            imagen: libro.value.imagen,
            unidades: cantidad.value,
            precio: libro.value.precio
        }

        // El pedido entra al arreglo del carrito
        carrito.value.push(pedido);

        // Se muestran todos los pedidos
        console.table(pedidos)
        // Se avisa al usuario sobre el pedido
        ok("Ok ;)", "Tu pedido ha sido agregado al carrito");
    }
    else
        // Se avisa al usuario que seleccione unidades
        advertencia("Upps...", "No has seleccionado unidades");
}
</script>
//!SECTION - Fin Script

//SECTION - Inico Template
<template>
    <div v-if="!cargando">
        <v-container v-if="libro" class="mt-10">
            <v-row>
                <v-col sm="12" :md="usuario ? 7 : 8" :class="usuario ? '' : 'mx-auto'">
                    <!-- Card que muestra la portada con detalles -->
                    <v-card v-if="!cambiar" 
                        class="mx-auto mb-5 pr-4 w-100" 
                        color="grey-darken-4" 
                        elevation="5"
                        max-height="550"
                    >
                        <v-row>
                            <!-- Espacio para la portada -->
                            <v-col cols="6">
                                <v-img max-width="350" :src="`/img/${libro.imagen}.jpg`" />
                            </v-col>

                            <!-- Espacio para los detalles y precio -->
                            <v-col cols="6">
                                <v-main>
                                    <!-- Titulo del card (con tooltip) -->
                                    <v-tooltip :text="libro.nombre">
                                        <template v-slot:activator="{ props }">
                                            <v-card-title v-bind="props" class="text-center text-h4">
                                                {{ libro.nombre }}
                                            </v-card-title>
                                        </template>
                                    </v-tooltip>

                                    <!-- Precio y autor -->
                                    <div class="d-flex flex-wrap justify-space-between mt-4">
                                        <v-card-subtitle>
                                            ${{ cantidad === 0 ? libro.precio : cantidad * libro.precio }}
                                        </v-card-subtitle>
                                        <v-card-subtitle>{{ libro.autor }}</v-card-subtitle>
                                    </div>

                                    <!-- Saga -->
                                    <v-card-subtitle class="text-center text-h5 my-5 pb-3 overflow-hidden">
                                        {{ libro.saga }}
                                    </v-card-subtitle>

                                    <!-- Cantidad a pedir -->
                                    <div class="d-flex justify-space-between mt-5">
                                        <v-btn 
                                            icon="mdi-minus" 
                                            variant="plain" 
                                            color="orange-darken-1" 
                                            @click="decrementar" 
                                        />
                                        <div class="text-h4 text-orange-darken-1">{{ cantidad }}</div>
                                        <v-btn 
                                            icon="mdi-plus" 
                                            variant="plain" 
                                            color="orange-darken-1" 
                                            @click="aumentar"
                                        />
                                    </div>

                                    <!-- Acciones del card -->
                                    <v-card-actions>
                                        <!-- Agregar al carrito -->
                                        <v-btn 
                                            class="w-75" 
                                            variant="outlined" 
                                            color="orange-darken-1 mx-4"
                                            @click="agregarCarrito()"
                                            :disabled="usuario.role === 'admin'"
                                        >
                                            Agregar al carrito
                                        </v-btn>
                                        <!-- Ir a la sinopsis -->
                                        <v-btn 
                                            @click="cambiar = true" 
                                            icon="mdi-chevron-right" 
                                            variant="plain"
                                            color="orange-darken-1" 
                                            class="ml-2" 
                                        />
                                    </v-card-actions>
                                </v-main>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                
                <!-- Card para el componente de estrellas -->
                <v-col v-if="!cambiar" sm="12" md="5">
                    <Valoracion v-if="usuario" :nombreLibro="libro.nombre"/>
                </v-col>
            </v-row>

            <!-- Cambio al card de la sinopsis -->
            <v-main v-if="cambiar">
                <v-card 
                    class="mx-auto mb-5 pr-4 overflow-auto" 
                    color="grey-darken-4" 
                    elevation="5" 
                    width="800"
                    height="350"
                >
                    <v-card-title class="text-center text-h5 mt-4">Sinopsis</v-card-title>

                    <!-- Sinopsis y boton centrados -->
                    <div class="d-flex align-center">
                        <v-btn 
                            @click="cambiar = false" 
                            icon="mdi-chevron-left" 
                            variant="plain" 
                            color="orange-darken-1"
                            class="ml-2" 
                        />
                        <v-card-text class="text-justify text" v-html="libro.sinopsis.replace(/\n/g, '<br>')" />
                    </div>
                </v-card>
            </v-main>
        </v-container>
        <div v-else class="text-center text-h2 mt-16">
            <v-card class="w-75 mt-16 mx-auto" color="grey-darken-4" height="123">
                <div class="text-h2 text-center text-red mt-8">{{ mensaje }}</div>
            </v-card>
        </div>
    </div>
</template>
//!SECTION - Fin Template