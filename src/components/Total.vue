<script setup>
// Se importa el componente de alerta de swal
import { confirmar } from './Notificacion.js'

// Se definen los props
const props = defineProps({
    changeTotal: Number,
    eliminarPedidos: Function,
    confirmarPedidos: Function
})

// Evento para eliminar todos los pedidos
const eliminarTodos = async () => {
    // La alerta devuelve un true o false dependiendo de su desicion
    const resultado = await confirmar('Eliminar todos los pedidos','¿Estas seguro de eliminar todos los pedidos?', 'Sí, eliminar');
    
    // Si el usuario confirma su decision se inicia la funcion de eliminar todos los pedidos
    if( resultado ) props.eliminarPedidos();
}

// Evento para terminar la compra
const confirmarPedidos = async () => {
    // La alerta devuelve un true o false dependiendo de su desicion
    const resultado = await confirmar('Terminar compra','¿Esto es todo lo que compraras?', 'Sí, es todo');

    // Si se termina la compra inicia la funcion
    if( resultado ) props.confirmarPedidos();
}

</script>
<template>
    <v-row>
        <!-- Card que muestra el total de los pedidos -->
        <v-col cols="12">
            <v-card 
                class="d-flex flex-column" 
                height="300" 
                color="grey-darken-4" 
                elevation="5"
            >
                <div class="align-center mx-auto">
                    <v-main>
                        <div class="text-center text-h5 mb-1">Total</div>
                        <div class="text-center text-h3">${{ changeTotal }}</div>
                    </v-main>
                </div>
            </v-card>
        </v-col>

        <!-- Card que muestra los botones principales del componente Cart.vue -->
        <v-col cols="12">
            <v-card 
                class="d-flex px-3" 
                height="106" 
                color="grey-darken-4" 
                elevation="5"
            >
                <div class="flex-column mt-3">
                    <v-btn 
                        class="w-100 mb-2" 
                        color="orange-darken-4" 
                        variant="tonal"
                        @click="confirmarPedidos"
                    >
                        Confirmar pedidos
                    </v-btn>
                    <v-btn 
                        class="w-100" 
                        color="red-darken-4" 
                        variant="tonal" 
                        @click="eliminarTodos"
                    >
                    Eliminar pedidos
                    </v-btn>
                </div>
            </v-card>
        </v-col>
    </v-row>
</template>