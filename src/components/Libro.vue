//SECTION - Inicio Script
<script setup>
import { computed, ref } from 'vue'
import Valoracion from './Valoracion.vue';
import { catalogo } from '@/Javascript/catalogo';
import { pedidos } from '@/Javascript/carrito';
import { ok, advertencia } from './Notificacion';

// Defincion de props
const props = defineProps({
    libroId: String
})

// Se extrae un solo libro dependiendo del id, si no lo encuentra devuelve un false y se usa en la directiva vIf
const libro = computed(() => {
    // Extrae el libro
    const libroEncontrado = catalogo.find(libro => libro.id === parseInt(props.libroId));

    // Si existe lo devuelce
    if (libroEncontrado) return libroEncontrado;

    // Si no lo encuentra devuelce un false
    return false;
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
    <v-container v-if="libro" class="mt-10">
        <v-row>
            <v-col sm="12" md="7">
                <!-- Card que muestra la portada con detalles -->
                <v-card v-if="!cambiar" class="mx-auto mb-5 pr-4 w-100" color="grey-darken-4" elevation="5"
                    max-height="550">
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
                                    <v-btn icon="mdi-minus" variant="plain" color="orange-darken-1" @click="decrementar" />
                                    <div class="text-h4 text-orange-darken-1">{{ cantidad }}</div>
                                    <v-btn icon="mdi-plus" variant="plain" color="orange-darken-1" @click="aumentar" />
                                </div>

                                <!-- Acciones del card -->
                                <v-card-actions>
                                    <!-- Agregar al carrito -->
                                    <v-btn class="w-75" variant="outlined" color="orange-darken-1 mx-4"
                                        @click="agregarCarrito()">
                                        Agregar al carrito
                                    </v-btn>
                                    <!-- Ir a la sinopsis -->
                                    <v-btn @click="cambiar = true" icon="mdi-chevron-right" variant="plain"
                                        color="orange-darken-1" class="ml-2" />
                                </v-card-actions>
                            </v-main>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
            
            <!-- Card para el componente de estrellas -->
            <v-col v-if="!cambiar" sm="12" md="5">
                <Valoracion/>
            </v-col>
        </v-row>

        <!-- Cambio al card de la sinopsis -->
        <v-main v-if="cambiar">
                    <v-card class="mx-auto mb-5 pr-4 overflow-auto" color="grey-darken-4" elevation="5" width="800"
                        height="350">
                        <v-card-title class="text-center text-h5 mt-4">Sinopsis</v-card-title>

                        <!-- Sinopsis y boton centrados -->
                        <div class="d-flex align-center">
                            <v-btn @click="cambiar = false" icon="mdi-chevron-left" variant="plain" color="orange-darken-1"
                                class="ml-2" />
                            <v-card-text class="text-justify text" v-html="libro.sinopsis.replace(/\n/g, '<br>')" />
                        </div>
                    </v-card>
                </v-main>
    </v-container>
    <div v-else class="text-center text-h2 mt-16">El libro no existe</div>
</template>
//!SECTION - Fin Template

//SECTION - Inicio Style
<style></style>
//!SECTION - Fin Style