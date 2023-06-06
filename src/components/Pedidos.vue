<script setup>
// Se importan los modal personalizados
import { confirmar, escribirInput } from './Notificacion';

// Se definen los props
const props = defineProps({
    fetchPedidos: Array,
    eliminarPedido: Function,
    editarPedido: Function,
})

// Evento para eliminar un pedido por su id, en el modal muestra el nombre de este pedido
const eliminar = async (id, nombre) => {
    // La alerta devuelve un true o false dependiendo de su desicion
    const resultado = await confirmar(nombre,'¿Estas seguro de eliminar este pedido?', "Sí, eliminar");
    
    // Si el usuario confirma su decision se inicia el metodo que elimina el pedido
    if( resultado ) props.eliminarPedido(id);
}

// Evento para editar el numero de unidades de un pedido, el modal muestra el nombre del pedido
const editar = async (id, nombre) => {
    // La alerta devuelve un numero
    const resultado = await escribirInput(nombre, 'Escribe nuevas unidades de tu pedido');
    
    // Si el usuario definio un nuevo valor de unidades se inicia el metodo para cambiar su pedido
    if( resultado ) props.editarPedido(id, resultado);
}
</script>

<template>
        <v-card 
            v-for="pedido in fetchPedidos" 
            :key="pedido.id"
            width="500"
            height="225"
            class="mb-6 mx-auto pr-4"
            elevation="5"
            color="grey-darken-4"
        >
            <v-row>
                <!-- Espacio para mostrar la portada -->
                <v-col cols="4">
                    <v-img max-width="160" :src="`/img/${pedido.imagen}.jpg`"/>
                </v-col>

                <!-- Espacio para mostrar los detalles -->
                <v-col cols="8" class="mt-4">
                        <!-- Nombre del pedido -->
                    <v-tooltip :text="pedido.nombre">
                        <template v-slot:activator="{ props }">
                            <v-card-title v-bind="props" class="text-center mr-3">{{ pedido.nombre }}</v-card-title>
                        </template>
                    </v-tooltip>

                    <!-- Detalles del pedido -->
                    <div class="d-flex flex-wrap justify-space-between mt-2 text-grey-darken-1">
                        <v-card-subtitle class="text-subtitle-1">
                            Unidades: {{ pedido.unidades }}
                        </v-card-subtitle>
                        <v-card-subtitle class="text-subtitle-1">
                            Precio total: {{ pedido.precio * pedido.unidades }}
                        </v-card-subtitle>
                    </div>

                    <!-- Acciones para el pedido -->
                    <div class="flex-column mt-4">
                        <v-btn 
                            class="w-100 mb-2" 
                            color="orange-darken-4" 
                            variant="tonal"
                            @click="editar(pedido.id, pedido.nombre, pedido.precio)"
                        >
                            Editar
                        </v-btn>
                        <v-btn 
                            class="w-100" 
                            color="red-darken-4" 
                            variant="tonal"
                            @click="eliminar(pedido.id, pedido.nombre)"
                        >
                            Eliminar
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
        </v-card>
</template>
